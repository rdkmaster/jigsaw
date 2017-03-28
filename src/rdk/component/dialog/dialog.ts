import {Component, Renderer2, ElementRef, Input, OnInit} from '@angular/core';

import {PopupService, IPopupable} from '../../core/service/popup.service';

import {fadeIn} from '../animations/fadeIn';

@Component({
    selector: 'rdk-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss'],
    animations: [
        fadeIn
    ]
})
export class RdkDialog implements IPopupable, OnInit{

    private _topPlace: string;

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
    }

    close(){
        this._popupService.close();
    }

    test: () => void;

    ngOnInit(){
        let popupEl = this._el.nativeElement.querySelector('.rdk-dialog');
        this._renderer.setStyle(popupEl, 'left', (window.innerWidth/2 - popupEl.offsetWidth/2) + 'px');
        if(this.topPlace){
            //居上显示
            this._renderer.setStyle(popupEl, 'top', this.topPlace);
        }else{
            //居中显示
            this._renderer.setStyle(popupEl, 'top', (window.innerHeight/2 - popupEl.offsetHeight/2) + 'px');
        }

    }
}

