import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeGrComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [TimeGrComponent],
    exports: [TimeGrComponent]
})
export class TimeGrDemoModule {
}
