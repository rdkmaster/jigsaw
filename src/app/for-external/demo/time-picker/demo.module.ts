import { NgModule } from "@angular/core";
import { TimePickerDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { TimePickerBasicDemoComponent } from "./basic/demo.component";
import { JigsawButtonModule, JigsawTimePickerModule } from "jigsaw/public_api";
import { TimePickerGrDemoComponent } from "./gr/demo.component";
import { JigsawButtonBarModule } from "jigsaw/public_api";
import { TimePickerLimitDemoComponent } from "./limit/demo.component";
import { TimePickerStepDemoComponent } from "./step/demo.component";

@NgModule({
    declarations: [
        TimePickerDemoComponent,
        TimePickerBasicDemoComponent,
        TimePickerGrDemoComponent,
        TimePickerLimitDemoComponent,
        TimePickerStepDemoComponent
    ],
    imports: [
        JigsawMarkdownModule,
        JigsawTimePickerModule,
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawButtonModule,
        JigsawButtonBarModule
    ]
})
export class TimePickerDemoModule {
}
