import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ArrayServerSidePaginationDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ArrayServerSidePaginationDemoComponent],
    exports: [ArrayServerSidePaginationDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule]
})
export class ArrayServerSidePaginationDemoModule {

}
