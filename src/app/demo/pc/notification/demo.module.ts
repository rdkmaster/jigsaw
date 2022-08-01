import {NgModule} from "@angular/core";
import {NotificationDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawNotificationModule} from "../../../../jigsaw/pc-components/notification/notification";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {NotificationBasicDemoComponent} from "./basic/demo.component";
import {NotificationFunctionalDemoComponent} from "./functional/demo.component";
import {NotificationAdvancedDemoComponent} from "./advanced/demo.component";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {JigsawSliderModule} from "../../../../jigsaw/pc-components/slider";
import {JigsawRadioModule} from "../../../../jigsaw/pc-components/radio/radios";

@NgModule({
    declarations: [NotificationDemoComponent, NotificationBasicDemoComponent, NotificationFunctionalDemoComponent,
        NotificationAdvancedDemoComponent],
    imports: [JigsawMarkdownModule,    JigsawNotificationModule,
        JigsawDemoDescriptionModule, JigsawButtonModule, DemoTemplateModule, JigsawInputModule, JigsawSliderModule, JigsawRadioModule]
})
export class NotificationDemoModule {
}
