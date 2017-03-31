import {NgModule, Component, Input, Renderer2, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractRDKComponent} from '../../core/api/component-api';

import {tagDestroy} from '../animations/tag-destroy';

@Component({
    selector: 'rdk-tag',
    templateUrl: 'tag.html',
    styleUrls: ['tag.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[@tagDestroy]': '_state',
    },
    animations:[
        tagDestroy
    ]
})
export class RdkTag extends AbstractRDKComponent {

    @Input() public color: string;

    @Input() public closable: boolean;

    private _state: string = 'active';

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
        super()
    }

    private _close(){
        this._state = 'inactive';
        setTimeout(() => {
            this._renderer.parentNode(this._elementRef.nativeElement).removeChild(this._elementRef.nativeElement);
        }, 300);
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkTag],
    exports: [RdkTag]
})
export class RdkTagModule {

}
