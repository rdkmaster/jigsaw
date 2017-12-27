import {NgModule} from "@angular/core";
import {FlexDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawGridModule} from "jigsaw/component/grid/grid";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawBoxModule} from "jigsaw/component/box/box";

@NgModule({
    declarations: [FlexDemoComponent],
    exports: [FlexDemoComponent],
    imports: [JigsawGridModule, JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule]
})
export class FlexDemoModule {

}
