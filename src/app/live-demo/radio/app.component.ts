import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class RadioLiveDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    // demo1
    selectedCity = {name: "北京"};
    citys = [
        {name: "北京", id: "1"},
        {name: "上海", id: "2"},
        {name: "南京", id: "3"},
        {name: "深圳", id: "4"},
        {name: "长沙", id: "5"},
        {name: "西安", id: "6"}
    ];

    public radioChange(message: any) {
        console.log(`switch message is: ${message.name}`);
    }

    // demo2
    citys2 = ["北京", "上海", "南京", "深圳", "长沙", "西安"];
    selectedCity2 = "西安";

    // demo3
    selectedCity3 = {id: "3"};
    citys3 = [
        {name: "北京", id: "1", disabled: false},
        {name: "上海", id: "2", disabled: true},
        {name: "南京", id: "3", disabled: false},
        {name: "深圳", id: "4", disabled: false},
        {name: "长沙", id: "5", disabled: true},
        {name: "西安", id: "6", disabled: true}
    ];

}

