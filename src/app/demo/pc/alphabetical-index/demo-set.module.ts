import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawIndexBasicDemoModule } from "./basic/demo.module";
import { JigsawIndexBasicDemoComponent } from "./basic/demo.component";
import { JigsawAlphabeticalIndexSelectDemoComponent } from './alphabetical-index-select/demo.component';
import { JigsawAlphabeticalIndexSelectDemoModule } from './alphabetical-index-select/demo.module';

export const routerConfig = [
    { path: "basic", component: JigsawIndexBasicDemoComponent },
    { path: "alphabetical-index-select", component: JigsawAlphabeticalIndexSelectDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawIndexBasicDemoModule, JigsawAlphabeticalIndexSelectDemoModule]
})
export class IndexDemoModule { }
