import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {WithPagingInfoDemoComponent} from "./demo.component";

@NgModule({
    declarations: [WithPagingInfoDemoComponent],
    exports: [WithPagingInfoDemoComponent],
    imports: [JigsawPaginationModule, JigsawDemoDescriptionModule, CommonModule]
})
export class WithPagingInfoDemoModule {

}
