import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    Input,
    NgModule,
    QueryList,
    Renderer2,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxResizableModule} from "./resizable.directive";
import {JigsawResizableBox} from "./box.common";

@Component({
    selector: 'jigsaw-box, j-box',
    templateUrl: './box.html',
    host: {
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[class.jigsaw-box-no-child]': '!childrenBox || !childrenBox?.length',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawBox extends JigsawResizableBox implements AfterContentInit, DoCheck, AfterViewInit {
    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer);
    }

    @Input()
    public resizable: boolean;

    public showResizeLine: boolean;

    public parent: JigsawBox;

    @ContentChildren(JigsawBox)
    public childrenBoxRaw: QueryList<JigsawBox>;

    protected childrenBox: JigsawBox[];

    ngAfterContentInit() {
        // 映射同一组件实例，ContentChildren会包含自己，https://github.com/angular/angular/issues/21148
        this.childrenBox = this.childrenBoxRaw.filter(box => box != this);
        this.checkFlex();
        this.childrenBoxRaw.changes.subscribe(() => {
            this.childrenBox = this.childrenBoxRaw.filter(box => box != this);
            this._checkFlexByChildren();
        });

        if (this.resizable) {
            this.childrenBox.forEach((box, index) => {
                box.parent = this;
                if (index == 0) return; // 过滤掉第一个child box
                box.showResizeLine = true;
            });
        }
    }

    @ViewChild('resizeLine')
    public resizeLine: ElementRef;

    ngAfterViewInit() {
        // 等待box视图渲染
        setTimeout(() => {
            if (!this.resizeLine) return;
            if (this.parent.direction == 'column') {
                this._renderer.setStyle(this.resizeLine.nativeElement, 'width', this.element.offsetWidth - 2 + 'px');
            } else {
                this._renderer.setStyle(this.resizeLine.nativeElement, 'height', this.element.offsetHeight - 2 + 'px');
            }
        })
    }

    ngDoCheck() {
        console.log('aaaa');
        if (!this.resizeLine) return;
        if (this.parent.direction == 'column') {
            this._renderer.setStyle(this.resizeLine.nativeElement, 'width', this.element.offsetWidth - 2 + 'px');
        } else {
            this._renderer.setStyle(this.resizeLine.nativeElement, 'height', this.element.offsetHeight - 2 + 'px');
        }
    }
}

@NgModule({
    imports: [CommonModule, JigsawBoxResizableModule],
    declarations: [JigsawBox],
    exports: [JigsawBox]
})
export class JigsawBoxModule {

}
