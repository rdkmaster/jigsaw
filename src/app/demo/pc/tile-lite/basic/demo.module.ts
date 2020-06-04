import {NgModule} from '@angular/core';
import {JigsawTileLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTileLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
