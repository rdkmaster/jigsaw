import { NgModule } from "@angular/core";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SearchInputShowBorderDemoComponent } from "./demo.component";
import { JigsawSearchInputModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";

@NgModule({
    declarations: [SearchInputShowBorderDemoComponent],
    exports: [SearchInputShowBorderDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawSearchInputModule, JigsawHeaderModule, JigsawSwitchModule]
})
export class SearchInputShowBorderDemoModule {}
