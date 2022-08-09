import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {MyTableCellOption, MyTableHeadOption, TableAddColumnDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule],
    declarations: [TableAddColumnDemoComponent, MyTableHeadOption, MyTableCellOption],
    exports: [TableAddColumnDemoComponent]
})
export class TableAddColumnDemoModule {
}
