import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer],
    exports: [TableCheckboxColumnObjectCellDemoComponent],
    entryComponents: [TableCellObjectRenderer, TableCellCheckboxRenderer, TableHeadCheckboxRenderer]
})
export class TableCheckboxColumnObjectCellDemoModule {
}
