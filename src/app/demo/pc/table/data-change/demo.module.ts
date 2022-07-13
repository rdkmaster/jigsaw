import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableDataChangeDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, DemoTemplateModule],
    declarations: [TableDataChangeDemoComponent],
    exports: [TableDataChangeDemoComponent]
})
export class TableDataChangeDemoModule {
}
