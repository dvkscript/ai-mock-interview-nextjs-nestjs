import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SEQUELIZE } from './database.di-tokens';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class DatabaseService {
    constructor(
        @Inject(SEQUELIZE)
        private readonly sequelize: Sequelize
    ) { }

    async transaction<R>(callback: (t: Transaction) => Promise<R>): Promise<R> {
        const transaction = await this.sequelize.transaction({
            autocommit: true,
        });
        try {
            const result = await callback(transaction);
            await transaction.commit(); 
            return result;
        } catch (error) {
            await transaction.rollback();
            throw new HttpException("Invalid Server Error", HttpStatus.INTERNAL_SERVER_ERROR, {
                description: error.message || "Transaction failed"
            });
        }
    }
}
