import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {IconBasicDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [IconBasicDemoComponent],
    exports: [IconBasicDemoComponent]
})
export class IconBasicDemoModule {
}
