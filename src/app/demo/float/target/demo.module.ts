import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawFloatModule} from "jigsaw/directive/float";
import {JigsawButtonBarModule} from "jigsaw/component/list-and-tile/button-bar";
import {UserComponent} from "./user-component/user-component";
import {FloatTargetDemo} from "./demo.component";

@NgModule({
    declarations: [FloatTargetDemo, UserComponent],
    exports: [FloatTargetDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, CommonModule
    ],
    entryComponents: [UserComponent]
})
export class FloatTargetDemoModule {
}
