import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FloatBasicDemo} from './demo.component';
import {JigsawFloatModule} from "../../../../jigsaw/directive/float";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule
    ],
    declarations: [FloatBasicDemo],
    exports: [FloatBasicDemo]
})
export class FloatBasicModule {
}
