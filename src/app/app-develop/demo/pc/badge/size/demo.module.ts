import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {BadgeSizeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeSizeDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule
    ],
    exports: [BadgeSizeDemoComponent]
})
export class BadgeSizeDemoModule {
}
