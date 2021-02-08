import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule} from "jigsaw/public_api";
import {TagSelectableDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule],
    declarations: [TagSelectableDemoComponent],
    exports: [TagSelectableDemoComponent]
})
export class TagSelectableDemoModule {
}
