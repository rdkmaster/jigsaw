import {Component, Renderer2, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';

import {PopupService, IPopupable} from '../../core/service/popup.service';

import {fadeIn} from '../animations/fade-in';
import {bubbleIn} from '../animations/bubble-in';
import {AbstractRDKComponent} from "../../core/api/component-api";

@Component({
    selector: 'rdk-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss'],
    animations: [
        fadeIn,
        bubbleIn
    ]
})
export class RdkDialog extends AbstractRDKComponent implements IPopupable, OnInit, OnDestroy{

    private _topPlace: string;
    private _popupEl: HTMLElement;
    private _windowResize: any;

    @Input()
    public set initData(newValue: any){
        this.test = newValue.test;
    }
    public renderer: Renderer2;
    public el: ElementRef;

    @Input()
    public title: string;

    //设置距离顶部高度
    @Input()
    public get topPlace(): string {
        return this._topPlace
    }

    public set topPlace(newValue: string) {
        const match = newValue ? newValue.match(/^\s*\d+%|px\s*$/) : null;
        this._topPlace =  match ? newValue : newValue + 'px';
    }

    constructor(private _popupService: PopupService, private _renderer: Renderer2, private _el: ElementRef){
        super()
    }

    close(){
        this._popupService.close();
    }

    test: () => void;

    ngOnInit(){
        this._popupEl = this._el.nativeElement.querySelector('.rdk-dialog');

        this._renderer.setStyle(this._popupEl, 'width', this.width);
        this._renderer.setStyle(this._popupEl, 'left', (window.innerWidth/2 - this._popupEl.offsetWidth/2) + 'px');
        if(this.topPlace){
            //居上显示
            this._renderer.setStyle(this._popupEl, 'top', this.topPlace);
        }else{
            //居中显示
            this._renderer.setStyle(this._popupEl, 'top', (window.innerHeight/2 - this._popupEl.offsetHeight/2) + 'px');
        }

        this._windowResize = this._renderer.listen('window', 'resize', ()=>{
            this._renderer.setStyle(this._popupEl, 'left', (window.innerWidth/2 - this._popupEl.offsetWidth/2) + 'px');
        })
    }

    ngOnDestroy(){
        this._windowResize();
    }
}

