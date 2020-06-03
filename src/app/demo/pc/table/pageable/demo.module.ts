import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule} from "jigsaw/public_api";
import {TablePageableDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [TablePageableDemoComponent],
    exports: [TablePageableDemoComponent]
})
export class TablePageableDemoModule {
}
