import {
    AfterViewInit, ChangeDetectorRef, Component, Directive, EventEmitter, Input, NgModule,
    OnDestroy, OnInit, Output, Renderer2, ViewChild, ElementRef, ChangeDetectionStrategy,
    Injector, ViewEncapsulation, NgZone
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {JigsawInput, JigsawInputModule} from "../input/input";
import {JigsawNumericInput, JigsawNumericInputModule} from "../input/numeric-input";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {CheckBoxStatus} from "../checkbox/typings";
import {TableData, PageableTreeTableData} from "../../common/core/data/table-data";
import {_getColumnIndex, AdditionalTableData} from "./table-typings";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawSwitchModule} from "../switch/index";
import {JigsawSelectModule} from "../select/select";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {JigsawAutoCompleteInput, JigsawAutoCompleteInputModule} from "../input/auto-complete-input";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {take} from 'rxjs/operators';
import { DragDropInfo } from "../../common/directive/dragdrop/types";
import { JigsawDraggableModule, JigsawDroppableModule } from "../../common/directive/dragdrop/index";

@Directive()
export class TableCellRendererBase implements OnInit, OnDestroy {

    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * 宿主表格实例
     */
    public hostInstance: any;

    @RequireMarkForCheck()
    @Input()
    public cellData: any;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public row: number;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public field: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public initData: any;

    @Output()
    public cellDataChange = new EventEmitter<any>();

    protected targetData: TableData;

    private _removeTableDataRefresh: Function;
    private _removeAdditionalDataRefresh: Function;
    private _column: number = -1;

    public get column(): number {
        return this._column;
    }

    protected onDataRefresh(): void {
    }

    public dispatchChangeEvent(value: any): void {
        this.cellDataChange.emit(value)
    }

    private _tableData: TableData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get tableData(): TableData {
        return this._tableData;
    }

    public set tableData(value: TableData) {
        this._tableData = value;
        this._initTargetData();
        if (this._removeTableDataRefresh) {
            this._removeTableDataRefresh();
        }
        this._removeTableDataRefresh = this._tableData.onRefresh(this.onDataRefresh, this);
    }

    protected _additionalData: AdditionalTableData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get additionalData(): TableData {
        return this._additionalData;
    }

    public set additionalData(value: TableData) {
        this._additionalData = <AdditionalTableData>value;
        if (this._removeAdditionalDataRefresh) {
            this._removeAdditionalDataRefresh();
        }
        this._removeAdditionalDataRefresh = this._additionalData.onRefresh(this.onDataRefresh, this);
        this._initTargetData();
    }

    private _initTargetData(): void {
        if (!this.tableData || !this.additionalData) {
            return;
        }
        [this._column, this.targetData] = _getColumnIndex(this._tableData, this._additionalData, this.field);
    }

    ngOnDestroy() {
        if (this._removeTableDataRefresh) {
            this._removeTableDataRefresh();
        }
        if (this._removeAdditionalDataRefresh) {
            this._removeAdditionalDataRefresh();
        }
    }

    ngOnInit() {
        this.onDataRefresh();
    }
}

/**
 * 默认表格渲染组件
 */
