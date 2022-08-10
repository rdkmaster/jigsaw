import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule, JigsawHeaderModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {TagSelectableDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule, JigsawHeaderModule,
        JigsawButtonBarModule
    ],
    declarations: [TagSelectableDemoComponent],
    exports: [TagSelectableDemoComponent]
})
export class TagSelectableDemoModule {
}
