import {Component} from "@angular/core";
import {JigsawTextarea} from "jigsaw/component/textarea";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TextareaDisabledComponent {

    enabled: boolean;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

