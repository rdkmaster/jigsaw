import {Directive, Renderer2, ElementRef, NgModule} from "@angular/core";


@Directive({
    selector: '[jigsaw-draggable]',
    host:{
        '[attr.draggable]': 'true',
        '(dragstart)': '_onDragstart($event)',
        //'(draggable)': '_onDrag($event)',
        '(dragend)': '_onDragend($event)'
    }
})
export class JigsawDraggable{
    private _ox: number;
    private _oy: number;
    private _cx: number;
    private _cy: number;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
    }

    _onDragstart(event){
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text', 'jigsaw draggable');
        this._cx = event.clientX;
        this._cy = event.clientY;

    }

    _onDragend(event){

        this._ox = event.clientX - this._cx + this._elementRef.nativeElement.offsetLeft;
        this._oy = event.clientY - this._cy + this._elementRef.nativeElement.offsetTop;
        this._renderer.setStyle(this._elementRef.nativeElement, 'left', this._ox + 'px');
        this._renderer.setStyle(this._elementRef.nativeElement, 'top', this._oy + 'px');
    }
}


@NgModule({
    imports: [],
    declarations: [JigsawDraggable],
    exports: [JigsawDraggable]
})
export class JigsawDraggableModule {
}

