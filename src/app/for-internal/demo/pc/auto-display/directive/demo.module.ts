import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawAutoDisplayModule, JigsawButtonModule, JigsawHeaderModule, JigsawTagModule } from "jigsaw/public_api";
import { JigsawAutoDisplayDirectiveDemoComponent } from "./demo.component";
// import { ConsoleDirective } from "./console.directive";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, JigsawAutoDisplayModule, JigsawButtonModule,
        JigsawTagModule],
    declarations: [JigsawAutoDisplayDirectiveDemoComponent],
    exports: [JigsawAutoDisplayDirectiveDemoComponent]
})
export class JigsawAutoDisplayDirectiveDemoModule { }
