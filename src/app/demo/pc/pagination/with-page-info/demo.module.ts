import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawPaginationModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {WithPagingInfoDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [WithPagingInfoDemoComponent],
    exports: [WithPagingInfoDemoComponent],
    imports: [JigsawPaginationModule, JigsawDemoDescriptionModule, CommonModule, DemoTemplateModule]
})
export class WithPagingInfoDemoModule {

}
