import {
    Component, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, TemplateRef, Type, ViewChild,
} from "@angular/core";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/service/popup.service";
import {CustomTableComponent} from "../custom-table/demo.component";
import {CustomGraphComponent} from "../custom-graph/demo.component";
import {JigsawRendererHost} from "jigsaw/component/common";
import {ComponentInput, ComponentMetaData} from "jigsaw/core/data/layout-data";

@Component({
    selector: 'custom-tab',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class CustomTabComponent {

    constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _popupService: PopupService) {

    }

    @ViewChild(JigsawRendererHost) rendererHost: JigsawRendererHost;

    private _rendererFactory(rendererHost: JigsawRendererHost, renderer: Type<any> | TemplateRef<any>, inputs?: ComponentInput[]): ComponentRef<any> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            const context = {};
            if (inputs) {
                inputs.forEach(input => context[input.property] = input.binding);
            }
            return rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: context
            });
        } else if (renderer) {
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(renderer);
            let componentRef = rendererHost.viewContainerRef.createComponent(componentFactory);
            if (inputs) {
                inputs.forEach(input => componentRef.instance[input.property] = input.default);
            }
            return componentRef;
        }
        return null;
    }

    selectedComponents: ComponentMetaData[];
    componentMetaDataList: ComponentMetaData[] = [
        {
            label: "表格",
            component: CustomTableComponent,
            selector: 'custom-table',
            import: 'CustomTableModule,',
            inputs: [
                {
                    property: 'data',
                    binding: 'tableData',
                },
                {
                    property: 'additionalColumnDefine',
                    binding: 'additionalColumnDefine',
                    default: {
                        a: 1,
                        b: [1, 2, 3],
                        c: 'ww'
                    }
                },
                {
                    property: 'additionalData',
                    binding: 'additionalData',
                    default: {
                        a: 1,
                        b: [1, 2, 3],
                        c: 'ww'
                    }
                }
            ]
        },
        {
            label: "图形",
            component: CustomGraphComponent,
            selector: 'custom-graph',
            import: 'CustomGraphModule,',
            inputs: [
                {
                    property: 'data',
                    binding: 'graphData',
                },
                {
                    property: 'width',
                    binding: 'graphWidth',
                    default: 200
                }
            ]
        },
    ];

    dialogInfo: PopupInfo;

    popupTemplateDialog(tp) {
        this.dialogInfo = this._popupService.popup(tp, this.getModalOptions());
    }

    onAnswer(message: string) {
        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
    }

    currentTabIndex: number = 0;

    selectChange(){
        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
        this.currentTabIndex = this.selectedComponents.length - 1;
        this.renderTabContentByCurrentIndex();
    }

    changeTab(index){
        if(this.currentTabIndex == index) return;
        this.currentTabIndex = index;
        this.renderTabContentByCurrentIndex();
    }

    renderTabContentByCurrentIndex(){
        this.rendererHost.viewContainerRef.clear();
        if(this.selectedComponents.length == 0) return;
        if(this.currentTabIndex > this.selectedComponents.length - 1){
            this.currentTabIndex = 0;
        }
        this._rendererFactory(this.rendererHost, this.selectedComponents[this.currentTabIndex].component);
    }

    getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }

}

