import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {BigTableDataDemoComponent} from './app.component';

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule, JigsawDemoDescriptionModule
    ],
    declarations: [
        BigTableDataDemoComponent,
    ],
    bootstrap: [BigTableDataDemoComponent], // 这个是给plunker用的，不能去掉。
})
export class BigTableDataDemoModule {
}
