import {Component} from '@angular/core';
import {AsyncDescription} from 'app/for-external/demo-template/demo-template';

@Component({
    selector: 'badge-mask',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap jigsaw-icon {
            line-height: 1;
        }
    `]
})

export class BadgeMaskDemoComponent extends AsyncDescription {
    public demoPath = "demo/badge/mask";
    public selectedSize = { size: "normal" };

    public select($event) {
        console.log('badge click: ', $event);
    }

    public _$btn() {
        console.log('host click');
    }
}
