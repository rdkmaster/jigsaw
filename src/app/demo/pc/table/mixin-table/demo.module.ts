import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/public_api";
import {MixinTable, TableMixinTableDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TableMixinTableDemoComponent, MixinTable],
    exports: [TableMixinTableDemoComponent]
})
export class TableMixinTableDemoModule {
}
