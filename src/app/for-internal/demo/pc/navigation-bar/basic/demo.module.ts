import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawHeaderModule, JigsawNavigationBarModule } from "jigsaw/public_api";
import { JigsawNavigationBarBasicDemoComponent } from "./demo.component";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawNavigationBarModule, JigsawHeaderModule],
    declarations: [JigsawNavigationBarBasicDemoComponent],
    exports: [JigsawNavigationBarBasicDemoComponent]
})
export class JigsawNavigationBarBasicDemoModule { }
