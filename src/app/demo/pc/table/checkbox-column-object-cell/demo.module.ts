import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/pc-components/table/table-renderer";
import {TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer],
    exports: [TableCheckboxColumnObjectCellDemoComponent],
    entryComponents: [TableCellObjectRenderer, TableCellCheckboxRenderer, TableHeadCheckboxRenderer]
})
export class TableCheckboxColumnObjectCellDemoModule {
}
