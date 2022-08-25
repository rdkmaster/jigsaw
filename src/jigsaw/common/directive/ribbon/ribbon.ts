import {  Directive, ElementRef, EventEmitter, Input, Output, Renderer2} from "@angular/core";
import { AbstractJigsawViewBase } from "../../common";
type Style = {
    left?: string | number,
    right?: string | number,
    top?: string | number,
    bottom?: string | number,
    width?: string,
    height?: string,
    transform?: string,
    transformOrigin?: string,
    left1?: string | number,
    right1?: string | number,
    top1?: string | number,
    bottom1?: string | number,
};
type Position = { host: Style, ribbon?: Style };
@Directive({
    selector: '[jigsawRibbon], [jigsaw-ribbon]'
})
export class JigsawRibbonDirective extends AbstractJigsawViewBase {
    private _ribbon: HTMLElement;
    private _removeRibbonClickHandler: Function;
    constructor(private _elementRef: ElementRef, private _render: Renderer2) {
        super();
    }
    /**
     勋带内容
     */
    private _jigsawRibbonValue: string;
    @Input()
    public get jigsawRibbonValue(): string {
        return this._jigsawRibbonValue
    }
    public set jigsawRibbonValue(value:string){
        if (this._jigsawRibbonValue != value){
            this._jigsawRibbonValue = value;
            this._addRibbon();
        }
    }
    /**
     *  勋带大小
     * */
    private _jigsawRibbonSize: 'large' | 'normal' | 'small' = 'normal';
    @Input()
    public get jigsawRibbonSize() {
        return this._jigsawRibbonSize;
    }
    public set jigsawRibbonSize(size){
        if(this._jigsawRibbonSize != size){
            this._jigsawRibbonSize = size
            this._addRibbon();
        }
    }
    /**
     * 勋带鼠标悬浮显示内容
     * */
    @Input()
    public jigsawRibbonTitle: string;
    @Input()
    public jigsawRibbonPointerCursor: boolean;
    /**
     * 勋带位置定位
     * */
    private _jigsawRibbonPosition: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'top' | 'bottom' | 'center';
    @Input()
    public get jigsawRibbonPosition() {
        return this._jigsawRibbonPosition;
    }
    public set jigsawRibbonPosition(pos)    {
        if (this._jigsawRibbonPosition != pos){
            this._jigsawRibbonPosition = pos
            this._addRibbon();
        }
    }
    private _jigsawRibbonLength: number = 1;
    /**
     * 勋带长度
     * */
    @Input()
    public get jigsawRibbonLength(): number {
        return this._jigsawRibbonLength
    }
    public set jigsawRibbonLength(length:number){
        if (this._jigsawRibbonLength != length){
            this._jigsawRibbonLength = length
            this._addRibbon();
        }
    }
    /**
     * 勋带颜色
     * 、*/
    private _jigsawRibbonColor: string;
    @Input()
    public get jigsawRibbonColor(): string {
        return this._jigsawRibbonColor;
    }
    public set jigsawRibbonColor(color:string){
        if (this._jigsawRibbonColor != color){
            this._jigsawRibbonColor = color;
            this._addRibbon();
        }
    }
    /**
     *  勋带点击事件
     * */
    @Output()
    public jigsawRibbonClick: EventEmitter<string> = new EventEmitter<string>();

