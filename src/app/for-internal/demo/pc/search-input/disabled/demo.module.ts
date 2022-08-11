import { NgModule } from "@angular/core";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SearchInputDisabledDemoComponent } from "./demo.component";
import { JigsawSearchInputModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";

@NgModule({
    declarations: [SearchInputDisabledDemoComponent],
    exports: [SearchInputDisabledDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawSearchInputModule, JigsawHeaderModule, JigsawSwitchModule]
})
export class SearchInputDisabledDemoModule {}
