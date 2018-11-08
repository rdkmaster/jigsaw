import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, LocalPageableArray} from "jigsaw/core/data/array-collection";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferArrayDemoComponent {
    constructor(private _http: HttpClient) {
        // const data = new ArrayCollection();
        // data.http = _http;
        // data.fromAjax('mock-data/countries');
        // data.dataReviser = (td: TableData) => TableData.toArray(td);

        this.data = TableData.of({
                "field": [
                    "enName", "zhName", "shortName"
                ],
                "header": [
                    "English Name", "Chinese Name", "Short Name"
                ],
                "data": [
                    ["andorra", "安道尔", "and"],
                    ["angola", "安哥拉", "ago"],
                    ["antartica", "南极", "ata"],
                    ["armenia", "亚美尼亚", "arm"],
                    ["aruba", "阿魯巴", "abw"],
                    ["austria", "奥地利", "aut"],
                    ["bahamas", "巴哈马", "bhs"],
                    ["bangladesh", "孟加拉国", "bgd"],
                    ["barbados", "巴巴多斯", "brb"],
                    ["belarus", "白俄罗斯", "blr"],
                    ["belize", "伯里兹", "blz"],
                    ["benin", "贝宁", "ben"],
                    ["burundi", "布隆迪", "bdi"],
                    ["cape verde", "佛得角", "cpv"],
                    ["cayman islands", "开曼群岛", "cym"],
                    ["chad", "乍得", "tcd"],
                    ["chile", "智利", "chl"],
                    ["china", "中国", "chn"],
                    ["comoros", "科摩罗", "com"],
                    ["congo", "刚果", "cog"],
                    ["cook islands", "库克群岛", "cok"],
                    ["czech republic", "捷克共和国", "cze"],
                    ["denmark", "丹麦", "dnk"],
                    ["el salvador", "萨尔瓦多", "slv"],
                    ["estonia", "爱沙尼亚", "est"],
                    ["faroe islands", "法罗群岛", "fro"],
                    ["faulkland islands", "福克兰群岛", "flk"],
                    ["french guiana", "法属圭亚那", "guf"],
                    ["french polynesia", "法属玻力尼西亚", "pyf"],
                    ["germany", "德国", "deu"],
                    ["greenland", "格陵兰", "grl"],
                    ["grenada", "格林纳达", "grd"],
                    ["guadeloupe", "瓜得罗普", "glp"],
                    ["guinea", "几内亚", "gin"],
                    ["guinea-bissau", "几内亚比绍", "gnb"],
                    ["guyana", "圭亚那", "guy"],
                    ["iraq", "伊拉克", "irq"],
                    ["ireland", "爱尔兰", "irl"],
                    ["isreal", "以色列", "isr"],
                    ["jamacia", "牙买加", "jam"],
                    ["kazakhstan", "哈萨克斯坦", "kaz"],
                    ["korea republic", "韩国", "kor"],
                    ["liberia", "利比里亚", "lbr"],
                    ["libia", "利比亚", "lby"],
                    ["macau", "澳门", "mac"],
                    ["madigascar", "马达加斯加", "mdg"],
                    ["maldives", "马尔代夫", "mdv"],
                    ["malta", "马耳他", "mlt"],
                    ["martinique", "马提尼克", "mtq"],
                    ["micronesia", "密克罗尼西亚", "fsm"],
                    ["mexico", "墨西哥", "mex"],
                    ["moldavia", "摩尔多瓦", "moa"],
                    ["mozambique", "莫桑比克", "moz"],
                    ["niue", "纽埃", "niu"],
                    ["pakistan", "巴基斯坦", "pak"],
                    ["palau", "帕劳", "plw"],
                    ["paraguay", "巴拉圭", "pry"],
                    ["poland", "波兰", "pol"],
                    ["portugal", "葡萄牙", "prt"],
                    ["senegal", "塞内加尔", "sen"],
                    ["slovak republic", "斯洛伐克共和国", "svk"],
                    ["slovenia", "斯洛文尼亚", "svn"],
                    ["solomon islands", "所罗门群岛", "slb"],
                    ["surinam", "苏里南", "sur"],
                    ["swaziland", "斯威士兰", "swz"],
                    ["sweden", "瑞典", "swe"],
                    ["sychelles", "塞舌尔", "syc"],
                    ["tunisia", "突尼斯", "tun"],
                    ["turkmenistan", "土库曼斯坦", "tkm"],
                    ["turkey", "土耳其", "tur"],
                    ["tuvalu", "图瓦卢", "tuv"],
                    ["ukraine", "乌克兰", "ukr"],
                    ["united states", "美国", "usa"],
                    ["uruguay", "乌拉圭", "ury"],
                    ["zaire", "扎伊尔", "zar"],
                    ["canada", "加拿大", "can"],
                    ["thailand", "泰国", "tha"]
                ]
            }
        ).toArray();

        this.selectedCountries = new ArrayCollection();
        this.selectedCountries.http = _http;
        this.selectedCountries.fromAjax('mock-data/countries');
        this.selectedCountries.dataReviser = (td: TableData) => TableData.toArray(td).slice(0,5);

    }

    add() {
        this.selectedCountries.push({
            enName: "barbados", zhName: '巴巴多斯', shortName: "brb"
        });
        this.selectedCountries.refresh();
    }

    data: any[];
    selectedCountries: ArrayCollection<any>;
    selectedCountriesStr: string;

    handleSelectChange($event) {
        this.selectedCountriesStr = $event.map(item => item.zhName).join(',');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

