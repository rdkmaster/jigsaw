import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTagModule, JigsawButtonModule, JigsawInputModule} from "jigsaw/public_api";
import {TagAddRemoveDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [
        CommonModule, JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule,
        JigsawInputModule
    ],
    declarations: [TagAddRemoveDemoComponent],
    exports: [TagAddRemoveDemoComponent]
})
export class TagAddRemoveDemoModule {
}
