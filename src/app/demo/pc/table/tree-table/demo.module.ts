import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TreeTableDemoComponent} from './demo.component';
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";

@NgModule({
    imports: [
        JigsawTableModule, CommonModule, JigsawDemoDescriptionModule, JigsawPaginationModule
    ],
    declarations: [TreeTableDemoComponent],
    exports: [TreeTableDemoComponent]
})
export class TreeTableDemoModule {
}
