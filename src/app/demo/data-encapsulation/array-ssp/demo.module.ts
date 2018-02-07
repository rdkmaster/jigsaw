import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ArrayServerSidePaginationDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ArrayServerSidePaginationDemoComponent],
    exports: [ArrayServerSidePaginationDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class ArrayServerSidePaginationDemoModule {

}
