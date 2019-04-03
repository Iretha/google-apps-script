# Google Apps Script Samples

## Instructions
Some of the scripts require a shared library (SharedLib.gs). In order to use them, you can:
1. Create a library project, then copy SharedLib.gs to the project and import the library as a dependency to your project. For more information, please [read](https://developers.google.com/apps-script/guides/libraries).
2. Just copy the function you need from SharedLib.gs to your project file.

## Projects

### 1. Google Apps Script: Check VIES VAT Number - EU only (vies-check-vat)
This is how to use it:
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
For more details, go to [Check VIES VAT Project Section](/scripts/vies-check-vat).

### 2. Google Apps Script: Export all docs in folder as pdf files (all-docs-in-folder-to-pdf)

The purpose of this script is to scan the current folder and to find all doc files that are located in it. 
If there are any, they will be exported as pdf files with the same name in the same directory.

For more details, go to [Export all docs in folder as pdf files Project Section](/scripts/all-docs-in-folder-to-pdf).

-----------
This software is released under the MIT license:

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
>SOFTWARE.
