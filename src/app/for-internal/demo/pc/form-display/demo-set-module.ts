import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormDisplayCommonDemoComponent} from "./common/demo.component";
import {FormDisplayCommonDemoModule} from "./common/demo.module";
import {TransFormCommonDemoComponent} from "./awade-form/demo.component";
import {TransformAwadeCommonDemoModule} from "./awade-form/demo.module";
import {FormDisplayUpdateDemoModule} from "./update/demo.module";
import {FormDisplayUpdateComponent} from "./update/demo.component";
import {FormDisplayTooltipDemoModule} from "./tooltip/demo.module";
import {FormDisplayTooltipDemoComponent} from "./tooltip/demo.component";
import {FormDisplayCellRendererDemoModule} from "./cell-renderer/demo.module";
import {FormDisplayCellRendererDemoComponent} from "./cell-renderer/demo.component";
import {FormDisplayPerformanceTestDemoModule} from "./common-data-test/demo.module";
import {FormDisplayPerformanceTestDemoComponent} from "./common-data-test/demo.component";
import {FormDisplayRendererDataTestDemoComponent} from "./renderer-data-test/demo.component";
import {FormDisplayRendererDataTestDemoModule} from "./renderer-data-test/demo.module";
import {FormDisplayColumnWidthTypeDemoComponent} from "./column-width-type/demo.component";
import {FormDisplayColumnWidthTypeDemoModule} from "./column-width-type/demo.module";

export const routerConfig = [
    {
        path: 'common', component: FormDisplayCommonDemoComponent
    },
    {
        path: 'awade-form', component: TransFormCommonDemoComponent
    },
    {
        path: 'update', component: FormDisplayUpdateComponent
    },
    {
        path: 'tooltip', component: FormDisplayTooltipDemoComponent
    },
    {
        path: 'cell-renderer', component: FormDisplayCellRendererDemoComponent
    },
    {
        path: 'common-data-test', component: FormDisplayPerformanceTestDemoComponent
    },
    {
        path: 'renderer-data-test', component: FormDisplayRendererDataTestDemoComponent
    },
    {
        path: 'column-width-type', component: FormDisplayColumnWidthTypeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), FormDisplayCommonDemoModule, TransformAwadeCommonDemoModule, FormDisplayUpdateDemoModule, FormDisplayTooltipDemoModule,
        FormDisplayCellRendererDemoModule, FormDisplayPerformanceTestDemoModule, FormDisplayRendererDataTestDemoModule, FormDisplayColumnWidthTypeDemoModule
    ]
})
export class FormDisplayDemoModule {
}
