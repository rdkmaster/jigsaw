import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FloatBasicComponent} from './demo.component';
import {JigsawFloatModule} from "../../../../jigsaw/directive/float";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule
    ],
    declarations: [FloatBasicComponent],
    exports: [FloatBasicComponent]
})
export class FloatBasicModule {
}
