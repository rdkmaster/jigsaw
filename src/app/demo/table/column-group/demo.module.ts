import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableColumnGroupDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnGroupDemoComponent],
    exports: [TableColumnGroupDemoComponent]
})
export class TableColumnGroupDemoModule {
}
