export interface IHttpData {
  /* data received from server */
  data: any;
  /* status code */
  code: number;
  /* is success */
  success: boolean;
}

export interface IHttpErrorData {
  /* error code */
  errCode: string;
  /* error msg */
  errMessage: string;
}
