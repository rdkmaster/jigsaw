import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule, JigsawFloatModule, JigsawMobileButtonBarModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {UserComponent} from "./user-component/user-component";
import {FloatTargetDemo} from "./demo.component";

@NgModule({
    declarations: [FloatTargetDemo, UserComponent],
    exports: [FloatTargetDemo],
    imports: [
        JigsawFloatModule, JigsawMobileRadioModule, JigsawDemoDescriptionModule, JigsawMobileButtonBarModule, CommonModule
    ]
})
export class FloatTargetDemoModule {
}
