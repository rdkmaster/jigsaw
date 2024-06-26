import { Component, OnInit } from "@angular/core";
import { PinyinDictionary } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "alphabetical-index-dictionary",
    templateUrl: "./demo.component.html",
})
export class AlphabeticalIndexDictionaryDemoComponent extends AsyncDescription implements OnInit {
    public demoPath = "demo/alphabetical-index/dictionary";

    public mixCountries = [];
    public countries = [
        ["portugal", "葡萄牙", "prt"],
        ["slovenia", "斯洛文尼亚", "svn"],
        ["slovak republic", "斯洛伐克共和国", "svk"],
        ["solomon islands", "所罗门群岛", "slb"],
        ["surinam", "苏里南", "sur"],
        ["swaziland", "斯威士兰", "swz"],
        ["armenia", "亚美尼亚", "arm"],
        ["congo", "刚果", "cog"],
        ["bahamas", "巴哈马", "bhs"],
        ["bangladesh", "孟加拉国", "bgd"],
        ["barbados", "巴巴多斯", "brb"],
        ["belarus", "白俄罗斯", "blr"],
        ["cape verde", "佛得角", "cpv"],
        ["chile", "智利", "chl"],
        ["benin", "贝宁", "ben"],
        ["burundi", "布隆迪", "bdi"],
        ["sweden", "瑞典", "swe"],
        ["andorra", "安道尔", "and"],
        ["angola", "安哥拉", "ago"],
        ["senegal", "塞内加尔", "sen"],
        ["antartica", "南极", "ata"],
        ["grenada", "格林纳达", "grd"],
        ["austria", "奥地利", "aut"],
        ["guadeloupe", "瓜得罗普", "glp"],
        ["czech republic", "捷克共和国", "cze"],
        ["cayman islands", "开曼群岛", "cym"],
        ["belize", "伯里兹", "blz"],
        ["denmark", "丹麦", "dnk"],
        ["guinea-bissau", "几内亚比绍", "gnb"],
        ["el salvador", "萨尔瓦多", "slv"],
        ["cook islands", "库克群岛", "cok"],
        ["greenland", "格陵兰", "grl"],
        ["chad", "乍得", "tcd"],
        ["kazakhstan", "哈萨克斯坦", "kaz"],
        ["korea republic", "韩国", "kor"],
        ["liberia", "利比里亚", "lbr"],
        ["libia", "利比亚", "lby"],
        ["china", "中国", "chn"],
        ["aruba", "阿魯巴", "abw"],
        ["comoros", "科摩罗", "com"],
        ["iraq", "伊拉克", "irq"],
        ["tuvalu", "图瓦卢", "tuv"],
        ["tunisia", "突尼斯", "tun"],
        ["estonia", "爱沙尼亚", "est"],
        ["faroe islands", "法罗群岛", "fro"],
        ["faulkland islands", "福克兰群岛", "flk"],
        ["french guiana", "法属圭亚那", "guf"],
        ["french polynesia", "法属玻力尼西亚", "pyf"],
        ["germany", "德国", "deu"],
        ["guinea", "几内亚", "gin"],
        ["guyana", "圭亚那", "guy"],
        ["macau", "澳门", "mac"],
        ["maldives", "马尔代夫", "mdv"],
        ["united states", "美国", "usa"],
        ["uruguay", "乌拉圭", "ury"],
        ["micronesia", "密克罗尼西亚", "fsm"],
        ["moldavia", "摩尔多瓦", "moa"],
        ["canada", "加拿大", "can"],
        ["madigascar", "马达加斯加", "mdg"],
        ["malta", "马耳他", "mlt"],
        ["martinique", "马提尼克", "mtq"],
        ["isreal", "以色列", "isr"],
        ["jamacia", "牙买加", "jam"],
        ["zaire", "扎伊尔", "zar"],
        ["mozambique", "莫桑比克", "moz"],
        ["sychelles", "塞舌尔", "syc"],
        ["turkmenistan", "土库曼斯坦", "tkm"],
        ["palau", "帕劳", "plw"],
        ["paraguay", "巴拉圭", "pry"],
        ["poland", "波兰", "pol"],
        ["turkey", "土耳其", "tur"],
        ["ireland", "爱尔兰", "irl"],
        ["ukraine", "乌克兰", "ukr"],
        ["thailand", "泰国", "tha"],
        ["mexico", "墨西哥", "mex"],
        ["niue", "纽埃", "niu"],
        ["pakistan", "巴基斯坦", "pak"],
    ]

    /**
     * 多音字修正
     */
    public pinyinDictionary: PinyinDictionary = {
        "乐": "Y", "乘": "S", "乾": "G", "仇": "Q", "会": "K", "传": "Z", "伺": "C", "佃": "D",
        "侗": "D", "侧": "Z", "便": "P", "冯": "P", "凹": "W", "刨": "B", "券": "X", "刹": "S",
        "剿": "C", "勺": "B", "匙": "C", "区": "O", "卒": "C", "单": "S", "卡": "Q", "厂": "A",
        "厕": "S", "厦": "S", "参": "S", "句": "G", "叨": "T", "召": "Z", "吁": "X", "合": "G",
        "吓": "H", "否": "P", "吭": "H", "呔": "D", "呲": "Z", "呵": "K", "咀": "Z", "咖": "G",
        "咯": "G", "哦": "E", "喏": "R", "喔": "O", "嗄": "A", "嗌": "A", "圈": "J", "坏": "P",
        "壳": "Q", "夹": "G", "奇": "J", "姥": "M", "宿": "X", "尿": "S", "峙": "S", "幢": "C"
    };

    ngOnInit() {
        const mixCountries = [];
        this.countries.forEach(item => {
            mixCountries.push(item[0]);
            mixCountries.push(item[1]);
            mixCountries.push(item[2]);
        })
        this.mixCountries = mixCountries;
    }
}
