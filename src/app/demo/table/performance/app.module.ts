import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TablePerformsDemoComponent} from './app.component';
import {TableHeadIcon} from "./table-renderer";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TablePerformsDemoComponent, TableHeadIcon],
    bootstrap: [TablePerformsDemoComponent],
    entryComponents: [TableHeadIcon]
})
export class TablePerformsDemoModule {
}
