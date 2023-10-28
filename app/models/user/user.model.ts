import { DataTypes, Model, Optional } from 'sequelize';

import ConnectionsInitiator from '../../connections';
import { BaseModelAttributes } from '../../interfaces/baseAttributes';
import { AppConstants } from '../../configs/constants';
import { UserStatus } from '../../enums/common';

const { sequelize } = ConnectionsInitiator.initSequelize();

export interface UserAttributes extends BaseModelAttributes {
  username: string;
  password: string;
  contact: string;
  email_id: string;
  status: UserStatus;
}

export interface UserModelInput extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {}
export interface UserModelOutput extends Required<UserAttributes> {}

class UserModel extends Model {
  declare username: string;
  declare password: string;
  declare contact: string;
  declare email_id: string;
  declare status: UserStatus;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  declare readonly deleted_at: Date;
}

UserModel.init(
  {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    username: { type: DataTypes.STRING(24), allowNull: false },
    password: { type: DataTypes.STRING(200), allowNull: false },
    contact: { type: DataTypes.STRING(10), allowNull: true },
    email_id: { type: DataTypes.STRING(50), allowNull: true },
    status: { type: DataTypes.ENUM({ values: AppConstants.USER_STATUS }), allowNull: false, defaultValue: UserStatus.ACTIVE },
  },
  {
    sequelize: sequelize,
    paranoid: true,
    modelName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);

export default UserModel;
