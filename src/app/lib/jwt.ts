import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error('JWT_SECRET is not set');
}

export const signJWT = (
  payload: object,
  options: jwt.SignOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token as string);
    });
  });
};

export const verifyJWT = <T>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        reject(err);
      }
      resolve(payload as T);
    });
  });
};
