import { NgModule } from "@angular/core";
import { NotificationDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawButtonModule, JigsawNotificationModule, JigsawInputModule, JigsawSliderModule, JigsawRadioModule } from "jigsaw/public_api";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { NotificationBasicDemoComponent } from "./basic/demo.component";
import { NotificationFunctionalDemoComponent } from "./functional/demo.component";
import { NotificationAdvancedDemoComponent } from "./advanced/demo.component";

@NgModule({
    declarations: [
        NotificationDemoComponent,
        NotificationBasicDemoComponent,
        NotificationFunctionalDemoComponent,
        NotificationAdvancedDemoComponent
    ],
    imports: [
        JigsawMarkdownModule,
        JigsawNotificationModule,
        JigsawButtonModule,
        DemoTemplateModule,
        DocTemplateModule,
        JigsawInputModule,
        JigsawSliderModule,
        JigsawRadioModule
    ]
})
export class NotificationDemoModule {
}
