import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Type,
    ViewChild
} from "@angular/core"
import {AbstractJigsawViewBase, JigsawRendererHost} from "../../common/common";
import {
    AutoDisplayGraphRenderer,
    AutoDisplayModeledGraphRenderer,
    AutoDisplayRendererBase,
    AutoDisplayTableRenderer,
    DisplayRendererBase
} from "./renderer/auto-display-renderer";

@Directive()
export abstract class JigsawDisplayInnerBase extends AbstractJigsawViewBase implements AfterViewInit, OnInit {
    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
        protected changeDetector: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
    }

    @ViewChild(JigsawRendererHost)
    protected rendererHost: JigsawRendererHost;

    protected rendererRef: ComponentRef<DisplayRendererBase>;
    protected customRenderer: Type<DisplayRendererBase> | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get renderer(): Type<DisplayRendererBase> | string {
        return this.customRenderer
    }

    public set renderer(value: Type<DisplayRendererBase> | string) {
        if (this.customRenderer == value) {
            return;
        }
        this.customRenderer = value;
        this.rendererHost?.viewContainerRef.clear();
    }

    protected _rendererInitData: any;

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

    protected abstract rendererFactory(renderer: Type<DisplayRendererBase>, initData: any): ComponentRef<DisplayRendererBase>;

    protected abstract _getRendererByType(renderer: Type<DisplayRendererBase> | string): Type<DisplayRendererBase>;

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

export type AutoDisplayRenderer = Type<AutoDisplayRendererBase> | 'table' | 'origin-echarts' | 'modeled-echarts';

export type AutoDisplayData = {
    /**
     * 指定单元格使用的渲染器
     */
    renderAs?: AutoDisplayRenderer,

    /**
     *  渲染器的数据
     * */
    initData?: any
};

@Directive()
export class JigsawAutoDisplayInnerBase extends JigsawDisplayInnerBase implements AfterViewInit, OnInit {
    protected rendererRef: ComponentRef<AutoDisplayRendererBase>;
    protected customRenderer: AutoDisplayRenderer;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get renderer(): AutoDisplayRenderer {
        return this.customRenderer
    }

    public set renderer(value: AutoDisplayRenderer) {
        if (this.customRenderer == value) {
            return;
        }
        this.customRenderer = value;
        this.rendererHost?.viewContainerRef.clear();
    }

    protected rendererFactory(renderer: Type<AutoDisplayRendererBase>, initData: any): ComponentRef<AutoDisplayRendererBase> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
        const componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.initData = initData;
        return componentRef;
    }

    protected _getRendererByType(renderer: AutoDisplayRenderer): Type<AutoDisplayRendererBase> {
        switch (renderer) {
            case 'origin-echarts':
                return AutoDisplayGraphRenderer;
            case 'modeled-echarts':
                return AutoDisplayModeledGraphRenderer;
            case 'table':
                return AutoDisplayTableRenderer;
            default:
                return <Type<AutoDisplayRendererBase>>renderer;
        }
    }
}

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-auto-display-content',
    template: '<ng-template jigsaw-renderer-host></ng-template>',
    host: {
        '[class.jigsaw-auto-display-content-host]': 'true',
    },
})
export class JigsawAutoDisplayContentComponent extends JigsawAutoDisplayInnerBase implements OnInit, OnDestroy {
}
