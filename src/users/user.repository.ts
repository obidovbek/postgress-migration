import { inject, injectable } from "inversify";
import { Transaction,Sequelize } from "sequelize";
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
        const transaction = await this.postgresService.sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED });
        const user = await User.findByPk(userId);

        if(!user){ 
            await transaction.rollback();
            throw new Error('User not found');
        }
        if (user &&  user.balance + amount>= 0) {
            await User.update(
                { balance: Sequelize.literal(`CASE WHEN balance + ${amount}>= 0  THEN balance + ${amount} ELSE balance END`) },
                { where: { id: userId }, transaction: transaction }
            );
        }else{
            await transaction.rollback();
            throw new Error('Insufficient funds')
        }
        await transaction.commit();
        return user.balance + amount;
    }

}
