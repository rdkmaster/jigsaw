import { NgModule } from "@angular/core";
import { SearchInputDebounceDemoComponent } from "./demo.component";
import {
    JigsawSearchInputModule,
    JigsawHeaderModule,
    JigsawNumericInputModule,
    JigsawButtonModule
} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [SearchInputDebounceDemoComponent],
    exports: [SearchInputDebounceDemoComponent],
    imports: [
        JigsawSearchInputModule,
        JigsawHeaderModule,
        JigsawNumericInputModule,
        JigsawButtonModule,
        DemoTemplateModule
    ]
})
export class SearchInputDebounceDemoModule {}
