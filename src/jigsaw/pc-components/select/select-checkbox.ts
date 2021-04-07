import { Component, NgZone, Injector, ChangeDetectorRef, Input } from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { ArrayCollection } from "jigsaw/common/core/data/array-collection";

@Component({
    selector: "jigsaw-select-checkbox,j-select-checkbox",
    templateUrl: "select-checkbox.html",
    host: {
        "[class.jigsaw-select-checkbox-host]": "true",
        "[class.jigsaw-select-checkbox-overall]": "overall"
    }
})
export class JigsawSelectCheckbox extends AbstractJigsawComponent {
    constructor(
        protected _zone: NgZone,
        private _changeDetector: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector
    ) {
        super(_zone);
    }

    private _data: ArrayCollection<object>;
    private vaildData: any[];

    /**
     * 提供选择的数据集合
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<object> {
        return this._data;
    }

    public set data(value: ArrayCollection<object>) {
        this._data = value;
        this.vaildData = this._data.filter(item => item["disabled"] !== true);
    }

    /**
     * 设置对象的标识
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string | string[];

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "label";

    /**
     * 设置多选框的placeholder
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public placeholder: string;

    /**
     * 设置多选框显示详细结果/统计结果
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public overall: boolean = false;

    /**
     * 禁用状态
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean = false;

    /**
     * 是否可以清空
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearable: boolean = false;

    /**
     * 已选选项数组
     *
     * @internal
     */
    public _$selectedItems: ArrayCollection<any> | any[];

    /**
     * 全选
     *
     * @internal
     */
    public _$selectAllChecked: boolean = false;
    public _$selectAll() {
        if (this._$selectedItems && this._$selectedItems.length === this.vaildData.length) {
            this._$selectedItems = [];
            this._$selectAllChecked = false;
        } else {
            this._$selectedItems = this.vaildData;
            this._$selectAllChecked = true;
        }
    }
    public _$checkSelectAll() {
        if (this._$selectedItems.length === this.vaildData.length) {
            this._$selectAllChecked = true;
        } else {
            this._$selectAllChecked = false;
        }
    }

    /**
     * 查看已选
     *
     * @internal
     */
    public _$listFilter: boolean = false;
    public _$listShowSelected() {
        this._$listFilter = true;
    }
    public _$listShowAll() {
        this._$listFilter = false;
    }
}
