import {NgModule} from "@angular/core";
import {JigsawBadgeModule, JigsawButtonModule, JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {BadgeMaskDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeMaskDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawButtonModule
    ],
    exports: [BadgeMaskDemoComponent]
})
export class BadgeMaskDemoModule {
}
