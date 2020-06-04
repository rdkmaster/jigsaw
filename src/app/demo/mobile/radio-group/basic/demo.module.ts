import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RadioBasicDemoComponent],
    exports: [RadioBasicDemoComponent],
    imports: [JigsawMobileRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioBasicDemoModule {

}
