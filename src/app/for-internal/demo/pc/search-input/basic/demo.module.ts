import { NgModule } from "@angular/core";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SearchInputBasicDemoComponent } from "./demo.component";
import { JigsawSearchInputModule, JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [SearchInputBasicDemoComponent],
    exports: [SearchInputBasicDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawSearchInputModule, JigsawHeaderModule]
})
export class SearchInputBasicDemoModule {}
