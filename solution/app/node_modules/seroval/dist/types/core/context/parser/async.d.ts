import { BaseParserContext } from '../parser';
import type { SerovalNode, SerovalPlainRecordNode } from '../../types';
export default abstract class BaseAsyncParserContext extends BaseParserContext {
    private parseItems;
    private parseArray;
    private parseProperties;
    private parsePlainObject;
    private parseBoxed;
    private parseTypedArray;
    private parseBigIntTypedArray;
    private parseDataView;
    private parseError;
    private parseAggregateError;
    private parseMap;
    private parseSet;
    private parseBlob;
    private parseFile;
    protected parsePlainProperties(entries: [key: string, value: unknown][]): Promise<SerovalPlainRecordNode>;
    private parseHeaders;
    private parseFormData;
    private parseRequest;
    private parseResponse;
    private parseEvent;
    private parseCustomEvent;
    private parsePromise;
    private parsePlugin;
    private parseReadableStream;
    private parseObject;
    parse<T>(current: T): Promise<SerovalNode>;
}
//# sourceMappingURL=async.d.ts.map