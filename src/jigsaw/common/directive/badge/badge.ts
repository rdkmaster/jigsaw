import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2} from "@angular/core";
import {CommonUtils} from "../../core/utils/common-utils";
import {AbstractJigsawViewBase} from "../../common";

type Style = {
    left?: string | number,
    right?: string | number,
    top?: string | number,
    bottom?: string | number,
    width?: string,
    height?: string,
};
type Position = { host: Style, badge?: Style };

@Directive({
    selector: '[jigsawBadge], [jigsaw-badge]'
})
export class JigsawBadgeDirective extends AbstractJigsawViewBase implements AfterViewInit {
    private _badge: HTMLElement;

    private _jigsawBadgeValue: string | number | 'dot';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get jigsawBadgeValue(): string | number | "dot" {
        return this._jigsawBadgeValue;
    }

    public set jigsawBadgeValue(value: string | number | "dot") {
        if (this._jigsawBadgeValue != value) {
            this._jigsawBadgeValue = value;
            this._addBadge();
        }
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeSize: 'large' | 'normal' | 'small' = 'normal';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeStatus: 'normal' | 'success' | 'warn' | 'error' | 'critical' = 'critical';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeMaxValue: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeMask: "none" | "dark" | "light" = "none";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeStyle: "solid" | "border" | "none" = "solid"

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeHorizontalOffset: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeTitle: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgePointerCursor: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgePosition: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'left' | 'right' = 'rightTop';

    @Output()
    public jigsawBadgeClick: EventEmitter<string | number | "dot"> = new EventEmitter<string | number | "dot">();

    constructor(private _elementRef: ElementRef, protected _zone: NgZone, private _render: Renderer2) {
        super();
    }

    ngAfterViewInit(): void {
        this._addBadge();
    }

    private _addBadge(): void {
        if (!this.initialized) {
            return;
        }
        if (this._badge) {
            this._elementRef.nativeElement.removeChild(this._badge);
            this._badge = null;
        }
        this._setHostStyle();

        this._badge = window.document.createElement('div');
        this._badge.classList.add("jigsaw-badge-host");
        const realBadge = this._getRealBadge();
        const classPre = this.jigsawBadgeValue == 'dot' ? "jigsaw-badge-dot" : "jigsaw-badge";

        const position: Position = this._calPosition();
        // 设置徽标顶层元素的位置和尺寸
        this._render.setStyle(this._badge, 'left', position.host.left);
        this._render.setStyle(this._badge, 'right', position.host.right);
        this._render.setStyle(this._badge, 'top', position.host.top);
        this._render.setStyle(this._badge, 'bottom', position.host.bottom);
        this._render.setStyle(this._badge, 'width', position.host.width);
        this._render.setStyle(this._badge, 'height', position.host.height);
        // 徽标自身的位置
        const positionStr = `left:${position.badge.left}; top:${position.badge.top}; right:${position.badge.right}; bottom:${position.badge.bottom}`;

        const title = this.jigsawBadgeTitle ? this.jigsawBadgeTitle : '';
        this._badge.innerHTML = this.jigsawBadgeValue == 'dot' ?
            `<div style="${positionStr}" title="${title}"></div>` :
            `<div style="display: ${!!realBadge ? 'flex' : 'none'};${positionStr};white-space: nowrap" title="${title}">${realBadge}</div>`;
        this._badge.children[0].classList.add(classPre);
        this._badge.children[0].classList.add(`${classPre}-size-${this.jigsawBadgeSize}`);
        const solid = this.jigsawBadgeStyle == 'solid' && this.jigsawBadgeValue != 'dot' ? "-solid" : "";
        if (this.jigsawBadgeMask != "none") {
            this._badge.innerHTML += `<div></div>`;
            const classMaskPre = "jigsaw-badge-mask";
            const backgroundClass = `${classMaskPre}-${this.jigsawBadgeMask}`;
            let maskPos = <string>this.jigsawBadgePosition;
            if ((/(right.+)|(left.+)/).test(this.jigsawBadgePosition)) {
                maskPos = this.jigsawBadgePosition.toLowerCase().replace(/(right)/, "$1-").replace(/(left)/, "$1-");
            }
            const positionClass = `${classMaskPre}-${maskPos}`;
            const maskSizeClass = `${classMaskPre}-${this.jigsawBadgeValue == 'dot' ? 'dot-' : ''}${this.jigsawBadgeSize}`;
            this._badge.children[1].classList.add(classMaskPre);
            this._badge.children[1].classList.add(backgroundClass);
            this._badge.children[1].classList.add(positionClass);
            this._badge.children[1].classList.add(maskSizeClass);

            if (this.jigsawBadgePosition == "right" || this.jigsawBadgePosition == "left") {
                this._badge.children[1].classList.add(`${classMaskPre}-background-${this.jigsawBadgeMask}`);
            }
            if (this.jigsawBadgeValue == "dot") {
                this._badge.children[0].classList.add(`jigsaw-badge-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
            }
        } else {
            this._badge.children[0].classList.add(`jigsaw-badge${solid}-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
        }

        if (this.jigsawBadgePointerCursor) {
            this._badge.children[0].classList.add(`jigsaw-badge-cursor`);
        } else {
            this._badge.children[0].classList.add(`jigsaw-badge-cursor-default`);
        }
        this._badge.children[0].addEventListener('click', () => {
            this.jigsawBadgeClick.emit(this.jigsawBadgeValue);
        });
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._badge);
    }

    // 设置宿主的样式，徽标本身采用absolute布局，所以需要考虑宿主的position和overflow
    private _setHostStyle(): void {
        const hostStyle = getComputedStyle(this._elementRef.nativeElement);
        if (["absolute", "relative", "fixed", "sticky"].findIndex(item => item == hostStyle.position) == -1) {
            this._elementRef.nativeElement.style.position = "relative";
        }
        if (hostStyle.overflow == 'hidden' || hostStyle.overflow == 'scroll') {
            this._elementRef.nativeElement.style.overflow = "visible";
        }
    }

    private _getRealBadge(): string {
        if (this._jigsawBadgeValue == 'dot' || CommonUtils.isUndefined(this._jigsawBadgeValue)) {
            return '';
        }
        const badgeStr = this._jigsawBadgeValue.toString();
        const num = parseInt(badgeStr);
        if (isNaN(num)) {
            return (/(^fa\s+fa-.+$)|(^iconfont\s+iconfont-.+$)/).test(badgeStr) ? `<span class="${badgeStr}"></span>` : this._jigsawBadgeValue.toString();
        } else {
            return CommonUtils.isDefined(this.jigsawBadgeMaxValue) && num > this.jigsawBadgeMaxValue ? `${this.jigsawBadgeMaxValue}+` : num.toString();
        }
    }

    private _calPosition(): Position {
        if (this.jigsawBadgeMask != "none") {
            return this._calMaskPosition();
        }
        const differ = this._getDiffer();
        switch (this.jigsawBadgePosition) {
            case "left":
                const left: Position = {
                    host: {left: 0, top: `50%`}
                };
                if (this.jigsawBadgeValue == 'dot') {
                    left.badge = {
                        left: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`,
                        top: `calc(50% - ${differ}px)`
                    }
                } else {
                    left.badge = {
                        right: `calc( 100% - ${differ + 2 + this.jigsawBadgeHorizontalOffset}px )`,
                        top: `calc( 50% - ${differ}px )`
                    }
                }
                return left;
            case "leftBottom":
                return {
                    host: {left: 0, top: '100%'},
                    badge: {left: `${-differ}px`, top: `calc( 100% - ${differ}px)`}
                };
            case "leftTop":
                return {
                    host: {left: 0, top: 0},
                    badge: {left: `${-differ}px`, top: `${-differ}px`}
                };
            case "right":
                const right: Position = {
                    host: {right: 0, top: `50%`}
                };
                if (this.jigsawBadgeValue == 'dot') {
                    right.badge = {
                        right: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`,
                        top: `calc(50% - ${differ}px)`
                    };
                } else {
                    right.badge = {
                        left: `calc( 100% - ${differ + 2 + this.jigsawBadgeHorizontalOffset}px)`,
                        top: `calc(50% - ${differ}px)`
                    };
                }
                return right;
            case "rightBottom":
                return {
                    host: {right: 0, top: '100%'},
                    badge: {right: `${-differ}px`, top: `calc( 100% - ${differ}px)`}
                };
            case "rightTop":
                return {
                    host: {right: 0, top: 0},
                    badge: {right: `${-differ}px`, top: `${-differ}px`}
                };
        }
    }

    private _calMaskPosition(): Position {
        const differ = this._getDiffer();
        switch (this.jigsawBadgePosition) {
            case "left":
                return {
                    host: {left: 0, top: 0, width: '30%', height: '100%'},
                    badge: {
                        left: `calc(50% - ${differ}px)`,
                        top: `calc(50% - ${differ}px)`
                    }
                };
            case "leftBottom":
                const leftBottom: Position = {
                    host: {left: 0, top: '100%'}
                };
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        leftBottom.badge = {top: `calc( 100% - ${2 * differ + 5}px)`, left: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        leftBottom.badge = {top: `calc( 100% - ${2 * differ + 4}px)`, left: "4px"};
                    } else {
                        leftBottom.badge = {top: `calc( 100% - ${2 * differ + 3}px)`, left: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        leftBottom.badge = {top: `calc( 100% - ${2 * differ + 7}px)`, left: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        leftBottom.badge = {top: `calc( 100% - ${2 * differ + 5}px)`, left: "5px"};
                    } else {
                        leftBottom.badge = {top: `calc( 100% - ${2 * differ + 3}px)`, left: "3px"};
                    }
                }
                return leftBottom;
            case "leftTop":
                const leftTop: Position = {
                    host: {left: 0, top: 0}
                };
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        leftTop.badge = {top: "5px", left: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        leftTop.badge = {top: "4px", left: "4px"};
                    } else {
                        leftTop.badge = {top: "3px", left: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        leftTop.badge = {top: "7px", left: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        leftTop.badge = {top: "5px", left: "5px"};
                    } else {
                        leftTop.badge = {top: "3px", left: "3px"};
                    }
                }
                return leftTop;
            case "right":
                return {
                    host: {right: 0, top: 0, width: '30%', height: '100%'},
                    badge: {
                        right: `calc(50% - ${differ}px)`,
                        top: `calc(50% - ${differ}px)`
                    }
                };
            case "rightBottom":
                const rightBottom: Position = {
                    host: {right: 0, top: '100%'}
                };
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        rightBottom.badge = {top: `calc( 100% - ${2 * differ + 5}px)`, right: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        rightBottom.badge = {top: `calc( 100% - ${2 * differ + 4}px)`, right: "4px"};
                    } else {
                        rightBottom.badge = {top: `calc( 100% - ${2 * differ + 3}px)`, right: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        rightBottom.badge = {top: `calc( 100% - ${2 * differ + 7}px)`, right: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        rightBottom.badge = {top: `calc( 100% - ${2 * differ + 5}px)`, right: "5px"};
                    } else {
                        rightBottom.badge = {top: `calc( 100% - ${2 * differ + 3}px)`, right: "3px"};
                    }
                }
                return rightBottom;
            case "rightTop":
                const rightTop: Position = {
                    host: {right: 0, top: 0}
                };
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        rightTop.badge = {top: "5px", right: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        rightTop.badge = {top: "4px", right: "4px"};
                    } else {
                        rightTop.badge = {top: "3px", right: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        rightTop.badge = {top: "7px", right: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        rightTop.badge = {top: "5px", right: "5px"};
                    } else {
                        rightTop.badge = {top: "3px", right: "3px"};
                    }
                }
                return rightTop;
        }
    }

    private _getDiffer(): number {
        let differ = 0;
        if (this.jigsawBadgeValue == 'dot') {
            if (this.jigsawBadgeSize == "large") {
                differ = 8;
            } else if (this.jigsawBadgeSize == "normal") {
                differ = 6;
            } else {
                differ = 4;
            }
        } else {
            if (this.jigsawBadgeSize == "large") {
                differ = 12;
            } else if (this.jigsawBadgeSize == "normal") {
                differ = 10;
            } else {
                differ = 8;
            }
        }
        return differ;
    }
}
