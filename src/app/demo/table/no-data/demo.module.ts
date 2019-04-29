import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableNoDataDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableNoDataDemoComponent],
    exports: [TableNoDataDemoComponent]
})
export class TableNoDataDemoModule {
}
