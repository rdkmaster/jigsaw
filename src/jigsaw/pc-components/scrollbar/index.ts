import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {JigsawScrollbar, JigsawScrollHandle} from './scrollbar';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [JigsawScrollbar],
    declarations: [JigsawScrollbar,JigsawScrollHandle],
    providers: [],
})
export class JigsawScrollbarModule { }

export * from './scrollbar';
