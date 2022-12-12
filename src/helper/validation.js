function isValidId(req, res, next) {
    const {
        id
    } = req.params;
    if (!id) throw new Error('id is empty');
    if (isNaN(id)) throw new Error('id is not a number');
    next();
}

function isValidUser(req, res, next) {
    const {
        name,
        surname,
        email,
        pwd
    } = req.body;
    if (!name) throw new Error('name is empty');
    if (!surname) throw new Error('surname is empty');
    if (!email) throw new Error('email is empty');
    if (!/^[a-z0-9A-Z\.#$%^&*]+@[a-z]{3,7}\.[a-z]{3}$/gm.test(email)) throw new Error('email is invalid');
    if (pwd.lenght > 7) throw new Error('password is invalid');
    next();
}

module.exports = {
    isValidId,
    isValidUser
};