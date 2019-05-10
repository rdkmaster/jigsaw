import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
import {JigsawMobileButtonBarModule} from "jigsaw/mobile-components/list-and-tile/button-bar";
import {UserComponent} from "./user-component/user-component";
import {FloatTargetDemo} from "./demo.component";

@NgModule({
    declarations: [FloatTargetDemo, UserComponent],
    exports: [FloatTargetDemo],
    imports: [
        JigsawFloatModule, JigsawMobileRadioModule, JigsawDemoDescriptionModule, JigsawMobileButtonBarModule, CommonModule
    ],
    entryComponents: [UserComponent]
})
export class FloatTargetDemoModule {
}
