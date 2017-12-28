import {NgModule} from "@angular/core";
import {JustifyAndAlignDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawBoxModule} from "jigsaw/component/box/box";

@NgModule({
    declarations: [JustifyAndAlignDemoComponent],
    exports: [JustifyAndAlignDemoComponent],
    imports: [JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule]
})
export class JustifyAndAlignDemoModule {

}
