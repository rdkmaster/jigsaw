import {
    AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef,
    EmbeddedViewRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output,
    QueryList, Renderer2, TemplateRef, Type, ViewChild, ViewChildren, ViewRef
} from "@angular/core";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {ComponentInput, ComponentMetaData, LayoutData} from "../../core/data/layout-data";
import {JigsawRendererHost} from "../common";
import {JigsawResizableBoxBase} from "./common-box";

@Component({
    selector: 'jigsaw-editable-box, j-editable-box',
    templateUrl: './editable-box.html',
    host: {
        '[class.jigsaw-editable-box]': 'true',
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[class.jigsaw-editable-box-root]': '!parent',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawEditableBox extends JigsawResizableBoxBase implements AfterViewInit, OnDestroy, OnInit {
    constructor(elementRef: ElementRef,
                renderer: Renderer2,
                zone: NgZone,
                private _componentFactoryResolver: ComponentFactoryResolver) {
        super(elementRef, renderer, zone);
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

        if (this.initialized) {
            this._renderComponents(this.data.componentMetaDataList);
            this.data.box = this;
            if (!this.parent) {
                this._setRootProperty();
            }
        }
        if (this._removeDataRefreshListener) {
            this._removeDataRefreshListener();
            this._removeDataRefreshListener = null;
        }
        this._removeDataRefreshListener = this._data.onRefresh(() => {
            this._setRootProperty();
        });
    }

    @Input()
    public editable: boolean = true;

    public blocked: boolean;

    public showOptionBar: boolean = true;

    /**
     * @internal
     */
    @Input()
    public _isFirst: boolean = true;

    @Input()
    public parent: JigsawEditableBox;

    private _resizeLineWidth: string;

    @Input()
    public get resizeLineWidth(): string {
        return this._resizeLineWidth;
    }

    public set resizeLineWidth(value: string) {
        if (typeof value == 'string') {
            value = value.replace('px', '');
        }
        let valueNum = Number(value);
        if (Number.isNaN(valueNum)) return;
        if (valueNum < 2) {
            valueNum = 2
        } else if (valueNum > 8) {
            valueNum = 8
        }
        this._resizeLineWidth = valueNum + 'px';
    }

    @Output()
    public dataChange = new EventEmitter<LayoutData>();

    @Output()
    public directionChange = new EventEmitter<string>();

    @Output()
    public growChange = new EventEmitter<number>();

    @Output()
    public fill = new EventEmitter<JigsawEditableBox>();

    @Output()
    public fillTabs = new EventEmitter<JigsawEditableBox>();

    @Output()
    public add = new EventEmitter<any>();

    @Output()
    public remove = new EventEmitter<any>();

    /**
     * 内部事件，只在box内部广播，应用监听`remove`（没有下划线开头）。
     * @type {EventEmitter<LayoutData>}
     * @private
     */
    @Output()
    public _remove = new EventEmitter<LayoutData>();

    @ViewChildren(JigsawEditableBox)
    protected childrenBox: QueryList<JigsawEditableBox>;

    @ViewChild(JigsawRendererHost)
    public _rendererHost: JigsawRendererHost;

    @ViewChild('resizeLine')
    public resizeLine: ElementRef;

    private _removeDataRefreshListener: CallbackRemoval;
    public _viewInit = new EventEmitter();

    /**
     * @internal
     */
    public _$addBox(direction: string) {
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
            this.removeElementScrollEvent = null;
        }
        if (!this.data) {
            this.data = new LayoutData;
            this.dataChange.emit(this.data);
        }
        this.direction = direction;
        this._updateDirection();
        // 目前先平分创建两个node
        this.data.nodes = [new LayoutData, new LayoutData];
        this.callLater(() => {
            // 等待子box渲染，填充搬家组件
            const firstChildBox = this.childrenBox.toArray()[0];
            firstChildBox._viewInit.subscribe(() => {
                firstChildBox._viewInit.unsubscribe();
                this._moveComponents(this, firstChildBox);
            });
            // 内容信息搬到第一个子节点
            this.data.nodes[0].components = this.data.components;
            this.data.nodes[0].componentMetaDataList = this.data.componentMetaDataList;
            this.data.nodes[0].innerHtml = this.data.innerHtml;

            this.showOptionBar = true;
            // 更新组件内部box信息
            this._updateBoxReference(this.data.nodes[0], firstChildBox);

            // 重置当前内容信息
            this.data.componentMetaDataList = [];
            this.data.innerHtml = '';
            this.data.components = null;

            this.getRootBox().add.emit();
        });
    }

    /**
     * @internal
     */
    public _$addTabsWrapper() {
        this.getRootBox().fillTabs.emit(this);
    }

    private _updateBoxReference(data: LayoutData, box: JigsawEditableBox) {
        const components = data.components;
        if (components && components.length) {
            const componentRef = components[0];
            if (componentRef instanceof ComponentRef) {
                componentRef.instance.box = box;
            }
        }
    }

    /**
     * @internal
     */
    public _$remove() {
        this._remove.emit(this.data);
    }

    /**
     * @internal
     */
    public _$removeBox(item: LayoutData) {
        if (!this.data || !(this.data.nodes instanceof Array)) return;

        const index = this.data.nodes.findIndex(node => node === item);
        this.data.nodes.splice(index, 1);
        if (this.data.nodes.length == 1) {
            // 处理多余的box
            const node = this.data.nodes[0];
            if (node.nodes instanceof Array && node.nodes.length > 0) {
                // 拿取nodes
                // TODO 拿取nodes的时候，组件数据搬家
                //this.data.nodes = node.nodes;
                //this.direction = node.direction ? node.direction : 'horizontal'; // 默认是'horizontal'
            } else {
                this.callLater(() => {
                    // 等待删除操作后，box渲染完成
                    const firstChildBox = this.childrenBox.toArray()[0];
                    this._moveComponents(firstChildBox, this);

                    // 拿取内容
                    this.data.componentMetaDataList = node.componentMetaDataList;
                    this.data.innerHtml = node.innerHtml;
                    this.data.components = node.components;
                    this.data.nodes = [];
                    this.direction = null;

                    // 更新组件内部box信息
                    this._updateBoxReference(this.data, this);

                    // 等待 option bar & block 渲染
                    this.callLater(this._bindScrollEvent, this);
                })
            }
            this._updateDirection();
        } else if (this.data.nodes.length == 0) {
            this._$remove();
        }

        this.getRootBox().remove.emit();
    }

    private _moveComponents(moveOut: JigsawEditableBox, moveIn: JigsawEditableBox) {
        if (!moveOut || !moveIn) return;
        const components: ViewRef[] = [];
        for (let i = 0; i < moveOut._rendererHost.viewContainerRef.length; i++) {
            components.push(moveOut._rendererHost.viewContainerRef.get(i));
            moveOut._rendererHost.viewContainerRef.detach(i);
        }
        moveOut._rendererHost.viewContainerRef.clear();
        components.forEach(content => {
            moveIn._rendererHost.viewContainerRef.insert(content);
        })
    }

    private _updateDirection() {
        if (this.parent) {
            this.directionChange.emit(this.direction);
        } else {
            this.data.direction = this.direction;
        }
    }

    private _setRootProperty() {
        if (this.parent) return;
        this.direction = this._data.direction;
        this.grow = this._data.grow;
    }

    /**
     * @internal
     */
    public _$addContent() {
        this.getRootBox().fill.emit(this);
    }

    public addContent(componentMetaDataList: ComponentMetaData[]) {
        if (!this.data) {
            return;
        }
        this.data.componentMetaDataList = componentMetaDataList;
        this._renderComponents(componentMetaDataList);
        this._bindScrollEvent();
    }

    public clearContent() {
        this._rendererHost.viewContainerRef.clear();
        this.data.components = [];
        this.data.componentMetaDataList = [];
        this.data.innerHtml = '';
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
            this.removeElementScrollEvent = null;
        }
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
            const componentRef = this._rendererFactory(componentMetaData.component, componentMetaData.inputs);
            this.data.components.push(componentRef);
            if (componentRef instanceof ComponentRef) {
                componentRef.instance.box = this;
            }
        });
    }

    private _rendererFactory(renderer: Type<any> | TemplateRef<any>, inputs: ComponentInput[]): ComponentRef<any> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            const context = {};
            if (inputs) {
                inputs.forEach(input => context[input.property] = input.binding);
            }
            return this._rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: context
            });
        } else if (renderer) {
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(renderer);
            let componentRef = this._rendererHost.viewContainerRef.createComponent(componentFactory);
            if (inputs) {
                inputs.forEach(input => componentRef.instance[input.property] = input.default);
            }
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

        const block = this.element.querySelector('.jigsaw-editable-box-block');
        const optionBox = this.element.querySelector('.jigsaw-editable-box-option-box');
        const optionBar = this.element.querySelector('.jigsaw-editable-box-option-bar');
        const resizeBar = this.element.querySelector('.jigsaw-editable-box-resize');
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
            this.removeElementScrollEvent = null;
        }
        this.removeElementScrollEvent = this.renderer.listen(this.element, 'scroll', () => {
            if (block) {
                this.renderer.setStyle(block, 'top', this.element.scrollTop + 'px');
                this.renderer.setStyle(block, 'left', this.element.scrollLeft + 'px');
            }
            if (optionBox) {
                this.renderer.setStyle(optionBox, 'top', this.element.scrollTop ? (this.element.offsetHeight / 2 + this.element.scrollTop + 'px') : '50%');
                this.renderer.setStyle(optionBox, 'left', this.element.scrollLeft ? (this.element.offsetWidth / 2 + this.element.scrollLeft + 'px') : '50%');
            }
            if (optionBar) {
                this.renderer.setStyle(optionBar, 'top', this.element.scrollTop ? (this.element.offsetHeight / 2 + this.element.scrollTop + 'px') : '50%');
                this.renderer.setStyle(optionBar, 'left', this.element.scrollLeft ? (this.element.offsetWidth / 2 + this.element.scrollLeft + 'px') : '50%');
            }
            if (resizeBar) {
                this.renderer.setStyle(resizeBar, 'top', this.element.scrollTop + 'px');
                this.renderer.setStyle(resizeBar, 'left', this.element.scrollLeft + 'px');
            }
        })
    }

    /**
     * @internal
     */
    public _$handleResizeStart(event) {
        super._$handleResizeStart(event);
        this.renderer.addClass(this.getRootBox().element, 'jigsaw-editable-box-resizing');
        this._emitResizeEvent('resizeStart');
    }

    /**
     * @internal
     */
    public _$handleResizeEnd() {
        this.renderer.removeClass(this.getRootBox().element, 'jigsaw-editable-box-resizing');
        this._emitResizeEvent('resize');
    }

    private _emitResizeEvent(eventType: string) {
        let previousBox: JigsawEditableBox;
        if (this.parent && this.parent.childrenBox.length) {
            const index = this.parent.childrenBox.toArray().findIndex(box => box == this);
            previousBox = this.parent.childrenBox.toArray()[index - 1];
        }
        this.getRootBox()[eventType].emit([...this._getAffectedBoxes(previousBox, []),
            ...this._getAffectedBoxes(this, [])]);
    }

    private _getAffectedBoxes(box: JigsawEditableBox, arr: JigsawEditableBox[]): JigsawEditableBox[] {
        if (box.childrenBox.length == 0) return [box];
        box.childrenBox.forEach(box => {
            if (box.childrenBox.length == 0) {
                arr.push(box);
            } else {
                arr.push(...this._getAffectedBoxes(box, []));
            }
        });
        return arr;
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.data) {
            this._renderComponents(this.data.componentMetaDataList);
            this.data.box = this;
            if (!this.parent) {
                this._setRootProperty();
            }
        } else {
            this.data = new LayoutData();
        }
    }

    ngAfterViewInit() {
        this.checkFlex();
        // 等待 option bar & block 渲染
        this._bindScrollEvent();
        // 异步发送事件，让父box能监听到
        this.callLater(this._viewInit.emit, this._viewInit);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._rendererHost.viewContainerRef.clear();
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
            this.removeElementScrollEvent = null;
        }
        if (this._removeDataRefreshListener) {
            this._removeDataRefreshListener();
            this._removeDataRefreshListener = null;
        }

        this.fill.unsubscribe();
        this.fillTabs.unsubscribe();
        this.add.unsubscribe();
        this.remove.unsubscribe();
    }
}
