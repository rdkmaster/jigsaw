import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawButtonModule, JigsawLoadingModule } from "jigsaw/public_api";
import { ButtonAllComponent } from "./demo.component";
import { ButtonKeyComponent } from "./key/demo.component";
import { ButtonPrimaryComponent } from "./primary/demo.component";
import { ButtonCommonComponent } from "./common/demo.component";
import { ButtonFunctionalComponent } from "./functional/demo.component";
import { ButtonIconComponent } from "./icon/demo.component";
import { ButtonIconTextComponent } from "./icon-text/demo.component";
import { ButtonLoadingComponent } from "./loading/demo.component";
import { ButtonDirectiveDemoComponent } from "./directive/demo.component";
import { ButtonTextDemoComponent } from "./text/demo.component";
import { ButtonLoginComponent } from "./login/demo.component";
import { ButtonWithChartIconDemoComponent } from "./with-chart-icon/demo.component";
import { ChartIconDemoModule } from "../chart-icon/demo.module";

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
        ButtonWithChartIconDemoComponent,
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawLoadingModule,
        ChartIconDemoModule,

    ]
})
export class ButtonDemoModule {
}
