import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
import {UserComponent} from "./user-component/user-component";
import {FloatInitDataDemo} from "./demo.component";

@NgModule({
    declarations: [FloatInitDataDemo, UserComponent],
    exports: [FloatInitDataDemo],
    imports: [
        JigsawFloatModule, JigsawDemoDescriptionModule, CommonModule
    ],
    entryComponents: [UserComponent]
})
export class FloatInitDataDemoModule {
}
