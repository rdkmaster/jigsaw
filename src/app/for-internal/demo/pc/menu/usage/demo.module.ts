import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawFloatModule, JigsawMenuModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {MenuUsageDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule,
        JigsawButtonModule, JigsawFloatModule,
    ],
    declarations: [MenuUsageDemo],
    exports: [MenuUsageDemo]
})
export class MenuUsageDemoModule {
}
