import {NgModule, Component, Input, Renderer2, ElementRef} from '@angular/core';
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
        '[@tagDestroy]': '_state',
        '(@tagDestroy.done)': '_animationDone($event)'
    },
    animations:[
        tagDestroy
    ]
})
export class RdkTag extends AbstractRDKComponent {

    @Input() public color: string;

    @Input() public closable: boolean;

    private _state: string;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
        super()
    }

    private _close(){
        this._state = 'void';
    }

    private _animationDone($event){
        if($event.toState == 'void'){
            this._renderer.parentNode(this._elementRef.nativeElement).removeChild(this._elementRef.nativeElement);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkTag],
    exports: [RdkTag]
})
export class RdkTagModule {

}
