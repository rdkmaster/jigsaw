import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxNgIfNgForDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxNgIfNgForDemoComponent],
    exports: [BoxNgIfNgForDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule, JigsawHeaderModule, JigsawButtonModule]
})
export class BoxNgIfNgForDemoModule {

}
