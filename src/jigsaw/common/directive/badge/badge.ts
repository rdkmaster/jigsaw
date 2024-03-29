import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, OnDestroy} from "@angular/core";
import {CommonUtils} from "../../core/utils/common-utils";
import {AccessoryBase} from "./accessory-base";
import {BaseStyle} from "./accessory-base";
import {BasePosition} from "./accessory-base";

type Position = BasePosition & { badge?: BaseStyle }

@Directive({
    selector: '[jigsawBadge], [jigsaw-badge]'
})
export class JigsawBadgeDirective extends AccessoryBase implements AfterViewInit {
    constructor(protected _render: Renderer2, protected _elementRef: ElementRef, zone?: NgZone) {
        super(_render, _elementRef, zone);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input('jigsawBadgeValue')
    public value: string | number | 'dot';

    /**
     * @NoMarkForCheckRequired
     */
    @Input('jigsawBadgeSize')
    public size: 'large' | 'normal' | 'small' = 'normal';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeStatus: 'normal' | 'success' | 'warn' | 'error' | 'critical' | 'none' = 'critical';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeMaxValue: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeMask: "none" | "dark" | "light" | "default" = "none";

    /**
     * solid值已废弃，采用solid-circle替代
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeStyle: "solid-circle" | "solid-rectangular" | "border" | "solid" | "none" = "solid-circle";

    private _hOffset: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get jigsawBadgeHorizontalOffset(): number {
        return this._hOffset;
    }

    public set jigsawBadgeHorizontalOffset(value: number) {
        value = Number(value);
        if (this._hOffset == value) {
            return;
        }
        this._hOffset = value;
        this.addAccessory();
    }

    private _vOffset: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get jigsawBadgeVerticalOffset(): number {
        return this._vOffset;
    }

    public set jigsawBadgeVerticalOffset(value: number) {
        value = Number(value);
        if (this._vOffset == value) {
            return;
        }
        this._vOffset = value;
        this.addAccessory();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawBadgeTitle: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input('jigsawBadgePointerCursor')
    public pointerCursor: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input('jigsawBadgePosition')
    public position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'left' | 'right' = 'rightTop';

    @Output()
    public jigsawBadgeClick: EventEmitter<string | number | "dot"> = new EventEmitter<string | number | "dot">();

    protected addAccessory() {
        if (!this.initialized) {
            return;
        }
        if (this._accessory) {
            this._elementRef.nativeElement.removeChild(this._accessory);
            this._accessory = null;
        }
        this._accessory = window.document.createElement('div');
        this._accessory.classList.add("jigsaw-badge-host");
        const realBadge = this._getRealBadge();
        const classPre = this.value == 'dot' ? "jigsaw-badge-dot" : "jigsaw-badge";
        const position: Position = this.calPosition();
        this._updatePosition(position);
        // 徽标自身的位置
        const positionStyle = `left:${position.badge.left}; top:${position.badge.top}; right:${position.badge.right}; bottom:${position.badge.bottom}`;
        const extraStyle = this.value == 'dot' ? '' :
            `display:${!!realBadge ? 'flex' : 'none'}; white-space:nowrap; align-items:center; justify-content:center; height: fit-content`;
        const title = this.jigsawBadgeTitle ? this.jigsawBadgeTitle : '';
        this._accessory.innerHTML = this.value == 'dot' ?
            `<div style="${positionStyle}" title="${title}"></div>` :
            `<div style="${positionStyle}; ${extraStyle}" title="${title}">${realBadge}</div>`;
        this._accessory.children[0].classList.add(classPre);
        this._accessory.children[0].classList.add(`${classPre}-size-${this.size}`);
        let badgeStyle = '-dot';
        if (this.value != 'dot') {
            badgeStyle = this.jigsawBadgeStyle == 'none' ? '' : `-${this.jigsawBadgeStyle}`;
        }
        const badgePos: string = this.position.toLowerCase().replace(/^(right|left)(.+)/, "$1-$2");
        this._accessory.children[0].classList.add(`jigsaw-badge-${badgePos}`);
        if (this.jigsawBadgeMask != "none") {
            const calibrateSize = this._calibrateMaskSize();
            const maskStyle = calibrateSize != 0 ? `border-width: ${calibrateSize}px` : '';
            this._accessory.innerHTML += `<div style="${maskStyle}"></div>`;
            const classMaskPre = "jigsaw-badge-mask";
            const backgroundClass = `${classMaskPre}-${this.jigsawBadgeMask}`;
            const positionClass = `${classMaskPre}-${badgePos}`;
            const maskSizeClass = `${classMaskPre}-${this.size}`;
            this._accessory.children[1].classList.add(classMaskPre);
            this._accessory.children[1].classList.add(backgroundClass);
            this._accessory.children[1].classList.add(positionClass);
            this._accessory.children[1].classList.add(maskSizeClass);

            if (this.position == "right" || this.position == "left") {
                this._accessory.children[1].classList.add(`${classMaskPre}-background-${this.jigsawBadgeMask}`);
            }
            if (this.value == "dot") {
                this._accessory.children[0].classList.add(`jigsaw-badge-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
            }
            badgeStyle = this.value == 'dot' ? badgeStyle : '';
        }
        this._accessory.children[0].classList.add(`jigsaw-badge${badgeStyle}-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);

        if (this.pointerCursor) {
            this._accessory.children[0].classList.add(`jigsaw-badge-cursor`);
        } else {
            this._accessory.children[0].classList.add(`jigsaw-badge-cursor-default`);
        }
        if (this._removeClickHandler) {
            this._removeClickHandler();
        }
        this._removeClickHandler = this._render.listen(this._accessory.children[0], 'click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.jigsawBadgeClick.emit(this.value);
        });
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._accessory);
    }

    // 判断是否需要限定mask的尺寸，最大不能超过当前宿主的宽高
    private _calibrateMaskSize(): number {
        const hostStyle = getComputedStyle(this._elementRef.nativeElement);
        const width = parseInt(hostStyle.width);
        const height = parseInt(hostStyle.height);
        const compareSize = Math.floor(Math.min(width, height) / 2);
        const maskSize = this.size == 'small' ? 20 : (this.size == 'large' ? 28 : 24);
        return compareSize != 0 && maskSize > compareSize ? compareSize : 0;
    }

    private _getRealBadge(): string {
        if (this.value == 'dot' || CommonUtils.isUndefined(this.value)) {
            return '';
        }
        const badgeStr = this.value.toString();
        const num = parseInt(badgeStr);
        if (isNaN(num)) {
            return (/(^fa\s+fa-.+$)|(^iconfont\s+iconfont-.+$)/).test(badgeStr) ? `<span class="${badgeStr}"></span>` : this.value.toString();
        } else {
            return CommonUtils.isDefined(this.jigsawBadgeMaxValue) && num > this.jigsawBadgeMaxValue ? `${this.jigsawBadgeMaxValue}+` : num.toString();
        }
    }

    protected calPosition(): Position {
        if (this.jigsawBadgeMask != "none") {
            return this._calMaskPosition();
        }
        const differ = this._getDiffer();

        switch (this.position) {
            case "left":
                const left: Position = {
                    host: {left: 0, top: `50%`}
                };
                if (this.value == 'dot') {
                    left.badge = {
                        left: `${-(differ + this._hOffset)}px`,
                        top: `calc(50% - ${this._vOffset}px)`
                    }
                } else {
                    left.badge = {
                        right: `calc( 100% - ${differ + 2 + this._hOffset}px )`,
                        top: `calc( 50% - ${this._vOffset}px )`
                    }
                }
                return left;
            case "leftBottom":
                return {
                    host: { left: 0, top: '100%' },
                    badge: { left: `${-(differ + this._hOffset)}px`, bottom: `${-(differ + this._vOffset)}px`, top: 'initial' }
                };
            case "leftTop":
                return {
                    host: {left: 0, top: 0},
                    badge: {left: `${-(differ + this._hOffset)}px`, top: `${-(differ  + this._vOffset)}px`}
                };
            case "right":
                const right: Position = {
                    host: {right: 0, top: `50%`}
                };
                if (this.value == 'dot') {
                    right.badge = {
                        right: `${-(differ + this._hOffset)}px`,
                        top: `calc(50% - ${this._vOffset}px)`
                    };
                } else {
                    right.badge = {
                        left: `calc( 100% - ${differ + 2 + this._hOffset}px)`,
                        top: `calc(50% - ${ this._vOffset}px)`
                    };
                }
                return right;
            case "rightBottom":
                return {
                    host: {right: 0, top: '100%'},
                    badge: {right: `${-(differ + this._hOffset)}px`, bottom: `${-(differ + this._vOffset)}px`, top: 'initial'}
                };
            case "rightTop":
                return {
                    host: {right: 0, top: 0},
                    badge: {right: `${-(differ + this._hOffset)}px`, top: `${-(differ  + this._vOffset)}px`}
                };
        }
    }

    private _calMaskPosition(): Position {
        const calibrateSize = this._calibrateMaskSize() / 2;
        const differ = this._getDiffer();
        switch (this.position) {
            case "left":
                return {
                    host: {left: 0, top: 0, width: '30%', height: '100%'},
                    badge: {left: `calc(50% - ${differ}px)`, top: `50%`}
                };
            case "leftBottom":
                return this._getBottomPosition('left', differ, calibrateSize);
            case "leftTop":
                return this._getTopPosition('left', differ, calibrateSize);
            case "right":
                return {
                    host: {right: 0, top: 0, width: '30%', height: '100%'},
                    badge: {top: `50%`, right: `calc(50% - ${differ}px)`}
                };
            case "rightBottom":
                return this._getBottomPosition('right', differ, calibrateSize);
            case "rightTop":
                return this._getTopPosition('right', differ, calibrateSize);
        }
    }

    private _getDiffer(): number {
        let differ: number;
        if (this.value == 'dot') {
            if (this.size == "large") {
                differ = 8;
            } else if (this.size == "normal") {
                differ = 6;
            } else {
                differ = 4;
            }
        } else {
            if (this.size == "large") {
                differ = 12;
            } else if (this.size == "normal") {
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
        const offset = this.value == 'dot' ? 10 : (this.size == "large" ? 6 : 4);
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

        let left: number, right: number;
        if (this.value == 'dot') {
            if (this.size == "large") {
                left = calibrateSize == 0 ? 24 : calibrateSize + (differ + 2);
            } else if (this.size == "normal") {
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

