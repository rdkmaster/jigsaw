import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioLabelFieldDemoComponent} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RadioLabelFieldDemoComponent],
    bootstrap: [RadioLabelFieldDemoComponent],
    imports: [JigsawRadioModule, CommonModule]
})
export class RadioLabelFieldDemoModule{

}
