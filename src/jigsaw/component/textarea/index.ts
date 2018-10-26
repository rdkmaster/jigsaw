import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { JigsawTextarea } from './textarea';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [JigsawTextarea],
    declarations: [JigsawTextarea],
    providers: [],
})
export class JigsawTextareaModule { }

export * from './textarea';
