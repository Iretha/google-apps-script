function onOpen() {
    getUi().createMenu('Utils')
    .addItem('Mass Save DOCs in folder as PDFs', 'saveDocsFromCurrFolderAsPdfs')
    .addToUi();
}

function getUi(){
    return DocumentApp.getUi();
}

function saveDocsFromCurrFolderAsPdfs() {
    var currFileId = DocumentApp.getActiveDocument().getId();
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