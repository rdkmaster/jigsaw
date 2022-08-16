import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {TableAddIDColumnDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule],
    declarations: [TableAddIDColumnDemoComponent],
    exports: [TableAddIDColumnDemoComponent]
})
export class TableAddIDColumnDemoModule {
}
