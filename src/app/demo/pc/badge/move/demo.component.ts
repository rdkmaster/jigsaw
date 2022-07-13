import {Component, ViewChild, Renderer2, ElementRef} from "@angular/core";
import {BadgeTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'move-badge',
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BadgeMoveDemoComponent {
    @ViewChild('target', {read: ElementRef})
    target: ElementRef;

    public selectedLabel = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);

    public offsetLeft: number = 40;
    public offsetTop: number = 381;

    constructor(public _renderer: Renderer2, public text: BadgeTextService, private router: Router) {
    }

    updateStyle(style: string, value: string) {
        if (!this.target) {
            return;
        }
        this._renderer.setStyle(this.target.nativeElement, style, value);
    }

    updateHandler() {
        this.offsetLeft = this.target.nativeElement.offsetLeft;
        this.offsetTop = this.target.nativeElement.offsetTop;
    }

    nav() {
        this.router.navigate(['/pc/badge/move'])
    }
}
