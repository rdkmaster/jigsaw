import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawViewportModule} from "jigsaw/component/viewport/viewport";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BigRowDemoComponent} from './app.component';

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule, JigsawDemoDescriptionModule, JigsawViewportModule
    ],
    declarations: [
        BigRowDemoComponent,
    ],
    exports: [BigRowDemoComponent], // 这个是给plunker用的，不能去掉。
})
export class BigRowDemoModule {
}
