import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TreeBasicDemoModule} from "./basic/demo.module";
import {ZTreeAsyncDemoModule} from "./async/demo.module";
import {TreeAjaxDataDemoModule} from "./data-from-ajax/demo.module";
import {TreeEditableDemoModule} from "./editable/demo.module";
import {ZtreeDemoComponent} from "./basic/demo.component";
import {ZtreeDemoDataFromAjaxComponent} from "./data-from-ajax/demo.component";
import {ZtreeDemoEditableComponent} from "./editable/demo.component";
import {ZTreeAsyncDemoComponent} from "./async/demo.component";
import {ZtreeCustomSettingCallbackDemoComponent} from "./custom-settings-callback/demo.component";
import {TreeCustomSettingCallbackDemoModule} from "./custom-settings-callback/demo.module";
import {ZtreeXMLDataDemoComponent} from "./xml-data/demo.component";
import {TreeXMLDataDemoModule} from "./xml-data/demo.module";
import { ZTreeIconDemoModule } from './icon/demo.module';
import { ZTreeIconDemoComponent } from './icon/demo.component';
import { ZtreeFuzzySearchComponent } from './fuzzy-search/demo.component';
import { TreeFuzzySearchDemoModule } from './fuzzy-search/demo.module';
import { ZtreeSizeComponent } from './size/demo.component';
import { TreeSizeDemoModule } from './size/demo.module';
import { ZtreeSelectDemoModule } from "./select/demo.module";
import { ZtreeSelectDemoComponent } from "./select/demo.component";
import { TreeBigDataDemoModule } from "./big-data/demo.module";
import { ZtreeBigDataDemoComponent } from "./big-data/demo.component";

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
        path: 'async', component: ZTreeAsyncDemoComponent
    },
    {
        path: 'custom-settings-callback', component: ZtreeCustomSettingCallbackDemoComponent
    },
    {
        path: 'xml-data', component: ZtreeXMLDataDemoComponent
    },
    {
        path: 'icon', component: ZTreeIconDemoComponent
    },
    {
        path: 'fuzzy-search', component: ZtreeFuzzySearchComponent
    },
    {
        path: 'size', component: ZtreeSizeComponent
    },
    {
        path: 'select', component: ZtreeSelectDemoComponent
    },
    {
        path: 'big-data', component: ZtreeBigDataDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ZTreeAsyncDemoModule, TreeBasicDemoModule, TreeAjaxDataDemoModule, TreeEditableDemoModule,
        TreeCustomSettingCallbackDemoModule, TreeXMLDataDemoModule, ZTreeIconDemoModule, TreeFuzzySearchDemoModule, TreeSizeDemoModule,
        ZtreeSelectDemoModule, TreeBigDataDemoModule
    ],
    exports: [
    ],
    providers: []
})
export class ZtreeDemoModule { }
