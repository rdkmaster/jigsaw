import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProcessStatusModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ProcessStatusCustomIconsComponent} from "./demo.component";

@NgModule({
    imports: [CommonModule, JigsawProcessStatusModule, JigsawDemoDescriptionModule],
    declarations: [ProcessStatusCustomIconsComponent],
    exports: [ProcessStatusCustomIconsComponent]

})
export class ProcessStatusCustomIconsModule {

}
