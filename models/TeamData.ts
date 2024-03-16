import { Upload } from "./Upload";

export type TeamData = {
  id: string;
  login: string;
  password: string;
  name: string;
  uploads: Upload;
  upload_01: boolean;
  upload_02: boolean;
  upload_03: boolean;
  upload_04: boolean;
};
