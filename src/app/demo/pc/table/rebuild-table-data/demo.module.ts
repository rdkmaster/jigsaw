import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawPaginationModule} from "jigsaw/public_api";
import {JobCellRender, RebuildTableDataDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [RebuildTableDataDemoComponent, JobCellRender],
    exports: [RebuildTableDataDemoComponent],
    entryComponents: [JobCellRender]
})
export class RebuildTableDataDemoModule {
}
