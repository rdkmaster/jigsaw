import {
    AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter,
    Input, NgModule, NgZone, OnDestroy, QueryList, Renderer2, ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxResizableBase} from "./common-box";
import {JigsawResizableModule} from "../../directive/resizable/resizable";
import {CallbackRemoval} from "../../core/utils/common-utils";

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
export class JigsawBox extends JigsawBoxResizableBase implements AfterContentInit, AfterViewInit, OnDestroy {
    constructor(elementRef: ElementRef, renderer: Renderer2, zone: NgZone) {
        super(elementRef, renderer, zone);
    }

    public static resizeEnd = new EventEmitter();
    public static resizeStart = new EventEmitter();

    @Input()
    public resizable: boolean;

    public showResizeLine: boolean;

    public parent: JigsawBox;

    @ContentChildren(JigsawBox)
    private _childrenBoxRaw: QueryList<JigsawBox>;

    @ViewChild('resizeLine')
    public resizeLine: ElementRef;

    @ViewChild('resizeLineParent')
    public resizeLineParent: ElementRef;

    protected childrenBox: JigsawBox[];

    private _removeResizeStartListener: CallbackRemoval;
    private _removeResizeEndListener: CallbackRemoval;
    private _removeWindowResizeListener: CallbackRemoval;

    private _isResizing: boolean;

    private _computeResizeLineWidth() {
        if (!this.resizeLine) return;
        this.zone.runOutsideAngular(() => {
            if (this.parent.direction == 'column') {
                this.renderer.setStyle(this.resizeLine.nativeElement, 'width', this.element.offsetWidth - 2 + 'px');
            } else {
                this.renderer.setStyle(this.resizeLine.nativeElement, 'height', this.element.offsetHeight - 2 + 'px');
            }
        });
    }

    /**
     * @internal
     */
    public _$handleResizeStart(event) {
        super._$handleResizeStart(event);
        this._isResizing = true;
        JigsawBox.resizeStart.emit();
    }

    /**
     * @internal
     */
    public _$handleResizeEnd() {
        JigsawBox.resizeEnd.emit();
        this._isResizing = false;
    }

    ngAfterViewInit() {
        // resize line 视图渲染完成
        if (!this.resizeLine) return;

        setTimeout(() => {
            // 等待box视图渲染
            this._computeResizeLineWidth();
        });

        this._removeAllListener();

        this._removeResizeStartListener = JigsawBox.resizeStart.subscribe(() => {
            if (this._isResizing || !this.resizeLineParent) return;
            // 兼容IE,去掉resize过程中产生的莫名滚动条
            this.renderer.setStyle(this.resizeLineParent.nativeElement, 'display', 'none');
        });

        this._removeResizeEndListener = JigsawBox.resizeEnd.subscribe(() => {
            this._computeResizeLineWidth();

            if (!this.resizeLineParent) return;
            // 兼容IE,去掉resize过程中产生的莫名滚动条
            if(this._isResizing){
                this.renderer.setStyle(this.resizeLineParent.nativeElement, 'display', 'none');
            }
            setTimeout(() => {
                this.renderer.setStyle(this.resizeLineParent.nativeElement, 'display', 'block');
            });
        });

        this._removeWindowResizeListener = this.renderer.listen('window', 'resize', () => {
            this._computeResizeLineWidth();
        });

        this.removeElementScrollEvent = this.renderer.listen(this.element, 'scroll', () => {
            this.renderer.setStyle(this.resizeLine.nativeElement, 'top', this.element.scrollTop + 'px');
            this.renderer.setStyle(this.resizeLine.nativeElement, 'left', this.element.scrollLeft + 'px');
        })
    }

    ngAfterContentInit() {
        // 映射同一组件实例，ContentChildren会包含自己，https://github.com/angular/angular/issues/21148
        this.childrenBox = this._childrenBoxRaw.filter(box => box != this);
        this.checkFlex();
        this._childrenBoxRaw.changes.subscribe(() => {
            this.childrenBox = this._childrenBoxRaw.filter(box => box != this);
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

    private _removeAllListener() {
        if (this._removeResizeStartListener) {
            this._removeResizeStartListener();
        }
        if (this._removeResizeEndListener) {
            this._removeResizeEndListener();
        }
        if (this._removeWindowResizeListener) {
            this._removeWindowResizeListener();
        }
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
        }
    }

    ngOnDestroy() {
        this._removeAllListener();
    }
}

@NgModule({
    imports: [CommonModule, JigsawResizableModule],
    declarations: [JigsawBox],
    exports: [JigsawBox]
})
export class JigsawBoxModule {

}
