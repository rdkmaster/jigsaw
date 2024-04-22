/**
 * 代表表格的列头字段，其个数需要与表格数据`TableDataMatrix`的列数相等并一一对应，
 * 并且不能重复，建议以数据库表字段对应起来。
 * 这些数据对表格识别列至关重要，无效的、重复的值将会被忽略
 */
export type TableDataField = string[];
/**
 * 代表表格数据矩阵`TableDataMatrix`里的一行
 */
export type TableMatrixRow = any[];
/**
 * 代表表格的数据区，是一个二维矩阵。矩阵的列数需要和`TableDataField`以及`TableDataHeader`的个数一致且一一对应。
 */
export type TableDataMatrix = TableMatrixRow[];

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

/**
 * 用于描述表格的列头过滤时，选中的列和单元格的值的信息
 */
export type HeaderFilter = { field: string; selectKeys: string[] };

/**
 * 数据过滤信息，是数据过滤参数的结构化信息类
 *
 * $demo = combo-select/searchable
 */
export class DataFilterInfo {
    constructor(
        /**
         * 过滤关键字
         */
        public key: string = "",
        /**
         * 在这些字段中过滤
         */
        public field?: string[] | number[],
        /**
         * 过滤函数源码，主要是传给服务端做自定义过滤用的
         */
        public rawFunction?: string,
        /**
         * `rawFunction`执行时的上下文
         */
        public context?: any,
        /**
         * 表头过滤
         */
        public headerFilters?: HeaderFilter[]
    ) {
    }

    public toJSON() {
        return {
            key: this.key, field: this.field,
            rawFunction: this.rawFunction, context: this.context,
            headerFilters: this.headerFilters?.map(item => ({
                field: item.field, selectKeys: item.selectKeys.valueOf()
            }))
        };
    }
}

export function getStaticDistinctColumnData(field: string, allFields: TableDataField, filterInfo: DataFilterInfo, rawTableData: TableDataMatrix): any[] {
    let filteredData = _filterByKeyword(rawTableData, filterInfo.key, filterInfo.field, allFields);
    const headerFilters = filterInfo.headerFilters.filter(filter => filter.field !== field);
    filteredData = _filterByHeaderFilter(filteredData, allFields, headerFilters);

    const colIndex = allFields.findIndex(item => item === field);
    const columnData = getColumn(filteredData, colIndex) || [];
    return columnData.filter((data, idx) => columnData.indexOf(data) == idx);
}

/**
 * @internal
 */
export function _filterByKeyword(data: TableDataMatrix, key: string, filteringFields: (string | number)[], allFields: TableDataField): TableDataMatrix {
    if (key == null) {
        return data;
    }
    key = String(key).trim().toLowerCase();
    if (key == '') {
        return data;
    }

    if (!filteringFields || filteringFields.length == 0) {
        return data.filter(row => row.filter(item => String(item).toLowerCase().includes(key)).length != 0);
    }

    const numberFields: number[] = filteringFields.map((field: string | number) =>
        typeof field == 'number' ? field : allFields.findIndex(item => item == field));
    return data.filter(row => {
        const matched = row
            .filter((item, index) => numberFields.find(num => num == index) != null)
            .filter(item => String(item).toLowerCase().includes(key));
        return matched.length != 0;
    });
}

/**
 * @internal
 */
export function _filterByHeaderFilter(data: TableDataMatrix, allFields: TableDataField, headerFilters: HeaderFilter[]) {
    if (!headerFilters || !headerFilters.length) {
        return data;
    }
    return data.filter(item => {
        let keep: boolean = true;
        for (let i = 0; i < headerFilters.length; i++) {
            const colIndex = allFields.findIndex(item => item === headerFilters[i].field);
            const selectKeys = headerFilters[i].selectKeys;
            keep = selectKeys.some(x => String(item[colIndex]) == x);
            if (!keep) {
                break;
            }
        }
        return keep;
    });
}
