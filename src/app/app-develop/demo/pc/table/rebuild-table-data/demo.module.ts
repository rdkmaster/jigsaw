import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {JobCellRender, RebuildTableDataDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, CommonModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [RebuildTableDataDemoComponent, JobCellRender],
    exports: [RebuildTableDataDemoComponent]
})
export class RebuildTableDataDemoModule {
}
