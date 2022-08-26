import {NgModule} from "@angular/core";
import {JigsawRibbonDirective} from "./ribbon";

@NgModule({
    declarations: [JigsawRibbonDirective],
    exports: [JigsawRibbonDirective]
})
export class JigsawRibbonModule {
}

export * from './ribbon';