@Component({
    template: '<span class="jigsaw-table-cell-text">{{cellData}}</span>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultCellRenderer extends TableCellRendererBase {
}

@Component({
    template: `
        <jigsaw-input class="table-cell-password-renderer" #input [(value)]="cellData" width="100%" [password]="true" [clearable]="false"
            [disabled]="true">
        </jigsaw-input>
    `,
    styles: [`
        .table-cell-password-renderer.jigsaw-input {
            border: none;
        }

        .table-cell-password-renderer.jigsaw-input .jigsaw-input-wrapper {
            background: transparent;
        }

        .table-cell-password-renderer.jigsaw-input .jigsaw-input-wrapper input {
            cursor: inherit;
        }

        .table-cell-password-renderer.jigsaw-input.jigsaw-input-disabled .jigsaw-input-wrapper input {
            color: #666;
        }

        .table-cell-password-renderer.jigsaw-input:hover, .table-cell-password-renderer.jigsaw-input.jigsaw-input-focused {
            border: none;
        }

        .table-cell-password-renderer.jigsaw-input.jigsaw-input-focused {
            box-shadow: none;
        }
    `],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellPasswordRenderer extends TableCellRendererBase {

}

/**
 * 编辑单元格渲染器
 */
@Component({
    template: `
        <jigsaw-input #input [(value)]="cellData" width="100%" [blurOnClear]="false" [placeholder]="_$placeholder"
                      (blur)="dispatchChangeEvent(cellData)" [icon]="_$icon" [password]="_$password"
                      [preIcon]="_$preIcon" [clearable]="_$clearable" >
        </jigsaw-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellTextEditorRenderer extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawInput)
    protected input: JigsawInput;

    public get _$placeholder() {
        return this.initData && this.initData.placeholder ? this.initData.placeholder : '';
    }

    public get _$icon() {
        return this.initData && this.initData.icon ? this.initData.icon : undefined;
    }

    public get _$preIcon() {
        return this.initData && this.initData.preIcon ? this.initData.preIcon : undefined;
    }

    public get _$password() {
        return this.initData && this.initData.hasOwnProperty('password') ? !!this.initData.password : false;
    }

    public get _$clearable() {
        return this.initData && this.initData.hasOwnProperty('clearable') ? !!this.initData.clearable : true;
    }

    ngAfterViewInit() {
        this.input.focus();
    }
}

/**
 * 编辑单元格自动完成渲染器
 */
@Component({
    template: `
        <jigsaw-auto-complete-input [(value)]="cellData" width="100%" [placeholder]="_$placeholder"
                                    (blur)="dispatchChangeEvent(cellData)" [data]="_$dropDownData"
                                    [filterOnFocus]="false" [blurOnClear]="false"
                                    [maxDropDownHeight]="_$maxDropDownHeight"
                                    [closeDropDownOnSelect]="false">
        </jigsaw-auto-complete-input>
    `
})
export class TableCellAutoCompleteEditorRenderer extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawAutoCompleteInput)
    protected autoCompleteInput: JigsawAutoCompleteInput;

    private _initDataJson: any;

    protected onDataRefresh() {
        this._initDataJson = this.initData instanceof Function ?
            this.initData(this.tableData, this.row, this.column) : this.initData;
    }

    public get _$placeholder() {
        return this._initDataJson && this._initDataJson.placeholder ? this._initDataJson.placeholder : '';
    }

    public get _$dropDownData() {
        return this._initDataJson && this._initDataJson.data ? this._initDataJson.data : null;
    }

    public get _$maxDropDownHeight() {
        return this._initDataJson && this._initDataJson.maxDropDownHeight ? this._initDataJson.maxDropDownHeight : null;
    }

    ngAfterViewInit() {
        this.autoCompleteInput.focus();
    }
}

/**
 * 编辑单元格数字输入渲染器
 */
@Component({
    template: `
        <jigsaw-numeric-input #input [(value)]="cellData" width="100%" [blurOnClear]="false"
                              [placeholder]="_$placeholder"
                              (blur)="dispatchChangeEvent(cellData)" [min]="_$min" [max]="_$max" [step]="_$step">
        </jigsaw-numeric-input>
    `
})
export class TableCellNumericEditorRenderer extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawNumericInput)
    protected input: JigsawNumericInput;

    public get _$placeholder() {
        return this.initData && this.initData.placeholder ? this.initData.placeholder : '';
    }

    public get _$min() {
        return this.initData && this.initData.hasOwnProperty('min') ? this.initData.min : -Infinity;
    }

    public get _$max() {
        return this.initData && this.initData.hasOwnProperty('max') ? this.initData.max : Infinity;
    }

    public get _$step() {
        return this.initData && this.initData.hasOwnProperty('step') ? this.initData.step : 1;
    }

    ngAfterViewInit() {
        this.input.focus();
    }
}

/**
 * head checkbox renderer
 */
@Component({
    template: `
        <jigsaw-checkbox [(checked)]="checked" [disabled]="_$disabled" [valid]="_$valid"></jigsaw-checkbox>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeadCheckboxRenderer extends TableCellRendererBase {
    private _checked: CheckBoxStatus = CheckBoxStatus.unchecked;

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_injector);
    }

    private _initDataJson: any;

    private _updateInitData() {
        this._initDataJson = this.initData instanceof Function ?
            this.initData(this.tableData, this.row, this.column) : this.initData;
    }

    public get _$disabled() {
        return this._initDataJson && this._initDataJson.hasOwnProperty('disabled') ? this._initDataJson.disabled : false;
    }

    public get _$valid() {
        return this._initDataJson && this._initDataJson.hasOwnProperty('valid') ? this._initDataJson.valid : true;
    }

    public get checked(): CheckBoxStatus {
        return this._checked;
    }

    public set checked(value: CheckBoxStatus) {
        this._checked = value;
        this.targetData.data.forEach((row, index) => {
            row[this.column] = value;
            this._additionalData.touchValueByRow(this.field, index, value);
        });
        this.targetData.refresh();
    }

    protected onDataRefresh(): void {
        let type = 0;
        this.targetData.data.forEach((row, index) => {
            let value = this._additionalData.getTouchedValueByRow(this.field, index);
            value = CommonUtils.isDefined(value) ? value : !!row[this.column];
            type |= value ? 2 : 1;
        });
        switch (type) {
            case 3:
                this._checked = CheckBoxStatus.indeterminate;
                break;
            case 2:
                this._checked = CheckBoxStatus.checked;
                break;
            case 1:
            case 0:
            default:
                this._checked = CheckBoxStatus.unchecked;
        }
        this._updateInitData();
        this._changeDetectorRef.markForCheck();
    }
}

/**
 * cell checkbox renderer
 */
@Component({
    template: `
        <jigsaw-checkbox [checked]="checked" [disabled]="_$disabled" [valid]="_$valid" (checkedChange)="onChange($event)">
        </jigsaw-checkbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellCheckboxRenderer extends TableCellRendererBase {
    protected onDataRefresh() {
        this._updateChecked();
        this._updateTargetData();
        this._updateInitData();
    }

    private _initDataJson: any;

    private _updateInitData() {
        this._initDataJson = this.initData instanceof Function ?
            this.initData(this.tableData, this.row, this.column) : this.initData;
    }

    public get _$disabled() {
        return this._initDataJson && this._initDataJson.hasOwnProperty('disabled') ? this._initDataJson.disabled : false;
    }

    public get _$valid() {
        return this._initDataJson && this._initDataJson.hasOwnProperty('valid') ? this._initDataJson.valid : true;
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector, private _zone: NgZone) {
        super(_injector);
    }

    public checked: boolean;

    private _cellData: any;

    public get cellData(): any {
        return this._cellData;
    }

    public set cellData(value: any) {
        this._cellData = value;
        this._updateChecked();
        this._updateTargetData();
    }

    private _updateChecked(): void {
        let checked = this._additionalData.getTouchedValueByRow(this.field, this.row);
        checked = CommonUtils.isDefined(checked) ? checked : this.cellData;
        this.checked = checked;
        this._changeDetectorRef.markForCheck();
    }

    private _updateTargetData() {
        if (CommonUtils.isDefined(this.targetData.data[this.row])) {
            this.targetData.data[this.row][this.column] = this.checked;
            this._changeDetectorRef.markForCheck();
        }
    }

    onChange(value) {
        this.checked = value;
        this._additionalData.touchValueByRow(this.field, this.row, value);
        this._updateTargetData();
        this.dispatchChangeEvent(value);
        this._changeDetectorRef.markForCheck();
        this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            this._zone.run(() => {
                this.targetData.refresh();
            });
        })
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this._additionalData.trackRowBy && this.row == 0) { // this.row == 0 ensures print once
            console.warn('You may need to add a [trackRowBy="field-name"] attribute to ' +
                'the table if using a renderer which has status.');
        }
    }
}

/**
 * switch renderer
 */
@Component({
    template: '<j-switch [(checked)]="cellData" (checkedChange)="dispatchChangeEvent(cellData)" [readonly]="_$readonly"></j-switch>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellSwitchRenderer extends TableCellRendererBase {
    public get _$readonly() {
        return this.initData && this.initData.readonly;
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_injector);
    }
}

export type InitDataGenerator = (td: TableData, row: number, column: number) =>
    ArrayCollection<any> | any[] | Observable<ArrayCollection<any> | any[]>;

/**
 * Select renderer
 */
// @dynamic
@Component({
    template: `
        <jigsaw-select [value]="selected" [data]="data"
                       (valueChange)="_$handleValueChange($event)"
                       [optionCount]="5" width="100%" height="20">
        </jigsaw-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellSelectRenderer extends TableCellRendererBase implements OnInit, OnDestroy {
    public selected: any;
    public initData: InitDataGenerator | ArrayCollection<any> | any[];
    public data: ArrayCollection<any> | any[];

    constructor(private _changeDetector: ChangeDetectorRef, private _renderer: Renderer2, private _elementRef: ElementRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_injector);
        this._removeKeyDownHandler = this._renderer.listen('document', 'keydown.esc', this._onKeyDown.bind(this));
    }

    private readonly _removeKeyDownHandler;
    private _removeClickHandler;

    private _hostCellEl: HTMLElement;

    private _onKeyDown($event) {
        if ($event.type == 'click' && $event.path.find(el => el == this._hostCellEl)) {
            return;
        }
        this.dispatchChangeEvent(this.selected ? this.selected.label : '');
    }

    /**
     * @internal
     */
    public _$handleValueChange($event) {
        if (!$event || $event.label == this.cellData) {
            return;
        }
        this.dispatchChangeEvent($event.label)
    }

    protected onDataRefresh() {
        if (this.initData instanceof Function) {
            const data = this.initData(this.tableData, this.row, this.column);
            if (data instanceof Observable) {
                this.data = [];
                const subscription = data.subscribe(
                    value => {
                        subscription.unsubscribe();
                        if (!this._hasDestroyed) {
                            this.data = value;
                            this._changeDetector.detectChanges();
                        }
                    },
                    error => {
                        subscription.unsubscribe();
                        console.log('select renderer: read async data error', error);
                        if (!this._hasDestroyed) {
                            this.data = [];
                            this._changeDetector.detectChanges();
                        }
                    });
            } else {
                this.data = data;
            }
        } else {
            this.data = this.initData;
        }
        this._changeDetector.markForCheck();
    }

    public static defaultInitDataGenerator(tableData, row, col) {
        // 找出当前列所有可选项
        return tableData.data.reduce(
            (items, row) => {
                if (items.findIndex(office => office.label == row[col]) == -1) {
                    items.push({label: row[col]})
                }
                return items;
            }, []);
    }

    private _cellData: any;

    @RequireMarkForCheck()
    @Input()
    get cellData(): any {
        return this._cellData;
    }

    set cellData(value: any) {
        this._cellData = value;
        this.selected = {label: value};
    }

    private _hasDestroyed: boolean;

    ngOnInit() {
        super.ngOnInit();
        // 使用此方法使其他单元格退出编辑状态
        this._hostCellEl = CommonUtils.getParentNodeBySelector(this._elementRef.nativeElement, 'td');
        this._removeClickHandler = this._renderer.listen('document', 'click', this._onKeyDown.bind(this));
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        this._removeKeyDownHandler();
        this._removeClickHandler();
        this._hasDestroyed = true;
    }
}

export type TreeTableCellData = { id: string, open: boolean, isParent: boolean, data: string };

@Component({
    template: `
        <div class="jigsaw-table-tree-cell">
            <span [style.margin-left]="indent"></span>
            <span class="jigsaw-table-tree-bar" *ngIf="cellData.isParent" (click)="_$toggleOpenNode()">
                <span *ngIf="cellData.open; else close" class="fa fa-minus-square-o"></span>
                <ng-template #close>
                    <span class="fa fa-plus-square-o"></span>
                </ng-template>
            </span>
            {{cellData.data}}
        </div>
    `
})
export class TreeTableCellRenderer extends TableCellRendererBase {
    public cellData: TreeTableCellData;
    public tableData: PageableTreeTableData;

    public get indent(): string {
        return (this.cellData.id.length - 1) * 20 + 'px';
    }

    /**
     * @internal
     */
    public _$toggleOpenNode() {
        const indexes = this.cellData.id.split('');
        this.tableData.toggleOpenNode(indexes, !this.cellData.open);
    }
}

/*
 * 换行
 * */
@Component({
    template: `
        <div class="jigsaw-table-option-box"
            jigsaw-draggable
            jigsaw-droppable
            (jigsawDragStart)="_$dragStartHandle($event)"
            (jigsawDragEnd)="_$dragEndHandle()">
            <span class="drop-top"
                jigsaw-droppable
                (jigsawDragEnter)="_$dragEnterHandle($event)"
                (jigsawDrop)="_$dropHandle($event)">
            </span>
            <span class="drop-mid"
                jigsaw-droppable
                (jigsawDragEnter)="_$dragEnterHandle($event)"
                (jigsawDrop)="_$dropHandle($event)">
                <i [class]="_$icon"></i>
                <p>{{_$label}}</p>
            </span>
            <span class="drop-bottom"
                jigsaw-droppable
                (jigsawDragEnter)="_$dragEnterHandle($event)"
                (jigsawDrop)="_$dropHandle($event)">
            </span>
        </div>
    `
})
export class TableDragReplaceRow extends TableCellRendererBase implements AfterViewInit {
    private _allRows: NodeListOf<any>;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, protected _injector: Injector) {
        super(_injector);
    }

    public get _$icon() {
        return this.initData && this.initData.icon ? this.initData.icon : "fa fa-arrows-alt";
    }

    public get _$label() {
        return this.initData && this.initData.label ? this.initData.label : '';
    }

    public get _$title() {
        return this.initData && this.initData.title ? this.initData.title : '';
    }

    /**
     * @internal
     */
    public _$dragStartHandle(dragInfo: DragDropInfo) {
        dragInfo.dragDropData = this.row;
        dragInfo.event.dataTransfer.effectAllowed = "link";
        if (!CommonUtils.isIE()) {
            const img = CommonUtils.getParentNodeBySelector(dragInfo.element, "tr");
            dragInfo.event.dataTransfer.setDragImage(img, 50, 10);
        }
    }

    /**
     * @internal
     */
    public _$dragEndHandle() {
        this._resetSelectedRow();
    }

    /**
     * @internal
     */
    public _$dragEnterHandle(dragInfo: DragDropInfo) {
        dragInfo.event.dataTransfer.dropEffect = "link";
        this._resetSelectedRow();
        if (dragInfo.event.dataTransfer.effectAllowed == "link") {
            let _dropClass = "";
            if (dragInfo.element.className.indexOf("drop-top") !== -1) {
                _dropClass = "drop-active-top";
            } else if (dragInfo.element.className.indexOf("drop-mid") !== -1) {
                _dropClass = "drop-active-mid";
            } else if (dragInfo.element.className.indexOf("drop-bottom") !== -1) {
                _dropClass = "drop-active-bottom";
            }
            this._renderer.addClass(CommonUtils.getParentNodeBySelector(dragInfo.element, "tr"), _dropClass);
        }
    }

    /**
     * @internal
     */
    public _$dropHandle(dragInfo: DragDropInfo) {
        const draggingRowIndex = +dragInfo.dragDropData;
        if (draggingRowIndex === this.row) {
            return;
        }
        if (dragInfo.element.className.indexOf("drop-top") !== -1) {
            if (draggingRowIndex < this.row) {
                this._arrayMove(this.tableData.data, draggingRowIndex, this.row - 1);
                this.hostInstance.selectedRow = this.row - 1;
            } else {
                this._arrayMove(this.tableData.data, draggingRowIndex, this.row);
                this.hostInstance.selectedRow = this.row;
            }
        } else if (dragInfo.element.className.indexOf("drop-mid") !== -1) {
            const draggingRow = this.tableData.data[draggingRowIndex];
            if (!draggingRow) {
                return;
            }
            const thisRow = this.tableData.data[this.row];
            this.tableData.data[this.row] = draggingRow;
            this.tableData.data[draggingRowIndex] = thisRow;
            this.hostInstance.selectedRow = this.row;
        } else if (dragInfo.element.className.indexOf("drop-bottom") !== -1) {
            if (draggingRowIndex < this.row) {
                this._arrayMove(this.tableData.data, draggingRowIndex, this.row);
                this.hostInstance.selectedRow = this.row;
            } else {
                this._arrayMove(this.tableData.data, draggingRowIndex, this.row + 1);
                this.hostInstance.selectedRow = this.row + 1;
            }
        }
        // inform jigsaw-table to update view
        this.tableData.refresh();
    }

    private _resetSelectedRow() {
        for (let i = 0; i < this._allRows.length; ++i) {
            this._renderer.removeClass(this._allRows[i], "drop-active-top");
            this._renderer.removeClass(this._allRows[i], "drop-active-mid");
            this._renderer.removeClass(this._allRows[i], "drop-active-bottom");
        }
    }

    private _arrayMove(arr: any[], oldIndex: number, newIndex: number) {
        if (newIndex >= arr.length) {
            let k = newIndex - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }

    ngAfterViewInit() {
        this._allRows = CommonUtils.getParentNodeBySelector(this._elementRef.nativeElement, "table").querySelectorAll( "tr" );
        this._renderer.setStyle(this._elementRef.nativeElement.parentElement.parentElement, "padding", "0px");
    }
}

@NgModule({
    declarations: [
        DefaultCellRenderer, TableCellTextEditorRenderer, TableHeadCheckboxRenderer,
        TableCellCheckboxRenderer, TableCellSwitchRenderer, TableCellSelectRenderer, TableCellNumericEditorRenderer,
        TableCellAutoCompleteEditorRenderer, TreeTableCellRenderer, TableCellPasswordRenderer, TableDragReplaceRow
    ],
    imports: [
        CommonModule, JigsawCheckBoxModule, JigsawInputModule, JigsawSwitchModule, JigsawSelectModule, JigsawNumericInputModule,
        JigsawAutoCompleteInputModule, JigsawDraggableModule, JigsawDroppableModule
    ]
})
export class JigsawTableRendererModule {
}
