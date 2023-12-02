import { SequelizeStorage, Umzug } from "umzug";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { PostgresService } from "./database/postgres.service";
import 'reflect-metadata';

@injectable()
export class UmzugMigration{
    umzug;
    constructor(@inject(TYPES.PostgresService) private postgresService:PostgresService){
        this.umzug =new Umzug({
            migrations: { glob: './src/migrations/*.ts' },
            context: this.postgresService.sequelize.getQueryInterface(),
            storage: new SequelizeStorage({ 
                sequelize:this.postgresService.sequelize,
            }),
            logger: console,
        });
    }
    public async up(){
        await this.umzug.up();
    }
}