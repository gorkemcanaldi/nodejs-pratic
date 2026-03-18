import createHttpError from 'http-errors';
import sessionsCollection from '../db/models/sessions.js';
import usersCollection from '../db/models/users.js';

export const authorization = async (req, res, next) => {
  // authorization varmı
  const author = req.get('Authorization');

  if (!author) {
    next(createHttpError(404, 'Authorization bulunamadı'));
    return;
  }
  // Bearer token dogru gelmiş mi

  const [bearer, token] = author.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Geçersiz Bearer Token'));
    return;
  }
  // token varmı yokmu

  const session = await sessionsCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Token geçersiz'));
    return;
  }

  // token süresi geçerlimi

  if (session.accessTokenValidUntil < Date.now()) {
    next(createHttpError(401, 'Token süresi doldu'));
    return;
  }

  // token varsa kim oldugunuda ekle : user

  const user = await usersCollection.findById(session.userId);

  req.user = user;

  next();
};
