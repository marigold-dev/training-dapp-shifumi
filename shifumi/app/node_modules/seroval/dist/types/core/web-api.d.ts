import type { SerovalCustomEventNode, SerovalDOMExceptionNode, SerovalEventNode, SerovalNode, SerovalNodeWithID, SerovalReadableStreamNode, SerovalURLNode, SerovalURLSearchParamsNode } from './types';
export declare function createURLNode(id: number, current: URL): SerovalURLNode;
export declare function createURLSearchParamsNode(id: number, current: URLSearchParams): SerovalURLSearchParamsNode;
export declare function createDOMExceptionNode(id: number, current: DOMException): SerovalDOMExceptionNode;
export declare function createEventNode(id: number, type: string, options: SerovalNode): SerovalEventNode;
export declare function createCustomEventNode(id: number, type: string, options: SerovalNode): SerovalCustomEventNode;
export declare function createReadableStreamNode(id: number, factory: SerovalNodeWithID, items: SerovalNode): SerovalReadableStreamNode;
//# sourceMappingURL=web-api.d.ts.map