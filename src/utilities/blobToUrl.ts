import { Url } from "url";

export function fileToUrlConverter(file: any) {
  var binaryData = [];
  binaryData.push(file);
  const url = URL.createObjectURL(new Blob(binaryData));
  return url;
}
