/*
* We need to add a menu, which will allow our users to export the doc files, located in the current directory as pdf files.
*/
function onOpen() {
    getUi().createMenu('Utils')
    .addItem('Export DOCs in folder as PDFs', 'saveDocsFromCurrFolderAsPdfs')
    .addToUi();
}

/*
* Returns the UI of the container file
*/
function getUi(){
    return DocumentApp.getUi();
}

/*
* Finds in which folder is the current file, then scans the folder for doc files and if there are any,
* they will be exported to the same folder as pdf files.
*/
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