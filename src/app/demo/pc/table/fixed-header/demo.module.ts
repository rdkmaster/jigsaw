import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableFixedHeadDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableFixedHeadDemoComponent],
    exports: [TableFixedHeadDemoComponent]
})
export class TableFixedHeadDemoModule {
}
