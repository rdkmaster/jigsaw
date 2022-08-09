import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableDataFromAjaxDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, DemoTemplateModule],
    declarations: [TableDataFromAjaxDemoComponent],
    exports: [TableDataFromAjaxDemoComponent]
})
export class TableDataFromAjaxDemoModule {
}
