import {NgModule} from "@angular/core";
import {DataEncapsulationDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../libs/markdown/markdown";

@NgModule({
    declarations: [DataEncapsulationDemoComponent],
    imports: [JigsawMarkdownModule]
})
export class DataEncapsulationDemoModule {
}
