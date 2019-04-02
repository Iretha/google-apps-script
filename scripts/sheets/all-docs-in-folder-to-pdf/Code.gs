function onOpen() {
  var submenu = [{name:"Mass Save DOCs in folder as PDFs", functionName:"saveDocsFromCurrFolderAsPdfs"}];
  SpreadsheetApp.getActiveSpreadsheet().addMenu('Utils', submenu);  
}

function getUi(){
    return SpreadsheetApp.getUi();
}

function saveDocsFromCurrFolderAsPdfs() {
    var currFileId = SpreadsheetApp.getActive().getId();
    if(currFileId){
        var currentFolder = SharedLib.getParentFolder(currFileId);
        var filesCnt = SharedLib.saveAllDocsInFolderAsPdfs(currentFolder);
        
        if(filesCnt === 0){
           getUi().alert("No PDF files are exported!");
        }else{
           getUi().alert("Done! " + filesCnt + " pdf files saved to \"" + currentFolder.getName() + "\" folder.");
        }
    }
}