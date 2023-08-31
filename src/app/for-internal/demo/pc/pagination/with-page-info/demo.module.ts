import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawHeaderModule, JigsawPaginationModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {WithPagingInfoDemoComponent} from "./demo.component";

@NgModule({
    declarations: [WithPagingInfoDemoComponent],
    exports: [WithPagingInfoDemoComponent],
    imports: [JigsawPaginationModule, JigsawDemoDescriptionModule, JigsawHeaderModule, CommonModule]
})
export class WithPagingInfoDemoModule {
}
