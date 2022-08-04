import {Component} from "@angular/core";
import {GraphTextService} from "./demo.service";

@Component({
    templateUrl: 'demo.component.html'
})
export class GraphDemoComponent{
    constructor( public text: GraphTextService) {
    }
}
