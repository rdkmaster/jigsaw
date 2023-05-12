import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { TransferTableSourceRenderer, TransferListDestRenderer, ArrayCollection, ListOption, TransferTableDestRenderer, LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']

})
export class TransferTableLocalPageableDemoComponent {

    constructor(http: HttpClient) {
        this.data = new LocalPageableTableData();
        this.data.http = http;
        this.data.pagingInfo.pageSize = 10;
        this.data.fromAjax('mock-data/hr-list-full');

        this.selectedData = new ArrayCollection([]);
    }

    data: LocalPageableTableData;
    public sourceRenderer = TransferTableSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    selectedData: ArrayCollection<ListOption>;

    labelField = 'name';
    trackItemBy = 'name';

    changeDataFromObject() {
        this.data.fromObject({
            "field": [
                "name", "gender", "position", "salary", "enroll-date", "office", "desc"
            ],
            "header": [
                "姓名", "性别", "职位", "薪资", "入职日期", "部门", "描述"
            ],
            "data": [
                [
                    "Tony",
                    "男",
                    "Developer",
                    17139,
                    "2016/9/19",
                    "Online Prod I",
                    "汤尼，值得赞美的，很受尊重的。"
                ],
                [
                    "Griffith",
                    "男",
                    "System Architect",
                    16544,
                    "2014/6/21",
                    "Online Prod II",
                    "葛里菲兹，保护家园有力之人;红润的。"
                ],
                [
                    "Sarah",
                    "女",
                    "Developer",
                    14696,
                    "2014/12/5",
                    "Platform I",
                    "赛拉，公主。"
                ],
                [
                    "Perry",
                    "男",
                    "Test Engineer",
                    13954,
                    "2014/11/10",
                    "Offline Prod I",
                    "斐瑞，梨树。"
                ],
                [
                    "Ellen",
                    "女",
                    "Developer",
                    10828,
                    "2015/3/19",
                    "Offline Prod I",
                    "艾伦，火把。"
                ],
                [
                    "Martha",
                    "女",
                    "Developer",
                    11225,
                    "2017/6/18",
                    "Online Prod I",
                    "玛莎，家庭主妇。"
                ],
                [
                    "Hilary",
                    "男",
                    "Developer",
                    14480,
                    "2017/10/4",
                    "Online Prod I",
                    "希拉里，快乐的。"
                ],
                [
                    "Daniel",
                    "男",
                    "Test Engineer",
                    17159,
                    "2016/7/4",
                    "Platform I",
                    "丹尼尔，上帝是我的仲判人。"
                ],
                [
                    "Diana",
                    "女",
                    "Developer",
                    19232,
                    "2015/3/28",
                    "Online Prod II",
                    "黛安娜，光亮如白画;月亮女神"
                ],
                [
                    "Merry",
                    "女",
                    "System Architect",
                    10284,
                    "2014/9/25",
                    "Online Prod II",
                    "梅莉，充满乐趣和笑声。"
                ],
                [
                    "Bard",
                    "男",
                    "Developer",
                    10207,
                    "2017/8/12",
                    "Offline Prod II",
                    "巴德，很快乐，且喜欢养家畜的人。"
                ],
                [
                    "Georgia",
                    "女",
                    "Test Engineer",
                    12815,
                    "2017/5/23",
                    "Platform III",
                    "乔治亚，农夫。"
                ],
                [
                    "Walter",
                    "男",
                    "Test Engineer",
                    11899,
                    "2017/7/6",
                    "Platform I",
                    "瓦尔特，指率领军队的人，或有权势的战士。"
                ],
                [
                    "Morton",
                    "男",
                    "System Architect",
                    18582,
                    "2014/4/21",
                    "Offline Prod I",
                    "摩顿，来自旷野之村落。"
                ],
                [
                    "Rosalind",
                    "女",
                    "Test Engineer",
                    16434,
                    "2014/9/2",
                    "Platform III",
                    "罗莎琳德，盛开的玫瑰。"
                ]]
        });
    }

    resetInputData() {
        this.data.fromAjax('mock-data/hr-list-full');
    }

    selectedItemsChange($event) {
        console.log($event)
    }

    resetSelectedData() {
        this.selectedData = new ArrayCollection([]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
