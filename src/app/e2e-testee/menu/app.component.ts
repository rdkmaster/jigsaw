import {Component} from '@angular/core';
import {JigsawMenu,MenuData} from "../../../jigsaw/component/menu/menu";

@Component({
    templateUrl: './app.component.html'
})
export class MenuDemo {

    label:string;
    label_pop:string;

    menuData:MenuData[]=[
        {label: 'item1',icon:'edit'},
        {label: 'item2',icon:'edit'},
        {
            label: 'itessssssssssssssssssssssm3', children: [
            {label: 'item1',children:[{label:'ssss'}],icon:'edit'}, {label: 'item2'}
        ]
        }
    ];

    onMenu(info){
        this.label=info.label;
    }

    onclick(){
        JigsawMenu.show(this.menuData,(info)=>{this.label_pop=info.label});
    }

}
