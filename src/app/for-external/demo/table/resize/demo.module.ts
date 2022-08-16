import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableResizeDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTableModule,  JigsawButtonModule],
    declarations: [TableResizeDemoComponent],
    exports: [TableResizeDemoComponent],
})
export class TableResizeDemoModule {
}
