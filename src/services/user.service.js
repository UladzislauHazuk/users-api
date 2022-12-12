const fs = require('fs');

class User {
    constructor() {
        this.path = 'storage/user.json';
    }

    getUsers() {
        const users = JSON.parse(fs.readFileSync(this.path));
        return users;
    }

    getUsersById(id) {
        const users = JSON.parse(fs.readFileSync(this.path));
        const filtered = users.filter(el => el.id == id);
        return filtered;
    }

    updateUsers(id, name, surname, email, pwd) {
        const users = JSON.parse(fs.readFileSync(this.path));
        const filtered = users.filter(el => el.id != id);
        if (users.length == filtered.length) throw new Error('Error');
        filtered.push({
            id,
            name,
            surname,
            email,
            pwd
        });
        fs.writeFileSync(this.path, JSON.stringify(filtered), 'utf-8');
        return filtered;
    }

    createUsers(name, surname, email, pwd) {
        const users = JSON.parse(fs.readFileSync(this.path));
        const timestamp = Math.floor(Math.random() * Date.now());
        users.push({
            id: timestamp,
            name,
            surname,
            email,
            pwd
        });
        fs.writeFileSync(this.path, JSON.stringify(users), 'utf-8');
        return users;
    }

    deleteUsers(id) {
        const users = JSON.parse(fs.readFileSync(this.path));
        const filtered = users.filter(el => el.id != id);
        if (filtered.length == users.length) throw new Error('error');
        fs.writeFileSync(this.path, JSON.stringify(filtered), 'utf-8');
        return filtered;
    }

    patchUsers(id, bodyClient) {
        const users = JSON.parse(fs.readFileSync(this.path));
        const filtered = users.filter(el => el.id == id);
        const merge = {
            ...filtered[0],
            ...bodyClient
        };
        const withoutFiltered = users.filter(el => el.id != id);
        if (withoutFiltered.length == users.length) throw new Error('error');
        withoutFiltered.push(merge);
        fs.writeFileSync(this.path, JSON.stringify(withoutFiltered), 'utf-8');
        return withoutFiltered;
    }
}

module.exports = {
    User
};