const getAllClientsHandler = (req, res) => {
    const { name } = req.query
    if (name) {
    res.send(`Estos son los usuarios con el nombre ${name}`);
    } else {
    res.send("Estos son los usuarios");  
    }
}
const getOneClientHandler = (req, res) => {
    const { id } = req.params;
    res.send(`Este es el detalle de un usuario con id ${id}`);
}
const createClientHandler = (req, res) => {
    const { id ,name, username ,email } = req.body;
    console.log(id ,name, username ,email)
    res.send(`El usuario con id ${id} y name ${name} fue creado con el username ${username} y su email es ${email} `);
}
const updateClientHandler = (req, res) => {
    res.send("Modificando el usuario");
}
const deleteClientHandler = (req, res) => {
    res.send("Eliminando el usuario");
}

module.exports = {
    getAllClientsHandler,
    getOneClientHandler,
    createClientHandler,
    updateClientHandler,
    deleteClientHandler,
}