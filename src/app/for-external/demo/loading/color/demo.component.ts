import { Component } from '@angular/core';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'loading-color',
    templateUrl: './demo.component.html'
})
export class LoadingColorDemoComponent extends AsyncDescription {
    public demoPath = "demo/loading/color";

}
