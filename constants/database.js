const databaseConfig = {
  host: process.env.databaseHost || "127.0.0.1",
  port: process.env.databasePort || 3306,
  user: process.env.databaseUser || "root",
  password: process.env.databasePassword || 'yjc010203.',
  database: process.env.databaseName || "afs",
}

module.exports = databaseConfig