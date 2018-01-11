import {
    AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, NgModule, Optional,
    Output, QueryList, Renderer2, ViewChildren, Inject
} from "@angular/core";
import {JigsawBoxBase} from "../box/box";
import {LayoutData} from "../../core/data/tree-data";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";

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
export class JigsawViewLayout extends JigsawBoxBase implements AfterViewInit {
    private _parentViewEditor: JigsawViewEditor;

    constructor(elementRef: ElementRef, renderer: Renderer2, @Optional() @Inject(forwardRef(() => JigsawViewEditor))parentViewEditor: JigsawViewEditor,) {
        super(elementRef, renderer);
        this._parentViewEditor = parentViewEditor;
    }

    @Input()
    public data: LayoutData;

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

    /**
     * @internal
     */
    public _$showOptions: boolean;

    /**
     * @internal
     */
    public _$addItems(direction: string) {
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

    ngAfterViewInit() {
        setTimeout(() => {
            this.checkFlex();
        });
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
    imports: [CommonModule],
    declarations: [JigsawViewLayout, JigsawViewEditor],
    exports: [JigsawViewLayout, JigsawViewEditor]
})
export class JigsawLayoutModule {

}
