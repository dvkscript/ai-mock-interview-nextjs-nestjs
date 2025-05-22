import { RepositoryBase } from "src/libs/db/repository.base";
import { PayEntity } from "../entities/pay.entity";

export class PayRepository extends RepositoryBase<PayEntity> {
    protected getModel() {
        return PayEntity;
    }
}