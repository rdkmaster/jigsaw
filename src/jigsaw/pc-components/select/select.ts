import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    NgZone,
    OnInit,
    Injector
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonUtils } from "../../common/core/utils/common-utils";
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
    selector: "jigsaw-select, j-select",
    templateUrl: "select.html",
    host: {
        "[class.jigsaw-select-host]": "true",
        "[class.jigsaw-select-single-select]": "!multipleSelect",
        "[class.jigsaw-select-multiple-select]": "multipleSelect",
        "[class.jigsaw-select-show-statistics]": "useStatistics",
        "[class.jigsaw-select-with-max-width]": "!!maxWidth",
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"'
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelect), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelect extends JigsawSelectBase implements OnInit {
    constructor(
        protected _zone: NgZone,
        protected _changeDetector: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector
    ) {
        super(_changeDetector, _injector);
    }

    ngOnInit() {
        super.ngOnInit();
        // 设置默认选中的初始值
        if (CommonUtils.isDefined(this.value)) {
            this.writeValue(this.value, false);
        }
    }
}
