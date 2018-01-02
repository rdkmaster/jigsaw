import {NgModule} from "@angular/core";
import {BoxJustifyDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawBoxModule} from "jigsaw/component/box/box";

@NgModule({
    declarations: [BoxJustifyDemoComponent],
    exports: [BoxJustifyDemoComponent],
    imports: [JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule]
})
export class BoxJustifyDemoModule {

}
