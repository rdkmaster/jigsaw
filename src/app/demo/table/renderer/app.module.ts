import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawSelectModule } from "jigsaw/component/select/select";
import { TableCellOption, TableRendererDemoComponent } from './app.component';
import { TableHeadIcon, TableHeadSelect } from "./table-renderer";
import {JigsawTable1Module} from "jigsaw/component/table1/table";

@NgModule({
    imports: [ JigsawTableModule, JigsawSelectModule ,JigsawTable1Module ],
    declarations: [ TableRendererDemoComponent, TableHeadSelect, TableHeadIcon, TableCellOption ],
    bootstrap: [ TableRendererDemoComponent ], // 这个是给plunker用的，不能去掉。
    entryComponents: [
        TableHeadSelect, TableHeadIcon, TableCellOption
    ]
})
export class TableRendererDemoModule {}
