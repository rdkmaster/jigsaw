import {NgModule} from "@angular/core";
import {JigsawMovable} from "./movable";

@NgModule({
    declarations: [JigsawMovable],
    exports: [JigsawMovable]
})
export class JigsawMovableModule {
}

export * from './movable';

