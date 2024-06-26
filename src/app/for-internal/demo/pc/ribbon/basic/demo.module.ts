import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import {
    JigsawButtonBarModule,
    JigsawColorSelectModule,
    JigsawInputModule,
    JigsawNumericInputModule,
    JigsawRibbonModule, JigsawSwitchModule
} from "jigsaw/public_api";
import { JigsawRibbonBasicDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawRibbonModule, CommonModule, JigsawDemoDescriptionModule,JigsawNumericInputModule,JigsawInputModule,JigsawColorSelectModule,JigsawButtonBarModule, JigsawSwitchModule],
    declarations: [JigsawRibbonBasicDemoComponent],
    exports: [JigsawRibbonBasicDemoComponent, ]
})
export class JigsawHeaderBasicDemoModule { }
