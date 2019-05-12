import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioFullComponent} from "./demo.component";

@NgModule({
    declarations: [RadioFullComponent],
    exports: [RadioFullComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioFullModule {

}
