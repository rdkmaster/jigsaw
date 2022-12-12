import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawButtonBarModule, JigsawHeaderModule, JigsawNavigationBarModule } from "jigsaw/public_api";
import { JigsawNavigationBarPrestDemoComponent } from "./demo.component";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawNavigationBarModule, JigsawHeaderModule, JigsawButtonBarModule],
    declarations: [JigsawNavigationBarPrestDemoComponent],
    exports: [JigsawNavigationBarPrestDemoComponent]
})
export class JigsawNavigationBarPrestDemoModule { }
