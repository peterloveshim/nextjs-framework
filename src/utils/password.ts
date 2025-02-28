import crypto from "crypto";

export const getMysqlPassword = (password: string): string => {
  const sha1Hash1 = crypto.createHash("sha1");
  const sha1Hash2 = crypto.createHash("sha1");

  const hash1Pw = sha1Hash1.update(password, "utf-8").digest();
  const hash2Pw = sha1Hash2.update(hash1Pw).digest("hex").toUpperCase();
  return `*${hash2Pw}`;
};
