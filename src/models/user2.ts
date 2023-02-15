import { DataTypes, Sequelize } from 'sequelize';
import db from './conn';

export const User2 = db.sequelize.define('user2', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    last_update: {
        type: DataTypes.TIME,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    }

}, {
    tableName: 'user2',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  


