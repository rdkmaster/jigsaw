import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileIconModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {IconBasicDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMobileIconModule, CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [IconBasicDemoComponent],
    exports: [IconBasicDemoComponent]
})
export class IconBasicDemoModule {
}
