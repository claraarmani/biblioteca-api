
const { prisma } = require('@bibapi/storage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastrar usuário
async function cadastrarUsuario(req, res) {
    try {
        const {
            nome,
            sobrenome,
            email,
            telefone,
            dataNascimento,
            senha
        } = req.body;

        if (!nome || !sobrenome || !email || !senha) {
            return res.status(400).json({
                erro: 'Preencha todos os campos obrigatórios.'
            });
        }

        if (senha.length < 8) {
            return res.status(400).json({
                erro: 'A senha deve ter pelo menos 8 caracteres.'
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: emailNormalizado }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                erro: 'Este e-mail já está cadastrado.'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await prisma.usuario.create({
            data: {
                nome: nome.trim(),
                sobrenome: sobrenome.trim(),
                email: emailNormalizado,
                telefone: telefone || null,
                dataNascimento: dataNascimento
                    ? new Date(`${dataNascimento}T12:00:00`)
                    : null,
                senha: senhaHash
            },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                telefone: true,
                dataNascimento: true,
                criadoEm: true
            }
        });

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario
        });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);

        return res.status(500).json({
            erro: 'Erro ao cadastrar usuário.'
        });
    }
}

// Fazer login
async function fazerLogin(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: 'Informe o e-mail e a senha.'
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const usuario = await prisma.usuario.findUnique({
            where: { email: emailNormalizado }
        });

        if (!usuario) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não configurado.');
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                email: usuario.email,
                telefone: usuario.telefone,
                dataNascimento: usuario.dataNascimento
            }
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);

        return res.status(500).json({
            erro: 'Erro ao fazer login.'
        });
    }
}


// Buscar dados do usuário autenticado
async function buscarMeuPerfil(req, res) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: req.usuarioId
            },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                telefone: true,
                dataNascimento: true,
                criadoEm: true
            }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json(usuario);

    } catch (error) {
        console.error('Erro ao buscar perfil:', error);

        return res.status(500).json({
            erro: 'Erro ao buscar dados do usuário.'
        });
    }
}

// Atualizar dados do usuário autenticado
async function atualizarMeuPerfil(req, res) {
    try {
        const {
            nome,
            sobrenome,
            email,
            telefone,
            dataNascimento
        } = req.body;

        if (!nome || !sobrenome || !email) {
            return res.status(400).json({
                erro: 'Nome, sobrenome e e-mail são obrigatórios.'
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const emailEmUso = await prisma.usuario.findFirst({
            where: {
                email: emailNormalizado,
                NOT: {
                    id: req.usuarioId
                }
            }
        });

        if (emailEmUso) {
            return res.status(409).json({
                erro: 'Este e-mail já está sendo utilizado.'
            });
        }

        const usuario = await prisma.usuario.update({
            where: {
                id: req.usuarioId
            },
            data: {
                nome: nome.trim(),
                sobrenome: sobrenome.trim(),
                email: emailNormalizado,
                telefone: telefone || null,
                dataNascimento: dataNascimento
                    ? new Date(`${dataNascimento}T12:00:00`)
                    : null
            },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                telefone: true,
                dataNascimento: true
            }
        });

        return res.status(200).json({
            mensagem: 'Dados atualizados com sucesso!',
            usuario
        });

    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);

        return res.status(500).json({
            erro: 'Erro ao atualizar dados do usuário.'
        });
    }
}

module.exports = {
    cadastrarUsuario,
    fazerLogin,
    buscarMeuPerfil,
    atualizarMeuPerfil
};
