import {
    AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, NgModule, Optional,
    Output, QueryList, Renderer2, ViewChildren, Inject, ComponentFactoryResolver, TemplateRef,
    Type, ComponentRef, EmbeddedViewRef, ViewChild, OnDestroy, OnInit
} from "@angular/core";
import {JigsawBoxBase} from "../box/box";
import {LayoutData} from "../../core/data/tree-data";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule, JigsawRendererHost} from "../common";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";

export type LayoutContentInput = {
    property: string,
    type: string,
    value: any
}

export type LayoutContent = {
    component: any,
    selector: string,
    inputs?: LayoutContentInput[],
    output?: any
}

@Component({
    selector: 'jigsaw-view-layout, j-view-layout',
    templateUrl: './layout.html',
    host: {
        '[class.jigsaw-view-layout]': 'true',
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '(mouseenter)': '_$showOptions = true',
        '(mouseleave)': '_$showOptions = false',
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
            this._addViewContent(this.data.contents);
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

    /**
     * @internal
     */
    public _$showOptions: boolean;

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

    public addContent(contents: LayoutContent[]) {
        this._addViewContent(contents);
        this._addDataContent(contents);
    }

    private _addViewContent(contents: LayoutContent[]) {
        if (!(contents instanceof Array) || contents.length == 0) return;
        this._rendererHost.viewContainerRef.clear();
        contents.forEach(content => {
            this._rendererFactory(content.component, content.inputs);
        });
    }

    private _addDataContent(contents: LayoutContent[]) {
        if (!(contents instanceof Array) || contents.length == 0) return;
        this.data.contents = contents;
        this.data.contentStr = '';
        contents.forEach(content => {
            this.data.contentStr += `<${content.selector} `;
            content.inputs.forEach(input => {
                if (CommonUtils.isDefined(input.value) && input.value != '') {
                    this.data.contentStr += `${input.property}='${input.value}' `;
                }
            });
            this.data.contentStr += '>' + `</${content.selector}> \n`;
        });
    }

    private _rendererFactory(renderer: Type<any> | TemplateRef<any>, inputs: LayoutContentInput[]): ComponentRef<any> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            const context = {};
            inputs.forEach(input => {
                context[input.property] = input.value
            });
            return this._rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: context
            });
        } else if (renderer) {
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(renderer);
            let componentRef = this._rendererHost.viewContainerRef.createComponent(componentFactory);
            inputs.forEach(input => {
                componentRef.instance[input.property] = input.value
            });
            return componentRef;
        }
        return null;
    }

    private _bindScrollEvent() {
        if (!this.childrenBox.length) {
            const block = this._element.querySelector('.jigsaw-view-layout-block');
            const optionBtn = this._element.querySelector('.jigsaw-view-layout-btn');
            if (this._removeElementScrollEvent) {
                this._removeElementScrollEvent();
            }
            this._removeElementScrollEvent = this._renderer.listen(this._element, 'scroll', () => {
                this._renderer.setStyle(block, 'top', this._element.scrollTop + 'px');
                this._renderer.setStyle(block, 'left', this._element.scrollLeft + 'px');
                this._renderer.setStyle(optionBtn, 'top', this._element.offsetHeight / 2 + this._element.scrollTop + 'px');
                this._renderer.setStyle(optionBtn, 'left', this._element.offsetWidth / 2 + this._element.scrollLeft + 'px');
            })
        }
    }

    ngOnInit() {
        this._addViewContent(this.data.contents);
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
        <j-view-layout [data]="data" [(direction)]="data.direction" [grow]="data.grow" height="100%"></j-view-layout>
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
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawViewLayout, JigsawViewEditor],
    exports: [JigsawViewLayout, JigsawViewEditor]
})
export class JigsawLayoutModule {

}
