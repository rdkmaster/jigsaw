import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawCollapseModule, JigsawDialogModule, JigsawButtonModule, JigsawSwitchModule,
    JigsawFloatModule, JigsawNumericInputModule, JigsawMenuModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MenuInDialogDemo} from "./demo.component";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawCollapseModule,
        JigsawDialogModule, JigsawButtonModule, JigsawSwitchModule, JigsawFloatModule,
        JigsawNumericInputModule, PerfectScrollbarModule, DemoTemplateModule
    ],
    declarations: [MenuInDialogDemo],
    exports: [MenuInDialogDemo]
})
export class MenuInDialogDemoModule {
}
