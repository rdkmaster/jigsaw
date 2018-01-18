import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableAddIDColumnDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAddIDColumnDemoComponent],
    exports: [TableAddIDColumnDemoComponent]
})
export class TableAddIDColumnDemoModule {
}
