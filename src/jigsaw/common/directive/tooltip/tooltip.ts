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
    template: `
        <div class="jigsaw-tooltip">
            <div [trustedHtml]="tooltip" [trustedHtmlContext]="initData?.context"></div>
        </div>
    `,
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
    /**
     * @internal
     */
    public _jigsawFloatOpenDelay: number = 200;
    @Input('jigsawTooltipOpenDelay')
    public get jigsawFloatOpenDelay(): number {
        return this._jigsawFloatOpenDelay;
    }

    public set jigsawFloatOpenDelay(value: number) {
        this._jigsawFloatOpenDelay = value;
    }

    protected _jigsawFloatCloseDelay: number = 10;
    @Input('jigsawTooltipCloseDelay')
    public get jigsawFloatCloseDelay(): number {
        return this._jigsawFloatCloseDelay;
    }

    public set jigsawFloatCloseDelay(value: number) {
        this._jigsawFloatCloseDelay = value;
    }

    protected _jigsawFloatPosition: FloatPosition = 'top';
    @Input('jigsawTooltipPosition')
    public get jigsawFloatPosition(): FloatPosition {
        return this._jigsawFloatPosition;
    }

    public set jigsawFloatPosition(value: FloatPosition) {
        this._jigsawFloatPosition = value;
    }

    @Input('jigsawTooltipRenderAs')
    public renderAs: TooltipRenderAs = 'plain-text';
    @Input('jigsawTooltipContext')
    public context: any;

    private _jigsawFloatOpen: boolean;
    @Input('jigsawTooltipOpen')
    public get jigsawFloatOpen(): boolean {
        return this._jigsawFloatOpen;
    }

    public set jigsawFloatOpen(value: boolean) {
        this._jigsawFloatOpen = value;
    }

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

    protected _jigsawFloatInitData: TooltipInitData = {};
    /**
     * @internal
     */
    public get jigsawFloatInitData(): TooltipInitData {
        return this._jigsawFloatInitData;
    }

    public set jigsawFloatInitData(value: TooltipInitData) {
        this._jigsawFloatInitData = value;
    }

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
