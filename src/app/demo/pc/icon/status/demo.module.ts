import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {IconStatusDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule
    ],
    declarations: [IconStatusDemoComponent],
    exports: [IconStatusDemoComponent]
})
export class IconStatusDemoModule {
}
