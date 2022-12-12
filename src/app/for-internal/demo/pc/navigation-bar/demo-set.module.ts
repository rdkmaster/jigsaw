import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawNavigationBarBasicDemoModule } from "./basic/demo.module";
import { JigsawNavigationBarBasicDemoComponent } from "./basic/demo.component";
import { JigsawNavigationBarPrestDemoModule } from "./preset/demo.module";
import { JigsawNavigationBarPrestDemoComponent } from "./preset/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawNavigationBarBasicDemoComponent },
    { path: "preset", component: JigsawNavigationBarPrestDemoComponent },
    {
        desc: 'navigation-menu', url: '/pc/menu/navigation', path: ''
    },
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawNavigationBarBasicDemoModule, JigsawNavigationBarPrestDemoModule]
})
export class NavigationBarDemoModule { }
