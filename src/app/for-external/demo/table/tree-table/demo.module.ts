import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";

import {TreeTableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, CommonModule,  JigsawPaginationModule, JigsawButtonModule, JigsawHeaderModule
    ],
    declarations: [TreeTableDemoComponent],
    exports: [TreeTableDemoComponent]
})
export class TreeTableDemoModule {
}
