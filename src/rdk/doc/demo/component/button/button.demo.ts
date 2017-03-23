import {Component, OnInit, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ButtonComponent} from "../../../component/button/button";

@Component({
  selector: 'test-button',
  templateUrl: 'button.demo.html',
  styleUrls: []
})
export class TestButtonComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {

    }
}

@NgModule({
    declarations: [
        TestButtonComponent, ButtonComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    exports: [
        TestButtonComponent
    ],
    providers: []
})
export class TestButtonModule { }
