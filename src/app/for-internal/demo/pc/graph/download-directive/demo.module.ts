import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule, JigsawButtonModule} from "jigsaw/public_api";
import {GraphDownloadDirectiveComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [GraphDownloadDirectiveComponent],
    exports: [GraphDownloadDirectiveComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawButtonModule]
})
export class GraphDownloadDirectiveModule {

}
