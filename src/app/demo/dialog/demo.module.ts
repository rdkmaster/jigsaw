import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogButtonsDemoModule} from "./buttons/app.module";
import {DialogInDomDemoModule} from "./in-dom/app.module";
import {DialogMiscDemoModule} from "./misc/app.module";
import {DialogPopOptionDemoModule} from "./popup-option/app.module";
import {DialogTitleDemoModule} from "./title/app.module";
import {DialogTopDemoModule} from "./top/app.module";

import {DialogTitleDemo} from "./title/app.component";
import {DialogButtonsDemo} from "./buttons/app.component";
import {DialogTopDemo} from "./top/app.component";
import {DialogPopOptionDemo} from "./popup-option/app.component";
import {DialogInDomDemoComponent} from "./in-dom/app.component";
import {DialogMiscDemoComponent} from "./misc/app.component";

export const routerConfig = [
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
        path: 'misc', component: DialogMiscDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DialogButtonsDemoModule,
        DialogInDomDemoModule,
        DialogMiscDemoModule,
        DialogPopOptionDemoModule,
        DialogTitleDemoModule,
        DialogTopDemoModule
    ]
})
export class DialogDemoModule {
}
