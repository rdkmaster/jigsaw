import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class IconIconsDemoComponent {

    public _$icons = ["fa-info", "fa-question", "fa-exclamation",
        "fa-search", "fa-plus", "fa-remove", "fa-edit", "fa-trash", "fa-check", "fa-save", "fa-pencil",
        "fa-angle-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-caret-up", "fa-caret-down", "fa-caret-left", "fa-caret-right",
        "fa-cloud-upload", "fa-exchange", "fa-code", "fa-expand", "fa-compress", "fa-columns", "fa-minus-square-o", "fa-circle"];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawIcon'
    ];
}
