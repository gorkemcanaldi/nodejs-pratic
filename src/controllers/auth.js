import { loginUser, registerUser } from '../services/auth.js';

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
  });

  res.cookie('sesionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.status(200).send({
    message: 'Access Token',
    status: 200,
    accessToken: session.accessToken,
  });
};

export { registerUserController, loginUserController };
