export type StandardApiResponseType = {
  responseId: string;
  success: boolean;
  message: string;
};

export type ApiResponseType<T> = StandardApiResponseType & {
  result: T;
};
