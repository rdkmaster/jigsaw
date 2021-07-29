import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TreeBasicDemoModule} from "./basic/demo.module";
import {TreeAsyncDemoModule} from "./async/demo.module";
import {TreeAjaxDataDemoModule} from "./data-from-ajax/demo.module";
import {TreeEditableDemoModule} from "./editable/demo.module";
import {ZtreeDemoComponent} from "./basic/demo.component";
import {ZtreeDemoDataFromAjaxComponent} from "./data-from-ajax/demo.component";
import {ZtreeDemoEditableComponent} from "./editable/demo.component";
import {ZtreeAsynDemoComponent} from "./async/demo.component";
import {ZtreeCustomSettingCallbackDemoComponent} from "./custom-settings-callback/demo.component";
import {TreeCustomSettingCallbackDemoModule} from "./custom-settings-callback/demo.module";
import {ZtreeXMLDataDemoComponent} from "./xml-data/demo.component";
import {TreeXMLDataDemoModule} from "./xml-data/demo.module";
import { TreeIconDemoModule } from './icon/demo.module';
import { ZtreeIconDemoComponent } from './icon/demo.component';

export const routerConfig = [
    {
        path: 'basic', component: ZtreeDemoComponent
    },
    {
        path: 'data-from-ajax', component: ZtreeDemoDataFromAjaxComponent
    },
    {
        path: 'editable', component: ZtreeDemoEditableComponent
    },
    {
        path: 'async', component: ZtreeAsynDemoComponent
    },
    {
        path: 'custom-settings-callback', component: ZtreeCustomSettingCallbackDemoComponent
    },
    {
        path: 'xml-data', component: ZtreeXMLDataDemoComponent
    },
    {
        path: 'icon', component: ZtreeIconDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TreeAsyncDemoModule, TreeBasicDemoModule, TreeAjaxDataDemoModule, TreeEditableDemoModule,
        TreeCustomSettingCallbackDemoModule, TreeXMLDataDemoModule, TreeIconDemoModule
    ],
    exports: [
    ],
    providers: []
})
export class ZtreeDemoModule { }
