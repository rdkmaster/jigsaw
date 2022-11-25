import { NgModule } from '@angular/core';
import { JigsawPaginationModule, JigsawTableModule, JigsawTabsModule } from "jigsaw/public_api";
import { TableInTabComponent } from './table-in-tab';


@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawTabsModule],
    declarations: [TableInTabComponent]
})
export class TableInTabModule { }
