import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild,
    Injector
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbstractJigsawComponent } from "../../common/common";
import { ArrayCollection } from "../../common/core/data/array-collection";
import { JigsawListLite } from "../list-and-tile/list-lite";
import { CommonUtils } from "../../common/core/utils/common-utils";
import { RequireMarkForCheck } from "../../common/decorator/mark-for-check";
import { JigsawSelectBase } from "./select-base";

/**
 * 选择控件
 * - 支持单选和多选，自动给出单选的对象和多选的数组
 * - 支持静态数据，异步数据和数据回填
 * - 支持控件不可用
 * - 支持文本溢出显示省略号，鼠标移入有提示信息
 * - 支持设置显示多少option，并自动产生滚动条
 * - 支持Array、ArrayCollection、LocalPageableArray、PageableArray的检索
 * - 支持设置下拉触发的方式
 *
 */
@Component({
    selector: "jigsaw-select-collapse, j-select-collapse",
    templateUrl: "select-collapse.html",
    host: {
        "[class.jigsaw-select-collapse-host]": "true",
        "[class.jigsaw-select-collapse-single]": "!multipleSelect",
        "[class.jigsaw-select-collapse-multiple]": "multipleSelect",
        "[class.jigsaw-select-collapse-show-overall]": "overall",
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"'
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelectCollapse), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelectCollapse extends JigsawSelectBase {
    constructor(
        protected _zone: NgZone,
        protected _changeDetector: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector
    ) {
        super(_changeDetector, _injector);
    }

    /**
     * 设置组名的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public groupName: string = "groupName";

    protected _data: ArrayCollection<object>;
    protected vaildData: any[];
    public _$allOptions: any[];

    /**
     * 提供选择的数据集合
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<object> | object[] {
        return this._data;
    }

    public set data(value: ArrayCollection<object> | object[]) {
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
        this._$allOptions = [];
        value.forEach(item => {
            this._$allOptions = this._$allOptions.concat(item["data"]);
        });
        this.vaildData = this._$allOptions.filter(item => item["disabled"] !== true);
    }
}
