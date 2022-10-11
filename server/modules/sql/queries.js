"use strict";
exports.__esModule = true;
exports.Queries = void 0;
exports.Queries = {
    AddUser: "\n    INSERT INTO users.users (email, name, highScore)\n      VALUES (?, ?, ?);\n    ",
    UpdateUser: "\n    UPDATE users.users\n      SET highscore=? \n      WHERE name=?;\n    ",
    GetUser: "\n    SELECT * FROM users.users \n      WHERE email=?;\n    "
};
