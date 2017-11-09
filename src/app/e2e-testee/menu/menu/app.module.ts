import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MenuDemoComponent} from './app.component';
import {JigsawMenuModule} from "../../../../jigsaw/component/menu/menu.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawMenuModule
    ],
    declarations: [MenuDemoComponent],
    bootstrap: [MenuDemoComponent],
})
export class MenuFullDemoModule {
}
