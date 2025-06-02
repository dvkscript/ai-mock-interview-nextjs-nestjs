import { RoleEntity } from "../../entities/role.entity";

export interface RoleEntityWithUserCount extends RoleEntity {
  userCount: number;
}

class Row {
    id: string;
    name: string;
    userCount: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Row) {
        this.id = data.id;
        this.name = data.name;
        this.userCount = data.userCount;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

export class GetRoleAndCountAllQueryResponse {
    count: number;
    rows: Row[];

    constructor(data: { count: number, rows: RoleEntityWithUserCount[] }) { 
        this.count = data.count;
        this.rows = data.rows.map(row => {
            return new Row(row?.get({ plain: true }) as RoleEntityWithUserCount)
        });
    }
}