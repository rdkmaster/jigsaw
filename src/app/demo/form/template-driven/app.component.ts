import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
    templateUrl: 'app.component.html'
})
export class TemplateDrivenDemoComponent {
    firstName: string = 'jigsaw';
    remember: boolean = true;
    formValue:any;

    submit(formValue) {
        console.log(formValue);
        this.formValue = formValue;
    }
}
