import { QueryInterface } from "sequelize";
import { DataTypes } from "sequelize";

export = {
    up: async ({context:queryInterface}:any) => {
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
      queryInterface.bulkInsert('users', 
      [ 
        {
          balance:10000,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], 
      {})
    },
  
    down: async ({context:queryInterface}:any) => {
      await queryInterface.dropTable('users');
    },
};