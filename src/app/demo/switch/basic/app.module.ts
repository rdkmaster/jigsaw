import { NgModule } from '@angular/core';
import { JigsawSwitchModule } from "jigsaw/component/switch/index";
import { SwitchBasicDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSwitchModule ],
    declarations: [ SwitchBasicDemoComponent ],
    bootstrap: [ SwitchBasicDemoComponent ]
})
export class SwitchBasicDemoModule {}
