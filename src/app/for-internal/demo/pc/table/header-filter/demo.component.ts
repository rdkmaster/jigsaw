import { Component } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { LocalPageableTableData, ColumnDefine, PageableTableData, DirectPageableTableData, TableDataMatrix, CommonUtils, DataFilterInfo, TableDataField, HeaderFilter, PagingInfo, TableData } from "jigsaw/public_api";
import { AjaxInterceptor, MockData } from "../../../../../libs/app.interceptor";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
})
export class TableSetHeaderFilterDemoComponent {
    public localPageableSearchValue: string;
    public localPageable: LocalPageableTableData;
    public localPageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
        {
            target: "salary",
            header: {
                filterable: true,
                sortable: true
            },
        },
    ];

    public onLocalPageableSearch(key: string) {
        this.localPageableSearchValue = key;
        this.localPageable.filter(key, null)
    }

    public onLocalPageableHeaderFilterChange($event) {
        console.log($event);
    }

    public changeLocalPageable() {
        if (this.localPageable.pagingInfo.totalRecord < 10) {
            this.localPageable.fromAjax("mock-data/hr-list");
        } else {
            this.localPageable.fromAjax("mock-data/hr-list-short");
        }
        this.localPageable.onRefresh(() => {
            this.localPageable.filter(this.localPageableSearchValue || '', null);
        })
    }

    public pageablePageableSearchValue: string;
    public pageable: PageableTableData;
    public pageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
    ];

    public onPageableSearch(key: string) {
        this.pageablePageableSearchValue = key;
        this.pageable.filter(key, null);
    }

    public onPageableHeaderFilterChange($event) {
        console.log($event);
    }

    public directPageableSearchValue: string;
    public directPageable: DirectPageableTableData;
    public directPageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
    ];

    public onDirectPageableSearch(key: string) {
        this.directPageableSearchValue = key;
        this.directPageable.filter(key, null);
    }

    public onDirectPageableHeaderFilterChange($event) {
        console.log($event);
    }

    constructor(http: HttpClient) {
        this.localPageable = new LocalPageableTableData();
        this.localPageable.http = http;
        this.localPageable.pagingInfo.pageSize = 10;
        this.localPageable.fromAjax("mock-data/hr-list");

        this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.pageSize = 5;

        this.directPageable = new DirectPageableTableData(http, {
            url: '/direct/pageable/table-data/simulation', method: 'post'
        });
        this.directPageable.onAjaxComplete(() => {
            console.log(this.directPageable);
        });
        this.directPageable.pagingInfo.pageSize = 5;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}

AjaxInterceptor.registerProcessor('/direct/pageable/table-data/simulation',
    (req: HttpRequest<any>): any => {
        // 这里根据req里的参数，做出过滤
        if (req.params.get('requestFor') == 'distinct-column-data') {
            console.log('request for distinct column data, field:', req.params.get('field'),
                'filterInfo:', req.params.get('filterInfo'));

            const field = req.params.get('field');
            const filterInfo: DataFilterInfo = JSON.parse(req.params.get('filterInfo'));
            const dataTable = MockData.get('mock-data/hr-list');
            console.log(field, filterInfo);

            let filteredData = _filterByFields(dataTable.data, filterInfo.field, dataTable.field);
            console.log(filteredData);
            filteredData = _filterByKey(filteredData, filterInfo.key);
            const headerFilters = filterInfo.headerFilters.filter(filter => filter.field !== field);
            console.log(headerFilters);
            filteredData = _filterByHeaderFilter(filteredData, dataTable.field, headerFilters);

            const colIndex = dataTable.field.findIndex(item => item === field);
            const columnData = getColumn(filteredData, colIndex) || [];
            return columnData.filter((data, idx) => columnData.indexOf(data) == idx);

        }
        let paging = req.body['paging'] ? req.body['paging'] : null;
        paging = typeof paging === 'string' ? JSON.parse(paging) : paging;
        let filter = req.body['filter'] ? req.body['filter'] : null;
        filter = typeof filter === 'string' ? JSON.parse(filter) : filter;
        let sort = req.body['sort'] ? req.body['sort'] : null;
        sort = typeof sort === 'string' ? JSON.parse(sort) : sort;
        const result: any = new TableData([], [], []);
        const dataTable = MockData.get('mock-data/hr-list')
        if (!dataTable) {
            return null;
        }

        let data;
        if (CommonUtils.isDefined(filter)) {
            data = _filterWithKeyword(dataTable.data, filter.key, filter.field, dataTable.field, filter.headerFilters);
        } else {
            data = dataTable.data.concat();
        }

        const pagingInfo: PagingInfo = new PagingInfo();
        pagingInfo.pageSize = _fixPageSize(paging.pageSize);
        pagingInfo.totalRecord = data.length;
        pagingInfo.currentPage = _fixCurrentPage(paging.currentPage, pagingInfo);

        if (CommonUtils.isDefined(paging)) {
            data = _paging(data, pagingInfo);
        } else {
            console.error('need a "paging" property!');
            data = [];
        }

        result.data = data;
        result.paging = pagingInfo.valueOf();
        result.field = dataTable.field;
        result.header = dataTable.header;
        return result;
    });

function _filterByFields(data: TableDataMatrix, filteringFields: (string | number)[], allFields: TableDataField): TableDataMatrix {
    if (!filteringFields || !filteringFields.length) {
        return data;
    }
    const numberFields: number[] = filteringFields.map((field: string | number) =>
        typeof field == 'number' ? field : allFields.findIndex(item => item == field));
    return data.filter(
        row => row.filter(
            (item, index) => CommonUtils.isDefined(numberFields.find(num => num == index))
        )
    );
}

function _filterByKey(data: TableDataMatrix, key: string): TableDataMatrix {
    key = key.toLowerCase();
    return data.filter(row => row.filter(item => String(item).toLowerCase().includes(key)).length != 0);
}

function _filterByHeaderFilter(data: TableDataMatrix, allFields: TableDataField, headerFilters: HeaderFilter[]) {
    if (!headerFilters || headerFilters.length === 0) {
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

function getColumn(matrix: any[][], column: number): any[] {
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

function _filterWithKeyword(data: TableDataMatrix, key: string, field: string[], allFields: TableDataField, headerFilters: HeaderFilter[]): TableDataMatrix {
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

function _fixPageSize(pageSize) {
    return typeof pageSize !== 'number' || pageSize < 1 ? 100 : pageSize;
}

function _fixCurrentPage(currentPage, pagingInfo) {
    currentPage = typeof currentPage !== 'number' || currentPage < 1 ? 1 : currentPage;
    const pageSize = pagingInfo.pageSize;
    if (currentPage * pageSize - pageSize > pagingInfo.totalRecord) {
        console.warn('adjust currentPage[' + currentPage + '] to lastPage[' + pagingInfo.totalPage + ']');
        currentPage = pagingInfo.totalPage;
    }
    return currentPage;
}

function _paging(data, pagingInfo) {
    const currentPage = pagingInfo.currentPage;
    const pageSize = pagingInfo.pageSize;
    console.log('paging param: currentPage = [', currentPage, '] pageSize = [', pageSize, ']');

    const page = [];
    for (let i = (currentPage - 1) * pageSize, size = currentPage * pageSize; i < size && i < data.length; i++) {
        page.push(data[i]);
    }
    return page;
}