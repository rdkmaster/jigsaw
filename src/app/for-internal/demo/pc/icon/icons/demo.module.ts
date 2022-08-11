import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {IconIconsDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [IconIconsDemoComponent],
    exports: [IconIconsDemoComponent]
})
export class IconIconsDemoModule {
}
