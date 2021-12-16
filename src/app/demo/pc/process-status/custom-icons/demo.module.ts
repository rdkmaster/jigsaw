import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProcessStatusModule} from "jigsaw/public_api";
import {ProcessStatusCustomIconsComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "../../../../demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawProcessStatusModule, JigsawDemoDescriptionModule],
    declarations: [ProcessStatusCustomIconsComponent],
    exports: [ProcessStatusCustomIconsComponent]

})
export class ProcessStatusCustomIconsModule {

}
