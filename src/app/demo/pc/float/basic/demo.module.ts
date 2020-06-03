import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
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
