export const Queries = {
  AddUser: `
    INSERT INTO users.users (email, name, highScore)
      VALUES (?, ?, ?);
    `,
  UpdateUser: `
    UPDATE users.users
      SET highscore=? 
      WHERE name=?;
    `,
  GetUser: `
    SELECT * FROM users.users 
      WHERE email=?;
    `,
};
