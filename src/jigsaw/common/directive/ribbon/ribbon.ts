import {Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2} from "@angular/core";
import {CommonUtils} from "../../core/utils/common-utils";
import {BaseStyle, AccessoryBase} from "../badge/accessory-base";
import {BasePosition} from "../badge/accessory-base";

type Style = BaseStyle & {
    transform?: string,
    transformOrigin?: string,
    left1?: string | number,
    right1?: string | number,
    top1?: string | number,
    bottom1?: string | number,
}
type Position = BasePosition & { ribbon?: Style }

@Directive({
    selector: '[jigsawRibbon], [jigsaw-ribbon]'
})
export class JigsawRibbonDirective extends AccessoryBase {
    constructor(protected _render: Renderer2, protected _elementRef: ElementRef, zone?: NgZone) {
        super(_render, _elementRef, zone);
    }

    /**
     * 勋带内容
     */
    @Input('jigsawRibbonValue')
    public value: string = 'A ribbon';

    /**
     * 勋带大小
     */
    @Input('jigsawRibbonSize')
    public size: 'large' | 'normal' | 'small' = 'normal';

    /**
     * 鼠标悬浮鼠标样式改变
     */
    @Input('jigsawRibbonPointerCursor')
    public pointerCursor: boolean;

    /**
     * 勋带位置定位
     */
    @Input('jigsawRibbonPosition')
    public position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'top' | 'bottom' | 'center' = 'rightTop';

    private _jigsawPositionOffset: number = 0;

    /**
     * 勋带偏移量
     */
    @Input()
    public get jigsawPositionOffset(): number {
        return this._jigsawPositionOffset ? this._jigsawPositionOffset : 0;
    }

    public set jigsawPositionOffset(offset: number) {
        if (this._jigsawPositionOffset != offset) {
            this._jigsawPositionOffset = offset
            this.addAccessory();
        }
    }

    /**
     * 勋带背景
     */
    private _jigsawRibbonColor: string = '#32e4ba';

    @Input()
    public get jigsawRibbonColor(): string {
        return this._jigsawRibbonColor;
    }

    public set jigsawRibbonColor(color: string) {
        if (this._jigsawRibbonColor != color) {
            this._jigsawRibbonColor = color;
            this.addAccessory();
        }
    }

    /**
     * 勋带内容颜色
     */
    private _fontColor: string = "";
    
    @Input()
    public get jigsawRibbonFontColor(): string {
        return this._fontColor ? this._fontColor : this._getFontColor();
    }

    public set jigsawRibbonFontColor(color: string) {
        if (this._fontColor === color) {
            return;
        }
        this._fontColor = color;
        this.addAccessory();
    }

    private _getFontColor(): string {
        return CommonUtils.adjustFontColor(this._jigsawRibbonColor) === "light" ? "#4d4d4d" : "#d9d9d9";
    }

    /**
     * 勋带点击事件
     */
    @Output()
    public jigsawRibbonClick: EventEmitter<string> = new EventEmitter<string>();

    protected addAccessory() {
        if (!this.initialized) {
            return;
        }
        if (this._accessory) {
            this._elementRef.nativeElement.removeChild(this._accessory);
            this._accessory = null;
        }
        this._accessory = window.document.createElement('div');
        this._accessory.classList.add("jigsaw-ribbon-host");
        const realRibbon = this.value;
        const ribbonColor = this.jigsawRibbonColor ? this.jigsawRibbonColor : 'red';
        const position: Position = this.calPosition();
        // 设置勋带顶层元素的位置和尺寸
        this._updatePosition(position);
        const outerStyles = `
            left:${position.ribbon.left};
            top:${position.ribbon.top};
            right:${position.ribbon.right};
            bottom:${position.ribbon.bottom};
            width:${position.ribbon.width};
            height:${position.ribbon.height};
        `;
        // 勋带位置和旋转参数
        const innerStyles = `
            left:${position.ribbon.left1};
            top:${position.ribbon.top1};
            right:${position.ribbon.right1};
            bottom:${position.ribbon.bottom1};
            transform:${position.ribbon.transform};
            transform-origin:${position.ribbon.transformOrigin};
        `;
        this._accessory.innerHTML = `
            <div style="position: absolute; ${outerStyles}; overflow:hidden;">
                <div style="color:${this.jigsawRibbonFontColor}; display: ${!!realRibbon ? 'flex' : 'none'}; background: ${ribbonColor};
                            ${innerStyles}; white-space: nowrap; align-items: center; justify-content: center;">
                    ${realRibbon}
                </div>
            </div>`;
        this._accessory.children[0].children[0].classList.add(`jigsaw-ribbon`);
        this._accessory.children[0].children[0].classList.add(`jigsaw-ribbon-size-${this.size}`);
        if (this.pointerCursor) {
            this._accessory.children[0].children[0].classList.add(`jigsaw-ribbon-cursor`);
        } else {
            this._accessory.children[0].children[0].classList.add(`jigsaw-ribbon-cursor-default`);
        }
        if (this._removeClickHandler) {
            this._removeClickHandler();
        }
        this._removeClickHandler = this._render.listen(this._accessory.children[0].children[0], 'click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.jigsawRibbonClick.emit(this.value);
            console.log(this.value)
        });
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._accessory);
    }



    protected calPosition(): Position {
        const ribbonOffset = this.jigsawPositionOffset - 25;
        switch (this.position) {
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
                        left1: `${ribbonOffset}%`,
                        bottom1: `${ribbonOffset}%`
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
                        bottom1: 0,
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
