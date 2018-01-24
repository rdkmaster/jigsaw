import {
    AfterViewInit, Component, ComponentFactoryResolver, ComponentRef,
    ElementRef, EmbeddedViewRef, EventEmitter, forwardRef, Inject,
    Input, NgModule, OnDestroy, OnInit, Optional, Output, QueryList,
    Renderer2, TemplateRef, Type, ViewChild, ViewChildren
} from "@angular/core";
import {LayoutData} from "../../core/data/layout-data";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule, JigsawRendererHost} from "../common";
import {JigsawBoxBase} from "../box/box";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {ComponentInput, ComponentMetaData} from "./view-editor.type";
import {JigsawResizableModule} from "./resizable.directive";
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
    public growChange = new EventEmitter<number>();

    @Output()
    public remove = new EventEmitter<LayoutData>();

    @ViewChild(JigsawRendererHost)
    private _rendererHost: JigsawRendererHost;

    @Input()
    public editable: boolean;

    @Input()
    public isFirst: boolean;

    @Input()
    public parent: JigsawViewLayout;

    @Input()
    public resizeLineWidth: string;

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

        const block = this.element.querySelector('.jigsaw-view-layout-block');
        const optionBox = this.element.querySelector('.jigsaw-view-layout-option-box');
        const optionBar = this.element.querySelector('.jigsaw-view-layout-option-bar');
        const resizeBar = this.element.querySelector('.jigsaw-view-layout-resize');
        if (this._removeElementScrollEvent) {
            this._removeElementScrollEvent();
        }
        this._removeElementScrollEvent = this._renderer.listen(this.element, 'scroll', () => {
            if (block) {
                this._renderer.setStyle(block, 'top', this.element.scrollTop + 'px');
                this._renderer.setStyle(block, 'left', this.element.scrollLeft + 'px');
            }
            if (optionBox) {
                this._renderer.setStyle(optionBox, 'top', this.element.offsetHeight / 2 + this.element.scrollTop + 'px');
                this._renderer.setStyle(optionBox, 'left', this.element.offsetWidth / 2 + this.element.scrollLeft + 'px');
            }
            if (optionBar) {
                this._renderer.setStyle(optionBar, 'top', this.element.offsetHeight / 2 + this.element.scrollTop + 'px');
                this._renderer.setStyle(optionBar, 'left', this.element.offsetWidth / 2 + this.element.scrollLeft + 'px');
            }
            if (resizeBar) {
                this._renderer.setStyle(resizeBar, 'top', this.element.scrollTop + 'px');
                this._renderer.setStyle(resizeBar, 'left', this.element.scrollLeft + 'px');
            }
        })
    }

    @ViewChild('resizeLine')
    public resizeLine: ElementRef;

    @ViewChild('resizingLine')
    public resizingLine: ElementRef;

    /**
     * @internal
     */
    public _$handleResize(offset: number) {
        if (!this.parent) return;

        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        const sizeRatios = this._computeSizeRatios(offsetProp, sizeProp, offset);
        this.parent.childrenBox.forEach((box, index) => {
            box.grow = sizeRatios[index];
            box.growChange.emit(sizeRatios[index]);
        })
    }

    private _computeSizeRatios(offsetProp: string, sizeProp: string, updateOffset: number): number[] {
        const offsets = this._getOffsets(offsetProp, sizeProp);
        const sizes = this.parent.childrenBox.reduce((arr, box) => {
            arr.push(box.element[sizeProp]);
            return arr;
        }, []);
        const curIndex = this._getCurrentIndex();
        offsets.splice(curIndex, 1, updateOffset);
        if (curIndex < 1) return;
        const prevBoxSize = offsets[curIndex] - offsets[curIndex - 1];
        const curBoxSize = offsets[curIndex + 1] - offsets[curIndex];
        sizes.splice(curIndex - 1, 2, prevBoxSize, curBoxSize);
        return sizes.map(size => {
            return size / this.parent.element[sizeProp] * 100
        });
    }

    private _getOffsets(offsetProp: string, sizeProp: string): number[] {
        const offsets = this.parent.childrenBox.reduce((arr, box, index) => {
            if (index == 0) {
                arr.push(0);
            } else {
                arr.push(AffixUtils.offset(box.resizeLine.nativeElement)[offsetProp] -
                    AffixUtils.offset(this.parent.element)[offsetProp]);
            }
            return arr;
        }, []);
        offsets.push(this.parent.element[sizeProp]);
        return offsets;
    }

    private _getCurrentIndex(): number {
        return this.parent.childrenBox.toArray().findIndex(box => box == this);
    }

    private _getPropertyByDirection(): string[] {
        return [this.parent.direction == 'column' ? 'top' : 'left',
            this.parent.direction == 'column' ? 'offsetHeight' : 'offsetWidth']
    }

    private _getResizeRange(offsetProp: string, sizeProp: string): number[] {
        const offsets = this._getOffsets(offsetProp, sizeProp);
        const curIndex = this._getCurrentIndex();
        return [offsets[curIndex - 1], offsets[curIndex + 1]];
    }

    /**
     * @internal
     */
    public _$resizeRange: number[];

    /**
     * @internal
     */
    public _$updateResizeRange(event) {
        event.preventDefault();
        event.stopPropagation();

        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        this._$resizeRange = this._getResizeRange(offsetProp, sizeProp);
    };

    ngOnInit() {
        super.ngOnInit();
        this._renderComponents(this.data.componentMetaDataList);
        this.data.layout = this;
    }

    ngAfterViewInit() {
        this.checkFlex();
        // 等待 option bar & block 渲染
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
                       [grow]="data.grow" [editable]="editable" [isFirst]="true" height="100%"
                       [resizeLineWidth]="resizeLineWidth">
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
    public editable: boolean;

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
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawResizableModule],
    declarations: [JigsawViewLayout, JigsawViewEditor],
    exports: [JigsawViewLayout, JigsawViewEditor]
})
export class JigsawViewEditorModule {

}
