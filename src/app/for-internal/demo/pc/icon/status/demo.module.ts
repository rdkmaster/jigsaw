import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule, JigsawHeaderModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {IconStatusDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawNumericInputModule
    ],
    declarations: [IconStatusDemoComponent],
    exports: [IconStatusDemoComponent]
})
export class IconStatusDemoModule {
}
