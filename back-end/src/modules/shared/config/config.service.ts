import { Injectable } from '@nestjs/common';
import envConfig from 'src/configs/env.config';

@Injectable()
export class ConfigService {
    get sequelizeOrmConfig() {
        return envConfig.db;
    }

    get systemConfig() {
        return envConfig.system;
    }

    get jwtConfig() {
        return envConfig.jwt;
    }
}