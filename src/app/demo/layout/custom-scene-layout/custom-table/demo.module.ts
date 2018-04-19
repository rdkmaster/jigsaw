import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {CustomTableComponent} from './demo.component';
import {JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";

@NgModule({
    imports: [JigsawTableModule, JigsawDroppableModule,],
    declarations: [CustomTableComponent],
    exports: [CustomTableComponent]
})
export class CustomTableModule {
}
