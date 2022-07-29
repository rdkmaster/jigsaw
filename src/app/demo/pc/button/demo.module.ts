import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo/demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {JigsawButtonModule, JigsawLoadingModule} from "jigsaw/public_api";
import {ButtonAllComponent} from "./demo.component";
import {ButtonKeyComponent} from "./key/demo.component";
import {ButtonPrimaryComponent} from "./primary/demo.component";
import {ButtonCommonComponent} from "./common/demo.component";
import {ButtonFunctionalComponent} from "./functional/demo.component";
import {ButtonIconComponent} from "./icon/demo.component";
import {ButtonIconTextComponent} from "./icon-text/demo.component";
import {ButtonLoadingComponent} from "./loading/demo.component";
import {ButtonDirectiveDemoComponent} from "./directive/demo.component";
import {ButtonTextDemoComponent} from "./text/demo.component";
import {ButtonLoginComponent} from "./login/demo.component";
import {ChartIconButtonDemoModule} from "../chart-icon/with-button/demo.module";
import {ButtonWithChartIconDemoComponent} from "./with-chart-icon/demo.component";

@NgModule({
    declarations: [
        ButtonAllComponent,
        ButtonKeyComponent,
        ButtonPrimaryComponent,
        ButtonCommonComponent,
        ButtonFunctionalComponent,
        ButtonIconComponent,
        ButtonIconTextComponent,
        ButtonLoadingComponent,
        ButtonDirectiveDemoComponent,
        ButtonTextDemoComponent,
        ButtonLoginComponent,
        ButtonWithChartIconDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawLoadingModule,
        ChartIconButtonDemoModule

    ]
})
export class ButtonDemoModule {
}
