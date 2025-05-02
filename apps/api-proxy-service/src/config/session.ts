import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";

// initialize the store with express-session
const MySQLStore = MySQLStoreFactory(session);

// MySQL store options
const mysqlOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const sessionStore = new MySQLStore(mysqlOptions);
sessionStore.on("error", (err: any) => {
  console.error("MySQL session store error:", err);
});
