# Export all docs in folder as pdf files (all-docs-in-folder-to-pdf)

The purpose of this script is to scan the current folder, in order to find all doc files, located in it. If there are any, they will be exported as pdf files with the same name in the same directory.
It will attach a new menu (Utils -> Export DOCs in folder as PDFs) to the main menu of the container sheet.

## Instructions
These scripts require the shared library [SharedLib.gs](/scripts/SharedLib.gs). 

In order to run them, you can:
1. Create a library project, then copy SharedLib.gs to the project and import the library as a dependency to your project. For more information, please [read](https://developers.google.com/apps-script/guides/libraries).
2. Just copy the function you need from SharedLib.gs to your project file.

#### 1.1. Generate PDF files
Will scan the given folder and if there are any document files, they will be exported as pdf files with the same name and in the same directory.
```javascript
var folder = DriveApp.getFileById('PUT_YOU_FOLDER_ID_HERE');
var pdfFilesCount = SharedLib#saveAllDocsInFolderAsPdfs(folder);
```
#### 1.2. Generate PDF files (run from the menu of a Google Sheet File)
[For Google Sheets](/scripts/all-docs-in-folder-to-pdf/sheets/Code.gs)

#### 1.3. Generate PDF files (run from the menu of a Google Document File)
[For Google Documents](/scripts/all-docs-in-folder-to-pdf/docs/Code.gs)