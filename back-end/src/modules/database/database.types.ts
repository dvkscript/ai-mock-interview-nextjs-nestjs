import { Transactionable } from "sequelize"
declare global {
    type DatabaseOptionType = {
        transaction?: Transactionable["transaction"]
    }
}