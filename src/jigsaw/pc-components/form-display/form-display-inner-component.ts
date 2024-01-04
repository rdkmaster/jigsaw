import {
    Component,
    Input,
    ViewChild,
    ComponentRef,
    AfterViewInit,
    OnInit,
    Type,
    ComponentFactoryResolver,
    ChangeDetectorRef,
    NgZone,
    OnDestroy,
    Directive
} from "@angular/core"
import {AbstractJigsawViewBase, JigsawRendererHost} from "../../common/common";
import {
    FormDisplayHtmlCellRenderer,
    FormDisplayRendererBase,
    FormDisplayTagCellRenderer
} from "./form-display-renderer";

@Directive()
export class JigsawFormDisplayCellBase extends AbstractJigsawViewBase implements AfterViewInit, OnInit {
    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetector: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
    }

    @ViewChild(JigsawRendererHost)
    protected rendererHost: JigsawRendererHost;
    protected rendererRef: ComponentRef<FormDisplayRendererBase>;
    protected _customRenderer: Type<FormDisplayRendererBase> | string;

    private _cellData: string | string[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get cellData() {
        return this._cellData;
    }

    public set cellData(value: string | string[]) {
        this._cellData = value;
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get renderer(): Type<FormDisplayRendererBase> | string {
        return this._customRenderer
    }

    public set renderer(value: Type<FormDisplayRendererBase> | string) {
        if (this._customRenderer == value || (!value && this._customRenderer instanceof FormDisplayHtmlCellRenderer)) {
            return;
        }
        this._customRenderer = value;
        this.rendererHost?.viewContainerRef.clear();
    }

    private _rendererInitData: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get rendererInitData() {
        return this._rendererInitData;
    }

    public set rendererInitData(value: any) {
        this._rendererInitData = value;
        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.initData = value;
        }
    }

    protected rendererFactory(renderer: Type<FormDisplayRendererBase>, initData: any): ComponentRef<FormDisplayRendererBase> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
        const componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.cellData = this.cellData;
        componentRef.instance.initData = initData;
        return componentRef;
    }

    private _getRendererByType(renderer: string): Type<FormDisplayRendererBase> {
        switch (renderer) {
            case 'html':
                return FormDisplayHtmlCellRenderer;
            case 'tag':
                return FormDisplayTagCellRenderer;
            default:
                return FormDisplayHtmlCellRenderer
        }
    }

    ngAfterViewInit(): void {
        if (typeof this.renderer == 'string') {
            this.renderer = this._getRendererByType(this.renderer);
        }
        this.rendererRef = this.rendererFactory(this.renderer, this.rendererInitData);
        this.changeDetector.detectChanges();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy()
    }
}

/**
 * form-display的单元格渲染器
 * @internal
 */
@Component({
    selector: 'jigsaw-form-display-cell',
    template: '<ng-template jigsaw-renderer-host></ng-template>'
})
export class JigsawFormDisplayCellComponent extends JigsawFormDisplayCellBase implements OnInit, OnDestroy {
}
