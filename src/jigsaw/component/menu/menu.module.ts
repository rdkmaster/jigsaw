import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JigsawMenuComponent} from './menu.component';
import {JigsawListModule} from "../list-and-tile/list";

@NgModule({
    imports: [
        CommonModule,
        JigsawListModule
    ],
    declarations: [JigsawMenuComponent],
    exports: [JigsawMenuComponent]
})
export class JigsawMenuModule {
}
