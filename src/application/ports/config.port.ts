export interface IConfigPort {
  get<T>(key: string, defaultValue?: T): T | undefined;
}
