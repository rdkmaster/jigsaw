import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { AlertDemoComponent } from './demo.component';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawAlertModule, JigsawButtonModule, JigsawHeaderModule, JigsawCheckBoxModule } from "jigsaw/public_api";
import { AlertPopupDemoComponent } from "./popup/demo.component";
import { AlertInDomDemoComponent } from "./in-dom/demo.component";
import { CustomizeAlertDemoComponent } from "./customized/demo.component";
import { CustomizedAlert } from "./customized/customized-alert";

@NgModule({
    declarations: [
        AlertDemoComponent,
        AlertPopupDemoComponent,
        AlertInDomDemoComponent,
        CustomizeAlertDemoComponent,
        CustomizedAlert
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawAlertModule,
        JigsawButtonModule,
        JigsawHeaderModule,
        JigsawCheckBoxModule
    ]
})
export class AlertDemoModule {
}
