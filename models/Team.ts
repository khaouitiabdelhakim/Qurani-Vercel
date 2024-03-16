import { Upload } from "./Upload";


export type Team = {
  id: string;
  login: string;
  password: string;
  name: string;
  upload: Upload;
};
