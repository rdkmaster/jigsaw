import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TreeTableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, CommonModule, JigsawDemoDescriptionModule, JigsawPaginationModule, JigsawButtonModule
    ],
    declarations: [TreeTableDemoComponent],
    exports: [TreeTableDemoComponent]
})
export class TreeTableDemoModule {
}
