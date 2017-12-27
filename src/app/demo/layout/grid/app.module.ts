import {NgModule} from "@angular/core";
import {GridFullDemoComponent, OneLayoutComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawGridModule} from "jigsaw/component/grid/grid";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [GridFullDemoComponent, OneLayoutComponent],
    exports: [GridFullDemoComponent],
    imports: [JigsawGridModule, JigsawDemoDescriptionModule, CommonModule]
})
export class GridFullDemoModule {

}