    ngAfterViewInit(): void {
        this._addRibbon();
    }
    ngOnDestroy(): void {
        if (this._removeRibbonClickHandler) {
            this._removeRibbonClickHandler();
        }
    }
    private _addRibbon(): void {
        if (!this.initialized){
            return;
        }
        if (this._ribbon){
            this._elementRef.nativeElement.removeChild(this._ribbon);
            this._ribbon = null;
        }
        this._setHostStyle();
        this._ribbon = window.document.createElement('div');
        this._ribbon.classList.add("jigsaw-ribbon-host");
        const realRibbon = this._getRealRibbon();
        const ribbonColor = this.jigsawRibbonColor ? this.jigsawRibbonColor : 'red';
        const position: Position = this._calPosition();
        // 设置勋带顶层元素的位置和尺寸
        this._render.setStyle(this._ribbon, 'left', position.host.left);
        this._render.setStyle(this._ribbon, 'right', position.host.right);
        this._render.setStyle(this._ribbon, 'top', position.host.top);
        this._render.setStyle(this._ribbon, 'bottom', position.host.bottom);
        this._render.setStyle(this._ribbon, 'width', position.host.width);
        this._render.setStyle(this._ribbon, 'height', position.host.height);
        // 勋带外层div的位置
        const positionStr = `left:${position.ribbon.left}; top:${position.ribbon.top}; right:${position.ribbon.right}; bottom:${position.ribbon.bottom};width:${position.ribbon.width};height:${position.ribbon.height}`;
        // 勋带位置和旋转参数
        const positionStr1 = `left:${position.ribbon.left1}; top:${position.ribbon.top1}; right:${position.ribbon.right1}; bottom:${position.ribbon.bottom1};transform:${position.ribbon.transform}; transform-origin:${position.ribbon.transformOrigin}`;
        const title = this.jigsawRibbonTitle ? this.jigsawRibbonTitle : '';
        this._ribbon.innerHTML =
            `<div style="position: absolute;${positionStr}; overflow:hidden; "><div style="display: ${!!realRibbon ? 'flex' : 'none'}; z-index:1002;${positionStr1};white-space: nowrap; align-items: center; justify-content: center; background-color: ${ribbonColor}" title="${title}">${realRibbon}</div></div>`;
        this._ribbon.children[0].children[0].classList.add(`jigsaw-ribbon`);
        this._ribbon.children[0].children[0].classList.add(`jigsaw-ribbon-size-${this._jigsawRibbonSize}`);

        if (this.jigsawRibbonPointerCursor) {
            this._ribbon.children[0].children[0].classList.add(`jigsaw-ribbon-cursor`);
        } else {
            this._ribbon.children[0].children[0].classList.add(`jigsaw-ribbon-cursor-default`);
        }
        if (this._removeRibbonClickHandler) {
            this._removeRibbonClickHandler();
        }
        this._removeRibbonClickHandler = this._render.listen(this._ribbon.children[0].children[0], 'click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.jigsawRibbonClick.emit(this.jigsawRibbonValue);
            console.log(this.jigsawRibbonValue)
        });
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._ribbon);
    }
    private _setHostStyle(): void {
        const hostStyle = getComputedStyle(this._elementRef.nativeElement);
        if (["absolute", "relative", "fixed", "sticky"].findIndex(item => item == hostStyle.position) == -1) {
            this._elementRef.nativeElement.style.position = "relative";
        }
        if (hostStyle.overflow == 'hidden' || hostStyle.overflow == 'scroll') {
            this._elementRef.nativeElement.style.overflow = "visible";
        }
    }
    private _getRealRibbon(): string {
        return this.jigsawRibbonValue;
    }
    private _getRibbonLength(): number{
        return this.jigsawRibbonLength ? this.jigsawRibbonLength : 11;
    }
    private _calPosition(): Position {
        const ribbonLength = this._getRibbonLength()-25;
        switch (this._jigsawRibbonPosition) {
            case "leftBottom":
                return {
                    host: {
                        left: 0,
                        top: '100%'
                    },
                    ribbon: {
                        left: `0px`,
                        bottom: `0px`,
                        width: `100px`,
                        height: `100px`,
                        transform: `translateX(-30%) translateY(0%) rotate(45deg)`,
                        transformOrigin: `bottom right`,
                        left1: `${ribbonLength}%`,
                        bottom1: `${ribbonLength}%`
                    }
                };
            case "leftTop":
                return {
                    host: {left: 0, top: 0},
                    ribbon: {
                        left: `0px`,
                        top: `0px`,
                        width: `100px`,
                        height: `100px`,
                        transform: `translateX(-30%) translateY(0%) rotate(-45deg)`,
                        transformOrigin: `top right`,
                        left1: `${ribbonLength}%`,
                        top1: `${ribbonLength}%`
                    }
                };
            case "rightBottom":
                return {
                    host: {right: 0, top: '100%'},
                    ribbon: {
                        right: `0px`,
                        bottom: `0px`,
                        width: `100px`,
                        height: `100px`,
                        transform: `translateX(30%) translateY(0%) rotate(-45deg)`,
                        transformOrigin: `bottom left`,
                        right1: `${ribbonLength}%`,
                        bottom1: `${ribbonLength}%`
                    }
                };
            case "rightTop":
                return {
                    host: {
                        right: 0,
                        top: 0,
                    },
                    ribbon: {
                        right: `0px`,
                        top: `0px`,
                        width: `100px`,
                        height: `100px`,
                        transform: `translateX(30%)translateY(0%)rotate(45deg)`,
                        transformOrigin: `top left`,
                        right1: `${ribbonLength}%`,
                        top1: `${ribbonLength}%`
                    }
                };
            case "top":
                return {
                    host: {
                        top: 0
                    },
                    ribbon: {
                        top: 0,
                        width: `100%`,
                        height: `30%`
                    }
                };
            case "bottom":
                return {
                    host: {
                        bottom: 0
                    },
                    ribbon: {
                        bottom: 0,
                        bottom1:0,
                        width: `100%`,
                        height: `30%`
                    }
                };
            case "center":
                return {
                    host: {
                        top: `70%`
                    },
                    ribbon: {
                        top: `40%`,
                        width: `100%`,
                        height: `30%`
                    }
                };
        }
    }
}
