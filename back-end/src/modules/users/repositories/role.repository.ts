import { RepositoryBase } from "src/libs/db/repository.base";
import { RoleEntity } from "../entities/role.entity";
import { SearchRoleQueryInput } from "../dto/query/search-role.query.input";
import { literal, Op } from "sequelize";
import { UserEntity } from "../entities/user.entity";
import { GetRoleAndCountAllQueryResponse, RoleEntityWithUserCount } from "../dto/query/get-roleAndCountAll.query.response";
import { PermissionEntity } from "../entities/permission.entity";

export class RoleRepository extends RepositoryBase<RoleEntity> {
    protected getModel() {
        return RoleEntity;
    }

    async getRoleAndCountAll(searchParams: SearchRoleQueryInput) {
        const { q, limit, page } = searchParams;
        console.log(limit,1111111111111111);
        
        const offset = limit === -1 ? undefined : (page - 1) * limit;
        
        const [count, rows] = await Promise.all([
            this.count({
            }, {
                col: 'id',
                distinct: true,
            }),
            this.findAll({
                offset,
                limit: limit === -1 ? undefined : limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    {
                        model: UserEntity,
                        required: false,
                        through: {
                            attributes: []
                        },
                        attributes: [],
                        as: "users"
                    }
                ],
                attributes: {
                    include: [
                        [literal('COALESCE(CAST(COUNT(DISTINCT "users"."id") AS INTEGER), 0)'), 'userCount'],
                    ],
                },
                group: ['"RoleEntity"."id"'],
                subQuery: false,
                where: !!q ? {
                    name: {
                        [Op.iLike]: `%${q}%`
                    }
                } : undefined,
            })
        ]);

        if (!rows) {
            throw new Error("Invalid Server Error");
        }
        return new GetRoleAndCountAllQueryResponse({
            count,
            rows: rows as RoleEntityWithUserCount[]
        })
    }

    async getRoleWithPermissions(roleId: string) {
        return await this.findByPk(roleId, {
            rejectOnEmpty: false,
            include: [
                {
                    model: PermissionEntity,
                    required: false,
                }
            ]
        })
    }
}