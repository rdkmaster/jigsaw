
export function getColumn(matrix: any[][], column: number): any[] {
    if (!matrix || matrix.length == 0) {
        return undefined;
    }
    if (matrix[0].length <= column) {
        return undefined;
    }
    return matrix.map(row => row[column]);
}

export function getRow(matrix: any[][], row: number): any[] {
    return matrix[row];
}

export function distinct(list: any[]): any[] {
    return list.filter((item, index) => index === list.indexOf(item));
}

export type Grouped = { _$groupItems: any[], [group: string]: any[][] };

export function group(matrix: any[][], groupBy: number): Grouped {
    const grouped: Grouped = {_$groupItems: []};
    const index = distinct(getColumn(matrix, groupBy));
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

type ReduceFunction = (previousValue?: number, currentValue?: number, currentIndex?: number, array?: number[]) => number;
export type AggregateAlgorithm = 'sum' | 'average' | 'max' | 'min' | 'head' | 'tail' | ReduceFunction;

function aggregateAlgorithms2Function(algorithm: AggregateAlgorithm): ReduceFunction {
    if (algorithm == 'sum') {
        return (previous: number, current: number) => previous + parseFloat(String(current));
    } else if (algorithm == 'average') {
        return (previous: number, current: number, index: number, array: number[]) => previous + parseFloat(String(current)) / array.length;
    } else if (algorithm == 'max') {
        return (previous: number, current: number) => Math.max(previous, current);
    } else if (algorithm == 'min') {
        return (previous: number, current: number) => Math.min(previous, current);
    } else if (algorithm == 'head') {
        return (previous: number, current: number, index: number, array: number[]) => array[0];
    } else if (algorithm == 'tail') {
        return (previous: number, current: number, index: number, array: number[]) => array[array.length - 1];
    } else if (typeof algorithm === 'function') {
        return algorithm;
    } else {
        throw new Error('unsupported aggregate algorithm:' + algorithm);
    }
}

export function aggregate(matrix: string[][], by: { index: number, algorithm: AggregateAlgorithm }[]): string[] {
    if (!matrix || matrix.length == 0) {
        return [];
    }
    const result: string[] = matrix[0];
    by.forEach(item => {
        result[item.index] = getColumn(matrix, item.index).reduce(aggregateAlgorithms2Function(item.algorithm), 0);
    });
    return result;
}
