import {
    AfterContentInit,
    ApplicationRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Injectable,
    OnDestroy,
    Renderer2,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {IPopupable, PopupDisposer, PopupOptions, PopupRef} from "./popup.service";


@Injectable()
export class LoadingService implements OnDestroy {
    private _viewContainerRef: ViewContainerRef;
    private _viewContainerRefArray = [];

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

    public show(viewContainerRef?: ViewContainerRef,
                contentCss: string = "rdk-loading-content",
                backgroundCss: string = "rdk-loading-background"): PopupDisposer {
        let viewRef = viewContainerRef ? viewContainerRef : this._viewContainerRef;
        this._viewContainerRefArray.forEach((item, index) => {
            if (item.view == viewRef) {
                item.dispose();
                this._viewContainerRefArray.slice(index, 1);
            }
        });

        const factory = this._cfr.resolveComponentFactory(LoadingServiceComponent);

        let ref = viewRef.createComponent(factory);
        let disposer = this._getDisposer(ref);
        ref.instance.disposer = disposer;
        ref.instance.initData = {contentCss: contentCss, backgroundCss: backgroundCss};
        ref.instance.options = {modal: true};
        this._viewContainerRefArray.push({ "view": viewRef, "dispose": disposer });
        return disposer;
    }

    private _getDisposer(popupRef: PopupRef): PopupDisposer {
        return () => {
            popupRef.destroy();
        }
    }

    ngOnDestroy() {
        if (this._viewContainerRefArray.length > 0) {
            this._viewContainerRefArray.forEach((item) => {
                item.dispose();
            });
            this._viewContainerRefArray.splice(0, this._viewContainerRefArray.length);
        }
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
    }

    ngAfterContentInit() {
        this._renderer2.addClass(this.getPopupElement('.rdk-loading-head'), this.initData.backgroundCss ? this.initData.backgroundCss : "rdk-loading-background");
        this._renderer2.addClass(this.getPopupElement('.rdk-loading-body'), this.initData.contentCss ? this.initData.contentCss : "rdk-loading-content");
    }

}

