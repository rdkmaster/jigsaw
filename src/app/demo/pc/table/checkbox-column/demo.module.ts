import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/public_api";
import {TableAddCheckboxColumnDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableAddCheckboxColumnDemoComponent],
    exports: [TableAddCheckboxColumnDemoComponent]
})
export class TableAddCheckboxColumnDemoModule {
}
