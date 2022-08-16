import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawSwitchModule} from "jigsaw/public_api";
import {TableSwitchRendererDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTableModule, CommonModule,  JigsawSwitchModule],
    declarations: [TableSwitchRendererDemoComponent],
    exports: [TableSwitchRendererDemoComponent]
})
export class TableSwitchRendererDemoModule {
}
