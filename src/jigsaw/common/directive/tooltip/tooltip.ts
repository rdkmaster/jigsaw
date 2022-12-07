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
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

export type TooltipInitData = { tooltip?: string, renderAs?: TooltipRenderAs, context?: any, theme?:'light' | 'dark'};
export type TooltipRenderAs = 'plain-text' | 'html';

/**
 * @internal
 */
@Component({
    template: `
        <div class="jigsaw-tooltip"
            [ngClass]="{'jigsaw-tooltip-light':initData?.theme == 'light',
                        'jigsaw-tooltip-dark':initData?.theme == 'dark'}">
            <div [trustedHtml]="tooltip" [trustedHtmlContext]="initData?.context" [perfectScrollbar]="{suppressScrollX: true, wheelSpeed: 0.5, minScrollbarLength: 20}"></div>
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
        '(mouseenter)': "_$isOverflow() && _$openByHover($event)",
        '(mouseleave)': "_$isOverflow() && _$closeByHover($event, 1)",
        '(click)': "_$isOverflow() && _$onHostClick()"
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
    @Input('jigsawTooltipOpenTrigger')
    public jigsawFloatOpenTrigger: 'click' | 'mouseenter' | 'none' = 'mouseenter';
    @Input('jigsawTooltipCloseTrigger')
    public jigsawFloatCloseTrigger: 'click' | 'mouseleave' | 'none' = 'mouseleave';
    @Input('jigsawTooltipOverflowOnly')
    public overflowOnly: boolean = false;

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
        this.jigsawFloatInitData.theme = this._theme;
        this.runAfterMicrotasks(() => {
            // 这if等于在做非空判断
            if (this.popupInstance instanceof JigsawTooltipComponent) {
                this.popupInstance.changeDetector.markForCheck();
            }
        });
    }

    private _theme: 'light' | 'dark' = 'light';

    @Input()
    public get jigsawTooltipTheme(): 'light' | 'dark' {
        return this._theme;
    }

    public set jigsawTooltipTheme(value: 'light' | 'dark') {
        if (value === 'dark') {
            this._theme = 'dark';
            this.jigsawFloatOptions.borderColor = 'transparent';
            this.jigsawFloatInitData.theme = 'dark';
        } else {
            this._theme = 'light';
            this.jigsawFloatOptions.borderColor = '#e5e5e5';
            this.jigsawFloatInitData.theme = 'light';
        }
    }

    /**
     * @internal
     */
    public jigsawFloatInitData: TooltipInitData = {};

    protected _init(): void {
        this.jigsawFloatTarget = JigsawTooltipComponent;
        this.jigsawFloatOptions = { borderType: 'pointer', size: { minWidth: 30 }, showBorder: true, borderColor: '#e5e5e5', borderRadius: '2px', useCustomizedBackground: true };
    }

    /**
     * @internal
     */
    public _$isOverflow(): boolean {
        if (!this.overflowOnly) {
            return true;
        }
        return this._elementRef.nativeElement.offsetWidth < this._elementRef.nativeElement.scrollWidth
    }
}

@NgModule({
    declarations: [JigsawTooltip, JigsawTooltipComponent],
    exports: [JigsawTooltip], imports: [JigsawTrustedHtmlModule, CommonModule, PerfectScrollbarModule],
    providers: [PopupService]
})
export class JigsawTooltipModule {
}
