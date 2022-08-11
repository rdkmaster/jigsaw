import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {TablePageableDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule, JigsawButtonBarModule,],
    declarations: [TablePageableDemoComponent],
    exports: [TablePageableDemoComponent]
})
export class TablePageableDemoModule {
}
