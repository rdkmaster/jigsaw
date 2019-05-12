import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioFullComponent} from "./demo.component";

@NgModule({
    declarations: [RadioFullComponent],
    exports: [RadioFullComponent],
    imports: [JigsawMobileRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioFullModule {

}
