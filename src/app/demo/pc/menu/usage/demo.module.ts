import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawFloatModule, JigsawMenuModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MenuUsageDemo} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule,
        JigsawButtonModule, JigsawFloatModule, DemoTemplateModule
    ],
    declarations: [MenuUsageDemo],
    exports: [MenuUsageDemo]
})
export class MenuUsageDemoModule {
}
