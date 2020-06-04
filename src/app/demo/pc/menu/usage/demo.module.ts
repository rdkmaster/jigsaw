import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawCollapseModule, JigsawFloatModule, JigsawMenuModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MenuUsageDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawCollapseModule,
        JigsawButtonModule, JigsawFloatModule,
    ],
    declarations: [MenuUsageDemo],
    exports: [MenuUsageDemo]
})
export class MenuUsageDemoModule {
}
