import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableDataChangeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableDataChangeDemoComponent],
    exports: [TableDataChangeDemoComponent]
})
export class TableDataChangeDemoModule {
}
