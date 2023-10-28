import { DataTypes, Model, Optional } from 'sequelize';

import ConnectionsInitiator from '../../connections';
import { BaseModelAttributes } from '../../interfaces/baseAttributes';

const { sequelize } = ConnectionsInitiator.initSequelize();

export interface UserMetaAtributes extends BaseModelAttributes {
  user_id: number;
  name: string;
  city: string;
  image_url: string;
}

export interface UserMetaModelInput extends Optional<UserMetaAtributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {}
export interface UserMetaModelOutput extends Required<UserMetaAtributes> {}

class UserMetaModel extends Model {
  declare id: number;
  declare user_id: number;
  declare name: string;
  declare city: string;
  declare image_url: string;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  declare readonly deleted_at: Date;
}

UserMetaModel.init(
  {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    name: { type: DataTypes.STRING(70), allowNull: true },
    city: { type: DataTypes.STRING(50), allowNull: true },
    image_url: { type: DataTypes.STRING(500), allowNull: true },
  },
  {
    sequelize: sequelize,
    paranoid: true,
    modelName: 'user_meta',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);

export default UserMetaModel;
