import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableSetCellClassDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableSetCellClassDemoComponent],
    exports: [TableSetCellClassDemoComponent]
})
export class TableSetCellClassDemoModule {
}
