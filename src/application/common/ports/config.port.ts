export abstract class ConfigPort {
    abstract get<T = any>(key: string, defaultValue?: T): T;
}
