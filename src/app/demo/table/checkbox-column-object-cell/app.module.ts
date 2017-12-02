import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer],
    exports: [TableCheckboxColumnObjectCellDemoComponent],
    entryComponents: [TableCellObjectRenderer]
})
export class TableCheckboxColumnObjectCellDemoModule {
}
