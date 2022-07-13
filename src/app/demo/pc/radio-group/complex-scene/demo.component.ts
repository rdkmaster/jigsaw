import {Component} from "@angular/core";
import {RadioTextService} from "../text.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: "complex-secne-radio",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})

export class RadioComplexSceneComponent {
    selectedGoods = {name: 'car'};
    goodsList = [
        {
            logo: 'e187',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        {
            logo: 'e2e7',
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            logo: 'e18a',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
            disabled: true
        },
        {
            logo: 'e534',
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            logo: 'e565',
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            logo: 'e6ca',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    public radioChange(message: any) {
        console.log(`switch message is: ${message.name}`);
    }

    constructor(public text: RadioTextService) {}

}
