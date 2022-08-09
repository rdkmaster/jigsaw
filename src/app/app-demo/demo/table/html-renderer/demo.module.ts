import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/public_api";
import {TableHtmlRendererDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTableModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TableHtmlRendererDemoComponent],
    exports: [TableHtmlRendererDemoComponent]
})
export class TableHtmlRendererDemoModule {
}
