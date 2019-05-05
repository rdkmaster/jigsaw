import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableContentWidthDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableContentWidthDemoComponent],
    exports: [TableContentWidthDemoComponent]
})
export class TableContentWidthDemoModule {
}
