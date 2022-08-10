import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {UserComponent} from "./user-component/user-component";
import {FloatInitDataDemo} from "./demo.component";

@NgModule({
    declarations: [FloatInitDataDemo, UserComponent],
    exports: [FloatInitDataDemo],
    imports: [
        JigsawFloatModule, JigsawDemoDescriptionModule, CommonModule
    ]
})
export class FloatInitDataDemoModule {
}
