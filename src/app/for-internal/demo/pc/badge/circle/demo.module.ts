import {NgModule} from "@angular/core";
import {JigsawBadgeModule, JigsawButtonModule, JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BadgeCircleDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeCircleDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawButtonModule
    ],
    exports: [BadgeCircleDemoComponent]
})
export class BadgeCircleDemoModule {
}
