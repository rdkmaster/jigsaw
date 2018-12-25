import {NgModule} from "@angular/core";
import {JigsawFloat} from "./float";


@NgModule({
    declarations: [JigsawFloat],
    exports: [JigsawFloat]
})
export class JigsawFloatModule {
}

export * from './float';

