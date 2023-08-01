import type { ApiRequestOptions } from './ApiRequestOptions';
declare type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
declare type Headers = Record<string, string>;
declare type Config = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
};
export declare const OpenAPI: Config;
export {};
