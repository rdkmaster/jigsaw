import {NgModule} from "@angular/core";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RadioBasicDemoComponent],
    exports: [RadioBasicDemoComponent],
    imports: [JigsawMobileRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioBasicDemoModule {

}
