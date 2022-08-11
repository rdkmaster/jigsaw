import {NgModule} from '@angular/core';
import {
    JigsawDateTimePickerModule,
    JigsawFloatModule,
    JigsawRangeDateTimePickerModule,
    JigsawTimePickerModule
} from "jigsaw/public_api";
import {WithFloatDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [
        JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawFloatModule, JigsawTimePickerModule,
        JigsawRangeDateTimePickerModule
    ],
    declarations: [WithFloatDemoComponent],
    exports: [WithFloatDemoComponent]
})
export class WithFloatDemoModule {
}
