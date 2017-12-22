import {
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, NgModule,
    ViewChild, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, ViewChildren, AfterViewInit, Directive, Optional,
    forwardRef, Host, Inject
} from "@angular/core";
import {AbstractJigsawComponent, JigsawCommonModule, JigsawRendererHost} from "../common";
import {CommonModule} from "@angular/common";
import {CommonUtils} from "../../core/utils/common-utils";

export enum LayoutType {row, column}

@Directive({
    selector: '[jigsawLayout], [jLayout]',
    host: {
        '[class.jigsaw-layout]': 'true',
        '[class.jigsaw-layout-has-layout]': 'children.length > 1',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.margin-bottom]': 'marginBottom',
        '[style.margin-right]': 'marginRight'
    }
})
export class JigsawLayout extends AbstractJigsawComponent implements AfterContentInit {
    constructor(private _elementRef: ElementRef) {
        super();
    }

    @ViewChild(JigsawRendererHost)
    public rendererHost: JigsawRendererHost;

    @ContentChildren(JigsawLayout)
    public children: QueryList<JigsawLayout>;

    @Input()
    public childMarginBottom: number = 0;

    @Input()
    public childMarginRight: number = 0;

    @Input()
    public layoutType: LayoutType = LayoutType.row;

    @Input()
    jigsawLayout: string;

    @Input()
    jLayout: string;

    public marginBottom: string;

    public marginRight: string;

    public selfRef: ComponentRef<JigsawLayout>;

    private _maxChildWidth = 60;
    private _maxChildHeight = 30;

    private _getChildSize(layoutType: LayoutType, layoutNum: number): number {
        if (layoutNum <= 0) return 0;

        const childMarginSetting = layoutType === LayoutType.row ? this.childMarginBottom : this.childMarginRight;
        const hostSize = this._getHostSize(layoutType);
        return Math.floor((hostSize - (layoutNum - 1) * childMarginSetting) / layoutNum);
    }

    private _getHostSize(layoutType: LayoutType) {
        const hostOffset = layoutType === LayoutType.row ? 'offsetHeight' : 'offsetWidth';
        return this._elementRef.nativeElement[hostOffset];
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
            const layoutSize = this._getChildSize(this.layoutType, layoutNum);
            this.children.filter(layout => layout != this)
                .forEach(layout => {
                    layout[layoutSizeName] = layoutSize + '';
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
