import { NgModule } from "@angular/core";
import { JigsawTextareaModule, JigsawHeaderModule } from "jigsaw/public_api";
import { TextareaResizeDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";

@NgModule({
    declarations: [TextareaResizeDemoComponent],
    exports: [TextareaResizeDemoComponent],
    imports: [
        JigsawTextareaModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule
    ]
})
export class TextareaResizeDemoModule {}
