import { QueryInterface } from "sequelize";
import { DataTypes } from "sequelize";

export = {
    up: async (queryInterface:QueryInterface) => {
      await queryInterface.createTable('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
    },
  
    down: async (queryInterface:QueryInterface) => {
      await queryInterface.dropTable('users1s');
    },
};