import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/public_api";
import {TableScrollListenDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTableModule,  CommonModule],
    declarations: [TableScrollListenDemoComponent],
    exports: [TableScrollListenDemoComponent],
})
export class TableScrollListenDemoModule {
}
