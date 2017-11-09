import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JigsawMenuComponent} from './menu.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [JigsawMenuComponent],
    exports: [JigsawMenuComponent]
})
export class JigsawMenuModule {
}
