import {Component} from "@angular/core";
import {NavigationMenuTextService} from "./doc.service";


@Component({
    templateUrl: './demo.component.html',
})
export class NavigationMenuAllDemoComponent {
constructor(public doc: NavigationMenuTextService) {
}
}
