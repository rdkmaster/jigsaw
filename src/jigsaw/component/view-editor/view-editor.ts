import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    Type,
    ViewChild,
    ViewChildren
} from "@angular/core";
import {LayoutData} from "../../core/data/tree-data";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule, JigsawRendererHost} from "../common";
import {JigsawBoxBase} from "../box/box";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {ComponentInput, ComponentMetaData} from "./view-editor.type";

@Component({
    selector: 'jigsaw-view-layout, j-view-layout',
    templateUrl: './view-layout.html',
    host: {
        '[class.jigsaw-view-layout]': 'true',
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawViewLayout extends JigsawBoxBase implements AfterViewInit, OnDestroy, OnInit {
    private _parentViewEditor: JigsawViewEditor;
    private _removeElementScrollEvent: CallbackRemoval;
    private _removeDataRefreshListener: CallbackRemoval;

    constructor(elementRef: ElementRef,
                renderer: Renderer2,
                @Optional() @Inject(forwardRef(() => JigsawViewEditor))parentViewEditor: JigsawViewEditor,
                private _componentFactoryResolver: ComponentFactoryResolver) {
        super(elementRef, renderer);
        this._parentViewEditor = parentViewEditor;
    }

    private _data: LayoutData;

    @Input()
    public get data() {
        return this._data;
    }

    public set data(value: LayoutData) {
        if (!(value instanceof LayoutData)) return;
        this._rendererHost.viewContainerRef.clear();
        this._data = value;
        if (this._removeDataRefreshListener) {
            this._removeDataRefreshListener();
        }
        this._removeDataRefreshListener = this._data.onRefresh(() => {
            this._addViewContent(this.data.componentMetaDataList);
            this._bindScrollEvent();
        })
    }

    @Output()
    public dataChange = new EventEmitter<LayoutData>();

    @ViewChildren(JigsawViewLayout)
    protected childrenBox: QueryList<JigsawViewLayout>;

    @Output()
    public directionChange = new EventEmitter<string>();

    @Output()
    public growChange = new EventEmitter<string>();

    @Output()
    public remove = new EventEmitter<LayoutData>();

    @ViewChild(JigsawRendererHost)
    private _rendererHost: JigsawRendererHost;

    @Input()
    public frozen: boolean;

    /**
     * @internal
     */
    public _$addItems(direction: string) {
        this._rendererHost.viewContainerRef.clear();
        if (this._removeElementScrollEvent) {
            this._removeElementScrollEvent();
        }
        if (!this.data) {
            this.data = new LayoutData;
            this.dataChange.emit(this.data);
        }
        this.direction = direction;
        this.directionChange.emit(this.direction);
        if (this.data.nodes && this.data.nodes instanceof Array) {
            this.data.nodes.push(new LayoutData, new LayoutData);
        } else {
            this.data.nodes = [new LayoutData, new LayoutData];
        }
    }

    /**
     * @internal
     */
    public _$remove() {
        this.remove.emit(this.data);
    }

    /**
     * @internal
     */
    public _$removeItem(item: LayoutData) {
        if (!this.data || !(this.data.nodes instanceof Array)) return;
        const index = this.data.nodes.findIndex(node => node === item);
        this.data.nodes.splice(index, 1);
        if (this.data.nodes.length == 1) {
            // 处理多余的box
            const node = this.data.nodes[0];
            if (node.nodes instanceof Array && node.nodes.length > 0) {
                this.data.nodes = node.nodes;
                this.direction = node.direction ? node.direction : 'h'; // 默认是'h'
            } else {
                this.data.nodes = [];
                this.direction = null;
                setTimeout(() => {
                    // 等待视图渲染
                    this._bindScrollEvent();
                })
            }
            this.directionChange.emit(this.direction);
        }
    }

    /**
     * @internal
     */
    public _$addContent() {
        this._parentViewEditor.fill.emit(this);
    }

    public addContent(componentMetaDataList: ComponentMetaData[]) {
        this._addViewContent(componentMetaDataList);
        this._addDataContent(componentMetaDataList);
    }

    private _addViewContent(componentMetaDataList: ComponentMetaData[]) {
        if (!(componentMetaDataList instanceof Array) || componentMetaDataList.length == 0) return;
        this._rendererHost.viewContainerRef.clear();
        this.data.components = []; // 初始化
        componentMetaDataList.forEach(componentMetaData => {
            this.data.components.push(this._rendererFactory(componentMetaData.component, componentMetaData.inputs));
        });
    }

    private _addDataContent(componentMetaDataList: ComponentMetaData[]) {
        if (!(componentMetaDataList instanceof Array) || componentMetaDataList.length == 0) return;
        this.data.componentMetaDataList = componentMetaDataList;
        this.data.contentStr = '';
        componentMetaDataList.forEach(componentMetaData => {
            this.data.contentStr += `<${componentMetaData.selector} `;
            componentMetaData.inputs.forEach(input => {
                if (CommonUtils.isDefined(input.binding) && input.binding != '') {
                    this.data.contentStr += `[${input.property}]='${input.binding}' `;
                }
            });
            this.data.contentStr += '>' + `</${componentMetaData.selector}> \n`;
        });
    }

    private _rendererFactory(renderer: Type<any> | TemplateRef<any>, inputs: ComponentInput[]): ComponentRef<any> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            const context = {};
            inputs.forEach(input => {
                context[input.property] = input.binding
            });
            return this._rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: context
            });
        } else if (renderer) {
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(renderer);
            let componentRef = this._rendererHost.viewContainerRef.createComponent(componentFactory);
            inputs.forEach(input => {
                componentRef.instance[input.property] = input.default
            });
            return componentRef;
        }
        return null;
    }

    private _bindScrollEvent() {
        if (!this.childrenBox.length) {
            const block = this._element.querySelector('.jigsaw-view-layout-block');
            const optionBox = this._element.querySelector('.jigsaw-view-layout-option-box');
            if (this._removeElementScrollEvent) {
                this._removeElementScrollEvent();
            }
            if (block && optionBox) {
                this._removeElementScrollEvent = this._renderer.listen(this._element, 'scroll', () => {
                    this._renderer.setStyle(block, 'top', this._element.scrollTop + 'px');
                    this._renderer.setStyle(block, 'left', this._element.scrollLeft + 'px');
                    this._renderer.setStyle(optionBox, 'top', this._element.offsetHeight / 2 + this._element.scrollTop + 'px');
                    this._renderer.setStyle(optionBox, 'left', this._element.offsetWidth / 2 + this._element.scrollLeft + 'px');
                })
            }
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._addViewContent(this.data.componentMetaDataList);
        this.data.layout = this;
    }

    ngAfterViewInit() {
        this.checkFlex();
        this._bindScrollEvent();
    }

    ngOnDestroy() {
        this._rendererHost.viewContainerRef.clear();
        if (this._removeElementScrollEvent) {
            this._removeElementScrollEvent();
        }
        if (this._removeDataRefreshListener) {
            this._removeDataRefreshListener();
        }
    }
}

@Component({
    selector: 'jigsaw-view-editor, j-view-editor',
    template: `
        <j-view-layout [data]="data" [(direction)]="data.direction"
                       [grow]="data.grow" [frozen]="frozen" height="100%">
        </j-view-layout>
    `,
    host: {
        '[class.jigsaw-view-editor]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawViewEditor extends AbstractJigsawComponent {
    @Input()
    public data: LayoutData;

    @Output()
    public dataChange = new EventEmitter<LayoutData>();

    @Output()
    public fill = new EventEmitter<JigsawViewLayout>();

    @Input()
    public frozen: boolean;
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawViewLayout, JigsawViewEditor],
    exports: [JigsawViewLayout, JigsawViewEditor]
})
export class JigsawViewEditorModule {

}
