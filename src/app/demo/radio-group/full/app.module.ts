import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioFullComponent} from "./app.component";

@NgModule({
    declarations: [RadioFullComponent],
    bootstrap: [RadioFullComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioFullModule {

}
