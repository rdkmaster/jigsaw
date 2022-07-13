import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {TablePageableDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, DemoTemplateModule, JigsawButtonBarModule,],
    declarations: [TablePageableDemoComponent],
    exports: [TablePageableDemoComponent]
})
export class TablePageableDemoModule {
}
