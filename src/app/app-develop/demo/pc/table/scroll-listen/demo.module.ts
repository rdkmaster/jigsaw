import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/public_api";
import {TableScrollListenDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, CommonModule],
    declarations: [TableScrollListenDemoComponent],
    exports: [TableScrollListenDemoComponent],
})
export class TableScrollListenDemoModule {
}
