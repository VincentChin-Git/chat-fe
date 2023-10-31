export interface httpData {
  /* data received from server */
  data: any;
  /* status code */
  code: number;
  /* is success */
  success: boolean;
}

export interface httpErrorData {
  /* error code */
  errCode: string;
  /* error msg */
  errMessage: string;
}
