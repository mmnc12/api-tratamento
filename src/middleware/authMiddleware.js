import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 'bearer token'

  if (!token) {
    return res.status(400).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if(err) {
      return res.status(403).json({ erro: 'Token inválido ou expirado' });
    }
    req.usuario = usuario;
    next();
  });
};