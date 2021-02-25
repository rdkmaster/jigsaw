import {ChangeDetectionStrategy, Component, Directive, EventEmitter, Input, NgModule, ViewEncapsulation} from "@angular/core";
import {ButtonInfo, IPopupable, PopupOptions, PopupService} from "../../service/popup.service";
import {FloatPosition, JigsawFloatBase} from "../float/float";

export type TooltipInitData = {tooltip?: string, context?: string};

@Component({
    template: '<div style="padding:12px; max-width:400px">{{initData?.tooltip}}</div>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTooltipComponent implements IPopupable {
    public answer: EventEmitter<ButtonInfo>;
    public initData: TooltipInitData;
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
    private _tooltip: string = '...';

    @Input()
    public get jigsawTooltip(): string {
        return this._tooltip;
    }

    public set jigsawTooltip(value: string) {
        this._tooltip = value || '...';
        this.jigsawFloatInitData.tooltip = this._tooltip;
    }

    /**
     * @internal
     */
    public jigsawFloatInitData: { tooltip?: string, context?: any } = {tooltip: '...'};

    @Input()
    public get jigsawTooltipOpen(): boolean {
        return this.jigsawFloatOpen;
    }

    public set jigsawTooltipOpen(value: boolean) {
        this.jigsawFloatOpen = value;
    }

    @Input('jigsawTooltipOpenDelay')
    public jigsawFloatOpenDelay: number = 200;

    @Input('jigsawTooltipCloseDelay')
    public jigsawFloatCloseDelay: number = 10;

    @Input('jigsawTooltipPosition')
    public jigsawFloatPosition: FloatPosition = 'top';

    protected _init(): void {
        this.jigsawFloatTarget = JigsawTooltipComponent;
        this.jigsawFloatOptions = {borderType: 'pointer', size: {minWidth: 30}};
        this.jigsawFloatCloseTrigger = 'mouseleave';
        this.jigsawFloatOpenTrigger = 'mouseenter';
    }
}

@NgModule({
    declarations: [JigsawTooltip, JigsawTooltipComponent],
    exports: [JigsawTooltip],
    providers: [PopupService]
})
export class JigsawTooltipModule {
}
