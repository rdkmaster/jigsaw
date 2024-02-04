import {
    Component,
    Input,
    ComponentRef,
    AfterViewInit,
    OnInit,
    Type,
    OnDestroy,
    Directive
} from "@angular/core"
import {
    FormDisplayHtmlCellRenderer,
    FormDisplayRendererBase,
    FormDisplayTagCellRenderer
} from "./form-display-renderer";
import { JigsawDisplayInnerBase } from "../auto-display/inner-component";

@Directive()
export class JigsawFormDisplayCellBase extends JigsawDisplayInnerBase implements AfterViewInit, OnInit {
    protected rendererRef: ComponentRef<FormDisplayRendererBase>;
    protected customRenderer: Type<FormDisplayRendererBase> | string;

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
        return this.customRenderer
    }

    public set renderer(value: Type<FormDisplayRendererBase> | string) {
        if (this.customRenderer == value || (!value && this.customRenderer instanceof FormDisplayHtmlCellRenderer)) {
            return;
        }
        this.customRenderer = value;
        this.rendererHost?.viewContainerRef.clear();
    }

    protected rendererFactory(renderer: Type<FormDisplayRendererBase>, initData: any): ComponentRef<FormDisplayRendererBase> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
        const componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.cellData = this.cellData;
        componentRef.instance.initData = initData;
        return componentRef;
    }

    protected _getRendererByType(renderer: string): Type<FormDisplayRendererBase> {
        switch (renderer) {
            case 'html':
                return FormDisplayHtmlCellRenderer;
            case 'tag':
                return FormDisplayTagCellRenderer;
            default:
                return FormDisplayHtmlCellRenderer
        }
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
