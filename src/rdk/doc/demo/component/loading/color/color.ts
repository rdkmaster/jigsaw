/**
 * Created by 10184437 on 2017/5/22.
 */
import {Component, ElementRef, Renderer2} from '@angular/core';
@Component ( {
    templateUrl:'color.html'
})
export class ColorfulLoadingDemoComponent {
    constructor(private _renderer: Renderer2,private _el: ElementRef) {

    }
    public colors = ['rgb(255, 0, 0 )','rgb(255, 165, 0 )','rgb(255, 255, 0 )','rgb(0, 255, 0 )','rgb(0, 127, 255 )','rgb(0, 0, 255 )','rgb(139, 0, 255 )'];

    private _pause = 'running';

    public setElementsStyle(tags:string, props:string, val:string | boolean | number) {
        let elements = this._el.nativeElement.querySelectorAll(tags);
        console.log( elements );
        for (let index = 0; index < elements.length; ++index) {
            this._renderer.setStyle(elements[index],props,val);
        }
    }

    public pauseLoading() {
        if( this._pause == 'paused') {
            this._pause = 'runing';
            this.setElementsStyle('.spinner-container > div','animationPlayState','running');
            this.setElementsStyle('.rdk-loading-content > div','animationPlayState','running');

        } else {
            this._pause = 'paused';
            this.setElementsStyle('.spinner-container > div','animationPlayState','paused');
            this.setElementsStyle('.rdk-loading-content > div','animationPlayState','paused');
        }
    }
    // animation-play-state

}
