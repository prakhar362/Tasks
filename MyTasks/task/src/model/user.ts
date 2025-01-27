import { Sequelize, Model, DataTypes } from 'sequelize';

export class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
}

export function initializeUserModel(sequelize: Sequelize) {
  User.init(
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
    }
  );
}
