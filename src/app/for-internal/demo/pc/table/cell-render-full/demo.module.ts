import {NgModule} from '@angular/core';
import {JigsawSwitchModule, JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TableCellRenderFullComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [TableCellRenderFullComponent],
    exports: [TableCellRenderFullComponent]
})
export class TableCellRenderFullDemoModule {
}
