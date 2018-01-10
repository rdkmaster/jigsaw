import {
    AfterViewInit, Component, ElementRef, EventEmitter, Input, NgModule, Output, QueryList, Renderer2, ViewChildren
} from "@angular/core";
import {JigsawBoxBase} from "../box/box";
import {TreeData} from "../../core/data/tree-data";
import {CommonModule} from "@angular/common";
import {CommonUtils} from "../../core/utils/common-utils";

@Component({
    selector: 'jigsaw-layout, j-layout',
    templateUrl: './layout.html',
    host: {
        '[class.jigsaw-layout]': 'true',
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '(mouseenter)': '_$showOptions = true',
        '(mouseleave)': '_$showOptions = false',
    }
})
export class JigsawLayout extends JigsawBoxBase implements AfterViewInit {

    public static parseToString(data: TreeData): string {
        if (!data || !(data instanceof TreeData)) return null;
        return this._parseNodeToString(data, '');
    }

    private static _parseNodesToString(nodes: TreeData[], domStr: string): string {
        if (nodes instanceof Array) {
            nodes.forEach(node => {
                domStr = this._parseNodeToString(node, domStr);
            })
        }
        return domStr;
    }

    private static _parseNodeToString(node: TreeData, domStr: string): string {
        domStr += `<j-box${CommonUtils.isDefined(node.direction) ? ` direction="${node.direction}"` : ''}${CommonUtils.isDefined(node.grow) ? ` grow="${node.grow}"` : ''}> \n`;
        domStr = this._parseNodesToString(node.nodes, domStr) + `</j-box> \n`;
        return domStr;
    }

    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer);
    }

    @Input()
    public data: TreeData;

    @Output()
    public dataChange = new EventEmitter<TreeData>();

    @ViewChildren(JigsawLayout)
    protected childrenBox: QueryList<JigsawLayout>;

    @Output()
    public directionChange = new EventEmitter<string>();

    @Output()
    public growChange = new EventEmitter<string>();

    @Output()
    public remove = new EventEmitter<TreeData>();

    /**
     * @internal
     */
    public _$showOptions: boolean;

    /**
     * @internal
     */
    public _$addItems(direction: string) {
        if (!this.data) {
            this.data = new TreeData;
            this.dataChange.emit(this.data);
        }
        this.direction = direction;
        this.directionChange.emit(this.direction);
        if (this.data.nodes && this.data.nodes instanceof Array) {
            this.data.nodes.push(new TreeData, new TreeData);
        } else {
            this.data.nodes = [new TreeData, new TreeData];
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
    public _$removeItem(item: TreeData) {
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
            }
            this.directionChange.emit(this.direction);
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.checkFlex();
        });
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawLayout],
    exports: [JigsawLayout]
})
export class JigsawLayoutModule {

}
