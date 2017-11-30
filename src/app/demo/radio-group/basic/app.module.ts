import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioBasicDemoComponent} from "./app.component";

@NgModule({
    declarations: [RadioBasicDemoComponent],
    bootstrap: [RadioBasicDemoComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioBasicDemoModule {

}
