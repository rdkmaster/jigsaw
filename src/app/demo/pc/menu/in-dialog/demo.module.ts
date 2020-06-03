import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawCollapseModule, JigsawDialogModule, JigsawButtonModule, JigsawSwitchModule,
    JigsawFloatModule, JigsawNumericInputModule, JigsawMenuModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MenuInDialogDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawCollapseModule,
        JigsawDialogModule, JigsawButtonModule, JigsawSwitchModule, JigsawFloatModule,
        JigsawNumericInputModule
    ],
    declarations: [MenuInDialogDemo],
    exports: [MenuInDialogDemo]
})
export class MenuInDialogDemoModule {
}
