import {Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2} from "@angular/core";
import {CommonUtils} from "../../core/utils/common-utils";
import {BaseStyle, JigsawBadgeBase} from "../badge/jigsawBadgeBase";
import {BasePosition} from "../badge/jigsawBadgeBase";

type Style = BaseStyle &{
    transform?: string,
    transformOrigin?: string,
    left1?: string | number,
    right1?: string | number,
    top1?: string | number,
    bottom1?: string | number,
}
type Position = BasePosition & {ribbon?: Style}
@Directive({
    selector: '[jigsawRibbon], [jigsaw-ribbon]'
})
export class JigsawRibbonDirective extends JigsawBadgeBase {
    private _removeRibbonClickHandler: Function;
    constructor(public _elementRef: ElementRef, public _render: Renderer2, protected _zone?: NgZone,) {
        super(_elementRef, _render,_zone);
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
     * 鼠标悬浮鼠标样式改变
     * */
    private _jigsawRibbonPointerCursor: boolean;
    @Input()
    public get jigsawRibbonPointerCursor(): boolean{
        return this._jigsawRibbonPointerCursor
    }
    public set jigsawRibbonPointerCursor(pointer:boolean){
        if(this._jigsawRibbonPointerCursor != pointer){
            this._jigsawRibbonPointerCursor = pointer;
            this._addRibbon();
        }
    }
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
    private _jigsawPositionOffset: number = 11;
    /**
     * 勋带偏移量
     * */
    @Input()
    public get jigsawPositionOffset(): number {
        return this._jigsawPositionOffset ? this._jigsawPositionOffset : 0;
    }
    public set jigsawPositionOffset(offset:number){
        if (this._jigsawPositionOffset != offset){
            this._jigsawPositionOffset = offset
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
            this._$colorChange(this._jigsawRibbonColor)
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
        if (this._badge){
            this._elementRef.nativeElement.removeChild(this._badge);
            this._badge = null;
        }
        this._badge = window.document.createElement('div');
        this._badge.classList.add("jigsaw-ribbon-host");
        const realRibbon = this._getRealRibbon();
        const ribbonColor = this.jigsawRibbonColor ? this.jigsawRibbonColor : 'red';
        const position: Position = this._calPosition();
        // 设置勋带顶层元素的位置和尺寸
        this._addPosition(position);
        const positionStr = `left:${position.ribbon.left}; top:${position.ribbon.top}; right:${position.ribbon.right}; bottom:${position.ribbon.bottom};width:${position.ribbon.width};height:${position.ribbon.height}`;
        // 勋带位置和旋转参数
        const positionStr1 = `left:${position.ribbon.left1}; top:${position.ribbon.top1}; right:${position.ribbon.right1}; bottom:${position.ribbon.bottom1};transform:${position.ribbon.transform}; transform-origin:${position.ribbon.transformOrigin}`;
        this._badge.innerHTML =
            `<div style="position: absolute;${positionStr}; overflow:hidden; "><div style=" color:${this._$fontColor};display: ${!!realRibbon ? 'flex' : 'none'}; z-index:1002;${positionStr1};white-space: nowrap; align-items: center; justify-content: center; background-color: ${ribbonColor}" >${realRibbon}</div></div>`;
        this._badge.children[0].children[0].classList.add(`jigsaw-ribbon`);
        this._badge.children[0].children[0].classList.add(`jigsaw-ribbon-size-${this._jigsawRibbonSize}`);
        if (this.jigsawRibbonPointerCursor) {
            this._badge.children[0].children[0].classList.add(`jigsaw-ribbon-cursor`);
        } else {
            this._badge.children[0].children[0].classList.add(`jigsaw-ribbon-cursor-default`);
        }
        if (this._removeRibbonClickHandler) {
            this._removeRibbonClickHandler();
        }
        this._removeRibbonClickHandler = this._render.listen(this._badge.children[0].children[0], 'click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.jigsawRibbonClick.emit(this.jigsawRibbonValue);
            console.log(this.jigsawRibbonValue)
        });
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._badge);
    }
    public _$fontColor: string = "#FFFFFF";
    public _$colorChange(color: string) {
        if (CommonUtils.adjustFontColor(color) === "light") {
            this._$fontColor = "#000000";
        } else {
            this._$fontColor = "#FFFFFF";
        }
    }
    private _getRealRibbon(): string {
        return this.jigsawRibbonValue;
    }
    private _getPositionOffset(): number{
        return this.jigsawPositionOffset;
    }
    _calPosition(): Position {
        const ribbonOffset = this._getPositionOffset()-25;
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
                        left1: `${ribbonOffset}%`,
                        top1: `${ribbonOffset}%`
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
                        right1: `${ribbonOffset}%`,
                        bottom1: `${ribbonOffset}%`

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
                        right1: `${ribbonOffset}%`,
                        top1: `${ribbonOffset}%`
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
