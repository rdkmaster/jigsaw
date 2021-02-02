import {
    Directive,
    ElementRef,
    Input,
    Output,
    NgZone,
    EventEmitter
} from "@angular/core";
import {CommonUtils} from "../../core/utils/common-utils";
import {AbstractJigsawViewBase} from "../../common";

type Position = {left?: string, right?: string, top?: string, bottom?: string};

@Directive({
    selector: '[jigsawBadge], [jigsaw-badge]'
})
export class JigsawBadgeDirective extends AbstractJigsawViewBase {

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

    private _jigsawBadgeValue: string | number | 'dot';

    constructor(private _elementRef: ElementRef, protected _zone: NgZone) {
        super();
    }

    private _badge: HTMLElement;

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
    public jigsawBadgeTitle: string

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgePointerCursor: boolean

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgePosition: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'left' | 'right' = 'rightTop';

    @Output()
    public jigsawBadgeClick: EventEmitter<string | number | "dot"> = new EventEmitter<string | number | "dot">();

    private _addBadge() {
        if (!this.initialized) {
            return;
        }
        if (this._badge) {
            this._elementRef.nativeElement.removeChild(this._badge);
            this._badge = null;
        }

        this._badge = window.document.createElement('div');
        if (!this._elementRef.nativeElement.style.position) {
            this._elementRef.nativeElement.style.position = "relative";
        }
        this._badge.classList.add("jigsaw-badge-host");
        const realBadge = this._getRealBadge();
        const classPre = this.jigsawBadgeValue == 'dot' ? "jigsaw-badge-dot" : "jigsaw-badge";
        const position = this._calPosition();
        const positionStr = `left:${position.left}; top:${position.top}; right:${position.right}; bottom:${position.bottom}`;
        const title = this.jigsawBadgeTitle? this.jigsawBadgeTitle : '';
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
        }else{
            this._badge.children[0].classList.add(`jigsaw-badge-cursor-default`);
        }
        this._badge.children[0].addEventListener('click', () => {
            this.jigsawBadgeClick.emit(this.jigsawBadgeValue);
        });
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._badge);
    }


    ngAfterViewInit() {
        this._addBadge();
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
                if (this.jigsawBadgeValue == 'dot') {
                    return {
                        left: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`,
                        top: `calc(50% - ${differ}px)`
                    };
                } else {
                    return {
                        right: `calc( 100% - ${this.jigsawBadgeHorizontalOffset}px )`,
                        top: `calc( 50% - ${differ}px )`
                    };
                }
            case "leftBottom":
                return {left: `${-differ}px`, top: `calc( 100% - ${differ}px)`};
            case "leftTop":
                return {left: `${-differ}px`, top: `${-differ}px`};
            case "right":
                if (this.jigsawBadgeValue == 'dot') {
                    return {
                        right: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`,
                        top: `calc(50% - ${differ}px)`
                    };
                } else {
                    return {
                        left: `calc( 100% + ${differ + this.jigsawBadgeHorizontalOffset}px)`,
                        top: `calc(50% - ${differ}px)`
                    };
                }
            case "rightBottom":
                return {right: `${-differ}px`, top: `calc( 100% - ${differ}px)`};
            case "rightTop":
                return {right: `${-differ}px`, top: `${-differ}px`};
        }
    }

    private _calMaskPosition(): Position {
        const differ = this._getDiffer();
        switch (this.jigsawBadgePosition) {
            case "left":
                return {
                    left: `calc(15% - ${differ}px)`,
                    top: `calc(50% - ${differ}px)`
                };
            case "leftBottom":
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: `calc( 100% - ${2 * differ + 5}px)`, left: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: `calc( 100% - ${2 * differ + 4}px)`, left: "4px"};
                    } else {
                        return {top: `calc( 100% - ${2 * differ + 3}px)`, left: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: `calc( 100% - ${2 * differ + 7}px)`, left: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: `calc( 100% - ${2 * differ + 5}px)`, left: "5px"};
                    } else {
                        return {top: `calc( 100% - ${2 * differ + 3}px)`, left: "3px"};
                    }
                }

            case "leftTop":
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: "5px", left: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: "4px", left: "4px"};
                    } else {
                        return {top: "3px", left: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: "7px", left: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: "5px", left: "5px"};
                    } else {
                        return {top: "3px", left: "3px"};
                    }
                }
            case "right":
                return {
                    right: `calc(15% - ${differ}px)`,
                    top: `calc(50% - ${differ}px)`
                };
            case "rightBottom":
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: `calc( 100% - ${2 * differ + 5}px)`, right: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: `calc( 100% - ${2 * differ + 4}px)`, right: "4px"};
                    } else {
                        return {top: `calc( 100% - ${2 * differ + 3}px)`, right: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: `calc( 100% - ${2 * differ + 7}px)`, right: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: `calc( 100% - ${2 * differ + 5}px)`, right: "5px"};
                    } else {
                        return {top: `calc( 100% - ${2 * differ + 3}px)`, right: "3px"};
                    }
                }

            case "rightTop":
                if (this.jigsawBadgeValue == 'dot') {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: "5px", right: "5px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: "4px", right: "4px"};
                    } else {
                        return {top: "3px", right: "3px"};
                    }
                } else {
                    if (this.jigsawBadgeSize == "large") {
                        return {top: "7px", right: "7px"};
                    } else if (this.jigsawBadgeSize == "normal") {
                        return {top: "5px", right: "5px"};
                    } else {
                        return {top: "3px", right: "3px"};
                    }
                }
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
