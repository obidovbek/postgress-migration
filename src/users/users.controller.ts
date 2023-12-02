import { BaseController } from "../common/base.controller";
import { IUserController } from "./users.controller.ts.interface";
import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UserRepository } from "./user.repository";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../errors/http-error.class";

@injectable()
export class UserController extends BaseController implements IUserController{
    
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository){
        super();
        this.bindRoutes([
            {
                path:'/update-balance',
                method: 'put',
                func: this.updateBalance,
                middleware:[]
            }
        ])
    }
    async updateBalance(
        req:Request,
        res:Response,
        next:NextFunction
    ){
        try{
            const result = await this.userRepository.updateBalance(req.body);
            this.ok(res, {message: 'Price updated successfully', data:result
        })
        }catch(e){  
            next(new HTTPError(500, 'Can not update balance'))
        }
    }
}