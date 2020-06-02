import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TreeTableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, CommonModule, JigsawDemoDescriptionModule,
    ],
    declarations: [TreeTableDemoComponent],
    exports: [TreeTableDemoComponent]
})
export class TreeTableDemoModule {
}
