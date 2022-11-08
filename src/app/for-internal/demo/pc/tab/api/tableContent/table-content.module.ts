import { NgModule } from '@angular/core';
import { JigsawPaginationModule, JigsawTableModule } from "jigsaw/public_api";
import { TableContentComponent } from './table-content';


@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule],
    declarations: [TableContentComponent]
})
export class TableContentModule { }
