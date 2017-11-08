import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableSetHeaderSortDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableSetHeaderSortDemoComponent],
    bootstrap: [TableSetHeaderSortDemoComponent]
})
export class TableSetHeaderSortDemoModule {
}
