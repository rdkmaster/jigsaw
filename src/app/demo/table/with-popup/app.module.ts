import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {PopupService} from "jigsaw/service/popup.service";
import {TableDataWithPopupDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableDataWithPopupDemoComponent],
    exports: [TableDataWithPopupDemoComponent],
    providers: [PopupService],
})
export class TableDataWithPopupDemoModule {
}
