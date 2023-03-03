import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSwitchModule, JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TableCellRenderFullComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule],
    declarations: [TableCellRenderFullComponent],
    exports: [TableCellRenderFullComponent]
})
export class TableCellRenderFullDemoModule {
}
