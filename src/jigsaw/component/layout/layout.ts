import {
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, NgModule,
    ViewChild, Input, Output, EventEmitter,
} from "@angular/core";
import {AbstractJigsawComponent, JigsawCommonModule, JigsawRendererHost} from "../common";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'jigsaw-layout, j-layout',
    templateUrl: './layout.html',
    host: {
        '[class.jigsaw-layout]': 'true',
        '[class.jigsaw-layout-optioned]': '_$children.length',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.margin-bottom]': 'marginBottom',
        '[style.margin-right]': 'marginRight'
    }
})
export class JigsawLayout extends AbstractJigsawComponent {
    constructor(private _resolver: ComponentFactoryResolver, private _elementRef: ElementRef) {
        super();
    }

    @ViewChild(JigsawRendererHost)
    public rendererHost: JigsawRendererHost;

    /**
     * internal
     */
    public _$children: ComponentRef<JigsawLayout>[] = [];

    @Input()
    public childMarginBottom: number = 4;

    @Input()
    public childMarginRight: number = 4;

    public marginBottom: string;

    public marginRight: string;

    public selfRef: ComponentRef<JigsawLayout>;

    private _maxChildWidth = 50;
    private _maxChildHeight = 30;

    @Output()
    public remove = new EventEmitter<any>();

    /**
     * internal
     */
    public _$layoutRow(row: number = 2) {
        if (row <= 0) return;

        const childHeight = Math.floor((this._elementRef.nativeElement.offsetHeight - (row - 1) * this.childMarginBottom) / row);

        if (childHeight < this._maxChildHeight) {
            console.warn(`Can not layout less ${this._maxChildHeight}px height box.`);
            return;
        }

        for (let i = 0; i < row; i++) {
            const layoutRef = this._childBoxFactory();
            const layout = layoutRef.instance;
            layout.selfRef = layoutRef;
            layout.width = '100%';
            layout.height = childHeight + '';
            if (i < row - 1) {
                layout.marginBottom = this.childMarginBottom + 'px';
            }
            layout.remove.subscribe(layoutRef => {
                debugger
                const viewContainerRef = this.rendererHost.viewContainerRef;
                console.log(viewContainerRef.indexOf(layoutRef));
                viewContainerRef.remove(viewContainerRef.indexOf(layoutRef));
                console.log(this._$children.indexOf(layoutRef));
                this._$children.splice(this._$children.indexOf(layoutRef), 1);
            });

            this._$children.push(layoutRef);
        }
    }

    /**
     * internal
     */
    public _$layoutColumn(column: number = 2) {
        if (column <= 0) return;

        const childWidth = Math.floor((this._elementRef.nativeElement.offsetWidth - (column - 1) * this.childMarginRight) / column);

        if (childWidth < this._maxChildWidth) {
            console.warn(`Can not layout less ${this._maxChildWidth}px width box.`);
            return;
        }

        for (let i = 0; i < column; i++) {
            const layoutRef = this._childBoxFactory();
            const layout = layoutRef.instance;
            layout.selfRef = layoutRef;
            layout.width = childWidth + '';
            layout.height = '100%';
            if (i < column - 1) {
                layout.marginRight = this.childMarginRight + 'px';
            }
            layout.remove.subscribe(layoutRef => {
                const viewContainerRef = this.rendererHost.viewContainerRef;
                viewContainerRef.remove(viewContainerRef.indexOf(layoutRef));
                this._$children.splice(this._$children.indexOf(layoutRef), 1);
            });

            this._$children.push(layoutRef);
        }
    }

    /**
     * internal
     */
    public _$removeChildren() {
        this.remove.emit(this.selfRef);
    }

    private _childBoxFactory(): ComponentRef<JigsawLayout> {
        const layoutFactory: ComponentFactory<JigsawLayout> = this._resolver.resolveComponentFactory(JigsawLayout);
        return this.rendererHost.viewContainerRef.createComponent(layoutFactory);
    }

}

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawLayout,],
    exports: [JigsawLayout],
    entryComponents: [JigsawLayout]
})
export class JigsawLayoutModule {

}
