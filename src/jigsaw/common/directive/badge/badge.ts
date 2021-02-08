import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, OnDestroy} from "@angular/core";
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
export class JigsawBadgeDirective extends AbstractJigsawViewBase implements AfterViewInit, OnDestroy {
    private _badge: HTMLElement;
    private _removeBadgeClickHandler: Function;

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

    ngOnDestroy(): void {
        if (this._removeBadgeClickHandler) {
            this._removeBadgeClickHandler();
        }
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
            `<div style="display: ${!!realBadge ? 'flex' : 'none'};${positionStr}; white-space: nowrap; align-items: center; justify-content: center;" title="${title}">${realBadge}</div>`;
        this._badge.children[0].classList.add(classPre);
        this._badge.children[0].classList.add(`${classPre}-size-${this.jigsawBadgeSize}`);
        let badgeStyle = '-dot';
        if (this.jigsawBadgeValue != 'dot') {
            badgeStyle = this.jigsawBadgeStyle == 'none' ? '' : `-${this.jigsawBadgeStyle}`;
        }
        if (this.jigsawBadgeMask != "none") {
            const calibrateSize = this._calibrateMaskSize();
            const maskStyle = calibrateSize != 0 ? `border-width: ${calibrateSize}px` : '';
            this._badge.innerHTML += `<div style="${maskStyle}"></div>`;
            const classMaskPre = "jigsaw-badge-mask";
            const backgroundClass = `${classMaskPre}-${this.jigsawBadgeMask}`;
            let maskPos = <string>this.jigsawBadgePosition;
            if ((/(right.+)|(left.+)/).test(this.jigsawBadgePosition)) {
                maskPos = this.jigsawBadgePosition.toLowerCase().replace(/(right)/, "$1-").replace(/(left)/, "$1-");
            }
            const positionClass = `${classMaskPre}-${maskPos}`;
            const maskSizeClass = `${classMaskPre}-${this.jigsawBadgeSize}`;
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
            badgeStyle = this.jigsawBadgeValue == 'dot' ? badgeStyle : '';
        }
        this._badge.children[0].classList.add(`jigsaw-badge${badgeStyle}-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);

        if (this.jigsawBadgePointerCursor) {
            this._badge.children[0].classList.add(`jigsaw-badge-cursor`);
        } else {
            this._badge.children[0].classList.add(`jigsaw-badge-cursor-default`);
        }
        if (this._removeBadgeClickHandler) {
            this._removeBadgeClickHandler();
        }
        this._removeBadgeClickHandler = this._render.listen(this._badge.children[0], 'click', (event) => {
            event.preventDefault();
            event.stopPropagation();
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

    // 判断是否需要限定mask的尺寸，最大不能超过当前宿主的宽高
    private _calibrateMaskSize(): number {
        const hostStyle = getComputedStyle(this._elementRef.nativeElement);
        const width = parseInt(hostStyle.width);
        const height = parseInt(hostStyle.height);
        const compareSize = Math.floor(Math.min(width, height) / 2);
        const maskSize = this.jigsawBadgeSize == 'small' ? 20 : (this.jigsawBadgeSize == 'large' ? 28 : 24);
        return compareSize != 0 && maskSize > compareSize ? compareSize : 0;
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
                    badge: {left: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`, top: `calc( 100% - ${differ}px)`}
                };
            case "leftTop":
                return {
                    host: {left: 0, top: 0},
                    badge: {left: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`, top: `${-differ}px`}
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
                    badge: {right: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`, top: `calc( 100% - ${differ}px)`}
                };
            case "rightTop":
                return {
                    host: {right: 0, top: 0},
                    badge: {right: `${-(differ + this.jigsawBadgeHorizontalOffset)}px`, top: `${-differ}px`}
                };
        }
    }

    private _calMaskPosition(): Position {
        const calibrateSize = this._calibrateMaskSize() / 2;
        const differ = this._getDiffer();
        switch (this.jigsawBadgePosition) {
            case "left":
                return {
                    host: {left: 0, top: 0, width: '30%', height: '100%'},
                    badge: {left: `calc(50% - ${differ}px)`, top: `calc(50% - ${differ}px)`}
                };
            case "leftBottom":
                return this._getBottomPosition('left', differ, calibrateSize);
            case "leftTop":
                return this._getTopPosition('left', differ, calibrateSize);
            case "right":
                return {
                    host: {right: 0, top: 0, width: '30%', height: '100%'},
                    badge: {top: `calc(50% - ${differ}px)`, right: `calc(50% - ${differ}px)`}
                };
            case "rightBottom":
                return this._getBottomPosition('right', differ, calibrateSize);
            case "rightTop":
                return this._getTopPosition('right', differ, calibrateSize);
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

    // 计算上面两侧位置
    private _getTopPosition(pos: 'right' | 'left', differ: number, calibrateSize: number): Position {
        const position: Position = {
            host: {top: 0}
        };
        position.host[pos] = 0;
        const offset = this.jigsawBadgeValue == 'dot' ? 10 : (this.jigsawBadgeSize == "large" ? 6 : 4);
        differ = calibrateSize == 0 ? offset : calibrateSize - (differ - 1);
        position.badge = {top: `${differ}px`};
        position.badge[pos] = `${differ}px`;
        return position;
    }

    // 计算下面两侧位置
    private _getBottomPosition(pos: 'right' | 'left', differ: number, calibrateSize: number): Position {
        const position: Position = {
            host: {top: '100%'}
        };
        position.host[pos] = 0;

        let left = 0, right = 0;
        if (this.jigsawBadgeValue == 'dot') {
            if (this.jigsawBadgeSize == "large") {
                left = calibrateSize == 0 ? 24 : calibrateSize + (differ + 2);
            } else if (this.jigsawBadgeSize == "normal") {
                left = calibrateSize == 0 ? 20 : calibrateSize + (differ + 2);
            } else {
                left = calibrateSize == 0 ? 18 : calibrateSize + (differ + 2);
            }
            right = calibrateSize == 0 ? 8 : calibrateSize - (differ - 1);
        } else {
            left = calibrateSize == 0 ? (3 * differ) - 5 : calibrateSize + (differ + 2);
            right = calibrateSize == 0 ? differ - 5 : calibrateSize - (differ - 1);
        }
        position.badge = {top: `${-left}px`};
        position.badge[pos] = `${right}px`;
        return position;
    }
}
