/**
 * Created by 10177553 on 2017/5/12.
 */
import {
    Directive, TemplateRef, ComponentRef, Input, ViewContainerRef, ComponentFactoryResolver,
    OnDestroy, Type, OnInit
} from "@angular/core";

@Directive({
    selector: '[portalHost]'
})
// 创建逐渐指令
export class PortalHost implements OnInit, OnDestroy{

    // 可渲染模板或者组件;
    private _portal: TemplateRef<any>| Type<any>;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver,
                private _viewContainerRef: ViewContainerRef){}

    @Input("portalHost")
    get portal() { return this._portal; }
    set portal(v) {
        this._portal = v;
    }

    private _attachPortal() {
        if(this.portal instanceof TemplateRef) {
            this._viewContainerRef.createEmbeddedView(this.portal)
        } else if(this.portal instanceof ComponentRef) {
            const factory = this._componentFactoryResolver.resolveComponentFactory(this.portal);
            this._viewContainerRef.createComponent(factory);
        }
    }

    ngOnInit() {
        this._attachPortal();
    }

    /**
     * 销毁时注销
     */
    ngOnDestroy() {
        //todo
    }

}
