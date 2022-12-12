const express = require('express');
const {
    isValidId,
    isValidUser
} = require('../../src/helper/validation.js');
const {
    buildResponse
} = require('../../src/helper/buildResponse');
const {
    User
} = require('../services/user.service');
const router = express.Router();
const user = new User();

router.get('/', (req, res) => {
    try {
        const users = user.getUsers();
        buildResponse(res, 200, users);
    } catch (error) {
        buildResponse(res, 500, error.message);
    }
});

router.get('/:id', isValidId, (req, res) => {
    try {
        const {
            id
        } = req.params;
        const users = user.getUsersById(id);
        buildResponse(res, 200, users);
    } catch (error) {
        buildResponse(res, 500, error.message);
    }
});

router.post('/', isValidUser, (req, res) => {
    try {
        const {
            name,
            surname,
            email,
            pwd
        } = req.body;
        const users = user.createUsers(name, surname, email, pwd);
        buildResponse(res, 200, users);
    } catch (error) {
        buildResponse(res, 500, error.message);
    }
});

router.put('/:id', isValidId, isValidUser, (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            surname,
            email,
            pwd
        } = req.body;
        const users = user.updateUsers(id, name, surname, email, pwd);
        buildResponse(res, 200, users);
    } catch (error) {
        buildResponse(res, 500, error.message);
    }
});

router.delete('/:id', isValidId, (req, res) => {
    try {
        const {
            id
        } = req.params;
        const users = user.deleteUsers(id);
        buildResponse(res, 200, users);
    } catch (error) {
        buildResponse(res, 500, error.message);
    }
});

router.patch('/:id', isValidId, (req, res) => {
    try {
        const {
            id
        } = req.params;
        const users = user.patchUsers(id, req.body);
        buildResponse(res, 200, users);
    } catch (error) {
        buildResponse(res, 500, error.message);
    }
});

module.exports = router;