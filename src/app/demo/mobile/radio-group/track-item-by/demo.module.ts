import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioTrackItemByDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RadioTrackItemByDemoComponent],
    exports: [RadioTrackItemByDemoComponent],
    imports: [JigsawMobileRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioTrackItemByDemoModule {

}
