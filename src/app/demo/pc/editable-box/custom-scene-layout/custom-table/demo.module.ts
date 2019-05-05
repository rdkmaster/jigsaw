import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {CustomTableComponent} from './demo.component';
import {JigsawDroppableModule} from "jigsaw/common/directive/dragdrop/index";

@NgModule({
    imports: [JigsawTableModule, JigsawDroppableModule,],
    declarations: [CustomTableComponent],
    exports: [CustomTableComponent]
})
export class CustomTableModule {
}
