import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonBarModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {TableAutoPageableDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule,  JigsawButtonBarModule, JigsawCheckBoxModule],
    declarations: [TableAutoPageableDemoComponent],
    exports: [TableAutoPageableDemoComponent]
})
export class TableAutoPageableDemoModule {
}
