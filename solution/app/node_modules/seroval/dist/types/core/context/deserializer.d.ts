import type { SerovalNode } from '../types';
import type { Plugin, PluginAccessOptions, SerovalMode } from '../plugin';
export interface BaseDeserializerOptions extends PluginAccessOptions {
    refs?: Map<number, unknown>;
}
export default abstract class BaseDeserializerContext implements PluginAccessOptions {
    abstract readonly mode: SerovalMode;
    /**
     * Mapping ids to values
     * @private
     */
    refs: Map<number, unknown>;
    plugins?: Plugin<any, any>[] | undefined;
    constructor(options: BaseDeserializerOptions);
    protected abstract assignIndexedValue<T>(id: number, value: T): T;
    private deserializeReference;
    private deserializeArray;
    private deserializeProperties;
    private deserializeObject;
    private deserializeDate;
    private deserializeRegExp;
    private deserializeSet;
    private deserializeMap;
    private deserializeArrayBuffer;
    private deserializeTypedArray;
    private deserializeDataView;
    private deserializeDictionary;
    private deserializeAggregateError;
    private deserializeError;
    private deserializePromise;
    private deserializeURL;
    private deserializeURLSearchParams;
    private deserializeBlob;
    private deserializeFile;
    private deserializeHeaders;
    private deserializeFormData;
    private deserializeBoxed;
    private deserializeRequest;
    private deserializeResponse;
    private deserializeEvent;
    private deserializeCustomEvent;
    private deserializeDOMException;
    private deserializePlugin;
    private deserializePromiseConstructor;
    private deserializePromiseResolve;
    private deserializePromiseReject;
    private deserializeReadableStreamConstructor;
    private deserializeReadableStreamEnqueue;
    private deserializeReadableStreamError;
    private deserializeReadableStreamClose;
    private deserializeIteratorFactoryInstance;
    private deserializeAsyncIteratorFactoryInstance;
    private deserializeReadableStream;
    deserialize(node: SerovalNode): unknown;
}
//# sourceMappingURL=deserializer.d.ts.map