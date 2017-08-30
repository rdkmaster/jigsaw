import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioTrackItemByDemoComponent} from "./app.component";
@NgModule({
    declarations: [RadioTrackItemByDemoComponent],
    bootstrap: [RadioTrackItemByDemoComponent],
    imports: [JigsawRadioModule]
})
export class RadioTrackItemByDemoModule{

}
