import {
    AfterViewInit, ChangeDetectorRef, Component, Directive, EventEmitter, Input, NgModule,
    OnDestroy, OnInit, Output, Renderer2, ViewChild, ElementRef, ChangeDetectionStrategy,
    Injector, ViewEncapsulation, NgZone
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {take} from 'rxjs/operators';
import {JigsawInput, JigsawInputModule} from "../input/input";
import {JigsawNumericInput, JigsawNumericInputModule} from "../input/numeric-input";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {CheckBoxStatus} from "../checkbox/typings";
import {TableData, PageableTreeTableData} from "../../common/core/data/table-data";
import {_getColumnIndex, AdditionalTableData, CellRendererEvent} from "./table-typings";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawSwitchModule} from "../switch/switch";
import {JigsawSelectModule} from "../select/index";
import {JigsawProgressModule} from "../progress/progress";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {JigsawAutoCompleteInput, JigsawAutoCompleteInputModule} from "../input/auto-complete-input";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {DragDropInfo} from "../../common/directive/dragdrop/types";
import {JigsawDraggableModule, JigsawDroppableModule} from "../../common/directive/dragdrop/index";
import {JigsawIcon, JigsawIconModule, StatusType} from "../icon/icon";
import {LabelPosition, Status} from "../progress/base";

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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public theme: string;

    @Output()
    public cellDataChange = new EventEmitter<any>();

    @Output()
    public cellStatusChange = new EventEmitter<CellRendererEvent>();

    protected _calcInitProperty<T>(property: string, defaultValue: T): T {
        if (!this.initData || !this.initData.hasOwnProperty(property)) {
            return defaultValue;
        }
        if (typeof this.initData[property] == 'function') {
            return this.initData[property](this.tableData, this.row, this.column);
        }
        return this.initData[property];
    }

    public get _$placeholder(): string {
        return this._calcInitProperty('placeholder', '');
    }

    public get _$disabled(): boolean {
        return !!this._calcInitProperty('disabled', false);
    }

    public get _$valid(): boolean {
        return !!this._calcInitProperty('valid', true);
    }

    /**
     * 这个属性指定了当渲染作为编辑器时，外部是如何使用它的
     * - when-activated：需要用户激活（点击单元格）后，编辑器才显示出来；
     * - always-show：无需用户激活，单元格默认使用编辑器来渲染单元格
     */
    public editorMode: 'when-activated' | 'always-show' = 'when-activated';
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
 * @internal
 * 默认表格渲染组件
 */
