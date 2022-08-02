import {Component} from "@angular/core";
import {TextareaTextService} from "../doc.service";

@Component({
    selector: 'textarea-max-length',
    templateUrl: './demo.component.html'
})
export class TextareaMaxLengthDemoComponent {
    public _$includesCRLF: boolean = true;
    public _$value = '多行文本框';

    public _$valueChange($event: string): void {
        console.log(' input value: ', $event)
    }

    constructor(public text: TextareaTextService) {
    }
}
