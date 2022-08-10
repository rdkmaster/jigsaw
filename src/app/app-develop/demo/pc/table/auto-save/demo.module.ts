import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTableModule, JigsawButtonModule, JigsawDialogModule} from "jigsaw/public_api";
import {TableAutoSaveDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawDialogModule],
    declarations: [ TableAutoSaveDemoComponent],
    exports: [ TableAutoSaveDemoComponent ],
})
export class TableAutoSaveDemoModule {
}
