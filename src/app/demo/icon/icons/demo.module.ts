import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {IconIconsDemoComponent} from "./demo.component";
import {JigsawIconModule} from "jigsaw/component/icon/icon";
import {JigsawBoxModule} from "../../../../jigsaw/component/box";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule, JigsawBoxModule
    ],
    declarations: [IconIconsDemoComponent],
    exports: [IconIconsDemoComponent]
})
export class IconIconsDemoModule {
}
