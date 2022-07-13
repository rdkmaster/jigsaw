import { NgModule } from "@angular/core";
import { SearchInputDisabledDemoComponent } from "./demo.component";
import { JigsawSearchInputModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [SearchInputDisabledDemoComponent],
    exports: [SearchInputDisabledDemoComponent],
    imports: [JigsawSearchInputModule, JigsawHeaderModule, JigsawSwitchModule, DemoTemplateModule]
})
export class SearchInputDisabledDemoModule {}
