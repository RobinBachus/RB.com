// TODO: Setup user database

import { createPool, Pool } from "mysql";
import { DATA_SOURCES } from "./../vars.config";
import { Queries } from "./sql/queries";

const dataSource = DATA_SOURCES.mySqlDataSource;

const dbCreatePool = () => {
  try {
    const pool: Pool = createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
    });
    console.log("pool created");
    return pool;
  } catch (error) {
    console.error("[mysql.connector][init][Error]: ", error);
    throw new Error("failed to initialized pool");
  }
};

const addUser = async (pool: Pool, email: string , name: string, highScore?: number) => {
  try {
    const result = await execute<{ affectedRows: number }>(
      pool,
      Queries.AddUser,
      [email, name, highScore || 0]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getUser = async (pool: Pool, name: string) => {
  return execute(pool, Queries.GetUser, [name]);
};

const updateUser = async (pool: Pool, name: string, highScore: number) => {
  try {
    const result = await execute<{ affectedRows: number }>(
      pool,
      Queries.UpdateUser,
      [highScore, name]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const execute = <T>(
  pool: Pool,
  query: string,
  params: string[] | Object
): Promise<T> => {
  try {
    if (!pool)
      throw new Error(
        "Pool was not created. Ensure pool is created when running the app."
      );

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error("[mysql.connector][execute][Error]: ", error);
    throw new Error("failed to execute MySQL query");
  }
};

module.exports = { dbCreatePool, addUser, updateUser, getUser };
