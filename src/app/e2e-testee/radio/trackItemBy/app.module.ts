import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioTrackItemByDemoComponent} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RadioTrackItemByDemoComponent],
    bootstrap: [RadioTrackItemByDemoComponent],
    imports: [JigsawRadioModule, CommonModule]
})
export class RadioTrackItemByDemoModule{

}
