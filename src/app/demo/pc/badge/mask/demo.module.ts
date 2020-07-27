import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeMaskDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeMaskDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule
    ],
    exports: [BadgeMaskDemoComponent]
})
export class BadgeMaskDemoModule {
}
