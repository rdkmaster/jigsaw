import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";
import {TablePageableReadyDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [TablePageableReadyDemoComponent],
    exports: [TablePageableReadyDemoComponent]
})
export class TablePageableReadyDemoModule {
}
