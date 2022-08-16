import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawDialogModule, JigsawTableModule, PopupService} from "jigsaw/public_api";
import {TableDataWithPopupDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawDialogModule, JigsawButtonModule, DemoTemplateModule],
    declarations: [TableDataWithPopupDemoComponent],
    exports: [TableDataWithPopupDemoComponent],
    providers: [PopupService],
})
export class TableDataWithPopupDemoModule {
}
