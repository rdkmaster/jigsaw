import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawDialogModule, JigsawTableModule, PopupService} from "jigsaw/public_api";
import {TableDataWithPopupDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableDataWithPopupDemoComponent],
    exports: [TableDataWithPopupDemoComponent],
    providers: [PopupService],
})
export class TableDataWithPopupDemoModule {
}
