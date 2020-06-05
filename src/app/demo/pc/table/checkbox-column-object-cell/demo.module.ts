import {NgModule} from '@angular/core';
import {JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/public_api";
import {TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer],
    exports: [TableCheckboxColumnObjectCellDemoComponent]
})
export class TableCheckboxColumnObjectCellDemoModule {
}
