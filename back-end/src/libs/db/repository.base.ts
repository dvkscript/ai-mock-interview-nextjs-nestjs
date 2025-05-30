import { isUUID } from "class-validator";
import { Attributes, BulkCreateOptions, CountOptions, CreateOptions, DestroyOptions, Filterable, FindAndCountOptions, FindOptions, Identifier, ModelStatic, NonNullFindOptions, Transaction, UpdateOptions } from "sequelize";
import { Model } from "sequelize-typescript";
import { MakeNullishOptional } from "sequelize/types/utils";

export abstract class RepositoryBase<T extends Model> {
    protected model: ModelStatic<T>;

    constructor() {
        this.model = this.getModel();
    }

    protected abstract getModel(): ModelStatic<T>;

    create(data: any, Condition?: CreateOptions<T>) {
        return this.model.create(data, { ...Condition });
    }

    update(where: UpdateOptions<T>["where"], data: Partial<T>, condition?: Omit<UpdateOptions<T>, "where">) {
        return this.model.update(
            data,
            {
                ...condition,
                where
            }
        );
    }

    delete(where: DestroyOptions<T>["where"], condition?: Omit<DestroyOptions<T>, "where">) {
        return this.model.destroy({
            ...condition,
            where,
        })
    }

    findAll(condition?: FindOptions<T>) {
        return this.model.findAll({ ...condition });
    }

    findOne(where: FindOptions<T>["where"], condition?: Omit<FindOptions<T>, "where">) {
        return this.model.findOne({
            ...condition,
            where
        })
    }

    findByPk(id: Identifier, condition?: NonNullFindOptions<T>) {
        return this.model.findByPk(id, { ...condition });
    }

    findOneCreate(where: Filterable<T>["where"], newData: Record<string, any>, condition?: Omit<Filterable<T>, "where" | "defaults">) {
        return this.model.findOrCreate({
            ...condition,
            where,
            defaults: newData as any
        })
    }

    findAndCountAll(condition?: FindAndCountOptions<T>) {
        return this.model.findAndCountAll(condition);
    }


    count(
        where: CountOptions<Attributes<T>>['where'],
        options?: Omit<CountOptions<Attributes<T>>, 'where' | 'group'>
    ) {
        return this.model.count({
            ...options,
            where,
        });
    }

    bulkCreate(records: any[], condition?: BulkCreateOptions<Attributes<T>>) {
        return this.model.bulkCreate(records, condition);
    }
}