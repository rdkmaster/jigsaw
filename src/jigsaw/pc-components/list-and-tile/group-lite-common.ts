import {AbstractJigsawComponent} from "../common";
import {EventEmitter, Input, Output} from "@angular/core";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {GroupOptionValue} from "./group-common";
import {ControlValueAccessor} from "@angular/forms";
import {CommonUtils} from "../../common/core/utils/common-utils";

export class AbstractJigsawGroupLiteComponent extends AbstractJigsawComponent implements ControlValueAccessor {
    @Input() public valid: boolean = true;

    @Input()
    public data: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    /**
     * 设置对象的标识
     */
    private _trackItemBy: string | string[];

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
     * @type {string}
     */
    @Input()
    public labelField: string = 'label';

    /**
     * 多选开关
     *
     */
    @Input() public multipleSelect: boolean;

    /**
     * 选择的结果集
     *
     */
    @Input()
    public selectedItems: ArrayCollection<any> | any[];

    /**
     * 选择结果发生变化时，向外面发送事件
     * @type {EventEmitter<any[]>}
     *
     */
    @Output() public selectedItemsChange = new EventEmitter<any[]>();

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

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {

    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

}
