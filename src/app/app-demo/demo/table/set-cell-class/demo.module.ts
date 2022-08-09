import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {TableSetCellClassDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule],
    declarations: [TableSetCellClassDemoComponent],
    exports: [TableSetCellClassDemoComponent]
})
export class TableSetCellClassDemoModule {
}
