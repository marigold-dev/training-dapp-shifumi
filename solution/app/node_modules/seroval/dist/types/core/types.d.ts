import type { SerovalNodeType, SerovalObjectFlags, SerovalConstant, Symbols, ErrorConstructorTag } from './constants';
import type { SpecialReference } from './special-reference';
export interface SerovalBaseNode {
    t: SerovalNodeType;
    i: number | undefined;
    s: unknown;
    l: number | undefined;
    c: string | undefined;
    m: string | undefined;
    p: SerovalObjectRecordNode | undefined;
    e: SerovalMapRecordNode | SerovalPlainRecordNode | undefined;
    a: (SerovalNode | undefined)[] | undefined;
    f: SerovalNode | undefined;
    b: number | undefined;
    o: SerovalObjectFlags | undefined;
}
export type SerovalObjectRecordKey = string | SerovalNode;
export interface SerovalPlainRecordNode {
    k: string[];
    v: SerovalNode[];
    s: number;
}
export interface SerovalObjectRecordNode {
    k: SerovalObjectRecordKey[];
    v: SerovalNode[];
    s: number;
}
export interface SerovalMapRecordNode {
    k: SerovalNode[];
    v: SerovalNode[];
    s: number;
}
export interface SerovalNumberNode extends SerovalBaseNode {
    t: SerovalNodeType.Number;
    s: number;
}
export interface SerovalStringNode extends SerovalBaseNode {
    t: SerovalNodeType.String;
    s: string;
}
export interface SerovalConstantNode extends SerovalBaseNode {
    t: SerovalNodeType.Constant;
    s: SerovalConstant;
}
export type SerovalPrimitiveNode = SerovalNumberNode | SerovalStringNode | SerovalConstantNode;
export interface SerovalIndexedValueNode extends SerovalBaseNode {
    t: SerovalNodeType.IndexedValue;
    i: number;
}
export interface SerovalBigIntNode extends SerovalBaseNode {
    t: SerovalNodeType.BigInt;
    s: string;
}
export interface SerovalDateNode extends SerovalBaseNode {
    t: SerovalNodeType.Date;
    i: number;
    s: string;
}
export interface SerovalRegExpNode extends SerovalBaseNode {
    t: SerovalNodeType.RegExp;
    i: number;
    c: string;
    m: string;
}
export interface SerovalArrayBufferNode extends SerovalBaseNode {
    t: SerovalNodeType.ArrayBuffer;
    i: number;
    s: number[];
}
export interface SerovalTypedArrayNode extends SerovalBaseNode {
    t: SerovalNodeType.TypedArray;
    i: number;
    l: number;
    c: string;
    f: SerovalNode;
    b: number;
}
export interface SerovalBigIntTypedArrayNode extends SerovalBaseNode {
    t: SerovalNodeType.BigIntTypedArray;
    i: number;
    l: number;
    c: string;
    f: SerovalNode;
    b: number;
}
export type SerovalSemiPrimitiveNode = SerovalBigIntNode | SerovalDateNode | SerovalRegExpNode | SerovalTypedArrayNode | SerovalBigIntTypedArrayNode;
export interface SerovalSetNode extends SerovalBaseNode {
    t: SerovalNodeType.Set;
    i: number;
    l: number;
    a: SerovalNode[];
}
export interface SerovalMapNode extends SerovalBaseNode {
    t: SerovalNodeType.Map;
    i: number;
    e: SerovalMapRecordNode;
    f: SerovalNodeWithID;
}
export interface SerovalArrayNode extends SerovalBaseNode {
    t: SerovalNodeType.Array;
    l: number;
    a: (SerovalNode | undefined)[];
    i: number;
    o: SerovalObjectFlags;
}
export interface SerovalObjectNode extends SerovalBaseNode {
    t: SerovalNodeType.Object;
    p: SerovalObjectRecordNode;
    i: number;
    o: SerovalObjectFlags;
}
export interface SerovalNullConstructorNode extends SerovalBaseNode {
    t: SerovalNodeType.NullConstructor;
    p: SerovalObjectRecordNode;
    i: number;
    o: SerovalObjectFlags;
}
export interface SerovalPromiseNode extends SerovalBaseNode {
    t: SerovalNodeType.Promise;
    s: 0 | 1;
    f: SerovalNode;
    i: number;
}
export interface SerovalErrorNode extends SerovalBaseNode {
    t: SerovalNodeType.Error;
    s: ErrorConstructorTag;
    m: string;
    p: SerovalObjectRecordNode | undefined;
    i: number;
}
export interface SerovalAggregateErrorNode extends SerovalBaseNode {
    t: SerovalNodeType.AggregateError;
    i: number;
    m: string;
    p: SerovalObjectRecordNode | undefined;
}
export interface SerovalWKSymbolNode extends SerovalBaseNode {
    t: SerovalNodeType.WKSymbol;
    i: number;
    s: Symbols;
}
export interface SerovalURLNode extends SerovalBaseNode {
    t: SerovalNodeType.URL;
    i: number;
    s: string;
}
export interface SerovalURLSearchParamsNode extends SerovalBaseNode {
    t: SerovalNodeType.URLSearchParams;
    i: number;
    s: string;
}
export interface SerovalReferenceNode extends SerovalBaseNode {
    t: SerovalNodeType.Reference;
    i: number;
    s: string;
}
export interface SerovalDataViewNode extends SerovalBaseNode {
    t: SerovalNodeType.DataView;
    i: number;
    l: number;
    f: SerovalNode;
    b: number;
}
export interface SerovalBlobNode extends SerovalBaseNode {
    t: SerovalNodeType.Blob;
    i: number;
    c: string;
    f: SerovalNode;
}
export interface SerovalFileNode extends SerovalBaseNode {
    t: SerovalNodeType.File;
    i: number;
    c: string;
    m: string;
    f: SerovalNode;
    b: number;
}
export interface SerovalHeadersNode extends SerovalBaseNode {
    t: SerovalNodeType.Headers;
    i: number;
    e: SerovalPlainRecordNode;
}
export interface SerovalFormDataNode extends SerovalBaseNode {
    t: SerovalNodeType.FormData;
    i: number;
    e: SerovalPlainRecordNode;
}
export interface SerovalBoxedNode extends SerovalBaseNode {
    t: SerovalNodeType.Boxed;
    i: number;
    f: SerovalNode;
}
export interface SerovalPromiseConstructorNode extends SerovalBaseNode {
    t: SerovalNodeType.PromiseConstructor;
    i: number;
    f: SerovalNodeWithID;
}
export interface SerovalPromiseResolveNode extends SerovalBaseNode {
    t: SerovalNodeType.PromiseResolve;
    i: number;
    a: [
        resolver: SerovalNodeWithID,
        resolved: SerovalNode
    ];
}
export interface SerovalPromiseRejectNode extends SerovalBaseNode {
    t: SerovalNodeType.PromiseReject;
    i: number;
    a: [
        resolver: SerovalNodeWithID,
        resolved: SerovalNode
    ];
}
export interface SerovalReadableStreamConstructorNode extends SerovalBaseNode {
    t: SerovalNodeType.ReadableStreamConstructor;
    i: number;
    f: SerovalNodeWithID;
}
export interface SerovalReadableStreamEnqueueNode extends SerovalBaseNode {
    t: SerovalNodeType.ReadableStreamEnqueue;
    i: number;
    a: [
        resolver: SerovalNodeWithID,
        resolved: SerovalNode
    ];
}
export interface SerovalReadableStreamErrorNode extends SerovalBaseNode {
    t: SerovalNodeType.ReadableStreamError;
    i: number;
    a: [
        resolver: SerovalNodeWithID,
        resolved: SerovalNode
    ];
}
export interface SerovalReadableStreamCloseNode extends SerovalBaseNode {
    t: SerovalNodeType.ReadableStreamClose;
    i: number;
    f: SerovalNodeWithID;
}
export interface SerovalRequestNode extends SerovalBaseNode {
    t: SerovalNodeType.Request;
    i: number;
    s: string;
    f: SerovalNode;
}
export interface SerovalResponseNode extends SerovalBaseNode {
    t: SerovalNodeType.Response;
    i: number;
    a: [body: SerovalNode, options: SerovalNode];
}
export interface SerovalEventNode extends SerovalBaseNode {
    t: SerovalNodeType.Event;
    i: number;
    s: string;
    f: SerovalNode;
}
export interface SerovalCustomEventNode extends SerovalBaseNode {
    t: SerovalNodeType.CustomEvent;
    i: number;
    s: string;
    f: SerovalNode;
}
export interface SerovalDOMExceptionNode extends SerovalBaseNode {
    t: SerovalNodeType.DOMException;
    i: number;
    s: string;
    c: string;
}
export interface SerovalPluginNode extends SerovalBaseNode {
    t: SerovalNodeType.Plugin;
    i: number;
    s: unknown;
    c: string;
}
export interface SerovalSpecialReferenceNode extends SerovalBaseNode {
    t: SerovalNodeType.SpecialReference;
    i: number;
    s: SpecialReference;
}
export interface SerovalIteratorFactoryNode extends SerovalBaseNode {
    t: SerovalNodeType.IteratorFactory;
    i: number;
    f: SerovalNode;
}
export interface SerovalIteratorFactoryInstanceNode extends SerovalBaseNode {
    t: SerovalNodeType.IteratorFactoryInstance;
    a: [
        instance: SerovalNodeWithID,
        sequence: SerovalNode
    ];
}
export interface SerovalAsyncIteratorFactoryNode extends SerovalBaseNode {
    t: SerovalNodeType.AsyncIteratorFactory;
    i: number;
    s: 0 | 1;
    f: SerovalNode;
}
export interface SerovalAsyncIteratorFactoryInstanceNode extends SerovalBaseNode {
    t: SerovalNodeType.AsyncIteratorFactoryInstance;
    a: [
        instance: SerovalNodeWithID,
        sequence: SerovalNode
    ];
}
export interface SerovalReadableStreamNode extends SerovalBaseNode {
    t: SerovalNodeType.ReadableStream;
    i: number;
    a: [
        instance: SerovalNodeWithID,
        sequence: SerovalNode
    ];
}
export type SerovalSyncNode = SerovalPrimitiveNode | SerovalIndexedValueNode | SerovalSemiPrimitiveNode | SerovalSetNode | SerovalMapNode | SerovalArrayNode | SerovalObjectNode | SerovalNullConstructorNode | SerovalPromiseNode | SerovalErrorNode | SerovalAggregateErrorNode | SerovalWKSymbolNode | SerovalURLNode | SerovalURLSearchParamsNode | SerovalReferenceNode | SerovalArrayBufferNode | SerovalDataViewNode | SerovalBlobNode | SerovalFileNode | SerovalHeadersNode | SerovalFormDataNode | SerovalBoxedNode | SerovalEventNode | SerovalCustomEventNode | SerovalDOMExceptionNode | SerovalPluginNode | SerovalSpecialReferenceNode | SerovalIteratorFactoryNode | SerovalIteratorFactoryInstanceNode | SerovalAsyncIteratorFactoryNode | SerovalAsyncIteratorFactoryInstanceNode;
export type SerovalAsyncNode = SerovalPromiseNode | SerovalBlobNode | SerovalFileNode | SerovalPromiseConstructorNode | SerovalPromiseResolveNode | SerovalPromiseRejectNode | SerovalReadableStreamConstructorNode | SerovalReadableStreamEnqueueNode | SerovalReadableStreamCloseNode | SerovalReadableStreamErrorNode | SerovalRequestNode | SerovalResponseNode | SerovalReadableStreamNode;
export type SerovalNode = SerovalSyncNode | SerovalAsyncNode;
export type SerovalNodeWithID = Extract<SerovalNode, {
    i: number;
}>;
//# sourceMappingURL=types.d.ts.map