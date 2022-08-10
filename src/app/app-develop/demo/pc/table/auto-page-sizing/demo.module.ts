import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonBarModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {TableAutoPageableDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawCheckBoxModule],
    declarations: [TableAutoPageableDemoComponent],
    exports: [TableAutoPageableDemoComponent]
})
export class TableAutoPageableDemoModule {
}
