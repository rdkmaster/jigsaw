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
import { AbstractJigsawViewBase, JigsawRendererHost } from "../../common/common";
import { AutoDisplayGraphRenderer, AutoDisplayRendererBase, AutoDisplayTableRenderer, DisplayRendererBase } from "./renderer/auto-display-renderer";

export abstract class JigsawDisplayInnerBase extends AbstractJigsawViewBase implements AfterViewInit, OnInit {
    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
        protected changeDetector: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
    }

    @ViewChild(JigsawRendererHost)
    protected rendererHost: JigsawRendererHost;
    protected rendererRef: ComponentRef<DisplayRendererBase>;
    protected _customRenderer: Type<DisplayRendererBase> | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get renderer(): Type<DisplayRendererBase> | string {
        return this._customRenderer
    }

    public set renderer(value: Type<DisplayRendererBase> | string) {
        if (this._customRenderer == value) {
            return;
        }
        this._customRenderer = value;
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

    protected abstract _getRendererByType(renderer: string): Type<DisplayRendererBase>;

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

@Directive()
export class JigsawAutoDisplayInnerBase extends JigsawDisplayInnerBase implements AfterViewInit, OnInit {
    protected rendererRef: ComponentRef<AutoDisplayRendererBase>;
    protected _customRenderer: Type<AutoDisplayRendererBase> | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get renderer(): Type<AutoDisplayRendererBase> | string {
        return this._customRenderer
    }

    public set renderer(value: Type<AutoDisplayRendererBase> | string) {
        if (this._customRenderer == value) {
            return;
        }
        this._customRenderer = value;
        this.rendererHost?.viewContainerRef.clear();
    }

    protected rendererFactory(renderer: Type<AutoDisplayRendererBase>, initData: any): ComponentRef<AutoDisplayRendererBase> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
        const componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.initData = initData;
        return componentRef;
    }

    protected _getRendererByType(renderer: string): Type<AutoDisplayRendererBase> {
        switch (renderer) {
            case 'graph':
                return AutoDisplayGraphRenderer;
            case 'table':
                return AutoDisplayTableRenderer;
            default:
                return AutoDisplayTableRenderer;
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
