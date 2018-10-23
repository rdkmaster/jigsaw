import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TransferDemoComponent} from "./basic/demo.component";
import {TransferBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TransferDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TransferBasicDemoModule
    ]
})
export class TransferDemoModule {
}
