import {NgModule} from '@angular/core';
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTileLiteModule} from "jigsaw/component/list-and-tile/tile-lite";
import {JigsawSwitchModule} from "../../../../jigsaw/component/switch";

@NgModule({
    imports: [JigsawTileLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
