import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {RadioTrackItemByDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RadioTrackItemByDemoComponent],
    exports: [RadioTrackItemByDemoComponent],
    imports: [JigsawMobileRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioTrackItemByDemoModule {

}
