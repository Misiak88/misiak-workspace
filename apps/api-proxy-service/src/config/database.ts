import { DataSource } from "typeorm";
import { join } from 'path';

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  migrations: [
    join(
      __dirname,
      isProd
        ? '../db/migrations/*.js'
        : '../../db/migrations/*.ts'
    ),
  ],
  entities: [__dirname + "/../**/*.entity.ts"],
});

// This function is exported but may not be used elsewhere.
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
    await AppDataSource.runMigrations();
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
