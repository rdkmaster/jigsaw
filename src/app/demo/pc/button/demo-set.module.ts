import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoModule} from "./basic/demo.module";
import {ButtonDisableDemoModule} from "./disabled/demo.module";
import {ButtonPresetDemoModule} from "app/demo/pc/button/preset/demo.module";
import {ButtonWidthHeightDemoModule} from "app/demo/pc/button/width-height/demo.module";
import {ButtonWithLoadingModule} from "app/demo/pc/button/with-loading/demo.module";
import {ButtonFullModule} from "./full/demo.module";

import {ButtonFullComponent} from "./full/demo.component";
import {ButtonBasicDemoComponent} from "./basic/demo.component";
import {ButtonDisableDemoComponent} from "./disabled/demo.component";
import {ButtonWidthHeightDemoComponent} from "./width-height/demo.component";
import {ButtonPresetDemoComponent} from "./preset/demo.component";
import {ButtonWithLoadingComponent} from "./with-loading/demo.component";
import {ButtonIconDemoModule} from './icon/demo.module';
import {ButtonInstancesDemoComponent} from './instances/demo.component';
import {ButtonInstancesDemoModule} from './instances/demo.module';
import {ButtonAllComponent} from "./demo.component";
import {ButtonKeyDemoModule} from "./key/demo.module";
import {ButtonImportantDemoModule} from "./important/demo.module";
import {ButtonCommonDemoModule} from "./common/demo.module";
import {ButtonMoreDemoModule} from "./more/demo.module";
import {ButtonInTableDemoModule} from "./table/demo.module";
import {ButtonDangerDemoModule} from "./danger/demo.module";
import {ButtonIconWordDemoModule} from "./icon-word/demo.module";
import {ButtonLoadingDemoModule} from "./loading/demo.module";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {ButtonColorDemoModule} from "./color/demo.module";
import {ButtonWithChartIconDemoModule} from "./with-chart-icon/demo.module";
export const routerConfig = [
    {
        path: 'all', component: ButtonAllComponent
    },
    {
        path: 'full', component: ButtonFullComponent
    },
    {
        path: 'basic', component: ButtonBasicDemoComponent
    },
    {
        path: 'disabled', component: ButtonDisableDemoComponent
    },
    {
        path: 'width-height', component: ButtonWidthHeightDemoComponent
    },
    {
        path: 'preset', component: ButtonPresetDemoComponent
    },
    {
        path: 'with-loading', component: ButtonWithLoadingComponent
    },
    {
        path: 'instances', component: ButtonInstancesDemoComponent
    },
    {
        desc: 'with-chart-icon', url: '/pc/chart-icon/with-button'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBasicDemoModule,
        ButtonDisableDemoModule,
        ButtonPresetDemoModule,
        ButtonWidthHeightDemoModule,
        ButtonWithLoadingModule,
        ButtonFullModule,
        ButtonIconDemoModule,
        ButtonInstancesDemoModule,
        ButtonKeyDemoModule,
        ButtonImportantDemoModule,
        ButtonCommonDemoModule,
        ButtonMoreDemoModule,
        ButtonInTableDemoModule,
        ButtonDangerDemoModule,
        ButtonIconWordDemoModule,
        ButtonLoadingDemoModule,
        JigsawMarkdownModule,
        ButtonColorDemoModule,
        ButtonWithChartIconDemoModule
    ],
    declarations: [
        ButtonAllComponent
    ]
})
export class ButtonDemoModule {
}
