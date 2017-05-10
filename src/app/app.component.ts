import {Component, OnInit, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2) {
    }

    ngOnInit(): void {
    }
}

