import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: './app.component.html'
})
export class LayoutBasicDemoComponent {
    constructor(public http: HttpClient){
        //http.get('',{params: {'a': '1', 'b': {}}})
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

