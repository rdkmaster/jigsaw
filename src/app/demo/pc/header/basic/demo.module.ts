import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawHeaderBasicDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawHeaderBasicDemoComponent],
    exports: [JigsawHeaderBasicDemoComponent]
})
export class JigsawHeaderBasicDemoModule {}
