import {Component, Input, OnInit} from "@angular/core";
import {AbstractJigsawComponent} from "../common";

/**
 * 代表了`JigsawSteps`组件的一个步骤，需要配合`JigsawSteps`组件一起使用
 */
@Component({
    selector: 'jigsaw-step-item,j-step-item',
    templateUrl: 'step-item.html',
    host: {
        '[class.jigsaw-step-item]': 'true',
    }
})
export class JigsawStepItem extends AbstractJigsawComponent implements OnInit {

    private _status: "waiting" | "done" | "error" | "warning" | "skipped" | "processing" = "waiting";

    /**
     * 用于设置当前步骤的状态
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input()
    public get status(): "waiting" | "done" | "error" | "warning" | "skipped" | "processing" {
        return this._status;
    }

    public set status(value: "waiting" | "done" | "error" | "warning" | "skipped" | "processing") {
        if (!value) return;
        this._status = value;
        if (this.initialized) {
            this._setStepStatusClass()
        }
    }

    /**
     * 设置`waiting`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input() public waitingIcon: string = 'fa-file-text-o';

    /**
     * 设置`done`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input() public doneIcon: string = 'fa-check-square-o';

    /**
     * 设置`processing`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input() public processingIcon: string = 'fa-cog fa-spin fa-3x fa-fw';

    /**
     * 设置`error`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input() public errorIcon: string = 'fa-times';

    /**
     * 设置`skipped`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input() public skippedIcon: string = 'fa-ban';

    /**
     * 设置`warning`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input() public warningIcon: string = 'fa-exclamation-triangle';

    /**
     * @internal
     */
    public _$stepStatusClass: string;
    /**
     * @internal
     */
    public _$stepStatusIconClass: string;

    private _setStepStatusClass() {
        this._$stepStatusClass = 'jigsaw-step-item-' + this._status;
        switch (this._status) {
            case "waiting":
                this._$stepStatusIconClass = this.waitingIcon;
                break;
            case "done":
                this._$stepStatusIconClass = this.doneIcon;
                break;
            case "processing":
                this._$stepStatusIconClass = this.processingIcon;
                break;
            case "error":
                this._$stepStatusIconClass = this.errorIcon;
                break;
            case "skipped":
                this._$stepStatusIconClass = this.skippedIcon;
                break;
            case "warning":
                this._$stepStatusIconClass = this.warningIcon;
                break;
            default:
                this._$stepStatusIconClass = this.waitingIcon;
                break;
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._setStepStatusClass();
    }
}
