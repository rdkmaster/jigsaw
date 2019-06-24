
export function getColumn(matrix: any[][], column: number): any[] {
    if (!matrix || matrix.length == 0) {
        return undefined;
    }
    if (column < 0) {
        return undefined;
    }
    if (matrix[0].length <= column) {
        return undefined;
    }
    return matrix.map(row => row[column]);
}

export function getRow(matrix: any[][], row: number): any[] {
    if (!matrix || matrix.length == 0) {
        return undefined;
    }
    if (row < 0) {
        return undefined;
    }
    return matrix[row] ? matrix[row].concat() : undefined;
}

export function distinct(list: any[]): any[] {
    return list ? list.filter((item, index) => index === list.indexOf(item)) : list;
}

export type Grouped = { _$groupItems: any[], [group: string]: any[][] };

export function group(matrix: any[][], groupBy: number): Grouped {
    const grouped: Grouped = {_$groupItems: []};
    const index = distinct(getColumn(matrix, groupBy));
    if (!index) {
        return undefined;
    }
    grouped._$groupItems = index;
    index.forEach(group => {
        grouped[group] = matrix.filter(row => row[groupBy] == group);
    });
    return grouped;
}

export function flat(group: Grouped): string[][] {
    const result: string[][] = [];
    group._$groupItems.forEach(item => {
        result.push(...group[item]);
    });
    return result;
}

export type ReduceFunction = (previousValue?: number, currentValue?: number, currentIndex?: number, array?: number[]) => number;
export type AggregateAlgorithm = 'sum' | 'average' | 'max' | 'min' | 'head' | 'tail' | ReduceFunction;

function aggregateAlgorithms2Function(algorithm: AggregateAlgorithm): [ReduceFunction, number] {
    let func: ReduceFunction, initialValue = 0;
    if (algorithm == 'sum') {
        func = (previous, current) => previous + parseFloat(String(current));
    } else if (algorithm == 'average') {
        func = (previous, current, index, array) => parseFloat((previous + parseFloat(String(current)) / array.length).toFixed(2));
    } else if (algorithm == 'max') {
        func = (previous, current) => Math.max(previous, parseFloat(String(current)));
    } else if (algorithm == 'min') {
        func = (previous, current) => Math.min(previous, parseFloat(String(current)));
        initialValue = Infinity;
    } else if (algorithm == 'head') {
        func = (previous, current, index, array) => array[0];
    } else if (algorithm == 'tail') {
        func = (previous, current, index, array) => array[array.length - 1];
    } else if (typeof algorithm === 'function') {
        func = algorithm;
    } else {
        throw new Error('unsupported aggregate algorithm: ' + algorithm);
    }
    return [func, initialValue];
}

export function aggregate(matrix: string[][], by: { index: number, algorithm: AggregateAlgorithm }[]): string[] {
    if (!matrix || matrix.length == 0 || !by) {
        return [];
    }
    const result: string[] = matrix[0].concat();
    by.forEach(item => {
        const [func, initial] = aggregateAlgorithms2Function(item.algorithm);
        result[item.index] = getColumn(matrix, item.index).reduce(func, initial);
    });
    return result;
}
