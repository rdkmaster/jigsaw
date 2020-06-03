import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BoxMiddleResizeLineDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxMiddleResizeLineDemoComponent],
    exports: [BoxMiddleResizeLineDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule]
})
export class BoxMiddleResizeLineDemoModule {

}
