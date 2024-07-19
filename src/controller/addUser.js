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
            return { userID: usuario._id };
        }

        return { userID: usuario._id };

    } catch (error) {
        console.error('Erro ao inserir o usuário:', error);
        throw error;
    }
}
// Atualizar destino data de inicio e fim da minha viajem
async function updateTrips(id, newTrips) {
    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // Verifica se a data de início é anterior à data atual
        const currentDate = new Date();
        if (new Date(newTrips.starts_at) < currentDate) {
            throw new Error('A data de início não pode ser anterior à data atual.');
        }

        // Atualiza os campos
        usuario.destination = newTrips.destination;
        usuario.starts_at = newTrips.starts_at;
        usuario.ends_at = newTrips.ends_at;

        // Zera o array de atividades
        usuario.activites = [];

        await usuario.save();
        return usuario;

    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
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
// Adicionar links 
async function addLink(userId, newLink) {
    try {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        
        usuario.important_links.push(newLink);

        await usuario.save();

        return usuario.important_links;
    } catch (error) {
        console.error('Erro ao adicionar o link:', error.message);
        throw error;
    }
}
// Deletar Links
async function deleteLink(userId, linkId) {
    try {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        // Encontrar o índice do link a ser removido
        const linkIndex = usuario.important_links.findIndex(link => link._id.toString() === linkId);
        if (linkIndex === -1) {
            throw new Error('Link não encontrado');
        }

        // Remover o link do array
        usuario.important_links.splice(linkIndex, 1);

        // Salvar o usuário atualizado
        await usuario.save();

        return usuario.important_links;
    } catch (error) {
        console.error('Erro ao deletar o link:', error.message);
        throw error;
    }
}
// Deletar Convidados
async function deleteEmail(userId, emailId) {
    try {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        usuario.emails_to_invite = usuario.emails_to_invite.filter(userEmail => userEmail !== emailId);

        await usuario.save();

        return usuario.emails_to_invite;
    } catch (error) {
        console.error('Erro ao deletar o e-mail:', error.message);
        throw error;
    }
}
// Adicionar Email de Convidados
async function addEmail(userId, newEmail) {
    try {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        usuario.emails_to_invite.push(newEmail);

        await usuario.save();

        return usuario.emails_to_invite;
    } catch (error) {
        console.error('Erro ao adicionar o e-mail:', error.message);
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
    updateTrips,
    deleteLink,
    addLink,
    deleteEmail,
    addEmail,

}

module.exports = dataFunctions;