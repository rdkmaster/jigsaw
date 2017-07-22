import {Component, OnInit, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2) {
    }

    jigsawTitle: string = 'jigsaw-title';

    ngOnInit(): void {
    }
}

