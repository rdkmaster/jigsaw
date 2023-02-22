import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TransferArrayDemoComponent } from "./basic/demo.component";
import { TransferArrayDemoModule } from "./basic/demo.module";
import { TransferItemDisabledDemoComponent } from "./item-disabled/demo.component";
import { TransferItemDisabledDemoModule } from "./item-disabled/demo.module";
import { TransferArrayDisabledDemoComponent } from "./disabled/demo.component";
import { TransferArrayDisabledDemoModule } from "./disabled/demo.module";
import { TransferArrayValidDemoComponent } from "./valid/demo.component";
import { TransferArrayValidDemoModule } from "./valid/demo.module";
import { TransferArrayI18nDemoComponent } from "./i18n/demo.component";
import { TransferArrayI18nDemoModule } from "./i18n/demo.module";
import { TransferTreeDemoModule } from './transfer-tree/demo.module';
import { TransferTreeDemoComponent } from './transfer-tree/demo.component';
import { TransferTableDemoComponent } from './transfer-table/demo.component';
import { TransferTableDemoModule } from './transfer-table/demo.module';
import { TransferListDemoComponent } from "./transfer-list/demo.component";
import { TransferListDemoModule } from "./transfer-list/demo.module";
import { TransferListLocalPageableDemoComponent } from "./transfer-list-local-pageable/demo.component";
import { TransferListLocalPageableDemoModule } from "./transfer-list-local-pageable/demo.module";
import { TransferTableLocalPageableDemoComponent } from "./transfer-table-local-pageable/demo.component";
import { TransferTableLocalPageableDemoModule } from "./transfer-table-local-pageable/demo.module";
import { TransferListPageableDemoComponent } from './transfer-list-pageable/demo.component';
import { TransferListPageableDemoModule } from './transfer-list-pageable/demo.module';
import { TransferTablePageableDemoComponent } from './transfer-table-pageable/demo.component';
import { TransferTablePageableDemoModule } from './transfer-table-pageable/demo.module';
import {TransferCheckedChangeDemoModule} from "./checked-change/demo.module";
import {TransferCheckedChangeDemoComponent} from "./checked-change/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: TransferArrayDemoComponent
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
    },
    {
        path: 'transfer-tree', component: TransferTreeDemoComponent
    },
    {
        path: 'transfer-table', component: TransferTableDemoComponent
    },
    {
        path: 'transfer-list', component: TransferListDemoComponent
    },
    {
        path: 'transfer-list-local-pageable', component: TransferListLocalPageableDemoComponent
    },
    {
        path: 'transfer-table-local-pageable', component: TransferTableLocalPageableDemoComponent
    },
    {
        path: 'transfer-list-pageable', component: TransferListPageableDemoComponent
    },
    {
        path: 'transfer-table-pageable', component: TransferTablePageableDemoComponent
    },
    {
        path: 'checked-change', component: TransferCheckedChangeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TransferArrayDemoModule,
        TransferItemDisabledDemoModule,
        TransferArrayDisabledDemoModule,
        TransferArrayValidDemoModule,
        TransferArrayI18nDemoModule,
        TransferTreeDemoModule,
        TransferTableDemoModule,
        TransferListDemoModule,
        TransferListLocalPageableDemoModule,
        TransferTableLocalPageableDemoModule,
        TransferListPageableDemoModule,
        TransferTablePageableDemoModule,
        TransferCheckedChangeDemoModule
    ]
})
export class TransferDemoModule {
}