@Component({
    template: '<span class="jigsaw-table-cell-text">{{cellData}}</span>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultCellRenderer extends TableCellRendererBase {
}

/**
 * @internal
 * 表格密码单元格渲染组件
 */
@Component({
    template: `
        <jigsaw-input #input [theme]="theme" class="table-cell-password-renderer" [(value)]="cellData" width="100%" height="28px"
                      [password]="true" [clearable]="false" (blur)="dispatchChangeEvent(cellData)">
        </jigsaw-input>
    `,
    styles: [`
        .table-cell-password-renderer.jigsaw-input-host {
            pointer-events: none;
        }

        .table-cell-password-renderer.jigsaw-input-host .jigsaw-input-container .jigsaw-input-wrapper {
            border: none;
            background: transparent;
        }

        .table-cell-password-renderer.jigsaw-input-host .jigsaw-input-container .jigsaw-input-wrapper,
        .table-cell-password-renderer.jigsaw-input-host .jigsaw-input-container .jigsaw-input-wrapper input {
            cursor: inherit;
        }

        .table-cell-password-renderer.jigsaw-input-host.jigsaw-input-disabled .jigsaw-input-container .jigsaw-input-wrapper input {
            color: #666;
        }

        .table-cell-password-renderer.jigsaw-input-host .jigsaw-input-container .jigsaw-input-wrapper:hover,
        .table-cell-password-renderer.jigsaw-input-host.jigsaw-input-focused .jigsaw-input-container .jigsaw-input-wrapper {
            border: none;
        }
    `],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellPasswordRenderer extends TableCellRendererBase {
}

/**
 * @internal
 * 编辑单元格渲染器
 */
@Component({
    template: `
        <jigsaw-input [theme]="theme" #input [(value)]="cellData" width="100%" height="28px" [placeholder]="_$placeholder"
                      (blur)="dispatchChangeEvent(cellData)" [icon]="_$icon" [password]="_$password" [valid]="_$valid"
                      [preIcon]="_$preIcon" [clearable]="_$clearable" [disabled]="_$disabled" tabindex="-1" style="outline: none">
        </jigsaw-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellTextEditorRenderer extends TableCellRendererBase implements AfterViewInit {
    constructor(protected _injector: Injector, private _renderer: Renderer2, private _cdr: ChangeDetectorRef) {
        super(_injector);
    }

    @ViewChild(JigsawInput)
    private _input: JigsawInput;

    @ViewChild('input', {read: ElementRef})
    private _inputEl: ElementRef;

    public get _$icon(): string {
        return this._calcInitProperty('icon', undefined);
    }

    public get _$preIcon(): string {
        return this._calcInitProperty('preIcon', undefined);
    }

    public get _$password(): boolean {
        return !!this._calcInitProperty('password', false);
    }

    public get _$clearable(): boolean {
        return !!this._calcInitProperty('clearable', true);
    }

    protected _calcInitProperty<T>(property: string, defaultValue: T): T {
        if (!this.initData || !this.initData.hasOwnProperty(property)) {
            return defaultValue;
        }
        if (typeof this.initData[property] == 'function') {
            const inputVal = CommonUtils.isUndefined(this._input) ? '' : this._input.value;
            return this.initData[property](this.tableData, this.row, this.column, inputVal);
        }
        return this.initData[property];
    }

    private _removeListener: Function;
    private _tableEditSubscription: Subscription;
    private _additionalDataSubscription: Subscription;

    ngAfterViewInit() {
        if (this.editorMode == 'always-show') {
            this._tableEditSubscription = this.hostInstance.edit.subscribe(() => {
                this._cdr.markForCheck();
            })
            if (this.hostInstance.additionalColumnDefines) {
                this._additionalDataSubscription = this.hostInstance.additionalDataChange.subscribe(() => {
                    this._cdr.markForCheck();
                })
            }
            return;
        }
        if (this._$disabled) {
            this._inputEl.nativeElement.focus();
            this._removeListener = this._renderer.listen(this._inputEl.nativeElement, 'blur', () => this.dispatchChangeEvent(this.cellData))
        } else {
            this._input.focus();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._tableEditSubscription?.unsubscribe();
        this._additionalDataSubscription?.unsubscribe();
        if (this._removeListener) {
            this._removeListener();
            this._removeListener = null;
        }
    }
}

/**
 * @internal
 * 编辑单元格自动完成渲染器
 */
@Component({
    template: `
        <jigsaw-auto-complete-input [theme]="theme" [(value)]="cellData" width="100%" height="28px" [placeholder]="_$placeholder"
                                    (blur)="dispatchChangeEvent(cellData)" [valid]="_$valid" [clearable]="_$clearable"
                                    [disabled]="_$disabled" [data]="_$dropDownData" [filterOnFocus]="false"
                                    [maxDropDownHeight]="_$maxDropDownHeight" [closeDropDownOnSelect]="false">
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

    public get _$dropDownData() {
        return this._initDataJson?.hasOwnProperty('data') ? this._initDataJson.data : null;
    }

    public get _$maxDropDownHeight(): string {
        return this._initDataJson?.hasOwnProperty('maxDropDownHeight') ? this._initDataJson.maxDropDownHeight : null;
    }

    public get _$clearable(): boolean {
        return this._initDataJson?.hasOwnProperty('clearable') ? this._initDataJson.clearable : true;
    }

    public get _$placeholder(): string {
        return this._initDataJson?.hasOwnProperty('placeholder') ? this._initDataJson.placeholder : '';
    }

    public get _$disabled(): boolean {
        return this._initDataJson?.hasOwnProperty('disabled') ? this._initDataJson.disabled : false;
    }

    public get _$valid(): boolean {
        return this._initDataJson?.hasOwnProperty('valid') ? this._initDataJson.valid : true;
    }

    ngAfterViewInit() {
        if (this.editorMode == 'always-show') {
            return;
        }
        this.autoCompleteInput.focus();
    }
}

/**
 * @internal
 * 编辑单元格数字输入渲染器
 */
@Component({
    template: `
        <jigsaw-numeric-input [theme]="theme" #input [(value)]="cellData" width="100%" height="28px"
                              [placeholder]="_$placeholder" [valid]="_$valid" [disabled]="_$disabled"
                              (blur)="dispatchChangeEvent(cellData)" [min]="_$min" [max]="_$max" [step]="_$step">
        </jigsaw-numeric-input>
    `
})
export class TableCellNumericEditorRenderer extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawNumericInput)
    protected input: JigsawNumericInput;

    public get _$min(): number {
        return this._calcInitProperty('min', -Infinity);
    }

    public get _$max(): number {
        return this._calcInitProperty('max', Infinity);
    }

    public get _$step(): number {
        return this._calcInitProperty('step', 1);
    }

    ngAfterViewInit() {
        if (this.editorMode == 'always-show') {
            return;
        }
        this.input.focus();
    }
}

/**
 * @internal
 * head checkbox renderer
 */
@Component({
    template: `
        <jigsaw-checkbox [theme]="theme" [(checked)]="checked" [disabled]="_$disabled" [valid]="_$valid"
                         [title]="_$title" mode="minimalist">
        </jigsaw-checkbox>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeadCheckboxRenderer extends TableCellRendererBase {
    private _checked: CheckBoxStatus = CheckBoxStatus.unchecked;

    constructor(private _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_injector);
    }

    private _initDataJson: any;
    private _realColumn: number;

    private _updateInitData() {
        this._initDataJson = this.initData instanceof Function ?
            this.initData(this.tableData, this.row, this.column) : this.initData;
    }

    public get _$disabled() {
        return this._initDataJson?.hasOwnProperty('disabled') ? this._initDataJson.disabled : false;
    }

    public get _$valid() {
        return this._initDataJson?.hasOwnProperty('valid') ? this._initDataJson.valid : true;
    }

    public get _$title(): string {
        return this._initDataJson?.hasOwnProperty('title') ? this._initDataJson.title : '';
    }

    public get checked(): CheckBoxStatus {
        return this._checked;
    }

    public set checked(value: CheckBoxStatus) {
        this._checked = value;
        this.targetData.data.forEach((row, index) => {
            row[this.column] = value;
            if (this.targetData instanceof AdditionalTableData && !this._isCheckboxDisabled(index, this._realColumn)) {
                this.targetData.touchValueByRow(this.field, index, value);
            }
        });
        this.targetData.refresh();
    }

    private _isCheckboxDisabled(rowIndex: number, columnIndex: number): boolean {
        const element = this.hostInstance?._rowElementRefs?._results?.[rowIndex];
        if (!element) {
            return false;
        }
        const checkboxEle = element.nativeElement.cells[columnIndex].querySelector('.jigsaw-checkbox-host');
        if (!checkboxEle) {
            return false;
        }
        return checkboxEle.classList.contains('jigsaw-checkbox-disabled')
    }

    private _getRealColumnIndex(element: ElementRef): void {
        const td = element.nativeElement.closest('td');
        const tds = Array.from(element.nativeElement.closest('tr').querySelectorAll(':scope > td'));
        this._realColumn = tds.findIndex(item => item === td);
    }

    protected onDataRefresh(): void {
        this._getRealColumnIndex(this._elementRef);
        let type = 0;
        this.targetData.data.forEach((row, index) => {
            if (this._isCheckboxDisabled(index, this._realColumn)) {
                return;
            }
            let value = this.targetData instanceof AdditionalTableData ?
                this.targetData.getTouchedValueByRow(this.field, index) : undefined;
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
 * @internal
 */
export class TableCellToggleRendererBase extends TableCellRendererBase {
    constructor(protected _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector, protected _zone: NgZone) {
        super(_injector);
    }

    protected onDataRefresh() {
        this._updateChecked();
        this._updateTargetData();
        this._updateInitData();
    }

    protected _initDataJson: any;

    public get _$disabled() {
        return this._initDataJson?.hasOwnProperty('disabled') ? this._initDataJson.disabled : false;
    }

    public get _$valid() {
        return this._initDataJson?.hasOwnProperty('valid') ? this._initDataJson.valid : true;
    }

    private _updateInitData() {
        this._initDataJson = this.initData instanceof Function ?
            this.initData(this.tableData, this.row, this.column) : this.initData;
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
        let checked = this.targetData instanceof AdditionalTableData ?
            this.targetData.getTouchedValueByRow(this.field, this.row) : undefined;
        checked = CommonUtils.isDefined(checked) ? checked : this.cellData;
        this.checked = checked;
        this._changeDetectorRef.markForCheck();
    }

    private _updateTargetData() {
        if (!this.targetData) {
            return;
        }
        if (CommonUtils.isDefined(this.targetData.data[this.row])) {
            this.targetData.data[this.row][this.column] = this.checked;
            this._changeDetectorRef.markForCheck();
        }
    }

    onChange(value) {
        this.checked = value;
        if (this.targetData instanceof AdditionalTableData) {
            this.targetData.touchValueByRow(this.field, this.row, value);
        }
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
        // this.row == 0 to ensures print once
        if (this.targetData instanceof AdditionalTableData && !this.targetData.trackRowBy && this.row == 0) {
            console.warn('You may need to add a [trackRowBy="field-name"] attribute to ' +
                'the table if using a renderer which has status.');
        }
    }
}

/**
 * @internal
 * cell checkbox renderer
 */
@Component({
    template: `
        <jigsaw-checkbox [theme]="theme" [checked]="checked" [disabled]="_$disabled" [valid]="_$valid"
                         mode="minimalist" (checkedChange)="onChange($event)">
        </jigsaw-checkbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellCheckboxRenderer extends TableCellToggleRendererBase {
    constructor(protected _changeDetectorRef: ChangeDetectorRef,
                protected _injector: Injector, protected _zone: NgZone) {
        super(_changeDetectorRef, _injector, _zone);
    }
}

/**
 * @internal
 * switch renderer
 */
@Component({
    template: `
        <j-switch [theme]="theme" [checked]="checked" [readonly]="_$readonly" [disabled]="_$disabled" [valid]="_$valid"
                  [onLabel]="_$onLabel" [offLabel]="_$offLabel" [size]="_$size" (checkedChange)="onChange($event)">
        </j-switch>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellSwitchRenderer extends TableCellToggleRendererBase {
    constructor(protected _changeDetectorRef: ChangeDetectorRef,
                protected _injector: Injector, protected _zone: NgZone) {
        super(_changeDetectorRef, _injector, _zone);
    }

    /**
     * @internal
     */
    public get _$readonly(): boolean {
        return this._initDataJson?.hasOwnProperty('readonly') ? this._initDataJson.readonly : false;
    }

    /**
     * @internal
     */
    public get _$onLabel(): string {
        return this._initDataJson?.hasOwnProperty('onLabel') ? this._initDataJson.onLabel : '';
    }

    /**
     * @internal
     */
    public get _$offLabel(): string {
        return this._initDataJson?.hasOwnProperty('offLabel') ? this._initDataJson.offLabel : '';
    }

    /**
     * @internal
     */
    public get _$size(): 'default' | 'small' | 'medium' {
        return this._initDataJson?.hasOwnProperty('size') ? this._initDataJson.size : 'default';
    }
}

/**
 * key值必须是 `StatusType` 类型
 */
export type ProgressStatusConfig = {
    [status: string]: {text: string, icon: string}
};

/**
 * @internal
 * cell Progress renderer
 */
@Component({
    template: `
        <ng-container [ngSwitch]="_$viewType">
            <j-progress *ngSwitchCase="'process'" [theme]="theme" [value]="cellData" width="80%" [status]="_$status"
                        [labelPosition]="_$labelPosition" [showMarker]="false" [animate]="_$animate">
            </j-progress>
            <jigsaw-icon *ngSwitchDefault #status style="font-size:var(--font-size-text-base)">
            </jigsaw-icon>
        </ng-container>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellProgressRenderer extends TableCellRendererBase implements AfterViewInit {
    constructor(protected _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector, protected _zone: NgZone) {
        super(_injector);
    }

    public get _$viewType(): StatusType {
        if (['success', 'warning', 'error', 'finish', 'disabled'].indexOf(this.cellData) != -1) {
            return this.cellData;
        }
        const n = parseFloat(this.cellData);
        if (isNaN(n) || n < 0) {
            return 'error';
        }
        return n > 100 ? 'success' : 'process';
    }

    @ViewChild('status')
    private _status: JigsawIcon;

    protected onDataRefresh(): void {
        const type: StatusType = this._$viewType;
        const config = this.initData?.statusConfig?.[type];
        this._status?.updateStatus(type, config?.text, config?.icon);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public initData: {animate?: boolean, status?: Status, labelPosition?: LabelPosition, statusConfig: ProgressStatusConfig};

    public get _$animate(): boolean {
        return !!this._calcInitProperty('animate', false);
    }

    public get _$status() {
        return this._calcInitProperty('status', 'processing');
    }

    public get _$labelPosition() {
        return this._calcInitProperty('labelPosition', 'none');
    }

    ngAfterViewInit() {
        this.onDataRefresh();
    }
}

export type InitDataGenerator = (td: TableData, row: number, column: number) =>
    ArrayCollection<any> | any[] | Observable<ArrayCollection<any> | any[]>;

export type SelectRendererInitData = {
    disabled?: Function | boolean;
    valid?: Function | boolean;
    searchable?: boolean;
    placeholder: string;
    initData: InitDataGenerator | ArrayCollection<any> | any[];
}

/**
 * @internal
 * Select renderer
 */
// @dynamic
@Component({
    template: `
        <jigsaw-select [theme]="theme" [value]="selected" [data]="data" height="28px" [disabled]="_$disabled"
                       [valid]="_$valid" [optionCount]="5" width="100%" [openTrigger]="_$openTrigger" [placeholder]="_$placeholder"
                       closeTrigger="mouseleave" (valueChange)="_$handleValueChange($event)"
                       [searchable]="_$searchable">
        </jigsaw-select>
    `,
    styles: [
        `
            .jigsaw-table-cell-content .jigsaw-select-host .jigsaw-combo-select-host .jigsaw-combo-select-selection {
                min-height: 28px;
                height: 28px;
            }

            .jigsaw-table-cell-content .jigsaw-select-host .jigsaw-combo-select-host .jigsaw-combo-select-selection .jigsaw-combo-select-selection-rendered {
                min-height: 26px;
                height: 26px;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellSelectRenderer extends TableCellRendererBase implements OnInit, OnDestroy {
    public selected: { label: string };
    public initData: InitDataGenerator | ArrayCollection<any> | any[] | SelectRendererInitData;
    public data: ArrayCollection<any> | any[];

    constructor(private _changeDetector: ChangeDetectorRef, private _renderer: Renderer2, private _elementRef: ElementRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_injector);
        this._removeKeyDownHandler = this._renderer.listen('document', 'keydown.esc', this._onKeyDown.bind(this));
    }

    private readonly _removeKeyDownHandler: Function;

    private _hostCellEl: HTMLElement;

    private _onKeyDown($event) {
        if ($event.type == 'click' && $event.composedPath().find(el => el == this._hostCellEl)) {
            return;
        }
        this.dispatchChangeEvent(this.selected ? this.selected.label : '');
    }

    /**
     * @internal
     */
    public get _$openTrigger(): "click" | "mouseenter" {
        return this.editorMode == 'always-show' ? 'click' : 'mouseenter';
    }

    /**
     * @internal
     */
    public _$handleValueChange(selectedValue: { label: string }) {
        if (!selectedValue || selectedValue.label == this.cellData) {
            return;
        }
        this.cellData = selectedValue.label;
        this.dispatchChangeEvent(selectedValue.label);
    }

    private _selectionElement: HTMLElement;

    private _setBorderColor(color: string): void {
        if (!this._selectionElement) {
            this._selectionElement = this._elementRef.nativeElement.querySelector(
                '.jigsaw-table-cell-content .jigsaw-select-host .jigsaw-combo-select-host .jigsaw-combo-select-selection');
        }
        if (!this._selectionElement || this._selectionElement.style.borderColor == color) {
            return;
        }
        this._selectionElement.style.borderColor = color;
    }

    public get _$valid(): boolean {
        const valid = !!this._calcInitProperty('valid', true);
        // 渲染器里的select的边框默认是透明的，这导致valid==false时红色框框无法显示
        // 修改border样式必须要及时，因此只得在这里修改border样式，_setBorderColor已充分考虑了性能问题
        this._setBorderColor(valid ? 'transparent' : '');
        return valid;
    }

    public get _$searchable(): boolean {
        return !!this._calcInitProperty('searchable', false);
    }

    private _formatData(data: any): { label: string }[] {
        if (!(data instanceof Array) && !(data instanceof ArrayCollection)) {
            return data;
        }
        return data.map(item => {
            if (!item || item.hasOwnProperty('label')) {
                // !item 表示下拉选项转成横线的情况
                return item;
            }
            if (item && typeof item == 'object') {
                // item是非法对象
                console.error('the data of table select renderer must be type of Array<{label: string} | string>');
                return item;
            }
            return {label: item};
        });
    }

    protected onDataRefresh() {
        const initData = this.initData?.hasOwnProperty('initData') ? (this.initData as SelectRendererInitData).initData : this.initData;
        if (initData instanceof Function) {
            const data = initData(this.tableData, this.row, this.column);
            if (data instanceof Observable) {
                this.data = [];
                const subscription = data.subscribe(
                    value => {
                        subscription.unsubscribe();
                        if (!this._hasDestroyed) {
                            this.data = this._formatData(value);
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
                this.data = this._formatData(data);
            }
        } else {
            this.data = this._formatData(initData);
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
        if (CommonUtils.isDefined(value) && value !== '') {
            this.selected = {label: value};
        }
    }

    private _hasDestroyed: boolean;
    private _removeClickHandler: Function;

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

/**
 * @internal
 */
@Component({
    template: `
        <div class="jigsaw-table-tree-cell">
            <span [style.margin-left]="indent"></span>
            <span class="jigsaw-table-tree-bar" *ngIf="cellData.isParent" (click)="_$toggleOpenNode()">
                <span *ngIf="cellData.open; else close" class="iconfont iconfont-ea09"></span>
                <ng-template #close>
                    <span class="iconfont iconfont-ea1c"></span>
                </ng-template>
            </span>
            <span>{{cellData.data}}</span>
        </div>
    `,
    styles: [
        `
            .jigsaw-table-tree-cell {
                justify-content: flex-start;
                margin-left: 8px;
            }
        `
    ],
})
export class TreeTableCellRenderer extends TableCellRendererBase {
    public cellData: TreeTableCellData;
    public tableData: PageableTreeTableData;

    public get indent(): string {
        if (typeof this.cellData.id !== 'string') {
            return '0px';
        }
        return (this.cellData.id.split("-").length - 2) * 20 + 'px';
    }

    /**
     * @internal
     */
    public _$toggleOpenNode() {
        const indexes = this.cellData.id.split('-');
        indexes.shift();
        this.tableData.toggleOpenNode(indexes, !this.cellData.open);
    }
}

/**
 * @internal
 * 换行
 */
@Component({
    template: `
        <div class="jigsaw-table-option-box"
             jigsaw-draggable
             jigsaw-droppable
             [title]="_$title"
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

    public get _$icon(): string {
        return this._calcInitProperty('icon', 'iconfont iconfont-e515');
    }

    public get _$label(): string {
        return this._calcInitProperty('label', '');
    }

    public get _$title(): string {
        return this._calcInitProperty('title', '');
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
        const event = {
            cellType: "TableDragReplaceRow",
            event: {
                name: "dragStart",
                data: dragInfo
            },
            cellData: this.cellData,
            row: this.row,
            field: this.field
        };
        this.cellStatusChange.emit(event);
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
        const event = {
            cellType: "TableDragReplaceRow",
            event: {
                name: "drop",
                data: dragInfo
            },
            cellData: this.cellData,
            row: this.row,
            field: this.field
        };
        this.cellStatusChange.emit(event);
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
        this._allRows = CommonUtils.getParentNodeBySelector(this._elementRef.nativeElement, "table").querySelectorAll("tr");
        this._renderer.setStyle(this._elementRef.nativeElement.parentElement.parentElement, "padding", "0px");
    }
}

@NgModule({
    declarations: [
        DefaultCellRenderer, TableCellTextEditorRenderer, TableHeadCheckboxRenderer,
        TableCellCheckboxRenderer, TableCellSwitchRenderer, TableCellSelectRenderer, TableCellNumericEditorRenderer,
        TableCellAutoCompleteEditorRenderer, TreeTableCellRenderer, TableCellPasswordRenderer, TableDragReplaceRow,
        TableCellProgressRenderer
    ],
    imports: [
        CommonModule, JigsawCheckBoxModule, JigsawInputModule, JigsawSwitchModule, JigsawSelectModule, JigsawNumericInputModule,
        JigsawAutoCompleteInputModule, JigsawDraggableModule, JigsawDroppableModule, JigsawProgressModule, JigsawIconModule
    ]
})
export class JigsawTableRendererModule {
}
