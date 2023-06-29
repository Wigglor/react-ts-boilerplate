interface FileContent {
  headers: string;
  rows: string[];
}

interface FileProps {
  // myFileData: {
  //   sheetNames: string[];
  //   sheets: {
  //     [sheet: string]: XLSX.WorkSheet;
  //   };
  // };
  setfileToPreview: (visibility: boolean) => void;
}

export { FileContent, FileProps };
