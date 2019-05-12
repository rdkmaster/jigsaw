import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ArrayServerSidePaginationDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ArrayServerSidePaginationDemoComponent],
    exports: [ArrayServerSidePaginationDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule]
})
export class ArrayServerSidePaginationDemoModule {

}
