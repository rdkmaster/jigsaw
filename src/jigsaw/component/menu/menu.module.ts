import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {JigsawMenuComponent} from './menu.component';
import {JigsawListModule} from "../list-and-tile/list";

@NgModule({
    imports: [
        CommonModule,
        JigsawListModule,
        RouterModule
    ],
    declarations: [JigsawMenuComponent],
    exports: [JigsawMenuComponent]
})
export class JigsawMenuModule {
}
