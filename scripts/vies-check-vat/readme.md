# Google Apps Script - Check VIES VAT Number (EU only)

### 1. VIES VAT SERVICE (PRODUCTION/ real data to be expected)
The VAT service is published [HERE](http://ec.europa.eu/taxation_customs/vies/services/checkVatService)

This is how you can use it:
```javascript
  var viesServiceUrl = 'http://ec.europa.eu/taxation_customs/vies/services/checkVatTestService';
  var viesData = makeViesCall(viesServiceUrl, 'PUT_COUNTRY_CODE_HERE', 'PUT_VAT_NUMBER_HERE');
  //var viesData = makeViesCall(viesServiceUrl, 'BG', '123567891');
  Logger.log(viesData);
```
The output will have the following structure:
```javascript
  var viesData = {
      'countryCode': '' (the corresponding country code or undefined),
      'vatNumber':  '' (the corresponding VAT number or undefined),
      'requestDate': '' (the corresponding requestDate or undefined), 
      'valid': boolean (true if vat number is valid or false if it can not be found),
      'name': '' (the corresponding business name or undefined),
      'address': '' (the address of the corresponding business or undefined),,
      'error' : undefined or {'code': '' (the corresponding error code), 'message': '' (the corresponding message text)}
    };
```
Check the test section for example responses.

### 2. VIES VAT SERVICE (TEST/ simulated data to be expected)
There is a test service you can use for development purposes.
The test service is published [HERE](http://ec.europa.eu/taxation_customs/vies/services/checkVatTestService)

This is how you can use it:
```javascript
  var viesServiceTestUrl = 'http://ec.europa.eu/taxation_customs/vies/services/checkVatTestService';
  var viesData = makeViesCall(viesServiceTestUrl, 'BG', '100');
  Logger.log(viesData);
```

You can use the following TEST VAT numbers to reproduce errors, that can be returned by VIES:
* 100 = Valid request with Valid VAT Number 
* 200 = Valid request with an Invalid VAT Number 
* 201 = Error : INVALID_INPUT 
* 202 = Error : INVALID_REQUESTER_INFO 
* 300 = Error : SERVICE_UNAVAILABLE 
* 301 = Error : MS_UNAVAILABLE 
* 302 = Error : TIMEOUT 
* 400 = Error : VAT_BLOCKED 
* 401 = Error : IP_BLOCKED 
* 500 = Error : GLOBAL_MAX_CONCURRENT_REQ 
* 501 = Error : GLOBAL_MAX_CONCURRENT_REQ_TIME 
* 600 = Error : MS_MAX_CONCURRENT_REQ 
* 601 = Error : MS_MAX_CONCURRENT_REQ_TIME 
* For all the other cases, The web service will responds with a "SERVICE_UNAVAILABLE" error.

Example call for a valid VAT No:
```javascript
  var viesServiceUrl = 'http://ec.europa.eu/taxation_customs/vies/services/checkVatTestService';
  var viesData = makeViesCall(viesServiceUrl, 'BG', '100');
  Logger.log(viesData);

> Log Output:
> {valid=true, address=123 Main St, Anytown, UK, countryCode=BG, requestDate=2019-04-03+02:00, name=John Doe, error=null, vatNumber=100}
```
Example log output of a response with errors:
```javascript
  var viesServiceUrl = 'http://ec.europa.eu/taxation_customs/vies/services/checkVatTestService';
  var viesData = makeViesCall(viesServiceUrl, 'BG', undefined);
  Logger.log(viesData);

> Log Output:
>  {valid=false, address=null, countryCode=null, requestDate=null, name=null, error={code=CUSTOM_NO_VAT, message=No VAT Number specified}, vatNumber=null}
```


-----------
This software is released under the MIT license:

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
>SOFTWARE.