import {Directive, Renderer2, ElementRef, NgModule, OnInit, Input} from "@angular/core";
import {AffixUtils} from "../../core/utils/internal-utils";

@Directive({
    selector: '[jigsaw-draggable]'
})
export class JigsawDraggable implements OnInit {
    private _dragTarget: HTMLElement;
    private _host: HTMLElement;
    private _draging: boolean = false;
    private _pos: any[];

    @Input()
    public parentSelector: string;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
    }

    private _dragStart = (event) => {
        this._pos = [event.clientX - AffixUtils.offset(this._dragTarget).left,
            event.clientY - AffixUtils.offset(this._dragTarget).top];
        this._draging = true;
        event.preventDefault();
        event.stopPropagation();
    };

    private _dragMove = (event) => {
        if (this._draging) {
            const ox = event.clientX - this._pos[0];
            const oy = event.clientY - this._pos[1];
            this._renderer.setStyle(this._dragTarget, 'left', ox + 'px');
            this._renderer.setStyle(this._dragTarget, 'top', oy + 'px');
        }
    };

    private _dragEnd = () => {
        this._draging = false;
        this._pos = null;
    };

    ngOnInit() {
        this._host = this._elementRef.nativeElement;
        this._dragTarget = this.parentSelector ? this._getElementParent(this._host, this.parentSelector) : this._host;

        if (this._dragTarget) {
            this._renderer.listen(this._host, 'mousedown', this._dragStart);
            this._renderer.listen(document, 'mousemove', this._dragMove);
            this._renderer.listen(document, 'mouseup', this._dragEnd);
        }
    }

    private _getElementParent(element: HTMLElement, selector: string) {
        if (!(element instanceof HTMLElement)) return;
        let parent = element.parentElement;
        selector = selector.trim();
        if (selector.match(/#/)) {
            selector = selector.replace("#", '');
            while (parent.getAttribute('id') !== selector) {
                parent = parent.parentElement;
            }
            return parent;
        } else if (selector.match(/\./)) {
            selector = selector.replace(".", '');
            while (!parent.classList.contains(selector)) {
                parent = parent.parentElement;
            }
            return parent;
        } else if (!selector.match(/[#.]/)) {
            while (parent.tagName.toLowerCase() !== selector) {
                parent = parent.parentElement;
            }
            return parent;
        }
    }
}

@NgModule({
    imports: [],
    declarations: [JigsawDraggable],
    exports: [JigsawDraggable]
})
export class JigsawDraggableModule {
}

