import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";
import {UserComponent} from "./user-component/user-component";
import {FloatTargetDemo} from "./demo.component";

@NgModule({
    declarations: [FloatTargetDemo, UserComponent],
    exports: [FloatTargetDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, CommonModule
    ]
})
export class FloatTargetDemoModule {
}
