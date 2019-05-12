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
import {TransferArrayDisabledDemoComponent} from "./disabled/demo.component";
import {TransferArrayDisabledDemoModule} from "./disabled/demo.module";
import {TransferArrayValidDemoComponent} from "./valid/demo.component";
import {TransferArrayValidDemoModule} from "./valid/demo.module";
import {TransferArrayI18nDemoComponent} from "./i18n/demo.component";
import {TransferArrayI18nDemoModule} from "./i18n/demo.module";

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
    },
    {
        path: 'disabled', component: TransferArrayDisabledDemoComponent
    },
    {
        path: 'valid', component: TransferArrayValidDemoComponent
    },
    {
        path: 'i18n', component: TransferArrayI18nDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TransferArrayDemoModule,
        TransferLocalPageableArrayDemoModule,
        TransferPageableArrayDemoModule,
        TransferItemDisabledDemoModule,
        TransferArrayDisabledDemoModule,
        TransferArrayValidDemoModule,
        TransferArrayI18nDemoModule
    ]
})
export class TransferDemoModule {
}
