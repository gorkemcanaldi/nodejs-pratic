import createHttpError from 'http-errors';
import usersCollection from '../db/models/users.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from '../constants/index.js';
import sessionsCollection from '../db/models/sessions.js';

const registerUser = async (userData) => {
  const { email, password } = userData;
  const userCheck = await usersCollection.findOne({ email });

  if (userCheck) {
    throw createHttpError(409, 'bu email ile daha önce kayıt olunmuş');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  userData.password = hashPassword;

  const user = await usersCollection.create(userData);
  return user;
};

const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await usersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'kullanıcı bulunamadı');
  }

  const passwordControl = await bcrypt.compare(password, user.password);
  if (!passwordControl) {
    throw createHttpError(400, 'sifre yanlıs');
  }

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_TIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_TIME);

  const sesionData = await sessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return sesionData;
};

export { registerUser, loginUser };
