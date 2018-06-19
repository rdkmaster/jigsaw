import {AbstractJigsawComponent} from "../common";
import {EventEmitter, Input, Output} from "@angular/core";
import {ArrayCollection} from "../../core/data/array-collection";
import {GroupOptionValue} from "./group-common";
import {ControlValueAccessor} from "@angular/forms";
import {InternalUtils} from "../../core/utils/internal-utils";

export class AbstractJigsawGroupLiteComponent extends AbstractJigsawComponent implements ControlValueAccessor {

    @Input()
    public data: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    /**
     * 设置对象的标识
     */
    @Input()
    public trackItemBy: string | string[];

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
        return InternalUtils.trackByFn(this.trackItemBy);
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
        if (!this.trackItemBy && this.data && typeof this.data[0] !== 'string') {
            this.trackItemBy = this.labelField;
        }
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
