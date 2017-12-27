import {
    ElementRef, NgModule, Input, ContentChildren, QueryList, AfterContentInit, Directive, Renderer2, Component, Optional, Host
} from "@angular/core";
import {AbstractJigsawComponent, JigsawCommonModule} from "../common";
import {CommonModule} from "@angular/common";

@Directive({
    selector: '[jigsawLayout], [jLayout]',
    host: {
        '[class.jigsaw-layout]': 'true',
        '[class.jigsaw-layout-has-layout]': 'children.length > 1',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawLayout extends AbstractJigsawComponent implements AfterContentInit {

    constructor(public elementRef: ElementRef, private _renderer: Renderer2) {
        super();
    }

    @ContentChildren(JigsawLayout)
    public children: QueryList<JigsawLayout>;

    @Input()
    public layoutType: string = 'column';

    @Input()
    jigsawLayout: string;

    @Input()
    jLayout: string;

    private _span: number;

    @Input()
    public get span(): number {
        return this._span;
    }

    public set span(value: number) {
        this._span = value;
        this._renderer.addClass(this.elementRef.nativeElement, 'jigsaw-col-' + value);
    }

    private _offset: number;

    @Input()
    public get offset(): number {
        return this._offset;
    }

    public set offset(value: number) {
        this._offset = value;
        this._renderer.addClass(this.elementRef.nativeElement, 'jigsaw-col-offset-' + value);
    }

    private _pull: number;

    @Input()
    public get pull(): number {
        return this._pull;
    }

    public set pull(value: number) {
        this._pull = value;
        this._renderer.addClass(this.elementRef.nativeElement, 'jigsaw-col-pull-' + value);
    }

    private _push: number;

    @Input()
    public get push(): number {
        return this._push;
    }

    public set push(value: number) {
        this._push = value;
        this._renderer.addClass(this.elementRef.nativeElement, 'jigsaw-col-push-' + value);
    }

    private _isAverage(layoutType: string, children: JigsawLayout[]) {
        const sizeName = layoutType == 'row' ? 'height' : 'width';
        return !children.reduce((arr, layout) => {
            const size = layout[sizeName];
            if (size) arr.push(size);
            return arr
        }, []).length;
    }

    private _getAverageChildSize(layoutType: string, layoutNum: number): string {
        if (layoutNum <= 0) return '';
        const hostSize = this._getHostSize(layoutType);
        return layoutType == 'row' ? (hostSize / layoutNum).toPrecision(10) + '' : (100 / layoutNum).toPrecision(10) + '%';
    }

    private _getHostSize(layoutType: string) {
        const hostOffset = layoutType == 'row' ? 'offsetHeight' : 'offsetWidth';
        return this.elementRef.nativeElement[hostOffset];
    }

    public triggerChildrenLayout() {
        if (this.children.length <= 1) return;
        setTimeout(() => {
            // 等待当前组件渲染尺寸
            this.children.filter(layout => layout != this)
                .forEach(layout => {
                    layout.layout();
                })
        })
    }

    public layout() {
        setTimeout(() => {
            // 等待当前组件渲染尺寸
            if (this.children.length <= 1) return;
            const layoutNum = this.children.length - 1;
            const layoutSizeName = this.layoutType == 'row' ? 'height' : 'width';
            const layoutOtherSizeName = layoutSizeName == 'height' ? 'width' : 'height';
            const layoutSize = this._isAverage(this.layoutType, this.children.filter(layout => layout != this)) ?
                this._getAverageChildSize(this.layoutType, layoutNum) : null;
            this.children.filter(layout => layout != this)
                .forEach(layout => {
                    if (this.layoutType == 'column') {
                        if (!layout.span) console.warn('please set layout span');
                        //this._renderer.addClass(layout.elementRef.nativeElement, 'jigsaw-layout-col-' + layout._span);
                    } else if (this.layoutType == 'row') {
                        layout[layoutSizeName] = layoutSize;
                    }
                    layout[layoutOtherSizeName] = '100%';
                    layout.layout();
                    layout.triggerChildrenLayout();
                })
        })
    }

    ngAfterContentInit() {
        // 判断是否为根布局组件
        if (this.jigsawLayout == 'root' || this.jLayout == 'root') {
            this.layout();
        }
    }

}

@Component({
    selector: 'jigsaw-column, j-column',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-col]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
    }
})
export class JigsawColumn extends AbstractJigsawComponent {
    private _element: HTMLElement;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        super();
        this._element = this._elementRef.nativeElement;
    }

    private _span: number;

    @Input()
    public get span(): number {
        return this._span;
    }

    public set span(value: number) {
        this._span = value;
        this._renderer.addClass(this._element, 'jigsaw-col-' + value);
    }

    private _offset: number;

    @Input()
    public get offset(): number {
        return this._offset;
    }

    public set offset(value: number) {
        this._offset = value;
        this._renderer.addClass(this._element, 'jigsaw-col-offset-' + value);
    }

    private _pull: number;

    @Input()
    public get pull(): number {
        return this._pull;
    }

    public set pull(value: number) {
        this._pull = value;
        this._renderer.addClass(this._element, 'jigsaw-col-pull-' + value);
    }

    private _push: number;

    @Input()
    public get push(): number {
        return this._push;
    }

    public set push(value: number) {
        this._push = value;
        this._renderer.addClass(this._element, 'jigsaw-col-push-' + value);
    }

    /* flex box */
    @Input()
    type: string;

    /* flex item */
    private _order: number;
    private _grow: number;
    private _shrink: number;

    @Input()
    public get order(): number {
        return this._order;
    }

    public set order(value: number) {
        this._order = value;
        this._renderer.addClass(this._element, 'jigsaw-col-order-' + value);
    }

    @Input()
    public get grow(): number {
        return this._grow;
    }

    public set grow(value: number) {
        this._grow = value;
        this._renderer.setStyle(this._element, 'flex-grow', Number(value));
    }

    @Input()
    public get shrink(): number {
        return this._shrink;
    }

    public set shrink(value: number) {
        this._shrink = value;
        this._renderer.setStyle(this._element, 'flex-shrink', Number(value));
    }

}

