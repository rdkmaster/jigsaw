import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TransferArrayDemoComponent} from "./basic/demo.component";
import {TransferArrayDemoModule} from "./basic/demo.module";
import {TransferLocalPageableArrayComponent} from "./local-pageable-array/demo.component";
import {TransferLocalPageableArrayDemoModule} from "./local-pageable-array/demo.module";
import {TransferPageableArrayComponent} from "./pageable-array/demo.component";
import {TransferPageableArrayDemoModule} from "./pageable-array/demo.module";
import {TransferItemDisabledDemoComponent} from "./item-disabled/demo.component";
import {TransferItemDisabledDemoModule} from "./item-disabled/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TransferArrayDemoComponent
    },
    {
        path: 'local-pageable-array', component: TransferLocalPageableArrayComponent
    },
    {
        path: 'pageable-array', component: TransferPageableArrayComponent
    },
    {
        path: 'item-disabled', component: TransferItemDisabledDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TransferArrayDemoModule,
        TransferLocalPageableArrayDemoModule,
        TransferPageableArrayDemoModule,
        TransferItemDisabledDemoModule
    ]
})
export class TransferDemoModule {
}
