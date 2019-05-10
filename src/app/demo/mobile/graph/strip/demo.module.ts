import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {StripGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [StripGraphComponent],
    exports: [StripGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class StripGraphModule {

}
