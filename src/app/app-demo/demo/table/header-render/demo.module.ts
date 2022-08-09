import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {TableSetHeaderRenderDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule],
    declarations: [TableSetHeaderRenderDemoComponent],
    exports: [TableSetHeaderRenderDemoComponent]
})
export class TableSetHeaderRenderDemoModule {
}
