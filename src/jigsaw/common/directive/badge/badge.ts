import {
    Directive,
    ElementRef,
    Input,
    NgZone
} from "@angular/core";
import {CommonUtils} from "../../core/utils/common-utils";
import {AbstractJigsawViewBase} from "../../common";

@Directive({
    selector: '[jigsawBadge], [jigsaw-badge]'
})
export class JigsawBadgeDirective extends AbstractJigsawViewBase {

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    get jigsawBadge(): string | number | "dot" {
        return this._jigsawBadge;
    }

    set jigsawBadge(value: string | number | "dot") {
        if (this._jigsawBadge != value) {
            this._jigsawBadge = value;
            this._addBadge();
        }
    }

    private _jigsawBadge: string | number | 'dot';

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
    public jigsawBadgeShowMask: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeDarkMask: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeHorizontalOffset: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgePosition: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'left' | 'right' = 'rightTop';

    private _addBadge() {
        if (this._badge) {
            this._elementRef.nativeElement.removeChild(this._badge);
            this._badge = null;
        }
        this._badge = window.document.createElement('div');
        if (!this._elementRef.nativeElement.style.position) {
            this._elementRef.nativeElement.style.position = "relative";
        }
        this._badge.style.borderRadius = "inherit";
        const realBadge = this._getRealBadge();
        const classPre = this.jigsawBadge == 'dot' ? "jigsaw-badge-dot" : "jigsaw-badge";
        const position = this._calPosition();
        const positionStr = `left: ${position.left};top: ${position.top};right:  ${position.right};bottom: ${position.bottom}`;
        this._badge.innerHTML = this.jigsawBadge == 'dot' ?
            `<div style="${positionStr}"></div>` :
            `<div style="display: ${!!realBadge ? 'inline-block' : 'none'};${positionStr}">${realBadge}</div>`;
        this._badge.children[0].classList.add(classPre);
        this._badge.children[0].classList.add(`${classPre}-size-${this.jigsawBadgeSize}`);

        if (this.jigsawBadgeShowMask) {
            this._badge.innerHTML += `<div></div>`;
            const classMaskPre = "jigsaw-badge-mask";
            const backgroundClass = this.jigsawBadgeDarkMask ? `${classMaskPre}-dark` : `${classMaskPre}-light`;
            let maskPos = <string>this.jigsawBadgePosition;
            if ((/(right.+)|(left.+)/).test(this.jigsawBadgePosition)) {
                maskPos = this.jigsawBadgePosition.toLowerCase().replace(/(right)/, "$1-").replace(/(left)/, "$1-");
            }
            const positionClass = `${classMaskPre}-${maskPos}`;
            const maskSizeClass = `${classMaskPre}-${this.jigsawBadge == 'dot' ? 'dot-' : ''}${this.jigsawBadgeSize}`;
            this._badge.children[1].classList.add(classMaskPre);
            this._badge.children[1].classList.add(backgroundClass);
            this._badge.children[1].classList.add(positionClass);
            this._badge.children[1].classList.add(maskSizeClass);
            if (!this.jigsawBadgeDarkMask) {
                this._badge.children[0].classList.add('jigsaw-badge-font-light');
            }
            if (this.jigsawBadgePosition == "right" || this.jigsawBadgePosition == "left") {
                if (this.jigsawBadgeDarkMask) {
                    this._badge.children[1].classList.add(`${classMaskPre}-background-dark`);
                } else {
                    this._badge.children[1].classList.add(`${classMaskPre}-background-light`);
                }
            }
            if (this.jigsawBadge == "dot") {
                this._badge.children[0].classList.add(`jigsaw-badge-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
            }
        } else {
            this._badge.children[0].classList.add(`jigsaw-badge-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
        }
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._badge);
    }

    ngAfterViewInit() {
        this._addBadge();
    }

    private _getRealBadge(): string {
        if (this._jigsawBadge == 'dot' || CommonUtils.isUndefined(this._jigsawBadge)) {
            return '';
        }
        const badgeStr = this._jigsawBadge.toString();
        const num = parseInt(badgeStr);
        if (isNaN(num)) {
            return (/(^fa\s+fa-.+$)|(^iconfont\s+iconfont-.+$)/).test(badgeStr) ? `<span class="${badgeStr}"></span>` : this._jigsawBadge.toString();
        } else {
            return CommonUtils.isDefined(this.jigsawBadgeMaxValue) && num > this.jigsawBadgeMaxValue ? `${this.jigsawBadgeMaxValue}+` : num.toString();
        }
    }

    private _calPosition(): any {
        if (this.jigsawBadgeShowMask) {
            return this._calMaskPosition();
        }
        const differ = this._getDiffer();
        switch (this.jigsawBadgePosition) {
            case "left":
                if (this.jigsawBadge == 'dot') {
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
                if (this.jigsawBadge == 'dot') {
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

    private _calMaskPosition(): any {
        const differ = this._getDiffer();
        switch (this.jigsawBadgePosition) {
            case "left":
                return {
                    left: `calc(15% - ${differ}px)`,
                    top: `calc(50% - ${differ}px)`
                };
            case "leftBottom":
                if (this.jigsawBadge == 'dot') {
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
                if (this.jigsawBadge == 'dot') {
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
                if (this.jigsawBadge == 'dot') {
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
                if (this.jigsawBadge == 'dot') {
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
        if (this.jigsawBadge == 'dot') {
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
