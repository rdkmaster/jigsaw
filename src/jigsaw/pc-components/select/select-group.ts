import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, NgZone, Injector } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { JigsawSelectGroupBase } from "./select-base";

@Component({
    selector: "jigsaw-group-select, j-group-select",
    templateUrl: "select.html",
    host: {
        "[class.jigsaw-group-select-host]": "true",
        "[class.jigsaw-select-single]": "!multipleSelect",
        "[class.jigsaw-select-multiple]": "multipleSelect",
        "[class.jigsaw-select-show-overall]": "overall",
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"'
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelectGroup), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelectGroup extends JigsawSelectGroupBase {


    /**
     * select分组下拉的类型，用于给float添加class进行样式控制
     */
    public _$type = "group";
}

@Component({
    selector: "jigsaw-collapse-select, j-select-collapse",
    templateUrl: "select.html",
    host: {
        "[class.jigsaw-collapse-select-host]": "true",
        "[class.jigsaw-select-single-select]": "!multipleSelect",
        "[class.jigsaw-select-multiple-select]": "multipleSelect",
        "[class.jigsaw-select-show-overall]": "overall",
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"'
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelectCollapse), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelectCollapse extends JigsawSelectGroupBase {


    /**
     * select分组下拉的类型，用于给float添加class进行样式控制
     */
    public _$type = "collapse";
}
