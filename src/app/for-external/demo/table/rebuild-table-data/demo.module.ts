import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {JobCellRender, RebuildTableDataDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, CommonModule,  JigsawButtonModule],
    declarations: [RebuildTableDataDemoComponent, JobCellRender],
    exports: [RebuildTableDataDemoComponent]
})
export class RebuildTableDataDemoModule {
}
