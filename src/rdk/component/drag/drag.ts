import {Directive, Renderer2, ElementRef} from "@angular/core";


@Directive({
    selector: '[rdk-drag]',
    host:{
        '[attr.draggable]': 'true',
        '(dragstart)': '_onDragstart($event)',
        //'(drag)': '_onDrag($event)',
        '(dragend)': '_onDragend($event)'
    }
})
export class RdkDrag{
    private _ox: number;
    private _oy: number;
    private _cx: number;
    private _cy: number;

    constructor(private _renderer: Renderer2, private _el: ElementRef){
    }

    _onDragstart(event){
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text', 'rdk dialog');
        this._cx = event.clientX;
        this._cy = event.clientY;

    }

    // _onDrag(event){
    //     event.dataTransfer.effectAllowed = "move";
    // }

    _onDragend(event){

        this._ox = event.clientX - this._cx + this._el.nativeElement.offsetLeft;
        this._oy = event.clientY - this._cy + this._el.nativeElement.offsetTop;
        this._renderer.setStyle(this._el.nativeElement, 'left', this._ox + 'px');
        this._renderer.setStyle(this._el.nativeElement, 'top', this._oy + 'px');
    }

}
