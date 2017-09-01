import {Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule} from "../core";
import {JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent} from "./table-inner.components";
import {TableData} from "../../core/data/table-data";
import {
    AdditionalColumnDefine,
    ColumnDefine,
    TableCellSetting,
    TableColumnTargetFinder,
    TableDataChangeEvent,
    TableHeadSetting
} from "../table/table-api";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {SortAs, SortOrder} from "../../core/data/component-data";

@Component({
    selector: 'jigsaw-table1',
    templateUrl: 'table.html',
    styleUrls: ['table.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    },
})
export class JigsawTable1 extends AbstractJigsawComponent implements OnInit, OnDestroy {
    constructor() {
        super();
    }

    /**
     * @internal
     */
    public _$headerSettings: TableHeadSetting[] = [];

    private _updateHeaderSettings(): void {
        let currentFields = [];
        let fieldIndex = 0;
        let settingsBackup: TableHeadSetting[] = this._$headerSettings.concat();
        this._$headerSettings.splice(0, this._$headerSettings.length);
        this.data.field.forEach((field, index) => {
            let matchedColumnDef = this.columnDefines.find(
                colDef => (<TableColumnTargetFinder>colDef.target)(field, index));
            if (matchedColumnDef && matchedColumnDef.visible === false) {
                return;
            }

            let originIndex = this._lastFields.indexOf(field);
            let settings = originIndex == -1 || !settingsBackup[originIndex] || !matchedColumnDef ?
                this._createHeaderSettings(matchedColumnDef, fieldIndex++) : settingsBackup[originIndex];
            if (settings.cellData === null) {
                settings.cellData = this.data.header[index];
            }
            this._$headerSettings.push(settings);
            currentFields.push(field);
        });
        // update `_lastFields` here, and we do not need to update it in `_updateCellSettings` again
        this._lastFields = currentFields;
    }

    /**
     * @internal
     */
    public _$cellSettings: TableCellSetting[][] = [];

    private _updateCellSettings(): void {
        let settingsBackup: TableCellSetting[][] = [];
        // backup and clear origin settings, we have to use the origin row array ref
        // to avoid ngFor from rerendering the dom
        this._$cellSettings.forEach(row => {
            settingsBackup.push(row.concat());
            row.splice(0, row.length);
        });
        // remove extra lines if necessary
        this._$cellSettings.splice(this.data.data.length, this._$cellSettings.length);

        let fieldIndex = 0;
        this.data.field.forEach((field, index) => {
            let matchedColumnDef = this.columnDefines.find(
                colDef => (<TableColumnTargetFinder>colDef.target)(field, index));
            if (matchedColumnDef && matchedColumnDef.visible === false) {
                return;
            }

            let originIndex = this._lastFields.indexOf(field);
            let sTemplate: TableCellSetting = this._createCellSettings(matchedColumnDef, fieldIndex);
            let groupSetting: TableCellSetting;
            let settings: TableCellSetting;
            for (let i = 0, len = this.data.data.length; i < len; i++) {
                if (originIndex == -1 || !settingsBackup[i] || !settingsBackup[i][originIndex]) {
                    settings = <TableCellSetting>CommonUtils.shallowCopy(sTemplate);
                } else {
                    settings = settingsBackup[i][originIndex];
                    settings.rowSpan = 1;
                }
                if (!this._$cellSettings[i]) {
                    this._$cellSettings.push([]);
                }
                this._$cellSettings[i][fieldIndex] = settings;

                settings.cellData = this.data.data[i][index];
                //todo change TableData cell type to any
                if (<any>settings.cellData instanceof Function) {
                    // it is a `TableCellDataGenerator`, we need to use it to generate a value
                    const generator:Function = <any>settings.cellData;
                    settings.cellData = generator(this.data, i, fieldIndex);
                }

                if (matchedColumnDef && matchedColumnDef.group) {
                    if (groupSetting && groupSetting.cellData === settings.cellData) {
                        groupSetting.rowSpan++;
                        settings.rowSpan = 0;
                    } else {
                        groupSetting = settings;
                    }
                }
            }
            fieldIndex++;
        });
    }

    private _createCellSettings(columnDefine: ColumnDefine, fieldIndex: number): TableCellSetting {
        let settings: TableCellSetting = {
            cellData: '',
            width: undefined,
            visible: true,
            renderer: null,
            clazz: '',
            editable: false,
            editorRenderer: null,
            group: false,
            field: fieldIndex,
            rowSpan: 1
        };
        settings.width = columnDefine && columnDefine.width;
        settings.group = columnDefine && columnDefine.group;
        let cellDef = columnDefine && columnDefine.cell;
        if (cellDef) {
            settings.renderer = cellDef.renderer;
            settings.clazz = cellDef.clazz;
            settings.editable = cellDef.editable;
            settings.editorRenderer = cellDef.editorRenderer;
        }
        return settings;
    }

    private _createHeaderSettings(columnDefine: ColumnDefine, fieldIndex: number): TableHeadSetting {
        let settings: TableHeadSetting = {
            cellData: null,
            width: null,
            visible: true,
            renderer: null,
            clazz: '',
            sortable: false,
            sortAs: SortAs.string,
            defaultSortOrder: SortOrder.default,
            field: fieldIndex
        };
        settings.width = columnDefine && columnDefine.width;
        let headerDef = columnDefine && columnDefine.header;
        if (headerDef) {
            settings.cellData = headerDef.text === undefined || headerDef.text === null ? settings.cellData : headerDef.text;
            settings.renderer = headerDef.renderer;
            settings.clazz = headerDef.clazz;
            settings.sortable = headerDef.sortable;
            settings.sortAs = headerDef.sortAs === undefined || headerDef.sortAs === null ? settings.sortAs : headerDef.sortAs;
            settings.defaultSortOrder = headerDef.sortAs === undefined || headerDef.sortAs === null ?
                settings.defaultSortOrder : headerDef.defaultSortOrder;
        }
        return settings;
    }

    private _mixInAdditionalColumns(): void {
        if (this._additionalColumnDefine) {
            for (let i = this._additionalColumnDefine.length - 1; i >= 0; i--) {
                const acd = this._additionalColumnDefine[i];
                if (this.data.field.indexOf(acd.field) != -1) {
                    // existed
                    continue;
                }

                const cd: ColumnDefine = {
                    target: acd.field,
                    header: acd.header,
                    group: acd.group,
                    cell: acd.cell,
                    width: acd.width,
                    visible: acd.visible
                };
                const pos = acd.pos == undefined || acd.pos == null ? this._data.field.length : acd.pos;
                this.columnDefines.splice(pos, 0, cd);
                // the acd.cell.data could be a `TableCellDataGenerator`
                this.data.insertColumn(pos, acd.cell.data, acd.field, acd.header.text ? acd.header.text : acd.field);
            }
        }

        // normalize the target to `TableColumnTargetFinder`
        this.columnDefines.forEach((colDef, index) => {
            const cd = <ColumnDefine>CommonUtils.shallowCopy(colDef);
            this.columnDefines[index] = cd;
            if (!cd.hasOwnProperty('target')) {
                console.error('invalid column target, need a "target" property!');
                return;
            }
            let targets;
            if (typeof cd.target == 'number' || typeof cd.target == 'string') {
                targets = [cd.target];
            } else if (cd.target instanceof Array) {
                targets = cd.target
            }
            if (targets != undefined) {
                cd.target = (field, index) => !!targets.find((f, i) => (f == field || i == index));
            }
        });
    }

    private _update(): void {
        if (!this.initialized || !this._data) {
            return;
        }
        if (!this._data.field || this._data.field.length == 0) {
            console.error('invalid table data, need a "field" property.');
            return;
        }
        this._mixInAdditionalColumns();
        this._updateHeaderSettings();
        this._updateCellSettings();
    }

    private _removeRefreshCallback: CallbackRemoval;
    private _lastFields: string[] = [];
    private _data: TableData;

    @Input()
    public get data(): TableData {
        return this._data;
    }

    public set data(value: TableData) {
        if (value == this._data || !value) {
            return;
        }
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeRefreshCallback = value.onRefresh(this._update, this);
        this._data = value;
        this._checkAdditionalColumnFields();
        this._update();
    }

    @Output()
    public dataChange = new EventEmitter<TableDataChangeEvent>();

    private _columnDefines: ColumnDefine[] = [];

    @Input()
    public get columnDefines(): ColumnDefine[] {
        return this._columnDefines;
    }

    public set columnDefines(value: ColumnDefine[]) {
        if (!value || value == this._columnDefines) {
            return;
        }
        this._columnDefines = value;
        this._update();
    }

    private _additionalColumnDefine: AdditionalColumnDefine[] = [];

    @Input()
    public get additionalColumnDefine(): AdditionalColumnDefine[] {
        return this._additionalColumnDefine;
    }

    public set additionalColumnDefine(value: AdditionalColumnDefine[]) {
        if (!value || value == this._additionalColumnDefine) {
            return;
        }
        if (!this._additionalColumnDefine) {
            console.warn('do not support updating the additionalColumnDefine yet!');
            return;
        }
        this._additionalColumnDefine = value;
        this._checkAdditionalColumnFields();
        this._update();
    }

    private _checkAdditionalColumnFields(): void {
        if (!this.data || !this.additionalColumnDefine) {
            return;
        }
        this.additionalColumnDefine.forEach((acd, index) => {
            if (this.data.field.indexOf(acd.field) != -1) {
                console.warn('conflict field in additional column, using default, origin field=' + acd.field);
                acd.field = '';
            }
            //todo 如果应用原来给的field就是 additional-field-n，那还是有问题。
            acd.field = acd.field ? acd.field : 'additional-field-' + index;
        });
    }

    // _$onHeaderChange(value) {
    //     console.log(value);
    // }
    //
    // _$onHeaderSortChange(value) {
    //     console.log(value);
    // }

    ngOnInit() {
        super.ngOnInit();
        this._update();
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._data = null;
        this._lastFields = null;
        this._columnDefines = null;
        this._additionalColumnDefine = null;
        this._$cellSettings = null;
        this._$headerSettings = null;
    }
}

@NgModule({
    declarations: [JigsawTable1, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent],
    imports: [CommonModule, JigsawCommonModule],
    exports: [JigsawTable1, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent]
})
export class JigsawTable1Module {
}
