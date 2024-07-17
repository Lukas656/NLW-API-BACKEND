const Usuario = require('../Model/user');
require('../database/conectData');


// Criar um novo Usuário
async function criarUser(newUser) {
    try {
        // Verificar se a data de início é anterior à data atual
        const currentDate = new Date();
        if (new Date(newUser.starts_at) < currentDate) {
            throw new Error('A data de início não pode ser anterior à data atual.');
        }

        let usuario = await Usuario.findOne({ owner_email: newUser.owner_email });

        if (!usuario) {
            usuario = new Usuario(newUser);
            await usuario.save();
            console.log(`Inserindo ${newUser.owner_name}`);
            return { userID: usuario._id };
        }

        return { userID: usuario._id };

    } catch (error) {
        console.error('Erro ao inserir o usuário:', error);
        throw error;
    }
}


// Buscar usuario pelo ID
async function getUserByID(id) {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario;
    } catch (error) {
        console.error('Erro ao buscar o usuário:', error.message);
        throw error;
    }
}
// Buscar Participants pelo ID
async function getParticipans(id) {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario.emails_to_invite;

    } catch (error) {
        console.error('Erro ao buscar o usuário:', error.message);
        throw error;
    }
}
// Buscar links importantes pelo ID
async function getlinks(id) {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario.important_links;

    } catch (error) {
        console.error('Erro ao buscar o usuário:', error.message);
        throw error;
    }
}
// Listar Atividades
async function getActivities(id) {
    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario.activites

    } catch (error) {
        console.error('Erro ao buscar o usuário:', error.message);
        throw error;
    }
}
// Criar Atividades
async function createActiviies(id, activity) {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        const dataStart = new Date(usuario.starts_at);
        const dataEnd = new Date(usuario.ends_at);
        const dataActivity = new Date(activity.date);

        if (dataActivity < dataStart || dataActivity > dataEnd) {
            return { "Error": "A data que escolheu não está no período da sua viagem!" };
        }

        usuario.activites.push(activity);
        await usuario.save()
        return usuario.activites

    } catch (error) {
        console.error('Erro ao buscar o usuário:', error.message);
        throw error;
    }
}



const dataFunctions = {
    criarUser,
    getUserByID,
    getParticipans,
    getlinks,
    getActivities,
    createActiviies,
}

module.exports = dataFunctions;