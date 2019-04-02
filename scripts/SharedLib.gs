/*
* Returns the folder where the given file is located
* fileId - the id of the file
*/
function getParentFolder(fileId){
    var parents = DriveApp.getFileById(fileId).getParents();
    var folder;
    if (parents.hasNext()) {
        folder = parents.next();
    } else {
        folder = DriveApp.getRootFolder();
    }
    return folder;
}

/*
* Filters all doc files, located in the given folder and exports them as pdf files. 
* Generated pdf files are saved in the same folder.
* folder - the folder in your google drive to scan for doc files
*/
function saveAllDocsInFolderAsPdfs(folder){
    var docFiles = folder.getFilesByType('application/vnd.google-apps.document');
    var counter = 0;
    while (docFiles.hasNext()) {
      var docFile = docFiles.next();
      var pdfBlob = docFile.getBlob().getAs('application/pdf').setName(docFile.getName() + '.pdf');
      var pdfFile = folder.createFile(pdfBlob);
      counter ++;
    }
  return counter;
}