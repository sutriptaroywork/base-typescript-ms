import { DataTypes } from 'sequelize';

import UserModel from '../../models/user/user.model';
import UserMetaModel from '../../models/user/userMeta.model';
import ConnectionsInitiator from '..';

export default class SequelizeAssociationsMaker {
  private static db: any = {};

  static init() {
    this.db.User = UserModel;
    this.db.UserMeta = UserMetaModel;

    this.db.User.UserMeta = this.db.User.hasOne(this.db.UserMeta, {
      foreignKey: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
    });
    this.db.UserMeta.User = this.db.UserMeta.belongsTo(this.db.User, { foreignKey: { name: 'user_id', type: DataTypes.INTEGER, allowNull: false } });

    const { sequelize } = ConnectionsInitiator.initSequelize();

    // "force: true" creates tables everytime server gets restarted. "force: false" doesn't create already existing tables.
    sequelize.sync({ force: false });
  }
}