@Component({
    selector: 'jigsaw-row, j-row',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-row]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawRow extends AbstractJigsawComponent {

    private _element: HTMLElement;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        super();
        this._element = this._elementRef.nativeElement;
    }

    @Input()
    type: string;

    private _direction: string;

    private _justify: string;

    private _align: string;

    @Input()
    public get direction(): string {
        return this._direction;
    }

    public set direction(value: string) {
        this._direction = value;
        this._renderer.setStyle(this._element, 'flex-direction', value);
    }

    @Input()
    public get justify(): string {
        return this._justify;
    }

    public set justify(value: string) {
        this._justify = value;
        this._renderer.setStyle(this._element, 'justify-content', value);
    }

    @Input()
    public get align(): string {
        return this._align;
    }

    public set align(value: string) {
        this._align = value;
        this._renderer.setStyle(this._element, 'align-items', value);
    }

    /* flex property */
    private _order: number;
    private _grow: number;
    private _shrink: number;

    @Input()
    public get order(): number {
        return this._order;
    }

    public set order(value: number) {
        this._order = value;
        this._renderer.addClass(this._element, 'jigsaw-col-order-' + value);
    }

    @Input()
    public get grow(): number {
        return this._grow;
    }

    public set grow(value: number) {
        this._grow = value;
        this._renderer.setStyle(this._element, 'flex-grow', Number(value));
    }

    @Input()
    public get shrink(): number {
        return this._shrink;
    }

    public set shrink(value: number) {
        this._shrink = value;
        this._renderer.setStyle(this._element, 'flex-shrink', Number(value));
    }

}

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawLayout, JigsawColumn, JigsawRow],
    exports: [JigsawLayout, JigsawColumn, JigsawRow]
})
export class JigsawGridModule {

}
