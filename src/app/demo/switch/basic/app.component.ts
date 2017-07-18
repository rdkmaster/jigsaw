import { Component } from "@angular/core";

@Component({
  templateUrl: './app.component.html'
})
export class SwitchBasicDemoComponent {
    public testSwitch(message:any){
        alert("switch message is: "+message);
    }
}

