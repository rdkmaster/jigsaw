import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {CustomTableComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule],
    declarations: [CustomTableComponent],
    exports: [CustomTableComponent]
})
export class CustomTableModule {
}
