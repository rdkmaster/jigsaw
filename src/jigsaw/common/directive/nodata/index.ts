import { NgModule } from "@angular/core";
import { JigsawNoDataDirective } from "./no-data";

@NgModule({
    declarations: [JigsawNoDataDirective],
    exports: [JigsawNoDataDirective]
})
export class JigsawNoDataModule {
}

export * from './no-data';
