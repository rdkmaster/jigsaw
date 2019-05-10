import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {IconBasicDemoComponent} from "./demo.component";
import {JigsawMobileIconModule} from "jigsaw/mobile-components/icon/icon";

@NgModule({
    imports: [
        JigsawMobileIconModule, CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [IconBasicDemoComponent],
    exports: [IconBasicDemoComponent]
})
export class IconBasicDemoModule {
}
