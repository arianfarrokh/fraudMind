type UploadCsvInput = {
  uploadFile: File;
  kind: "DATA_CSV";
  tableId: ID;
};

type UploadCsvVariable = {
  input: UploadCsvInput;
};
