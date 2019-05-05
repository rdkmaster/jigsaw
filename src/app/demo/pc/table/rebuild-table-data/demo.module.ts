import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JobCellRender, RebuildTableDataDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [RebuildTableDataDemoComponent, JobCellRender],
    exports: [RebuildTableDataDemoComponent],
    entryComponents: [JobCellRender]
})
export class RebuildTableDataDemoModule {
}
