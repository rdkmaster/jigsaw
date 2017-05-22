import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Renderer2} from "@angular/core";
import {IPopupable} from "rdk/service/popup.service";
import {CommonModule} from "@angular/common";
import {AbstractRDKComponent} from "../core";

export class RdkLoadingBase extends AbstractRDKComponent implements IPopupable {
    public initData: any;
    public answer: EventEmitter<any>;
}

@Component({
    selector: 'rdk-loading',
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class RdkLoading extends RdkLoadingBase implements OnInit{

    private _color: string;
    private _popupElement: HTMLElement;
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
        super();
    }

    @Input()
    public set color(rgb:string) {
        this._color = rgb;
        this._popupElement = this.getPopupElement();
        let circleDivs = this._popupElement.querySelectorAll('.spinner-container > div');
        for ( let index = 0; index < circleDivs.length; ++index ) {
            this._renderer.setStyle(circleDivs[index], 'backgroundColor', rgb);
        }
    }

    public get color():string {
        return this._color;
    }

    ngOnInit(){
        this._popupElement = this.getPopupElement();

        if(this.width && this.height){
            this._renderer.setStyle(this._popupElement, 'width', this.width);
            this._renderer.setStyle(this._popupElement, 'height', this.height);

            this._renderer.setStyle(this._popupElement.querySelector('.spinner'), 'width', this.width);
            this._renderer.setStyle(this._popupElement.querySelector('.spinner'), 'height', this.height);
            this._renderer.setStyle(this._popupElement.querySelector('.spinner'), 'margin-left', '-' + this._popupElement.offsetWidth / 2 + 'px');
            this._renderer.setStyle(this._popupElement.querySelector('.spinner'), 'margin-top', '-' + this._popupElement.offsetHeight / 2 + 'px');
        }
    }

    protected getPopupElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }
}

@Component({
    selector: 'rdk-ball-loading',
    templateUrl: 'loading-ball.html',
    styleUrls: ['loading-ball.scss']
})
export class RdkBallLoading extends RdkLoadingBase {
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
        super();
    }
    private _color: string;
    private _popupElement: HTMLElement;

    @Input()
    public set color(rgb:string) {
        this._color = rgb;
        this._popupElement = this.getPopupElement();
        let circleDivs = this._popupElement.querySelectorAll('.rdk-loading-content > div');
        for ( let index = 0; index < circleDivs.length; ++index ) {
            this._renderer.setStyle(circleDivs[index], 'backgroundColor', rgb);
        }
    }

    public get color():string {
        return this._color;
    }

    protected getPopupElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkLoading, RdkBallLoading],
    exports: [RdkLoading, RdkBallLoading]
})
export class RdkLoadingModule {

}

