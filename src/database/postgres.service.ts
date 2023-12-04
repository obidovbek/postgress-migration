import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "../config/config.service";
import { postgresConfig } from "../config/postgres.config";
import { TYPES } from "../types";
import { User } from "../users/user.model";
import { IPostgresService } from "./postgres.service.interface";


@injectable()
export class PostgresService implements IPostgresService{
    sequelize:Sequelize

    constructor(@inject(TYPES.ConfigService) private configService:ConfigService){
        this.sequelize = new Sequelize({
            database: this.configService.get('SEQUELIZE_DATAABASE'),
            username: this.configService.get('SEQUELIZE_USERNAME'),
            password: this.configService.get('SEQUELIZE_PASSWORD'),
            host: this.configService.get('SEQUELIZE_HOST'),
            port: parseInt(this.configService.get('SEQUELIZE_PORT')),
            dialect: 'postgres',
            pool: {
                max: 1, // Максимальное количество соединений в пуле
                min: 0,     // Минимальное количество соединений в пуле
                acquire: 30000, // Время ожидания нового соединения (в миллисекундах)
                idle: 10000,    // Время простоя (в миллисекундах), после которого соединение будет закрыто
            },
            // pool: { 5958
            //     max: 1, // Максимальное количество соединений в пуле
            //     min: 0,     // Минимальное количество соединений в пуле
            //     acquire: 30000, // Время ожидания нового соединения (в миллисекундах)
            //     idle: 1000,    // Время простоя (в миллисекундах), после которого соединение будет закрыто
            // },
            // pool: {8568
            //     max: 1, // Максимальное количество соединений в пуле
            //     min: 0,     // Минимальное количество соединений в пуле
            //     acquire: 3000, // Время ожидания нового соединения (в миллисекундах)
            //     idle: 1000,    // Время простоя (в миллисекундах), после которого соединение будет закрыто
            // },
            // pool: {5822
            //     max: 1, // Максимальное количество соединений в пуле
            //     min: 0,     // Минимальное количество соединений в пуле
            //     acquire: 30000,4 // Время ожидания нового соединения (в миллисекундах)
            //     idle: 10000,  4  // Время простоя (в миллисекундах), после которого соединение будет закрыто
            // },
            // pool: { 5884
            //     max: 1, // Максимальное количество соединений в пуле
            //     min: 0,     // Минимальное количество соединений в пуле
            //     acquire: 300000,5 // Время ожидания нового соединения (в миллисекундах)
            //     idle: 100000,   5 // Время простоя (в миллисекундах), после которого соединение будет закрыто
            // },
            // pool: { 6036
            //     max: 1, // Максимальное количество соединений в пуле
            //     min: 0,     // Минимальное количество соединений в пуле
            //     acquire: 3000000, 6// Время ожидания нового соединения (в миллисекундах)
            //     idle: 1000000,    6// Время простоя (в миллисекундах), после которого соединение будет закрыто
            // },
            // pool: { 6334
            //     max: 1, // Максимальное количество соединений в пуле
            //     min: 0,     // Минимальное количество соединений в пуле
            //     acquire: 30000000, 7// Время ожидания нового соединения (в миллисекундах)
            //     idle: 10000000,   7 // Время простоя (в миллисекундах), после которого соединение будет закрыто
            // },
        })
        this.sequelize.addModels([User])
    }

    async connect(){
        try{
            await this.sequelize.authenticate();
            await this.sequelize.sync();
            console.log(`Connection to Postgress database established`);
        }catch(e){
            if(e instanceof Error){
                console.log(`Error connection to Postgres database ${e.message}`)
            }
        }
        await this.sequelize.authenticate();
        await this.sequelize.sync();
    }
}