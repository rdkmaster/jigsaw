import {Component, ViewEncapsulation} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {
    TableHeadCheckbox,
    TableCellCheckbox,
    TableCellOption,
    TableHeadOption,
    TableCellNum,
    TableHeadNum
} from "../../../../../component/table/table-renderer";
import {SortAs, SortOrder} from "../../../../../core/data/component-data";
import {ColumnSetting, AdditionalColumnSetting} from "../../../../../component/table/table-api";
import {TableHeadSelect, TableCell, TableHead} from "./table-renderer";

@Component({
    templateUrl: 'renderer.html',
    styleUrls: ['renderer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData([
            [22, 12, 11, 0, 12, 12, 111],
            [22, 23, 11, 1, 23, 23, 111],
            [22, 43, 11, 1, 43, 77, 111],
            [22, 12, 12, 0, 12, 77, 111],
            [23, 55, 23, 1, 23, 23, 111],
            [43, 55, 43, 0, 44, 43, 111],
            [12, 55, 12, 1, 44, 12, 111],
            [23, 55, 23, 1, 44, 23, 111],
            [43, 43, 43, 0, 44, 43, 111],
            [12, 12, 33, 0, 12, 66, 111],
            [23, 23, 33, 0, 88, 66, 111],
            [43, 43, 33, 1, 88, 66, 111],
            [12, 11, 12, 1, 88, 66, 111],
            [23, 11, 23, 0, 23, 23, 111],
            [43, 43, 43, 1, 43, 43, 111],
            [12, 12, 12, 1, 99, 12, 111],
            [23, 23, 23, 0, 99, 23, 111],
            [43, 43, 43, 1, 99, 43, 111]
        ], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);
    }

    private _columns: ColumnSetting[] = [
        {
            target: 'f1',
            width: '15%',
            header: {
                renderer: TableHeadSelect,
                sortable: false
            },
            cell: {
                renderer: TableCell,
                class: 'green-text',
                editable: false,
                editorRenderer: null,
            },
            group: true
        },
        {
            target: 'f2',
            width: '10%',
            header: {
                renderer: TableHead,
                class: 'red-text',
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.des
            },
            cell: {
                renderer: TableCell,
                class: null,
                editable: false,
                editorRenderer: null,
            }
        },
        {
            target: 'f3',
            header: {
                renderer: TableHead,
                sortable: true,
                sortAs: SortAs.number,
                defaultSortOrder: SortOrder.asc
            },
            cell: {
                renderer: TableCell,
                class: null,
                editable: false,
                editorRenderer: null,
            },
            group: true
        },
        {
            target: 'f4',
            //visible: false,
            /*header: {
             renderer: TableHeadCheckbox
             },
             cell: {
             renderer: TableCellCheckbox
             }*/
        },
        {
            target: 'f5',
            header: {
                renderer: TableHead,
                sortable: false
            },
            cell: {
                renderer: TableCell,
                class: null,
                editable: false,
                editorRenderer: null,
            },
            group: true
        },
        {
            target: 'f6',
            header: {
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.default
            },
            cell: {
                renderer: TableCell,
                class: null,
                editable: false,
                editorRenderer: null,
            },
            group: true
        },
        {
            target: 6,
            visible: false,
        },
        {
            target: (field, index) => {
                return index > 2
            },
            header: {
                class: 'big-text'
            }
        },
        {
            target: ['f1', 'f5'],
            header: {
                class: 'green-text'
            }
        }
    ];

    private _additionalColumns: AdditionalColumnSetting[] = [
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadNum,
            },
            cell: {
                renderer: TableCellNum
            }
        },
        {
            pos: 0,
            target: 'f4',
            width: '60px',
            header: {
                renderer: TableHeadCheckbox
            },
            cell: {
                renderer: TableCellCheckbox
            }
        },
        /*{
         pos: 0,
         width: '60px',
         header: {
         renderer: TableHeadCheckbox,
         },
         cell: {
         renderer: TableCellCheckbox
         }
         },*/
        {
            pos: -1,
            width: '10%',
            header: {
                renderer: TableHeadOption,
                class: 'red-text'
            },
            cell: {
                renderer: TableCellOption
            }
        },
        /*{
         pos: 2,
         width: '10%',
         header: {
         renderer: TableHeadOption,
         class: 'red-text'
         },
         cell: {
         renderer: TableCellOption
         }
         }*/
    ];

    /*total = 200;

     public getCurrentPage(message:any){
     console.log("current page message is: "+message);
     }
     public getPageSize(message:any){
     console.log("page size is: "+message);
     }*/

}

