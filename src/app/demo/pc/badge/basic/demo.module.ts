import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeBasicDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, JigsawButtonModule
    ],
    exports: [BadgeBasicDemoComponent]
})
export class BadgeBasicDemoModule {
}
