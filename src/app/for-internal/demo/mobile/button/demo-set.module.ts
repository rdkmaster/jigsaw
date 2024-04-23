import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonBasicDemoModule } from "./basic/demo.module";
import { ButtonBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: ButtonBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBasicDemoModule
    ]
})
export class ButtonMobileDemoModule {
}
