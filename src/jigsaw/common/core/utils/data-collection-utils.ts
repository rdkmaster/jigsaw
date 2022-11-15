
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
    by = by.filter(b => b.index != -1);
    if (by.length == 0) {
        return [];
    }
    const result: string[] = matrix[0].concat();
    by.forEach(item => {
        const [func, initial] = aggregateAlgorithms2Function(item.algorithm);
        result[item.index] = getColumn(matrix, item.index).reduce(func, initial);
    });
    return result;
}

/**
 * we have to implement the `Array<T>` interface due to this breaking change:
 * <https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work>
 * <https://github.com/Microsoft/TypeScript/issues/14869>
 */
export class JigsawArray<T> implements Array<T> {
    private _agent: T[] = [];

    /**
     * 将位置`index`处的数据更新为`value`。`JigsawArray`不支持采用方括号表达式设置一个值，因此必须通过这个方法来替代。
     *
     * ```
     * const a = new ArrayCollection<any>();
     * a[0] = 123;    // compile error!
     * a.set(0, 123); // everything is fine.
     * ```
     *
     * @param index
     * @param value
     */
    public set(index: number, value: T): void {
        this._length = this._length > index ? this._length : index + 1;
        const thiz: any = this;
        thiz[index] = value;
    }

    /**
     * 获取`index`位置处的数据，和数组的方括号表达式的作用一样。
     *
     * ```
     * const a = new ArrayCollection<any>([{}]);
     * a.get(0) === a[0] // true
     * ```
     *
     * @param index
     */
    public get(index: number): T {
        return this[index];
    }

    private _length: number = 0;

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length>
     *
     */
    public get length(): number {
        return this._length;
    }

    public set length(value: number) {
        this._length = value;
    }

    readonly [n: number]: T;

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes>
     *
     * @param searchElement
     * @param fromIndex
     */
    public includes(searchElement: T, fromIndex?: number): boolean {
        return this._agent.includes.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString>
     *
     */
    public toString(): string {
        return this._agent.toString.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString>
     *
     */
    public toLocaleString(): string {
        return this._agent.toLocaleString.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push>
     * @param items
     */
    public push(...items: T[]): number {
        return this._agent.push.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop>
     *
     */
    public pop(): T {
        return this._agent.pop.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat>
     * @param items
     *
     */
    public concat(...items: any[]): any {
        return this._agent.concat.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join>
     * @param separator
     */
    public join(separator?: string): string {
        return this._agent.join.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse>
     *
     */
    public reverse(): T[] {
        return this._agent.reverse.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift>
     *
     */
    public shift(): T {
        return this._agent.shift.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice>
     * @param start
     * @param end
     */
    public slice(start?: number, end?: number): T[] {
        return this._agent.slice.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort>
     * @param compareFn
     */
    public sort(compareFn?: (a: T, b: T) => number): any {
        return this._agent.sort.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice>
     * @param start
     * @param deleteCount
     * @param rest
     *
     */
    public splice(start: any, deleteCount?: any, ...rest: any[]): T[] {
        return this._agent.splice.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift>
     * @param items
     *
     */
    public unshift(...items: T[]): number {
        return this._agent.unshift.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf>
     * @param searchElement
     * @param fromIndex
     *
     */
    public indexOf(searchElement: T, fromIndex?: number): number {
        return this._agent.indexOf.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf>
     * @param searchElement
     * @param fromIndex
     *
     */
    public lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this._agent.lastIndexOf.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every>
     * @param callbackfn
     * @param thisArg
     *
     */
    public every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._agent.every.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some>
     * @param callbackfn
     * @param thisArg
     *
     */
    public some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._agent.some.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach>
     * @param callbackfn
     * @param thisArg
     */
    public forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        return this._agent.forEach.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map>
     * @param callbackfn
     * @param thisArg
     *
     */
    public map(callbackfn: any, thisArg?: any): [any, any, any, any, any] {
        return this._agent.map.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter>
     * @param callback
     * @param thisArg
     *
     */
    public filter(callback: (value: T, index: number, array: T[]) => any, thisArg?: any): T[] {
        return this._agent.filter.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce>
     * @param callbackfn
     * @param initialValue
     *
     */
    public reduce(callbackfn: any, initialValue?: any): T {
        return this._agent.reduce.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight>
     * @param callbackfn
     * @param initialValue
     *
     */
    public reduceRight(callbackfn: any, initialValue?: any): T {
        return this._agent.reduceRight.apply(this, arguments);
    }

    /**
     * @internal
     */
    [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
        const iterator = this._agent[Symbol.unscopables];
        return iterator.apply(this);
    }

    /**
     * @internal
     */
    [Symbol.iterator](): IterableIterator<T> {
        const iterator = this._agent[Symbol.iterator];
        return iterator.apply(this);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries>
     *
     */
    public entries(): IterableIterator<[number, T]> {
        return this._agent.entries.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys>
     *
     */
    public keys(): IterableIterator<number> {
        return this._agent.keys.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values>
     *
     */
    public values(): IterableIterator<T> {
        return this._agent.values.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find>
     * @param predicate
     * @param thisArg
     *
     */
    public find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T {
        return this._agent.find.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex>
     * @param predicate
     * @param thisArg
     *
     */
    public findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number {
        return this._agent.findIndex.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill>
     * @param value
     * @param start
     * @param end
     *
     */
    public fill(value: T, start?: number, end?: number): any {
        return this._agent.fill.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin>
     * @param target
     * @param start
     * @param end
     *
     */
    public copyWithin(target: number, start: number, end?: number): any {
        return this._agent.copyWithin.apply(this, arguments);
    }

    public toJSON(): T[] {
        return [...this];
    }

    public valueOf(): T[] {
        return this.toJSON();
    }
}
