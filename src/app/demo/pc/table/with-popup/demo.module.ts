import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {PopupService} from "jigsaw/common/service/popup.service";
import {TableDataWithPopupDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableDataWithPopupDemoComponent],
    exports: [TableDataWithPopupDemoComponent],
    providers: [PopupService],
})
export class TableDataWithPopupDemoModule {
}
