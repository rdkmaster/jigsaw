import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTableModule, JigsawButtonModule, JigsawDialogModule} from "jigsaw/public_api";
import {TableAutoSaveDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule, JigsawButtonModule, JigsawDialogModule, DemoTemplateModule],
    declarations: [ TableAutoSaveDemoComponent],
    exports: [ TableAutoSaveDemoComponent ],
})
export class TableAutoSaveDemoModule {
}
