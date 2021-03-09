import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    EventEmitter,
    Input,
    NgModule,
    Output,
    ViewEncapsulation
} from "@angular/core";
import {ButtonInfo, IPopupable, PopupService} from "../../service/popup.service";
import {FloatPosition, JigsawFloatBase} from "../float/float";
import {JigsawTrustedHtmlModule} from "../trusted-html/trusted-html";
import {CommonUtils} from "../../core/utils/common-utils";

export type TooltipInitData = { tooltip?: string, renderAs?: TooltipRenderAs, context?: any };
export type TooltipRenderAs = 'plain-text' | 'html';

@Component({
    // template: '<div class="jigsaw-tooltip" [trustedHtml]="tooltip" [trustedHtmlContext]="initData?.context"></div>',
    template: '<div class="jigsaw-tooltip"><span>{{tooltip}}</span></div>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTooltipComponent implements IPopupable {
    public answer: EventEmitter<ButtonInfo>;
    public initData: TooltipInitData;

    constructor(public changeDetector: ChangeDetectorRef) {
    }

    public get tooltip(): string {
        if (!this.initData || CommonUtils.isUndefined(this.initData.tooltip)) {
            return '...';
        }
        let tooltip = this.initData.tooltip.toString();
        if (this.initData.renderAs !== 'html') {
            tooltip = tooltip.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }
        return tooltip;
    }
}

@Directive({
    selector: '[jigsaw-tooltip],[j-tooltip],[jigsawTooltip]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)",
        '(click)': "_$onHostClick()"
    }
})
export class JigsawTooltip extends JigsawFloatBase {
    @Input('jigsawTooltipOpenDelay')
    public jigsawFloatOpenDelay: number = 200;
    @Input('jigsawTooltipCloseDelay')
    public jigsawFloatCloseDelay: number = 10;
    @Input('jigsawTooltipPosition')
    public jigsawFloatPosition: FloatPosition = 'top';
    @Input('jigsawTooltipRenderAs')
    public renderAs: TooltipRenderAs = 'plain-text';
    @Input('jigsawTooltipContext')
    public context: any;
    @Input('jigsawTooltipOpen')
    public jigsawFloatOpen: boolean;

    @Output('jigsawTooltipOpenChange')
    public jigsawFloatOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _tooltip: string | number;

    @Input()
    public get jigsawTooltip(): string | number {
        return this._tooltip;
    }

    public set jigsawTooltip(value: string | number) {
        this._tooltip = value;
        this.jigsawFloatInitData.tooltip = CommonUtils.isDefined(value) ? value.toString() : undefined;
        this.jigsawFloatInitData.renderAs = this.renderAs;
        this.jigsawFloatInitData.context = this.context;
        this.runAfterMicrotasks(() => {
            // 这if等于在做非空判断
            if (this.popupInstance instanceof JigsawTooltipComponent) {
                this.popupInstance.changeDetector.markForCheck();
            }
        });
    }

    /**
     * @internal
     */
    public jigsawFloatInitData: TooltipInitData = {};

    protected _init(): void {
        this.jigsawFloatTarget = JigsawTooltipComponent;
        this.jigsawFloatOptions = {borderType: 'pointer', size: {minWidth: 30}};
        this.jigsawFloatCloseTrigger = 'mouseleave';
        this.jigsawFloatOpenTrigger = 'mouseenter';
    }
}

@NgModule({
    declarations: [JigsawTooltip, JigsawTooltipComponent],
    exports: [JigsawTooltip], imports: [JigsawTrustedHtmlModule],
    providers: [PopupService]
})
export class JigsawTooltipModule {
}
