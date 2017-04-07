import {Component, ViewEncapsulation} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {TableHead, TableCell, TableHeadSelect} from "./table-renderer";
import {SortAs, SortOrder} from "../../../../../core/data/component-data";

@Component({
    templateUrl: 'renderer.html',
    styleUrls: ['renderer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData([
                [12, 12, 12, 12, 12],
                [23, 23, 23, 23, 23],
                [43, 43, 43, 43, 43],
                [12, 12, 12, 12, 12],
                [23, 23, 23, 23, 23],
                [43, 43, 43, 43, 43],
                [12, 12, 12, 12, 12],
                [23, 23, 23, 23, 23],
                [43, 43, 43, 43, 43],
                [12, 12, 12, 12, 12],
                [23, 23, 23, 23, 23],
                [43, 43, 43, 43, 43],
                [12, 12, 12, 12, 12],
                [23, 23, 23, 23, 23],
                [43, 43, 43, 43, 43],
                [12, 12, 12, 12, 12],
                [23, 23, 23, 23, 23],
                [43, 43, 43, 43, 43]],
            ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
    }

    private _columns = [
        {
            target: 'f1',
            visible: true,
            width: '20%',
            header: {
                renderer: TableHeadSelect,
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
            target: 'f2',
            visible: true,
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
            },
            group: true
        },
        {
            target: 'f3',
            visible: true,
            width: 'auto',
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
            visible: true,
            width: 'auto',
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
            target: 'f5',
            visible: true,
            width: 'auto',
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
            target: 'f6',
            visible: false
        },
        {
            target: (field, index) => { return index > 2 },
            header:{
                class: 'big-text'
            }
        },
        {
            target: ['f1', 'f4'],
            header:{
                class: 'green-text'
            }
        }

    ];

    private _additionalColumns = [
        {
            pos: 2,
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
            },
            group: true
        },
        {
            pos: -1,
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
            },
            group: true
        }
    ]
}

