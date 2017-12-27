import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableScrollListenDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, CommonModule],
    declarations: [TableScrollListenDemoComponent],
    exports: [TableScrollListenDemoComponent],
})
export class TableScrollListenDemoModule {
}
