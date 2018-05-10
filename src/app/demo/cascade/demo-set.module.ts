import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CascadeBasicDemoComponent} from "./basic/demo.component";
import {CascadeBasicDemoModule} from "./basic/demo.module";
import {CascadeLazyLoadDemoComponent} from "./lazy-load/demo.component";
import {CascadeLazyLoadDemoModule} from "./lazy-load/demo.module";
import {CascadeSelectedItemsDemoComponent} from "./selected-items/demo.component";
import {CascadeSelectedItemsDemoModule} from "./selected-items/demo.module";
import {CascadeMultipleDemoComponent} from "./multiple-select/demo.component";
import {CascadeMultipleDemoModule} from "./multiple-select/demo.module";
import {CascadeTrackItemByDemoComponent} from "./track-item-by/demo.component";
import {CascadeTrackItemByDemoModule} from "./track-item-by/demo.module";
import {CascadeShowAllDemoComponent} from "./show-all/demo.component";
import {CascadeShowAllDemoModule} from "./show-all/demo.module";
import {CascadeWithComboDemoComponent} from "./with-combo/demo.component";
import {CascadeWithComboDemoModule} from "./with-combo/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: CascadeBasicDemoComponent
    },
    {
        path: 'lazy-load', component: CascadeLazyLoadDemoComponent
    },
    {
        path: 'selected-items', component: CascadeSelectedItemsDemoComponent
    },
    {
        path: 'multiple-select', component: CascadeMultipleDemoComponent
    },
    {
        path: 'track-item-by', component: CascadeTrackItemByDemoComponent
    },
    // {
    //     path: 'cross-select', component: CascadeCrossSelectDemoComponent
    // },
    // {
    //     path: 'preset-multi-dimensional-data', component: CascadeMultiDimensionalFillBackDemoComponent
    // },
    {
        path: 'show-all', component: CascadeShowAllDemoComponent
    },
    {
        path: 'with-combo', component: CascadeWithComboDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CascadeBasicDemoModule,
        CascadeLazyLoadDemoModule,
        CascadeSelectedItemsDemoModule,
        CascadeMultipleDemoModule,
        // CascadeCrossSelectDemoModule,
        // CascadeMultiDimensionalFillBackDemoModule,
        CascadeTrackItemByDemoModule,
        CascadeShowAllDemoModule,
        CascadeWithComboDemoModule
    ]
})
export class CascadeDemoModule {

}
