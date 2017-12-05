import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioTrackItemByDemoComponent} from "./app.component";

@NgModule({
    declarations: [RadioTrackItemByDemoComponent],
    exports: [RadioTrackItemByDemoComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioTrackItemByDemoModule {

}
