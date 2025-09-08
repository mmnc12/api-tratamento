const config = {
  development: {
    database: {
      host: 'localhost',
      port: 3306,
      name: 'tratamento_db',
      dialect: 'mysql',
      user: 'root',
      password: ''
    }
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      name: process.env.DB_NAME,
      dialect: 'mysql',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  }
};

export default config;