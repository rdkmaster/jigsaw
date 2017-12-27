import {NgModule} from "@angular/core";
import {BoxDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawBoxModule} from "jigsaw/component/box/box";

@NgModule({
    declarations: [BoxDemoComponent],
    exports: [BoxDemoComponent],
    imports: [JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule]
})
export class BoxDemoModule {

}
