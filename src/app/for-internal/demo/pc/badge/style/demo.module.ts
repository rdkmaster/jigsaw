import {NgModule} from "@angular/core";
import {JigsawBadgeModule, JigsawIconModule,} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BadgeStyleDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeStyleDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule
    ],
    exports: [BadgeStyleDemoComponent]
})
export class BadgeStyleDemoModule {
}
