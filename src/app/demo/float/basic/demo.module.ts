import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawFloatModule} from "jigsaw/directive/float";
import {FloatBasicDemo} from './demo.component';

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule
    ],
    declarations: [FloatBasicDemo],
    exports: [FloatBasicDemo]
})
export class FloatBasicModule {
}
