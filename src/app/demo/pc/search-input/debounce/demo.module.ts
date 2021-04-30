import { NgModule } from "@angular/core";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { SearchInputDebounceDemoComponent } from "./demo.component";
import {
    JigsawSearchInputModule,
    JigsawHeaderModule,
    JigsawNumericInputModule,
    JigsawButtonModule
} from "jigsaw/public_api";

@NgModule({
    declarations: [SearchInputDebounceDemoComponent],
    exports: [SearchInputDebounceDemoComponent],
    imports: [
        JigsawDemoDescriptionModule,
        JigsawSearchInputModule,
        JigsawHeaderModule,
        JigsawNumericInputModule,
        JigsawButtonModule
    ]
})
export class SearchInputDebounceDemoModule {}
