import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableSelectRowDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableSelectRowDemoComponent],
    exports: [TableSelectRowDemoComponent]
})
export class TableSelectRowDemoModule {
}
