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
    NgModule, NgZone,
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
import {LayoutData} from "../../core/data/layout-data";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule, JigsawRendererHost} from "../common";
import {JigsawBoxBase} from "../box/box";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {ComponentInput, ComponentMetaData} from "./view-editor.type";
import {AffixUtils} from "../../core/utils/internal-utils";

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
                private _componentFactoryResolver: ComponentFactoryResolver,
                private _zone: NgZone) {
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
            this._renderComponents(this.data.componentMetaDataList);
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

    @Input()
    public isFirst: boolean;

    @Input()
    public parent: JigsawViewLayout;

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
        // 目前先平分创建两个node
        this.data.nodes = [new LayoutData, new LayoutData];
        // 内容信息搬到第一个子节点
        this.data.nodes[0].componentMetaDataList = this.data.componentMetaDataList;
        this.data.nodes[0].innerHtml = this.data.innerHtml;
        // 重置当前内容信息
        this.data.componentMetaDataList = [];
        this.data.innerHtml = ''
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
                // 拿取nodes
                this.data.nodes = node.nodes;
                this.direction = node.direction ? node.direction : 'h'; // 默认是'h'
            } else {
                // 拿取内容
                this.data.componentMetaDataList = node.componentMetaDataList;
                this.data.innerHtml = node.innerHtml;
                this.data.nodes = [];
                this.direction = null;
                this._renderComponents(this.data.componentMetaDataList);
                setTimeout(() => {
                    // 等待 option bar & block 渲染
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
        this._renderComponents(componentMetaDataList);
        this.data.setComponentMetaData(componentMetaDataList);
        this._bindScrollEvent();
    }

    /**
     * 根据componentMetaDataList信息在box里面渲染需要的组件
     * @param {ComponentMetaData[]} componentMetaDataList
     * @private
     */
    private _renderComponents(componentMetaDataList: ComponentMetaData[]) {
        if (!(componentMetaDataList instanceof Array) || componentMetaDataList.length == 0) return;
        this._rendererHost.viewContainerRef.clear();
        this.data.components = []; // 初始化
        componentMetaDataList.forEach(componentMetaData => {
            this.data.components.push(this._rendererFactory(componentMetaData.component, componentMetaData.inputs));
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

    /**
     * 绑定box的滚动监听，处理option bar & block的位置问题
     * @private
     */
    private _bindScrollEvent() {
        // 有node不绑定scroll
        if (this.data && this.data.nodes instanceof Array && this.data.nodes.length > 0) return;

        const block = this._element.querySelector('.jigsaw-view-layout-block');
        const optionBox = this._element.querySelector('.jigsaw-view-layout-option-box');
        const resizeBar = this._element.querySelector('.jigsaw-view-layout-resize');
        if (this._removeElementScrollEvent) {
            this._removeElementScrollEvent();
        }
        this._removeElementScrollEvent = this._renderer.listen(this._element, 'scroll', () => {
            if (block) {
                this._renderer.setStyle(block, 'top', this._element.scrollTop + 'px');
                this._renderer.setStyle(block, 'left', this._element.scrollLeft + 'px');
            }
            if (optionBox) {
                this._renderer.setStyle(optionBox, 'top', this._element.offsetHeight / 2 + this._element.scrollTop + 'px');
                this._renderer.setStyle(optionBox, 'left', this._element.offsetWidth / 2 + this._element.scrollLeft + 'px');
            }
            if (resizeBar) {
                this._renderer.setStyle(resizeBar, 'top', this._element.scrollTop + 'px');
                this._renderer.setStyle(resizeBar, 'left', this._element.scrollLeft + 'px');
            }
        })
    }

    public isResizing: boolean = false;

    @ViewChild('resizeLine')
    public resizeLine: ElementRef;

    @ViewChild('resizingLine')
    public resizingLine: ElementRef;

    private _listenResize() {
        if (!this.parent || !this.resizeLine) return;
        this._renderer.listen(this.resizeLine.nativeElement, 'mousedown', this._dragStart)
    }

    private _movableTarget: HTMLElement;
    private _moving: boolean = false;
    private _position: number[];

    private _removeHostMouseDownListener: CallbackRemoval;
    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;

    private _dragStart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.parent || !this.resizeLine) return;

        const resizeLineEl = this.resizeLine.nativeElement;
        this._movableTarget = this.parent.resizingLine.nativeElement;
        const startOffsetX = AffixUtils.offset(resizeLineEl).left - AffixUtils.offset(this.parent._element).left;
        const startOffsetY = AffixUtils.offset(resizeLineEl).top - AffixUtils.offset(this.parent._element).top;
        if (this.parent.direction == 'column') {
            this._renderer.setStyle(this._movableTarget, 'top', startOffsetY + 'px');
        } else {
            this._renderer.setStyle(this._movableTarget, 'left', startOffsetX + 'px');
        }
        this._renderer.setStyle(this._movableTarget, 'display', 'block');
        this.parent.isResizing = true;

        this._position = [event.clientX - startOffsetX, event.clientY - startOffsetY];
        this._moving = true;

        if (this._removeWindowMouseMoveListener) {
            this._removeWindowMouseMoveListener();
        }
        this._zone.runOutsideAngular(() => {
            this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', this._dragMove);
        });

        if (this._removeWindowMouseUpListener) {
            this._removeWindowMouseUpListener();
        }
        this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
    };

    private _dragMove = (event) => {
        if (this._moving) {
            /*const isFixed = this._movableTarget.style.position == 'fixed';
            const ox = event.clientX - this._position[0] - (isFixed ? window.pageXOffset : 0);
            const oy = event.clientY - this._position[1] - (isFixed ? window.pageYOffset : 0);*/
            if (this.parent.direction == 'column') {
                let oy = event.clientY - this._position[1];
                if (oy < 0) {
                    oy = 0
                } else if (oy > this.parent._element.offsetHeight) {
                    oy = this.parent._element.offsetHeight - 5
                }
                this._renderer.setStyle(this._movableTarget, 'top', oy + 'px');
            } else {
                let ox = event.clientX - this._position[0];
                if (ox < 0) {
                    ox = 0
                } else if (ox > this.parent._element.offsetWidth) {
                    ox = this.parent._element.offsetWidth - 5
                }
                this._renderer.setStyle(this._movableTarget, 'left', ox + 'px');
            }
        }
    };

    private _dragEnd = () => {
        this._moving = false;
        this._position = null;
        this._removeWindowListener();
        this._renderer.setStyle(this._movableTarget, 'display', 'none');
    };

    private _removeWindowListener() {
        if (this._removeWindowMouseMoveListener) {
            this._removeWindowMouseMoveListener();
        }
        if (this._removeWindowMouseUpListener) {
            this._removeWindowMouseUpListener();
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._renderComponents(this.data.componentMetaDataList);
        this.data.layout = this;
    }

    ngAfterViewInit() {
        this.checkFlex();
        // 等待 option bar & block 渲染
        this._bindScrollEvent();

        this._listenResize();
        //this.resizingLine = this._element.querySelector('.jigsaw-view-layout-resizing');
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
                       [grow]="data.grow" [frozen]="frozen" [isFirst]="true" height="100%">
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
