import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetapp from '../app/models/Meetapp';
import Subscription from '../app/models/Subscription';

import databaseConfig from '../config/database';

const models = [User, File, Meetapp, Subscription];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
  }

  init() {
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
