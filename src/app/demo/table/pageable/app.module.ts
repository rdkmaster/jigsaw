import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {TablePageableDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [TablePageableDemoComponent],
    bootstrap: [TablePageableDemoComponent]
})
export class TablePageableDemoModule {
}
