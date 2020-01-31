import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RadioFullComponent {
    // demo1
    selectedCity = {name: "北京"};
    cities = [
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
    selectedGoods = {name: 'camera'};
    goodsList = [
        {
            logo: 'bicycle',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        {
            logo: 'camera',
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            logo: 'car',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
            disabled: true
        },
        {
            logo: 'futbol-o',
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            logo: 'book',
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            logo: 'puzzle-piece',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

