import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'textarea-max-length',
    templateUrl: './demo.component.html'
})
export class TextareaMaxLengthDemoComponent extends AsyncDescription {
    public demoPath = "demo/textarea/max-length";

    public _$includesCRLF: boolean = true;
    public _$value = '多行文本框';

    public _$valueChange($event: string): void {
        console.log(' input value: ', $event)
    }
}
