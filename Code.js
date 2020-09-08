function onFormSubmit(e) {
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  var formResponse = formResponses[formResponses.length - 1];
  var itemResponses = formResponse.getItemResponses();

  for (i in itemResponses) {
    Logger.log(itemResponses[i].getResponse());
  }

  var rootFolderID = "1TVZ67fe3Hhfg6257rX-bpZPIkMzSPs2u";
  var destinationFolder = DriveApp.getFolderById(rootFolderID);
  var retailerIndex = 1;
  var locationIndex = 3;
  var retailer = itemResponses[retailerIndex].getResponse();
  var location = itemResponses[locationIndex].getResponse();
  var jobFolderName = retailer + " " + location;

  var damagedPhotosIndex = 10; // This is the index of the damaged photos question (0-indexed)
  var overallPhotosIndex = 11; // This is the index of the overall photos question (0-indexed)
  var completedPhotosIndex = 16; // This is the index of the complted photos question (0-indexed)

  var damagedPhotos = itemResponses[damagedPhotosIndex].getResponse();
  var overallPhotos = itemResponses[overallPhotosIndex].getResponse();
  var completedPhotos = itemResponses[completedPhotosIndex].getResponse();

  var storeFolder = DriveApp.getFolderById(rootFolderID).createFolder(
    jobFolderName
  );
  var conditionReportFolder = storeFolder.createFolder(
    "Condition Report + Checklist Photos"
  );
  var damagedFolder = storeFolder.createFolder("Damages Photos");
  var completedFolder = storeFolder.createFolder("Completed Photos");

  for (i in damagedPhotos) {
    var file = DriveApp.getFileById(damagedPhotos[i]);
    damagedFolder.addFile(file);
  }

  for (i in overallPhotos) {
    var file = DriveApp.getFileById(overallPhotos[i]);
    conditionReportFolder.addFile(file);
  }

  for (i in completedPhotos) {
    var file = DriveApp.getFileById(completedPhotos[i]);
    completedFolder.addFile(file);
  }
}
