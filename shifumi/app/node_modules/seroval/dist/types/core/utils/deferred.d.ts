export interface Deferred {
    promise: Promise<unknown>;
    resolve(value: unknown): void;
    reject(value: unknown): void;
}
export declare function createDeferred(): Deferred;
export interface DeferredStream {
    stream: ReadableStream;
    close(): void;
    enqueue(chunk?: unknown): void;
    error(e?: any): void;
}
export declare function createDeferredStream(): DeferredStream;
//# sourceMappingURL=deferred.d.ts.map