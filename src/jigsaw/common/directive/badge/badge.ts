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
import {AffixUtils, InternalUtils} from "../../core/utils/internal-utils";


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

    constructor(protected _elementRef: ElementRef) {
        super();
    }

    private _badge: HTMLElement;
    private _badgeElement: Element;
    private _maskElement: Element;

    private _opacity: string;
    private _visibility: string;
    private _display: string;
    private _hostWidth: string;
    private _hostHeight: string;
    private _hostTop: string;
    private _hostLeft: string;

    private get _nativeElement() {
        return this._elementRef.nativeElement;
    }

    private get _computedStyles() {
        return getComputedStyle(this._nativeElement, null);
    }

    private get _body() {
        return AffixUtils.getDocumentBody();
    }

    private _stylesChanged(): boolean {
        return this._computedStyles['opacity'] != this._opacity ||
            this._computedStyles['visibility'] != this._visibility ||
            this._computedStyles['display'] != this._display ||
            this._computedStyles['width'] != this._hostWidth ||
            this._computedStyles['height'] != this._hostHeight ||
            this._computedStyles['top'] != this._hostTop ||
            this._computedStyles['left'] != this._hostLeft
    }

    private _setStyles() {
        this._opacity = this._computedStyles['opacity'];
        this._visibility = this._computedStyles['visibility'];
        this._display = this._computedStyles['display'];
        this._hostWidth = this._computedStyles['width'];
        this._hostHeight = this._computedStyles['height'];
        this._hostTop = this._computedStyles['top'];
        this._hostLeft = this._computedStyles['left'];
    }

    private _resetBadgeStyles(element: Element, opacity = 1) {
        InternalUtils.renderer.removeStyle(element, 'visibility');
        InternalUtils.renderer.removeStyle(element, 'display');
        InternalUtils.renderer.removeStyle(element, 'opacity');

        InternalUtils.renderer.setStyle(element, 'visibility', this._computedStyles['visibility']);
        if (this._computedStyles['display'] == "none") {
            InternalUtils.renderer.setStyle(element, 'display', 'none');
        } else {
            InternalUtils.renderer.setStyle(element, 'display', 'inline-block');
        }
        if (parseInt(this._computedStyles['opacity']) == 0) {
            InternalUtils.renderer.setStyle(element, 'opacity', 0);
        } else {
            InternalUtils.renderer.setStyle(element, 'opacity', opacity);
        }
    }

    private _resetMaskStyles() {
        this._resetBadgeStyles(this._maskElement, 0.6);
        InternalUtils.renderer.removeStyle(this._maskElement, 'border-top-right-radius');
        InternalUtils.renderer.removeStyle(this._maskElement, 'border-top-left-radius');
        InternalUtils.renderer.removeStyle(this._maskElement, 'border-bottom-right-radius');
        InternalUtils.renderer.removeStyle(this._maskElement, 'border-bottom-left-radius');
        switch (this.jigsawBadgePosition) {
            case "rightTop":
                InternalUtils.renderer.setStyle(this._maskElement, 'border-top-right-radius', this._computedStyles['border-top-right-radius']);
                break;
            case "rightBottom":
                InternalUtils.renderer.setStyle(this._maskElement, 'border-bottom-right-radius', this._computedStyles['border-bottom-right-radius']);
                break;
            case "right":
                InternalUtils.renderer.setStyle(this._maskElement, 'border-top-right-radius', this._computedStyles['border-top-right-radius']);
                InternalUtils.renderer.setStyle(this._maskElement, 'border-bottom-right-radius', this._computedStyles['border-bottom-right-radius']);
                break;
            case "leftTop":
                InternalUtils.renderer.setStyle(this._maskElement, 'border-top-left-radius', this._computedStyles['border-top-left-radius']);
                break;
            case "leftBottom":
                InternalUtils.renderer.setStyle(this._maskElement, 'border-bottom-left-radius', this._computedStyles['border-bottom-left-radius']);
                break;
            case "left":
                InternalUtils.renderer.setStyle(this._maskElement, 'border-top-left-radius', this._computedStyles['border-top-left-radius']);
                InternalUtils.renderer.setStyle(this._maskElement, 'border-bottom-left-radius', this._computedStyles['border-bottom-left-radius']);
                break;
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
        if (this._badgeElement) {
            this._body.removeChild(this._badgeElement);
            this._badgeElement = null;
        }
        if (!this.jigsawBadgeValue) {
            return;
        }

        this._badgeElement = InternalUtils.renderer.createElement('span');
        this._badgeElement.classList.add("jigsaw-badge");
        const realBadge = this._getRealBadge();
        const classPre = this.jigsawBadgeValue == 'dot' ? "jigsaw-badge-dot" : "jigsaw-badge";
        const title = this.jigsawBadgeTitle ? this.jigsawBadgeTitle : '';
        this._badgeElement.setAttribute('title', title);
        this._badgeElement.innerHTML = this.jigsawBadgeValue == 'dot' ? '' : realBadge;
        this._badgeElement.classList.add(`${classPre}-size-${this.jigsawBadgeSize}`);
        if (this.jigsawBadgeMask != "none") {
            if (this._maskElement) {
                this._body.removeChild(this._maskElement);
                this._maskElement = null;
            }
            this._maskElement = InternalUtils.renderer.createElement('div');
            const classMaskPre = "jigsaw-badge-mask";
            const backgroundClass = `${classMaskPre}-${this.jigsawBadgeMask}`;
            let maskPos = <string>this.jigsawBadgePosition;
            if ((/(right.+)|(left.+)/).test(this.jigsawBadgePosition)) {
                maskPos = this.jigsawBadgePosition.toLowerCase().replace(/(right)/, "$1-").replace(/(left)/, "$1-");
            }
            const positionClass = `${classMaskPre}-${maskPos}`;
            const maskSizeClass = `${classMaskPre}-${this.jigsawBadgeValue == 'dot' ? 'dot-' : ''}${this.jigsawBadgeSize}`;
            this._maskElement.classList.add(classMaskPre);
            this._maskElement.classList.add(backgroundClass);
            this._maskElement.classList.add(positionClass);
            this._maskElement.classList.add(maskSizeClass);

            if (this.jigsawBadgePosition == "right" || this.jigsawBadgePosition == "left") {
                this._maskElement.classList.add(`${classMaskPre}-background-${this.jigsawBadgeMask}`);
            }
            this._body.insertAdjacentElement('beforeend', this._maskElement);
            this._setMaskPosition();
        }

        if (this.jigsawBadgeStyle != "none") {
            const style = this.jigsawBadgeValue == "dot" || this.jigsawBadgeStyle == "solid" ? "-solid" : "-border";
            this._badgeElement.classList.add(`jigsaw-badge${style}-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
        } else {
            if (this.jigsawBadgeValue != "dot") {
                this._badgeElement.classList.add(`jigsaw-badge-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
            }
        }

        if (this.jigsawBadgeStyle == "border") {
            this._badgeElement.classList.add(`jigsaw-badge-${this.jigsawBadgeStatus == 'critical' ? 'error' : this.jigsawBadgeStatus}`);
            this._badgeElement.classList.add(`jigsaw-badge-border-${this.jigsawBadgeSize}-line`);
        }

        if (this.jigsawBadgePointerCursor) {
            this._badgeElement.classList.add(`jigsaw-badge-cursor`);
        } else {
            this._badgeElement.classList.add(`jigsaw-badge-cursor-default`);
        }
        this._badgeElement.addEventListener('click', () => {
            this.jigsawBadgeClick.emit(this.jigsawBadgeValue);
        });

        this._body.insertAdjacentElement('beforeend', this._badgeElement);
        this._setPosition();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._maskElement) {
            AffixUtils.getDocumentBody().removeChild(this._maskElement);
            this._maskElement = null;
            window.removeEventListener("load", this._setMaskPosition.bind(this));
        }
        if (this._badgeElement) {
            AffixUtils.getDocumentBody().removeChild(this._badgeElement);
            this._badgeElement = null;
            window.removeEventListener("load", this._setPosition.bind(this));
        }
    }

    ngAfterViewInit() {
        this._addBadge();
        window.addEventListener("load",
            this._setPosition.bind(this)
        );
        window.addEventListener("load",
            this._setMaskPosition.bind(this)
        );
        Promise.resolve().then(() => {
            this._setPosition();
            this._setMaskPosition();
        })
    }

    ngAfterViewChecked() {
        if (!this._badgeElement || !this._nativeElement || !this._stylesChanged()) {
            return;
        }
        if (this.jigsawBadgeMask != "none") {
            this._setMaskPosition();
            this._resetMaskStyles();
        }
        this._setStyles();
        this._setPosition();
        this._resetBadgeStyles(this._badgeElement);
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

    private _setPosition() {
        if (!this._badgeElement) {
            return;
        }
        const hostPosition = this._nativeElement.getBoundingClientRect();
        let maskPosition;
        if (this.jigsawBadgeMask != "none") {
            maskPosition = this._maskElement.getBoundingClientRect();
        }
        const differ = this._getDiffer();
        switch (this.jigsawBadgePosition) {
            case "rightTop":
                if (this.jigsawBadgeMask != "none") {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.width + hostPosition.left - maskPosition.width * 0.6 + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + maskPosition.width * 0.3 - differ + 'px');
                } else {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.width + hostPosition.left - differ + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top - differ + 'px');
                }
                break;
            case "rightBottom":
                if (this.jigsawBadgeMask != "none") {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.width + hostPosition.left - maskPosition.width * 0.6 + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + hostPosition.height - maskPosition.width * 0.3 - differ + 'px');
                } else {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.width + hostPosition.left - differ + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + hostPosition.height - differ + 'px');
                }
                break;
            case "right":
                if (this.jigsawBadgeMask != "none") {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.width * 0.8 + hostPosition.left - differ + 'px');
                } else {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.width + hostPosition.left - differ + this.jigsawBadgeHorizontalOffset + 'px');
                }
                InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + hostPosition.height / 2 - differ + 'px');
                break;
            case "leftTop":
                if (this.jigsawBadgeMask != "none") {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.left + maskPosition.width * 0.1 + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + maskPosition.width * 0.3 - differ + 'px');
                } else {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.left - differ + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top - differ + 'px');
                }
                break;
            case "leftBottom":
                if (this.jigsawBadgeMask != "none") {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.left + maskPosition.width * 0.1 + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + hostPosition.height - maskPosition.width * 0.3 - differ + 'px');
                } else {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.left - differ + 'px');
                    InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + hostPosition.height - differ + 'px');
                }
                break;
            case "left":
                if (this.jigsawBadgeMask != "none") {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.width * 0.15 + hostPosition.left - differ + 'px');
                } else {
                    InternalUtils.renderer.setStyle(this._badgeElement, 'left', hostPosition.left - differ - this.jigsawBadgeHorizontalOffset + 'px');
                }
                InternalUtils.renderer.setStyle(this._badgeElement, 'top', hostPosition.top + hostPosition.height / 2 - differ + 'px');
                break;
        }
    }

    private _setMaskPosition() {
        if (!this._maskElement) {
            return;
        }
        const hostPosition = this._nativeElement.getBoundingClientRect();
        const maskPosition = this._maskElement.getBoundingClientRect();
        switch (this.jigsawBadgePosition) {
            case "rightTop":
                InternalUtils.renderer.setStyle(this._maskElement, 'left', hostPosition.width + hostPosition.left - maskPosition.width + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'top', hostPosition.top + 'px');
                break;
            case "rightBottom":
                InternalUtils.renderer.setStyle(this._maskElement, 'left', hostPosition.width + hostPosition.left - maskPosition.width + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'top', hostPosition.top + hostPosition.height - maskPosition.height + 'px');
                break;
            case "right":
                InternalUtils.renderer.setStyle(this._maskElement, 'left', hostPosition.width * 2 / 3 + hostPosition.left + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'top', hostPosition.top + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'width', hostPosition.width * 1 / 3 + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'height', hostPosition.height + 'px');
                break;
            case "leftTop":
                InternalUtils.renderer.setStyle(this._maskElement, 'left', hostPosition.left + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'top', hostPosition.top + 'px');
                break;
            case "leftBottom":
                InternalUtils.renderer.setStyle(this._maskElement, 'left', hostPosition.left + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'top', hostPosition.top + hostPosition.height - maskPosition.height + 'px');
                break;
            case "left":
                InternalUtils.renderer.setStyle(this._maskElement, 'left', hostPosition.left + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'top', hostPosition.top + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'width', hostPosition.width * 1 / 3 + 'px');
                InternalUtils.renderer.setStyle(this._maskElement, 'height', hostPosition.height + 'px');
                break;
        }
    }
}
