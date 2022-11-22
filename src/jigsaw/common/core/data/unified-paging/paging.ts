import {DataFilterInfo, HeaderFilter} from "../component-data";
import {getColumn} from "../../utils/data-collection-utils";
import {CommonUtils} from "../../utils/common-utils";
import {TableDataField, TableDataMatrix} from "../table-data";

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
            .filter((item, index) => CommonUtils.isDefined(numberFields.find(num => num == index)))
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
            keep = !!selectKeys.find(key => String(item[colIndex]) == key);
            if (!keep) {
                break;
            }
        }
        return keep;
    });
}
