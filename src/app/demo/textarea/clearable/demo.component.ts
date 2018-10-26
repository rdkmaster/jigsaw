import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TextareaClearableDemoComponent {
    textareaValue: any;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTextarea.clearable',
    ];
}

