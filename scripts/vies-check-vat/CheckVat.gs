/*
* Makes a call at the given viesServiceUrl.
* The function is used by the previous two functions.
*/
function makeViesCall(viesServiceUrl, countryCode, vatNo){
    var viesData = {
      'countryCode': undefined,
      'vatNumber': undefined,
      'requestDate': undefined, 
      'valid': false,
      'name': undefined,
      'address': undefined,
      'error' : undefined
    };
  
  if (!countryCode) {
    viesData.error = {'code': 'CUSTOM_NO_COUNTRY_CODE', 'message': parseViesErrCode('CUSTOM_NO_COUNTRY_CODE')};
    return viesData;
  }
  
  if (!vatNo) {
    viesData.error = {'code': 'CUSTOM_NO_VAT', 'message': parseViesErrCode('CUSTOM_NO_VAT')};
    return viesData;
  }
  
  var xmlBody = prepareSoapBody(countryCode, vatNo);
  var options = prepareSoapOptions(xmlBody);
  var response = UrlFetchApp.fetch(viesServiceUrl, options);
  if(!response){
    viesData.error = {'code': 'CUSTOM_NO_VAT', 'message': parseViesErrCode('CUSTOM_NO_RESPONSE')};
    return viesData;
  }
  
  var responseXml = response.getContentText(); //Logger.log('responseXml: ' + responseXml);
  var xmlDocument = XmlService.parse(responseXml);
 
  var envelope = xmlDocument.getRootElement().getChildren();
  var body = envelope && envelope.length > 0 ? envelope[0].getChildren() : undefined ;
  var fault = body && body[0] && body[0].getChild('faultstring') ? body[0].getChild('faultstring').getText() : undefined; //Logger.log(fault);
  var vatResponse = body && body[0] ? body[0] : undefined; //Logger.log(vatResponse);
 
  var ns = XmlService.getNamespace('urn:ec.europa.eu:taxud:vies:services:checkVat:types');
  var viesData = {
      'countryCode': getChildText(ns, vatResponse, 'countryCode'),
      'vatNumber': getChildText(ns, vatResponse, 'vatNumber'),
      'requestDate': getChildText(ns, vatResponse, 'requestDate'), 
      'valid': getChildText(ns, vatResponse, 'valid'),
      'name': getChildText(ns, vatResponse, 'name'),
      'address': getChildText(ns, vatResponse, 'address'),
      'error' : fault ? {'code': fault, 'message': parseViesErrCode(fault)} : undefined
    };
  return viesData;
}

function getChildText(ns, xmlElement, xmlChildElementName){
  var child = xmlElement ? xmlElement.getChild(xmlChildElementName, ns) : undefined;
  return child ? child.getText() : '';
}

/* Prepare the SOAP BODY */
function prepareSoapBody(countryCode, vatNo){
  var xmlBody =
 '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
 ' xmlns:tns1="urn:ec.europa.eu:taxud:vies:services:checkVat:types" ' +
 ' xmlns:impl="urn:ec.europa.eu:taxud:vies:services:checkVat"> ' +
 ' <soap:Header> ' +
 ' </soap:Header> ' +
 '  <soap:Body> ' +
 '   <tns1:checkVat xmlns:tns1="urn:ec.europa.eu:taxud:vies:services:checkVat:types" ' +
 '     xmlns="urn:ec.europa.eu:taxud:vies:services:checkVat:types"> ' +
 '    <tns1:countryCode>' + countryCode.toUpperCase() + '</tns1:countryCode> ' +
 '    <tns1:vatNumber>' + vatNo.toUpperCase() + '</tns1:vatNumber> ' +
 '   </tns1:checkVat> ' +
 '  </soap:Body> ' +
 '</soap:Envelope> ';  
  return xmlBody;
}

/* Prepare the SOAP Options and include the service payload (soapBody) */
function prepareSoapOptions(xmlBody){
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'node-soap',
    'Accept' : 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'none',
    'Accept-Charset': 'utf-8',
    'Connection': 'close'
  }
  
  var options = {  
    headers: headers,
    method: "post",
    contentType: "text/xml",
    payload: xmlBody,
    muteHttpExceptions: true,
  };
  
  return options;
}

/* Returns the corresponding error message by given errorCode.*/
function parseViesErrCode(code){
  if(!code){
    return undefined;
  }
  
  var ERROR_MSGS = {
  'INVALID_INPUT': 'The provided CountryCode is invalid or the VAT number is empty',
  'SERVICE_UNAVAILABLE': 'The VIES VAT service is unavailable, please try again later',
  'MS_UNAVAILABLE': 'The VAT database of the requested member country is unavailable, please try again later',
  'MS_MAX_CONCURRENT_REQ': 'The VAT database of the requested member country has had too many requests, please try again later',
  'TIMEOUT': 'The request to VAT database of the requested member country has timed out, please try again later',
  'SERVER_BUSY': 'The service cannot process your request, please try again later',
  'UNKNOWN': 'Unknown error',
  'CUSTOM_NO_COUNTRY_CODE': 'No country code specified',
  'CUSTOM_NO_VAT': 'No VAT Number specified',
  'CUSTOM_NO_RESPONSE': 'No response from VIES. Try again later!'};
  return ERROR_MSGS[code] ? ERROR_MSGS[code] : ERROR_MSGS['UNKNOWN'];
}