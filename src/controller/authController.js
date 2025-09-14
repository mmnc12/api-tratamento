import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../model/usuario.js';

//Registrar usuário
export const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
  
    const senhaHast = await bcrypt.hash(senha, 10);
  
    const usuario = await Usuario.create({ nome, email, senha: senhaHast });
  
    res.status(201).json({ mensagem: 'Usuário registrado com sucesso', usuario});

  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválids' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if(!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas'})
    }

    //Gerar token
    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h'}
    );
    
    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ erro: error.message});
  }
};
