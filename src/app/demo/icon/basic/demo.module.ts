import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {IconBasicDemoComponent} from "./demo.component";
import {JigsawIconModule} from "jigsaw/component/icon/icon";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [IconBasicDemoComponent],
    exports: [IconBasicDemoComponent]
})
export class IconBasicDemoModule {
}
