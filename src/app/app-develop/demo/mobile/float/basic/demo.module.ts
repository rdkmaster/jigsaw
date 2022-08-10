import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
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
