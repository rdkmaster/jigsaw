import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMenuModule, JigsawButtonBarModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {MenuOptionsDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawButtonBarModule,
        JigsawNumericInputModule
    ],
    declarations: [MenuOptionsDemo],
    exports: [MenuOptionsDemo]
})
export class MenuOptionsModule {
}