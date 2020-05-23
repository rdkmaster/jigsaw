import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawCollapseModule, JigsawDialogModule, JigsawButtonModule, JigsawSwitchModule,
    JigsawFloatModule, JigsawNumericInputModule
} from 'jigsaw/public_api';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMenuModule} from "jigsaw/pc-components/menu";
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
