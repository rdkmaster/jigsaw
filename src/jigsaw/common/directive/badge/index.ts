import {NgModule} from "@angular/core";
import {JigsawBadgeDirective} from "./badge";

@NgModule({
    declarations: [JigsawBadgeDirective],
    exports: [JigsawBadgeDirective]
})
export class JigsawBadgeModule {
}

export * from './badge';
