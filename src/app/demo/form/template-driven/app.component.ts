import {Component} from "@angular/core";


@Component({
    templateUrl: 'app.component.html'
})
export class TemplateDrivenDemoComponent {
    firstName: string = 'jigsaw';
    remember: boolean = true;
    gender:object = null;

    formValue:any;

    submit(formValue) {
        console.log(formValue);
        this.formValue = formValue;
    }
}
