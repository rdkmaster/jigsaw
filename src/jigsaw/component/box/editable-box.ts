import {
    AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef,
    EmbeddedViewRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output,
    QueryList, Renderer2, TemplateRef, Type, ViewChild, ViewChildren
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
    private _removeDataRefreshListener: CallbackRemoval;

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
        this._setRootProperty();
        if (this._removeDataRefreshListener) {
            this._removeDataRefreshListener();
        }
        this._removeDataRefreshListener = this._data.onRefresh(() => {
            this._setRootProperty();
        })
    }

    @Input()
    public editable: boolean = true;

    public blocked: boolean;

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
    public remove = new EventEmitter<LayoutData>();

    @Output()
    public fill = new EventEmitter<JigsawEditableBox>();

    @Output()
    public move = new EventEmitter<LayoutData>();

    @ViewChildren(JigsawEditableBox)
    protected childrenBox: QueryList<JigsawEditableBox>;

    @ViewChild(JigsawRendererHost)
    private _rendererHost: JigsawRendererHost;

    @ViewChild('resizeLine')
    public resizeLine: ElementRef;

    /**
     * @internal
     */
    public _$addItems(direction: string) {
        this._rendererHost.viewContainerRef.clear();
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
        }
        if (!this.data) {
            this.data = new LayoutData;
            this.dataChange.emit(this.data);
        }
        this.direction = direction;
        this._updateDirection();
        // 目前先平分创建两个node
        this.data.nodes = [new LayoutData, new LayoutData];
        // 内容信息搬到第一个子节点
        this.data.nodes[0].componentMetaDataList = this.data.componentMetaDataList;
        this.data.nodes[0].innerHtml = this.data.innerHtml;
        setTimeout(() => {
            // 等待搬家组件渲染， 发送组件搬家信息
            this._getRootEditableBox().move.emit(this.data.nodes[0]);
        });
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

                    // 等待搬家组件渲染， 发送组件搬家信息
                    this._getRootEditableBox().move.emit(this.data);
                })
            }
            this._updateDirection();
        }
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
        this._getRootEditableBox().fill.emit(this);
    }

    public addContent(componentMetaDataList: ComponentMetaData[]) {
        if (!this.data) {
            return;
        }
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

    private _getRootEditableBox(): JigsawEditableBox {
        let p = this.parent;
        if (!p) return this;
        while (true) {
            if (!p.parent) return p;
            p = p.parent;
        }
    }

    /**
     * @internal
     */
    public _$handleResizeStart(event) {
        super._$handleResizeStart(event);
        this.renderer.addClass(this._getRootEditableBox().element, 'jigsaw-editable-box-resizing');
    }

    /**
     * @internal
     */
    public _$handleResizeEnd() {
        this.renderer.removeClass(this._getRootEditableBox().element, 'jigsaw-editable-box-resizing');
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.data) {
            this._renderComponents(this.data.componentMetaDataList);
            this.data.box = this;
        }
    }

    ngAfterViewInit() {
        this.checkFlex();
        // 等待 option bar & block 渲染
        this._bindScrollEvent();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._rendererHost.viewContainerRef.clear();
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
        }
        if (this._removeDataRefreshListener) {
            this._removeDataRefreshListener();
        }
    }
}
