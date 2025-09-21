export interface ConfigPort {
    get<T = any>(key: string, defaultValue?: T): T;
}
