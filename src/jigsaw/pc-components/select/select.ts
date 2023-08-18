import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { JigsawSelectBase } from "./select-base";
import { WingsTheme } from "../../common/common";

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
@WingsTheme('select.scss')
@Component({
    selector: "jigsaw-select, j-select",
    templateUrl: "select.html",
    host: {
        "[attr.data-theme]": "theme",
        "[class.jigsaw-select-host]": "true",
        "[class.jigsaw-select-single-select]": "!multipleSelect",
        "[class.jigsaw-select-multiple-select]": "multipleSelect",
        "[class.jigsaw-select-show-statistics]": "useStatistics",
        "[class.jigsaw-select-with-max-width]": "!!maxWidth",
        "[class.jigsaw-select-small]": 'size == "small"',
        "[class.jigsaw-select-medium]": 'size == "medium"',
        "[class.jigsaw-select-large]": 'size == "large"',
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"',
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelect), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelect extends JigsawSelectBase { }
