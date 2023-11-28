import {
    Component,
    Input,
    TemplateRef,
    ViewChild,
    EmbeddedViewRef,
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
import {DefaultFormDisplayCellRenderer, FormDisplayRendererBase} from "./form-display-renderer";


@Directive()
export class JigsawFormDisplayCellBase extends AbstractJigsawViewBase implements AfterViewInit, OnInit {
    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetector: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
    }

    @ViewChild(JigsawRendererHost)
    protected rendererHost: JigsawRendererHost;
    protected rendererRef: ComponentRef<FormDisplayRendererBase> | EmbeddedViewRef<any>;
    protected _customRenderer: Type<FormDisplayRendererBase> | TemplateRef<any> | 'html';

    private _cellData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get cellData() {
        return this._cellData;
    }

    public set cellData(value) {
        this._cellData = value;
    }


    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get renderer(): Type<FormDisplayRendererBase> | TemplateRef<any> | 'html' {
        return this._customRenderer
    }

    public set renderer(value: Type<FormDisplayRendererBase> | TemplateRef<any> | 'html') {
        if (this._customRenderer == value || (!value && this._customRenderer instanceof DefaultFormDisplayCellRenderer)) {
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

    protected rendererFactory(renderer: Type<FormDisplayRendererBase> | TemplateRef<any>, initData: any): ComponentRef<FormDisplayRendererBase> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            return this.rendererHost.viewContainerRef.createEmbeddedView(renderer);
        } else {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
            const componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.cellData = this.cellData;
            componentRef.instance.initData = initData;
            return componentRef;
        }
    }

    ngAfterViewInit(): void {
        this.renderer = this.renderer != 'html' ? this.renderer : DefaultFormDisplayCellRenderer;
        this.rendererRef = this.rendererFactory(this.renderer, this.rendererInitData);
    }

    ngOnInit(): void {

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
