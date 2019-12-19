import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {GraphDownloadDirectiveComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [GraphDownloadDirectiveComponent],
    exports: [GraphDownloadDirectiveComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class GraphDownloadDirectiveModule {

}
