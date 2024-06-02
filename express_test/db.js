const sqlBase = require("sqlite3").verbose();
const db = new sqlBase.Database("sql_simple_base.db");

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

module.exports = {
    async listUsers() {
        const users = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return users;
    },

    async createUser(user) {
        try {
            const lastID = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO users (name, age) VALUES(?, ?)`, [user.name, user.age], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                });
            });
            return this.getUserById(lastID);
        } catch (err) {
            return null;
        }
    },

    async updateUser(id, updatedData) {
        try {
            const changes = await new Promise((resolve, reject) => {
                db.run(`UPDATE users SET name = ?, age = ? WHERE id = ?`, [updatedData.name, updatedData.age, id], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                });
            });
            if (changes == 0)
                return null;
            return this.getUserById(id);
        } catch (err) {
            return null;
        }
    },

    async deleteUser(id) {
        const changes = await new Promise((resolve, reject) => {
            db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
        return changes > 0;
    },

    async getUserById(id) {
        try {
            const user = await new Promise((resolve, reject) => {
                db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });
            return user;
        } catch (err) {
            return null;
        }
    }
}