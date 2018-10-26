import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {JigsawTextarea} from './textarea';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [JigsawTextarea],
    declarations: [JigsawTextarea],
    providers: [],
})
export class JigsawTextareaModule {
}

export * from './textarea';
