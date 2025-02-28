import { ACCESS_TOKEN } from "@/constants/auth.constants";

import { getSession, removeAllSessions } from "@/utils/session";
import { isValidToken } from "@/utils/jwt";

export const checkAuth = async () => {
  try {
    const accessToken = await getSession(ACCESS_TOKEN);

    if (!accessToken || !isValidToken(accessToken)) {
      await removeAllSessions();
      throw new Error("인증 에러");
    }

    return accessToken;
  } catch (err) {
    console.log("ERR!@## : ", err);
    throw err;
  }
};
