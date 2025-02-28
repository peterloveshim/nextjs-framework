export const fetchErrorHandler = (response: Response): void => {
  if (response.status === 400) throw new Error("400, 유효하지 않는 파라미터");
  // 401로 에러 메시지 시작하는 것 중요 fix
  if (response.status === 401) throw new Error("401, 인증 에러");
  if (response.status === 404) throw new Error("404, Not found");
  if (response.status === 500) throw new Error("500, internal server error");
  throw new Error(`${response.status} Error`);
};
