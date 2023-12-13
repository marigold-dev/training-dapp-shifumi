import type { ErrorValue } from '../../types';
import { ErrorConstructorTag } from '../constants';
export declare function getErrorConstructor(error: ErrorValue): ErrorConstructorTag;
export declare function getErrorOptions(error: Error, features: number): Record<string, unknown> | undefined;
//# sourceMappingURL=error.d.ts.map