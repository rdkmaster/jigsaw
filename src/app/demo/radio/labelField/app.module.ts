import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioLabelFieldDemoComponent} from "./app.component";
@NgModule({
    declarations: [RadioLabelFieldDemoComponent],
    bootstrap: [RadioLabelFieldDemoComponent],
    imports: [JigsawRadioModule]
})
export class RadioLabelFieldDemoModule{

}
