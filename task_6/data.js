let users = [];
let currentID = 1;

module.exports = {
    getUsers: () => users,
    addUser: (user) => {
        user.id = currentID++;
        users.push(user);
    },
    updateUser: (id, updatedData) => {
        let index = users.findIndex(user => user.id === id);
        if (index === -1)
            return null;
        users[index] = { ...users[index], ...updatedData };
        return users[index];
    },
    deleteUser: (id) => {
        let index = users.findIndex(user => user.id === id);
        if(index === -1) 
            return false;
        users.splice(index, 1);
        return true;
    },
    getUserByID: (id) => {
        let index = users.findIndex(user => user.id === id);
        if (index === id)
            return null;
        return users[index];
    }
};