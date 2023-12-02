import { inject, injectable } from "inversify";
import { PostgresService } from "../database/postgres.service";
import { HTTPError } from "../errors/http-error.class";
import { TYPES } from "../types";
import { User } from "./user.model";
import { IUserRepository } from "./user.repository.interface";

interface IUpdateBalance{
    userId:number;
    amount:number;
}

@injectable()
export class UserRepository implements IUserRepository{
    constructor(@inject(TYPES.PostgresService) private postgresService:PostgresService ){}
    
    async updateBalance({userId, amount}:IUpdateBalance){
        const transaction = await this.postgresService.sequelize.transaction();
        const user = await User.findByPk(userId);

        if(!user){ 
            await transaction.rollback();
            throw new Error('User not found');
        }

        const newBalance = user.balance + amount;
        if(newBalance < 0){
            await transaction.rollback();
            throw new Error('Insufficient funds')
        }

        user.balance = newBalance;
        await user.save({transaction});
        await transaction.commit();
        return newBalance;
    }

}
