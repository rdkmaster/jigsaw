import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    GroupOptionValue, JigsawListLite, ArrayCollection, LocalPageableArray,
    PageableArray, TableData, CommonUtils
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ListLiteSearchableDemoComponent {
    goodsList = new ArrayCollection([
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        JigsawListLite.SEPARATOR,
        {
            icon: 'iconfont iconfont-e2e7',
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            icon: 'iconfont iconfont-e18a',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
            disabled: true
        },
        {
            icon: 'iconfont iconfont-e534',
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        JigsawListLite.SEPARATOR,
        {
            icon: 'iconfont iconfont-e565',
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            icon: 'iconfont iconfont-e6ca',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ]);

    goodsListTemp = this.goodsList.concat();

    selectedItems: string;

    handleSelect(selectedItems: any[], property: string, labelField: string) {
        this[property] = selectedItems.map(item => item[labelField]).toString()
    }

    changeData() {
        console.log('this.goodsList', this.goodsList);
        this.goodsList.fromArray(this.goodsListTemp.map((goods, idx) => {
            if (goods && goods.name) {
                goods = Object.assign({}, goods);
                goods.name = idx % 3 == 0 ? goods.name + '-1' : goods.name;
            }
            return goods
        }));
    }

    changeData2() {
        this.lpaCountries.fromAjax('mock-data/countries');
        this.lpaCountries.dataReviser = (td: TableData) => {
            return TableData.toArray(CommonUtils.deepCopy(td)).map((item, idx) => {
                item = Object.assign({}, item);
                item['enName'] = idx % 2 == 0 ? item['enName'] + '-1' : item['enName'];
                return item;
            });
        }
    }

    changeData3() {
        this.spaCountries.fromAjax();
        this.spaCountries.dataReviser = (td: TableData) => {
            td = <TableData>CommonUtils.deepCopy(td);
            td.data.forEach((row, idx) => {
                row[0] = idx % 2 == 0 ? row[0] + '-1' : row[0];
            });
            return td;
        }
    }

    lpaCountries: LocalPageableArray<GroupOptionValue>;
    spaCountries: PageableArray;
    selectedCountries: string;
    selectedCountries2: string;

    constructor(public http: HttpClient) {
        this.lpaCountries = new LocalPageableArray<GroupOptionValue>();
        this.lpaCountries.http = http;
        this.lpaCountries.fromAjax('mock-data/countries');
        // 这里模拟实际的场景：服务端返回的数据结构不能直接用的场景，需要对数据做一些简单的转换
        // RDK的服务端返回的数据多数是TableData格式，直接调用对应api做转换就行了
        // 如果服务端返回的就是一个数组，则就无需写这些代码了
        this.lpaCountries.dataReviser = (td: TableData) => TableData.toArray(td);
        // 我们这里不演示本地分页功能，因此只给一页数据就好
        this.lpaCountries.pagingInfo.pageSize = Infinity;
        // 如果需要设置默认值，则可以放开下面这几行代码
        // this.lpaCountries.onAjaxComplete(() => {
        //     this.selectedCountries = this.lpaCountries.get(17);
        // });

        this.spaCountries = new PageableArray(http, {
            url: 'mock-data/countries',
            // 在这个例子中不需要带参数，但是为了演示如何带参数给服务端，
            // 这里还是随便给了一些参数，可以在浏览器的network页中看效果
            params: {someData: 'this param is not necessary in this example.'},
        });
        // 我们这里不演示服务端分页功能，因此只给一页数据就好
        this.spaCountries.pagingInfo.pageSize = Infinity;
        this.spaCountries.fromAjax();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
