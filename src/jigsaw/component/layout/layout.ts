import {
    ElementRef, NgModule, Input, ContentChildren, QueryList, AfterContentInit, Directive, Renderer2
} from "@angular/core";
import {AbstractJigsawComponent, JigsawCommonModule} from "../common";
import {CommonModule} from "@angular/common";

export enum LayoutType {row, column}

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
    public layoutType: LayoutType = LayoutType.row;

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
        console.log(value);
        this._span = value;
        this._renderer.addClass(this.elementRef.nativeElement, 'jigsaw-layout-col-' + value);
    }

    private _isAverage(layoutType: LayoutType, children: JigsawLayout[]) {
        const sizeName = layoutType === LayoutType.row ? 'height' : 'width';
        return !children.reduce((arr, layout) => {
            const size = layout[sizeName];
            if (size) arr.push(size);
            return arr
        }, []).length;
    }

    private _getAverageChildSize(layoutType: LayoutType, layoutNum: number): string {
        if (layoutNum <= 0) return '';
        const hostSize = this._getHostSize(layoutType);
        return layoutType === LayoutType.row ? (hostSize / layoutNum).toPrecision(10) + '' : (100 / layoutNum).toPrecision(10) + '%';
    }

    private _getHostSize(layoutType: LayoutType) {
        const hostOffset = layoutType === LayoutType.row ? 'offsetHeight' : 'offsetWidth';
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
            const layoutSizeName = this.layoutType === LayoutType.row ? 'height' : 'width';
            const layoutOtherSizeName = layoutSizeName == 'height' ? 'width' : 'height';
            const layoutSize = this._isAverage(this.layoutType, this.children.filter(layout => layout != this)) ?
                this._getAverageChildSize(this.layoutType, layoutNum) : null;
            this.children.filter(layout => layout != this)
                .forEach(layout => {
                    if (this.layoutType === LayoutType.column) {
                        if (!layout.span) console.warn('please set layout span');
                        //this._renderer.addClass(layout.elementRef.nativeElement, 'jigsaw-layout-col-' + layout._span);
                    } else if (this.layoutType === LayoutType.row) {
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

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawLayout],
    exports: [JigsawLayout]
})
export class JigsawLayoutModule {

}
