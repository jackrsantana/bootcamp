// Comando Utilizado para criar o Container MySql
// $ docker run --name meetapp -e MYSQL_ROOT_PASSWORD=docker -p 3307:3306 -d mysql:5.7.26

module.exports = {
  dialect: 'mysql',
  host: '192.168.99.100',
  username: 'root',
  password: 'docker',
  database: 'meetapp',
  port: '3307',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
