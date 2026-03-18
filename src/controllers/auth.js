import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from '../services/auth.js';

const registerUserController = async (req, res) => {
  const userData = req.body;
  const data = await registerUser(userData);

  res.status(201).send({
    message: 'kullanıcı kaydı başarılı',
    status: 201,
    data,
  });
};

const loginUserController = async (req, res) => {
  const userData = req.body;
  const session = await loginUser(userData);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    //   secure: true,
    sameSite: 'strict',
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    // secure: true,
    sameSite: 'strict',
    expires: session.refreshTokenValidUntil,
  });
  res.status(200).send({
    message: 'Access Token',
    status: 200,
    accessToken: session.accessToken,
  });
};

const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  await logoutUser(sessionId);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(200).send({
    message: 'çıkış yapıldı',
    status: 200,
  });
};

const refreshUserController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await refreshUser(refreshToken, sessionId);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    // secure: true,
    sameSite: 'strict',
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    // secure: true,
    sameSite: 'strict',
    expires: session.refreshTokenValidUntil,
  });
  res.status(200).send({
    message: 'Access Token',
    status: 200,
    accessToken: session.accessToken,
  });
};

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
};
