import { DataTypes, Sequelize } from 'sequelize';
import db from './conn';

export const User = db.sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user2',
        key: 'id'
    }
    },
    first_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    last_update: {
        type: DataTypes.TIME,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    }

}, {
    tableName: 'user',
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
      {
        name: "fk_user2_user",
        using: "BTREE",
        fields: [
            { name: "id" },
        ]
    },
    ]
  });

  


