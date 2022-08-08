import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTableModule, JigsawButtonModule, JigsawDialogModule} from "jigsaw/public_api";
import {TableAutoSaveDemoComponent} from './demo.component';


@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule,  JigsawButtonModule, JigsawDialogModule],
    declarations: [ TableAutoSaveDemoComponent],
    exports: [ TableAutoSaveDemoComponent ],
})
export class TableAutoSaveDemoModule {
}
