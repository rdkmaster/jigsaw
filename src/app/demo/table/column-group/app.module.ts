import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableColumnGroupDemoComponent} from './app.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnGroupDemoComponent],
    bootstrap: [TableColumnGroupDemoComponent]
})
export class TableColumnGroupDemoModule {
}
