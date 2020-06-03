import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DomInnerDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DomInnerDemoComponent],
    exports: [DomInnerDemoComponent],
    imports: [JigsawLoadingModule, JigsawMobileButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class DomInnerDemoModule {

}
