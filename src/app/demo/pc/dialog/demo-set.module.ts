import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogButtonsDemoModule} from "./buttons/demo.module";
import {DialogInDomDemoModule} from "./in-dom/demo.module";
import {DialogMiscDemoModule} from "./misc/demo.module";
import {DialogPopOptionDemoModule} from "./popup-option/demo.module";
import {DialogTitleDemoModule} from "./title/demo.module";
import {DialogTopDemoModule} from "./top/demo.module";

import {DialogTitleDemo} from "./title/demo.component";
import {DialogButtonsDemo} from "./buttons/demo.component";
import {DialogTopDemo} from "./top/demo.component";
import {DialogPopOptionDemo} from "./popup-option/demo.component";
import {DialogInDomDemoComponent} from "./in-dom/demo.component";
import {DialogMiscDemoComponent} from "./misc/demo.component";
import {DialogHeightDemo} from "./height/demo.component";
import {DialogHeightDemoModule} from "./height/demo.module";
import {DialogAbsolutePositionDemoComponent} from "./absolute-position/demo.component";
import {DialogAbsolutePositionDemoModule} from "./absolute-position/demo.module";
import {DialogAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

export const routerConfig:any = [
    {
        path: 'all', component: DialogAllComponent
    },
    {
        path: 'misc', component: DialogMiscDemoComponent
    },
    {
        path: 'title', component: DialogTitleDemo
    },
    {
        path: 'buttons', component: DialogButtonsDemo
    },
    {
        path: 'top', component: DialogTopDemo
    },
    {
        path: 'popup-option', component: DialogPopOptionDemo
    },
    {
        path: 'in-dom', component: DialogInDomDemoComponent
    },
    {
        path: 'height', component: DialogHeightDemo
    },
    {
        path: 'absolute-position', component: DialogAbsolutePositionDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DialogButtonsDemoModule,
        DialogInDomDemoModule,
        DialogMiscDemoModule,
        DialogPopOptionDemoModule,
        DialogTitleDemoModule,
        DialogTopDemoModule,
        DialogHeightDemoModule,
        DialogAbsolutePositionDemoModule,
        JigsawMarkdownModule
    ],
    declarations: [DialogAllComponent]
})
export class DialogDemoModule {
}
