import {
    Injectable, Component, ElementRef, Renderer2, AfterContentInit,
    ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver, ApplicationRef
} from '@angular/core';
import {PopupOptions, PopupDisposer, IPopupable, PopupRef} from "./popup.service"

export class LoadingData {
    public static DEFAULT_BACKGROUND_CSS = "rdk-loading-background";
    public static DEFAULT_CONTENT_CSS = "rdk-loading-content";
    public backgroundCss: string;
    public contentCss: string;
}

@Injectable()
export class LoadingService {
    private _viewContainerRef: ViewContainerRef;
    private _disposer: PopupDisposer;
    constructor(private _cfr: ComponentFactoryResolver, private _appRef: ApplicationRef) {
        _appRef.components.length && _appRef.components.forEach(component => {
            if (component.instance.hasOwnProperty('viewContainerRef')) {
                this._viewContainerRef = component.instance.viewContainerRef;
            }
        });
        if (!this._viewContainerRef) {
            console.error("please add 'constructor(public viewContainerRef: ViewContainerRef){}' into AppComponent");
        }
    }

    public showLoading(viewContainerRef?: ViewContainerRef, loadingData?: LoadingData) {
        if(this._disposer){
            this.hideLoading();
        }
        const factory = this._cfr.resolveComponentFactory(LoadingServiceComponent);
        this._viewContainerRef = viewContainerRef ? viewContainerRef : this._viewContainerRef;
        let ref = this._viewContainerRef.createComponent(factory);
        this._disposer = this._getDisposer(ref);
        ref.instance.disposer = this._disposer;
        ref.instance.initData = loadingData;
        ref.instance.options = this._getDialogOptions() ? this._getDialogOptions() : {};
    }

    private _getDisposer(popupRef: PopupRef): PopupDisposer {
        return () => {
            popupRef.destroy();
        }
    }

    public hideLoading() {
        this._disposer();
    }

    private _getDialogOptions(): PopupOptions {
        return {
            modal: true
        };
    }
}

@Component({
    template: `
        <div class="rdk-loading-head">
            <div class="rdk-loading-body">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>`,
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class LoadingServiceComponent implements IPopupable, AfterContentInit {
    public disposer: PopupDisposer;
    public options: PopupOptions;
    public initData: any;
    protected _elementRef: ElementRef;
    protected _renderer2: Renderer2;

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        this._elementRef = elementRef;
        this._renderer2 = renderer;
    }

    public getPopupElement(name: String): HTMLElement {
        return this._elementRef.nativeElement.querySelector(name);
    };

    public init() {
        this._renderer2.addClass(this.getPopupElement('.rdk-loading-head'), this.initData ? (<LoadingData> this.initData).backgroundCss : LoadingData.DEFAULT_BACKGROUND_CSS);
        this._renderer2.addClass(this.getPopupElement('.rdk-loading-body'), this.initData ? (<LoadingData> this.initData).contentCss : LoadingData.DEFAULT_CONTENT_CSS);
    }

    ngAfterContentInit() {
        this.init();
    }

}

