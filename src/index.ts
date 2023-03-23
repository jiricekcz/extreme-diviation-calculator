interface Value {
    value: number;
    minDiff: number;
    maxDiff: number;
}


function calculateValue<T extends Array<Value>>(func: (values: number[]) => number, values: T, maxOps: number = 1000000): Value {
    const loopSize = Math.pow(maxOps, 1 / values.length);
    
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    const [value, ...valuesNext] = [...values];
    if (valuesNext.length === 0) return value;
    for (let i = 0; i < loopSize; i++) {
        
        const v = calculateValue((values) => {
            return func([valueAt(value, i, loopSize), ...values]);
        }, valuesNext, maxOps - loopSize);

        if (v.value < min) min = v.value;
        if (v.value > max) max = v.value;
    }

    const v = func(values.map(value => value.value));
    return {
        value: v,
        minDiff: min - v,
        maxDiff: max - v
    }
}

function valueAt(value: Value, index: number, loopSize: number): number {
    return value.value - value.minDiff + (value.minDiff + value.maxDiff) * index / Math.floor(loopSize);
}


console.log(calculateValue(
    ([a,b]) => a + b,
    [   
        { value: 46.4, minDiff: -0.2, maxDiff: 0.3 },
        { value: 72.1, minDiff: -0.3, maxDiff: 0.3 }
    ]
))