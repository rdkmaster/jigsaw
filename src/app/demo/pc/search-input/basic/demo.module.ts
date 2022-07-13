import { NgModule } from "@angular/core";
import { SearchInputBasicDemoComponent } from "./demo.component";
import { JigsawSearchInputModule, JigsawHeaderModule } from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [SearchInputBasicDemoComponent],
    exports: [SearchInputBasicDemoComponent],
    imports: [JigsawSearchInputModule, JigsawHeaderModule, DemoTemplateModule]
})
export class SearchInputBasicDemoModule {}
