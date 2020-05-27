import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawCollapseModule, JigsawFloatModule} from 'jigsaw/public_api';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMenuModule} from "jigsaw/pc-components/menu";
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
