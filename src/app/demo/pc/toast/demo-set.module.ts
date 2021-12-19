import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastBasicDemoComponent } from './basic/demo.component';
import { ToastBasicDemoModule } from './basic/demo.module';
import { ToastFullDemoComponent } from "./full/demo.component";
import { ToastFullDemoModule } from "./full/demo.module";


export const routerConfig = [
    {
        path: 'basic', component: ToastBasicDemoComponent
    },
    {
        path: 'full', component: ToastFullDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), ToastBasicDemoModule, ToastFullDemoModule
    ],
})
export class ToastDemoModule {
}
