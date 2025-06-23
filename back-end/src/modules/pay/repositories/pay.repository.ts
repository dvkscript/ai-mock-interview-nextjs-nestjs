import { RepositoryBase } from "src/libs/db/repository.base";
import { PayEntity } from "../entities/pay.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Op } from "sequelize";
import { GetPayWithUserAndCountAllQuery } from "../dto/query/get-payWithUserAndCountAll.query";
import { UserProfileEntity } from "src/modules/users/entities/user_profile.entity";

export class PayRepository extends RepositoryBase<PayEntity> {
    protected getModel() {
        return PayEntity;
    }

    async getPayWithUserAndCountAll(params: GetPayWithUserAndCountAllQuery) {
        const page = +params.page;
        const limit = +params.limit;
        const q = params.q;

        const offset = (page - 1) * limit;

        const or: Partial<Record<keyof PayEntity, any>>[] = []

        if (q) {
            or.push({
                description: {
                    [Op.iLike]: `%${q}%`
                },
            })
            or.push({
                receiptEmail: {
                    [Op.iLike]: `%${q}%`
                }
            })
        }

        return await this.model.findAndCountAll({
            include: [
                {
                    model: UserEntity,
                    attributes: ["id", "fullName", "email"],
                    required: false,
                    include: [
                        {
                            model: UserProfileEntity,
                            attributes: ["thumbnail"],
                            required: false
                        }
                    ]
                }
            ],
            where: !!q ? {
                [Op.or]: or
            } : undefined,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        })
    }

    async payTotalAmount() {
        return await this.model.sum("amountReceived");
    }
}