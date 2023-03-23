interface Value {
    value: number;
    minDiff: number;
    maxDiff: number;
}
declare function calculateValue<T extends Array<Value>>(func: (values: number[]) => number, values: T, maxOps?: number): Value;
declare function valueAt(value: Value, index: number, loopSize: number): number;
//# sourceMappingURL=index.d.ts.map