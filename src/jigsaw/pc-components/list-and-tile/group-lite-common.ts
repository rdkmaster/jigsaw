import {AbstractJigsawComponent} from "../../common/common";
import {Directive, EventEmitter, HostListener, Injector, Input, Output} from "@angular/core";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {GroupOptionValue} from "./group-common";
import {ControlValueAccessor} from "@angular/forms";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

@Directive()
export class AbstractJigsawGroupLiteComponent extends AbstractJigsawComponent implements ControlValueAccessor {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super()
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public valid: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public data: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    private _trackItemBy: string | string[];

    /**
     * 设置对象的标识
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get trackItemBy(): string | string[] {
        if (this.data && (typeof this.data[0] == 'string' || typeof this.data[0] == 'number')) {
            this._trackItemBy = null;
        } else if (CommonUtils.isUndefined(this._trackItemBy) && this.data && typeof this.data[0] !== 'string') {
            this._trackItemBy = [this.labelField];
        }
        return this._trackItemBy;
    }

    public set trackItemBy(value: string | string[]) {
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = 'label';

    /**
     * 多选开关
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleSelect: boolean;

    /**
     * 选择的结果集
     */
    @RequireMarkForCheck()
    @Input()
    public selectedItems: ArrayCollection<any> | any[];

    /**
     * 选择结果发生变化时，向外面发送事件
     */
    @Output()
    public selectedItemsChange = new EventEmitter<any[]>();

    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this._trackItemBy);
    };

    /**
     * @internal
     */
    public _$handleSelectChange(items) {
        this.selectedItemsChange.emit(items);
        this._propagateChange(items);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected _propagateChange: any = () => {
    };
    protected _onTouched: any = () => {
    };

    public writeValue(value: any): void {
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    @HostListener('click')
    onClickTrigger(): void {
        this._onTouched();
    }
}
