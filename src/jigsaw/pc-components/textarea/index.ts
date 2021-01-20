import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {JigsawTextarea, MaxlengthDirective} from './textarea';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [JigsawTextarea],
    declarations: [JigsawTextarea, MaxlengthDirective],
    providers: [],
})
export class JigsawTextareaModule {
}

export * from './textarea';
