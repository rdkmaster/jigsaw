import {
    AfterContentInit, Component, ComponentRef, Directive, ElementRef, EventEmitter, Input, NgModule, OnChanges,
    OnDestroy, OnInit,
    Output, Renderer2, ViewChild
} from "@angular/core";

import {IPopupable, PopupEffect, PopupInfo, PopupPositionType, PopupService} from "../../service/popup.service";
import {bubbleIn} from "../animations/bubble-in";
import {CommonModule} from "@angular/common";

export interface ITooltip extends IPopupable {
    tooltip: JigsawTooltipDialog;
}

export abstract class TooltipBase implements ITooltip {

    public initData: any;

    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();

    abstract get tooltip(): JigsawTooltipDialog;
    abstract set tooltip(value: JigsawTooltipDialog);

    public dispose(): void {
        if (this.tooltip) {
            this.tooltip.dispose();
        }
    }

}

@Component({
    selector: 'jigsaw-tooltip-dialog',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        bubbleIn
    ]
})
export class JigsawTooltipDialog implements IPopupable, AfterContentInit {
    public initData: any;
    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();

    protected popupElement: HTMLElement;

    constructor(private _elementRef: ElementRef) {
    }

    ngAfterContentInit() {
        this.popupElement = this.getPopupElement();
    }

    protected getPopupElement(): HTMLElement {
        return this._elementRef.nativeElement.querySelector('.jigsaw-tooltip-dialog');
    }

    public dispose() {
        this.answer.emit();
    }
}

@Component({
    template: '<jigsaw-tooltip-dialog><span innerHtml="tooltip"></span></jigsaw-tooltip-dialog>'
})
export class SimpleTooltipComponent extends TooltipBase {
    @ViewChild(JigsawTooltipDialog) public tooltip: JigsawTooltipDialog;

    constructor(private _elementRef:ElementRef) {
        super();
    }

    private _initData:any;

    public get initData(): any {
        return this._initData;
    }

    public set initData(value: any) {
        this._initData = value;
        if (value && value.message) {
            this._elementRef.nativeElement.querySelector('span').innerHTML = `${value.message}`;
        }
    }
}

@Directive({
    selector: '[jigsaw-tooltip], [jigsawTooltip]'
})
export class JigsawTooltip implements OnDestroy {
    @Input() public jigsawTooltip:string;
    private _tooltipInfo:PopupInfo;
    private _removeMouseLeave:Function;
    private _removeMouseEnter:Function;

    constructor(private _popupService:PopupService, private _elementRef:ElementRef, renderer:Renderer2) {
        const onEnter:(event: any) => boolean | void = () => {
            if (this._removeMouseLeave) {
                this._removeMouseLeave();
            }
            this._removeMouseLeave = renderer.listen(_elementRef.nativeElement, 'mouseleave', onLeave);
            this._popupTooltip();
        };
        const onLeave:(event: any) => boolean | void = () => {
            if (this._removeMouseEnter) {
                this._removeMouseEnter();
            }
            this._removeMouseEnter = renderer.listen(_elementRef.nativeElement, 'mouseenter', onEnter);
            this._closeTooltip();
        };
        this._removeMouseEnter = renderer.listen(_elementRef.nativeElement, 'mouseenter', onEnter);
    }

    private _popupTooltip():void {
        if (!this.jigsawTooltip) {
            return;
        }
        this._tooltipInfo = this._popupService.popup(SimpleTooltipComponent, {
            modal: false, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            pos: this._elementRef, //插入点
            posOffset: { //偏移位置
                bottom: -8,
                left: 0
            },
            posType: PopupPositionType.absolute, //定位类型
        }, {
            message: this.jigsawTooltip
        });
    }

    private _closeTooltip():void {
        if (this._tooltipInfo && this._tooltipInfo.dispose) {
            this._tooltipInfo.dispose();
        }
    }

    ngOnDestroy(): void {
        this._closeTooltip();
        if (this._removeMouseLeave) {
            this._removeMouseLeave();
        }
        if (this._removeMouseEnter) {
            this._removeMouseEnter();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawTooltipDialog, JigsawTooltip, SimpleTooltipComponent],
    exports: [JigsawTooltipDialog, JigsawTooltip],
    entryComponents: [SimpleTooltipComponent]
})
export class JigsawTooltipModule {
}
