import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { JigsawSelectGroupBase } from "./select-base";
import { CommonUtils } from '../../common/core/utils/common-utils';
import { WingsTheme } from "../../common/common";

@WingsTheme('select.scss')
@Component({
    selector: "jigsaw-group-select, j-group-select",
    templateUrl: "collapse-and-group-select.html",
    host: {
        "[class.jigsaw-group-select-host]": "true",
        "[class.jigsaw-select-single-select]": "!multipleSelect",
        "[class.jigsaw-select-multiple-select]": "multipleSelect",
        "[class.jigsaw-select-show-statistics]": "useStatistics",
        "[class.jigsaw-select-small]": 'size == "small"',
        "[class.jigsaw-select-medium]": 'size == "medium"',
        "[class.jigsaw-select-large]": 'size == "large"',
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"',
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelectGroup), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelectGroup extends JigsawSelectGroupBase implements OnInit {
    /**
     * @internal
     */
    public _$dropdownType: "collapse" | "group" = "group";

    ngOnInit() {
        super.ngOnInit();
        // 设置默认选中的初始值
        if (CommonUtils.isDefined(this.value)) {
            this._$checkSelectAll();
        }
    }
}

@WingsTheme('select.scss')
@Component({
    selector: "jigsaw-collapse-select, j-collapse-select",
    templateUrl: "collapse-and-group-select.html",
    host: {
        "[class.jigsaw-collapse-select-host]": "true",
        "[class.jigsaw-select-single-select]": "!multipleSelect",
        "[class.jigsaw-select-multiple-select]": "multipleSelect",
        "[class.jigsaw-select-show-statistics]": "useStatistics",
        "[class.jigsaw-select-small]": 'size == "small"',
        "[class.jigsaw-select-medium]": 'size == "medium"',
        "[class.jigsaw-select-large]": 'size == "large"',
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"'
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelectCollapse), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelectCollapse extends JigsawSelectGroupBase implements OnInit {
    /**
     * @internal
     */
    public _$dropdownType: "collapse" | "group" = "collapse";

    ngOnInit() {
        super.ngOnInit();
        // 设置默认选中的初始值
        if (CommonUtils.isDefined(this.value)) {
            this._$checkSelectAll();
        }
    }
}
