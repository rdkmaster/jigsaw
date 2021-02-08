import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeMaxValueDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeMaxValueDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule
    ],
    exports: [BadgeMaxValueDemoComponent]
})
export class BadgeMaxValueDemoModule {
}
