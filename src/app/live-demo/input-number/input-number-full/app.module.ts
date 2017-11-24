import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberFullComponent } from './app.component';
import { JigsawInputNumberModule } from "../../../../jigsaw/component/input-number/input-number.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawInputNumberModule
    ],
    declarations: [InputNumberFullComponent],
    bootstrap: [ InputNumberFullComponent ],
})
export class InputNumberFullModule {
}
