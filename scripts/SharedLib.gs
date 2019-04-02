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