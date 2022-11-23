import {_filterByHeaderFilter, HeaderFilter, TableDataField, TableDataMatrix} from "./paging";

export function filterWithKeyword(data: TableDataMatrix, key: string, field: string[], allFields: TableDataField, headerFilters: HeaderFilter[]): TableDataMatrix {
    let filterData;
    if (key === '') {
        filterData = data.concat();
    } else {
        key = key.toLowerCase();
        field = !!field ? field : allFields;
        field = field instanceof Array ? field : [field];
        console.log('filter param: key = [', key, '] field = [', field.join(','),
            '] allField = [', allFields.join(','), ']');

        const indexes = [];
        for (let i = 0; i < field.length; i++) {
            let idx = allFields.indexOf(field[i]);
            if (idx == -1) {
                console.warn('invalid filter field:', field[i]);
                continue;
            }
            indexes.push(idx);
        }

        filterData = data.filter(item => {
            for (let i = 0, len = indexes.length; i < len; i++) {
                let cell = item[indexes[i]];
                if (cell == null) {
                    continue;
                }
                cell = String(cell);
                //模糊搜索大小写不敏感
                cell = cell.toLowerCase();
                if (cell.indexOf(key) != -1) {
                    return true;
                }
            }
            return false;
        });
    }
    return _filterByHeaderFilter(filterData, allFields, headerFilters);
}
