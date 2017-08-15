/**
 * Created by 10184437 on 2017/5/22.
 */
import {
    Component, ElementRef, Renderer2, ViewContainerRef
} from '@angular/core';
@Component ( {
    templateUrl:'./app.component.html'
})
export class ColorfulLoadingDemoComponent {
    constructor(public renderer: Renderer2,
                public viewContainerRef: ViewContainerRef,
                private _el: ElementRef) {

    }
    public colors = ['rgb(255, 0, 0 )','rgb(255, 165, 0 )','rgb(255, 255, 0 )','rgb(0, 255, 0 )','rgb(0, 127, 255 )','rgb(0, 0, 255 )','rgb(139, 0, 255 )'];

    public paused = 'running';

    public setElementsStyle(tags:string, props:string, val:string | boolean | number) {
        let elements = this._el.nativeElement.querySelectorAll(tags);
        for (let index = 0; index < elements.length; ++index) {
            this.renderer.setStyle(elements[index],props,val);
        }
    }

    public pauseLoading() {
        if( this.paused == 'paused') {
            this.paused = 'runing';
            this.setElementsStyle('.spinner-container > div','animationPlayState','running');
            this.setElementsStyle('.jigsaw-loading-content > div','animationPlayState','running');

        } else {
            this.paused = 'paused';
            this.setElementsStyle('.spinner-container > div','animationPlayState','paused');
            this.setElementsStyle('.jigsaw-loading-content > div','animationPlayState','paused');
        }
    }
    // animation-play-state

}
