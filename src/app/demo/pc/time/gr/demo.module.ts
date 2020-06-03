import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeGrComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [TimeGrComponent],
    exports: [TimeGrComponent]
})
export class TimeGrDemoModule {
}
