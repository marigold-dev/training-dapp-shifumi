import type BaseStreamParserContext from '../context/parser/stream';
export interface Sequence {
    v: unknown[];
    t: number;
    d: number;
}
export declare function iteratorToSequence<T>(source: Iterable<T>): Sequence;
export declare function sequenceToIterator<T>(sequence: Sequence): () => IterableIterator<T>;
export declare function asyncIteratorToSequence<T>(source: AsyncIterable<T>): Promise<Sequence>;
export declare function sequenceToAsyncIterator<T>(sequence: Sequence): () => AsyncIterableIterator<T>;
export declare function asyncIteratorToReadableStream<T>(source: AsyncIterable<T>, parser: BaseStreamParserContext): ReadableStream<unknown>;
type RSNext<T> = [0, T];
type RSThrow = [1, any];
type RSReturn<T> = [2, T];
export type SerializedAsyncIteratorResult<T> = RSNext<T> | RSThrow | RSReturn<T>;
export declare function readableStreamToAsyncIterator<T>(source: ReadableStream<SerializedAsyncIteratorResult<T>>): () => AsyncIterableIterator<T>;
export declare function readableStreamToSequence<T>(stream: ReadableStream<T>): Promise<Sequence>;
export declare function sequenceToReadableStream<T>(sequence: Sequence): ReadableStream<T>;
export {};
//# sourceMappingURL=iterator-to-sequence.d.ts.map