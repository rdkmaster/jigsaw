import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastBasicDemoComponent } from './basic/demo.component';
import { ToastBasicDemoModule } from './basic/demo.module';


export const routerConfig = [
    {
        path: 'basic', component: ToastBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), ToastBasicDemoModule
    ],
})
export class ToastDemoModule {
}
