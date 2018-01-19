import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableSetHeaderRenderDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableSetHeaderRenderDemoComponent],
    exports: [TableSetHeaderRenderDemoComponent]
})
export class TableSetHeaderRenderDemoModule {
}
