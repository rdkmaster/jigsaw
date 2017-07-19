/**
 * Created by 10177553 on 2017/3/29.
 */
import {
	Component, Renderer2, ViewContainerRef
} from '@angular/core';

@Component({
    templateUrl: './app.component.html',
    styleUrls:['./app.component.scss']
})
export class JigsawTabsDemoComponent {
    testEvent(value) {
        console.info(value);
    }

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}
