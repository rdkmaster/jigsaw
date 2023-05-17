import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxHiddenDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxHiddenDemoComponent],
    exports: [BoxHiddenDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule, JigsawHeaderModule, JigsawButtonModule]
})
export class BoxHiddenDemoModule {

}
