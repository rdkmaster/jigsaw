import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TransferArrayDemoComponent} from "./basic/demo.component";
import {TransferArrayDemoModule} from "./basic/demo.module";
import {TransferLocalPageableArrayComponent} from "./local-pageable-array/demo.component";
import {TransferLocalPageableArrayDemoModule} from "./local-pageable-array/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TransferArrayDemoComponent
    },
    {
        path: 'local-pageable-array', component: TransferLocalPageableArrayComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TransferArrayDemoModule,
        TransferLocalPageableArrayDemoModule
    ]
})
export class TransferDemoModule {
}
