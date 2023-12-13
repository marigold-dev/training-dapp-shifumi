import type { Plugin, PluginAccessOptions, SerovalMode } from '../plugin';
import { SpecialReference } from '../special-reference';
import type { SerovalAsyncIteratorFactoryNode, SerovalIndexedValueNode, SerovalIteratorFactoryNode, SerovalMapNode, SerovalNode, SerovalNullConstructorNode, SerovalObjectNode, SerovalObjectRecordNode, SerovalReferenceNode, SerovalSpecialReferenceNode, SerovalWKSymbolNode } from '../types';
export interface BaseParserContextOptions extends PluginAccessOptions {
    disabledFeatures?: number;
    refs?: Map<unknown, number>;
}
export declare abstract class BaseParserContext implements PluginAccessOptions {
    abstract readonly mode: SerovalMode;
    features: number;
    marked: Set<number>;
    refs: Map<unknown, number>;
    plugins?: Plugin<any, any>[] | undefined;
    constructor(options: BaseParserContextOptions);
    protected markRef(id: number): void;
    protected isMarked(id: number): boolean;
    protected getReference<T>(current: T): number | SerovalIndexedValueNode | SerovalReferenceNode;
    protected getStrictReference<T>(current: T): SerovalIndexedValueNode | SerovalReferenceNode;
    protected parseFunction(current: Function): SerovalNode;
    protected parseWKSymbol(current: symbol): SerovalIndexedValueNode | SerovalWKSymbolNode | SerovalReferenceNode;
    protected parseSpecialReference(ref: SpecialReference): SerovalIndexedValueNode | SerovalSpecialReferenceNode;
    protected parseIteratorFactory(): SerovalIndexedValueNode | SerovalIteratorFactoryNode;
    protected parseAsyncIteratorFactory(streaming: 0 | 1): SerovalIndexedValueNode | SerovalAsyncIteratorFactoryNode;
    protected createObjectNode(id: number, current: Record<string, unknown>, empty: boolean, record: SerovalObjectRecordNode): SerovalObjectNode | SerovalNullConstructorNode;
    protected createMapNode(id: number, k: SerovalNode[], v: SerovalNode[], s: number): SerovalMapNode;
}
//# sourceMappingURL=parser.d.ts.map