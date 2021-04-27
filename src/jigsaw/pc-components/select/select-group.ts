import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, NgZone, Injector } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { JigsawSelectGroupBase } from "./select-base";

@Component({
    selector: "jigsaw-select-group, j-select-group",
    templateUrl: "select.html",
    host: {
        "[class.jigsaw-select-group-host]": "true",
        "[class.jigsaw-select-group-single]": "!multipleSelect",
        "[class.jigsaw-select-group-multiple]": "multipleSelect",
        "[class.jigsaw-select-group-show-overall]": "overall",
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"'
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelectGroup), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelectGroup extends JigsawSelectGroupBase {
    constructor(
        protected _zone: NgZone,
        protected _changeDetector: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector
    ) {
        super(_zone, _changeDetector, _injector);
    }

    public type = "group";
}

@Component({
    selector: "jigsaw-select-collapse, j-select-collapse",
    templateUrl: "select.html",
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
export class JigsawSelectCollapse extends JigsawSelectGroupBase {
    constructor(
        protected _zone: NgZone,
        protected _changeDetector: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector
    ) {
        super(_zone, _changeDetector, _injector);
    }

    public type = "collapse";
}
