import { Component } from "@angular/core";

@Component({
  templateUrl: 'basic.html'
})
export class TimeBasicDemoComponent {
    public dateChange(message:any){
        console.log("switch message is: "+message);
    }
}

