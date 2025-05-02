import { AppDataSource } from "./database";

export const initializeDatabase = async (runMigrations = false) => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");

    if (runMigrations) {
      await AppDataSource.runMigrations();
      console.log("Migrations executed successfully.");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};
