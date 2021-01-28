import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GroupOptionValue, JigsawListLite, ArrayCollection, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ListLiteBasicDemoComponent {
    goodsList: GroupOptionValue[] = [
        {
            logo: 'e187',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        JigsawListLite.SEPARATOR, // 配置分隔线
        {
            logo: 'e2e7',
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            logo: 'e18a',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
            disabled: true // 配置不可点击
        },
        {
            logo: 'e534',
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        JigsawListLite.SEPARATOR,
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

    goodsArrayList = ['bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece'];

    selectedItems1: string;
    selectedItems2: string;
    selectedItems3: string;
    selectedItems4: string;

    handleSelect(selectedItems: any[], property: string, labelField?: string) {
        this[property] = selectedItems.map(item => labelField ? item[labelField] : item).toString()
    }

    countryList: ArrayCollection<any>;

    constructor(public http: HttpClient) {
        this.countryList = new ArrayCollection();
        this.countryList.http = http;
        this.countryList.fromAjax('mock-data/countries');
        // 如果服务端返回的就是一个数组，则就无需写这些代码了
        this.countryList.dataReviser = (td: TableData) => TableData.toArray(td).slice(0, 5);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
