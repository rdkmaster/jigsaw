import {Component} from '@angular/core';
import {BadgeTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'badge-mask',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap jigsaw-icon {
            line-height: 1;
        }
    `]
})

export class BadgeMaskDemoComponent {
    public selectedLabel = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);


    public select($event) {
        console.log('badge click: ', $event);
    }

    public _$btn() {
        console.log('host click');
    }

    constructor(public text: BadgeTextService) {
    }
}
