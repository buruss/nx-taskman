import * as bcrypt from 'bcryptjs';

/**
 * 평문을 암호화. 솔트가 없으면 생성
 * @param plainPwd 평문 암호
 * @param salt 암호에 사용할 솔트. 없으면 생성
 * @return {salt: string; password: string;} 암호화된 값과 솔트
 */
const encrypt = async (plainPwd: string, salt: string = null): Promise<{ salt: string; password: string; }> => {
  if (!salt) {
    salt = await bcrypt.genSalt();
  }
  const password = await bcrypt.hash(plainPwd, salt);
  return { salt, password };
};

export { encrypt };