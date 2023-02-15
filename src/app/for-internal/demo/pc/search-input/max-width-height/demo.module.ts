import { NgModule } from "@angular/core";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SearchInputMaxWidthDemoComponent } from "./demo.component";
import { JigsawSearchInputModule, JigsawHeaderModule, JigsawInputModule } from "jigsaw/public_api";

@NgModule({
    declarations: [SearchInputMaxWidthDemoComponent],
    exports: [SearchInputMaxWidthDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawSearchInputModule, JigsawHeaderModule, JigsawInputModule]
})
export class SearchInputMaxWidthDemoModule {}
