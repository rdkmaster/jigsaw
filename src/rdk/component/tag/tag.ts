import {NgModule, Component, Input, Renderer2, ElementRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {tagDestroy} from '../animations/tag-destroy';
import {AbstractRDKComponent} from "../core";

@Component({
    selector: 'rdk-tag',
    templateUrl: 'tag.html',
    styleUrls: ['tag.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': 'color',
        '[style.border-color]': 'color',
        '[class.rdk-tag-close]': 'closable',
        '[class.rdk-tag-color]': '!!color',
        '[@tagDestroy]': '_state',
        '(@tagDestroy.done)': '_animationDone($event)',
    },
    animations:[
        tagDestroy
    ]
})
export class RdkTag extends AbstractRDKComponent implements OnInit{

    @Input() public color: string;

    @Input() public closable: boolean = false;

    private _state: string;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
        super();

    }

    private _close(){
        this._state = 'void';
    }

    private _animationDone($event){
        if($event.toState == 'void'){
            this._renderer.parentNode(this._elementRef.nativeElement).removeChild(this._elementRef.nativeElement);
        }
    }

    ngOnInit(){
        this._renderer.addClass(this._elementRef.nativeElement, this.basicClass);
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkTag],
    exports: [RdkTag]
})
export class RdkTagModule {

}
