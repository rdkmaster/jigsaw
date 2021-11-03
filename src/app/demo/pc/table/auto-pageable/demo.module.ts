import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {TableAutoPageableDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule, JigsawButtonBarModule,],
    declarations: [TableAutoPageableDemoComponent],
    exports: [TableAutoPageableDemoComponent]
})
export class TableAutoPageableDemoModule {
}
