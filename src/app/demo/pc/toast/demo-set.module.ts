import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastBasicDemoComponent } from './basic/demo.component';
import { ToastBasicDemoModule } from './basic/demo.module';
import { ToastFullDemoComponent } from "./full/demo.component";
import { ToastFullDemoModule } from "./full/demo.module";
import {ToastDemoAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";


export const routerConfig = [
    {
        path: 'all', component: ToastDemoAllComponent
    },
    {
        path: 'basic', component: ToastBasicDemoComponent
    },
    {
        path: 'full', component: ToastFullDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), ToastBasicDemoModule, ToastFullDemoModule, JigsawMarkdownModule
    ],
    declarations: [ToastDemoAllComponent]
})
export class ToastDemoModule {
}
