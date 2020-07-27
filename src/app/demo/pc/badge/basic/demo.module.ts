import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeBasicDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule
    ],
    exports: [BadgeBasicDemoComponent]
})
export class BadgeBasicDemoModule {
}
