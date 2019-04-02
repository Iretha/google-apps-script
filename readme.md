# Google Apps Script Samples


## Instructions
Some of the scripts require a shared libriry (SharedLib.gs). In order to use them, you can:
1. Create a library project, then copy SharedLib.gs to the project and import the library as dependency to your project. For more information, please [read](https://developers.google.com/apps-script/guides/libraries).
2. Just copy the function you need from SharedLib.gs to your project file.

## Scripts
### 1. Export all docs in folder as pdf files (all-docs-in-folder-to-pdf)

The purpose of this script is to scan the current folder, in order to find all doc files, located in it. If there are any, they will be exported as pdf files with the same name in the same directory.
It will attach a new menu (Utils -> Export DOCs in folder as PDFs) to the menu of the container sheet.

#### 1.1. [For Google Sheets](/scripts/sheets/all-docs-in-folder-to-pdf)

#### 1.2. [For Google Documents](/scripts/docs/all-docs-in-folder-to-pdf)
