import { ConfigPort } from '@/application/common/ports/config.port';
export declare class EnvConfigService implements ConfigPort {
    private readonly env;
    constructor();
    get<T = any>(key: string, defaultValue?: T): T;
}
//# sourceMappingURL=env.config.d.ts.map