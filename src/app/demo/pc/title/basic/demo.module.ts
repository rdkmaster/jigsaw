import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawTitleModule } from "jigsaw/public_api";
import { JigsawTitleBasicDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawTitleModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawTitleBasicDemoComponent],
    exports: [JigsawTitleBasicDemoComponent]
})
export class JigsawTitleBasicDemoModule {}
