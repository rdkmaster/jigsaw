import {Component, Input, OnInit} from "@angular/core";
import {AbstractJigsawComponent} from "../../common/common";

/**
 * 代表了`JigsawSteps`组件的一个步骤，需要配合`JigsawSteps`组件一起使用
 *
 * $since = v1.1.7
 */
@Component({
    selector: 'jigsaw-step-item,j-step-item',
    templateUrl: 'step-item.html',
    host: {
        '[class.jigsaw-step-item]': 'true',
    }
})
export class JigsawStepItem extends AbstractJigsawComponent implements OnInit {

    private _status: "waiting" | "done" | "error" | "warning" | "skipped" | "processing" | "running" | "starting" | "ending" = "waiting";

    /**
     * 用于设置当前步骤的状态
     *
     * $demo = steps/basic
     * $demo = steps/step-interactive
     */
    @Input()
    public get status(): "waiting" | "done" | "error" | "warning" | "skipped" | "processing" | "running" | "starting" | "ending" {
        return this._status;
    }

    public set status(value: "waiting" | "done" | "error" | "warning" | "skipped" | "processing" | "running" | "starting" | "ending") {
        if (!value) return;
        this._status = value;
        if (this.initialized) {
            this._setStepStatusClass()
        }
    }

    /**
     * 设置`waiting`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public waitingIcon: string = 'fa-file-text-o';

    /**
     * 设置`done`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public doneIcon: string = 'fa-check-square-o';

    /**
     * 设置`processing`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public processingIcon: string = 'fa-cog fa-spin fa-2x fa-fw';

    /**
     * 设置`error`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public errorIcon: string = 'fa-times';

    /**
     * 设置`skipped`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public skippedIcon: string = 'fa-ban';

    /**
     * 设置`warning`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public warningIcon: string = 'fa-exclamation-triangle';
    /**
     * 设置`starting`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public startingIcon: string = 'fa-hourglass-start';
    /**
     * 设置`ending`状态的图标，仅支持font-awesome和Jigsaw自研的iconfont图标
     *
     * $demo = steps/custom-icons
     */
    @Input() public endingIcon: string = 'fa-hourglass-end';

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
            case "running":
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
            case "starting":
                this._$stepStatusIconClass = this.startingIcon;
                break;
            case "ending":
                this._$stepStatusIconClass = this.endingIcon;
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
