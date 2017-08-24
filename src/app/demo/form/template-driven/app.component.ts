import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {TimeGr, TimeService} from "jigsaw/service/time.service";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-api";


@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class TemplateDrivenDemoComponent {
    firstName: string = 'jigsaw';
    remember: boolean = true;
    rangeTime = {beginDate: 'now-7d', endDate: 'now'};
    birthday: string = 'now-30y';
    rangeTimeComboValue = new ArrayCollection([
        {label: TimeService.getFormatDate(this.rangeTime.beginDate, TimeGr.date), closable: false},
        {label: TimeService.getFormatDate(this.rangeTime.endDate, TimeGr.date), closable: false}
    ]);
    comeFrom: any = {label: 'Nan Jing'};
    favoriteFruit: ArrayCollection<any>;
    score: number = 30;
    isGreat: boolean = true;

    formValue: any;
    fruitList: TableData = new TableData(
        [
            ["banana", "$12.0", "The banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.", "Southeast Asia"],
            ["apple", "$21.0", "The apple tree is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple.", "Shan Dong, China"],
            ["strawberry", "$31.0", "The garden strawberry is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries. It is cultivated worldwide for its fruit.", "Southeast Asia"],
            ["watermelon", "$13.0", "Watermelon Citrullus lanatus var. lanatus is a scrambling and trailing vine in the flowering plant family Cucurbitaceae.", "Southeast Asia"],
            ["pineapple", "$33.0", "The pineapple is a tropical plant with an edible multiple fruit consisting of coalesced berries, also called pineapples.", "Southeast Asia"],
            ["pear", "$11.0", "The pear is any of several tree and shrub species of genus Pyrus, in the family Rosaceae. It is also the name of the pomaceous fruit of the trees. ", "Southeast Asia"],
        ],
        ["name", "price", "desc", "origin"],
        ["Name", "Price", "Description", "Origin"]);
    columnDef: ColumnDefine[] = [
        {target: 'desc', width: '60%'}
    ];
    selectedIndex: number = 0;

    lastNamePattern = /^[a-z]+$/i;

    submit(formValue) {
        console.log(formValue);
        this.formValue = formValue;
    }

    onDateChange() {
        this.rangeTimeComboValue[0].label = this.rangeTime.beginDate;
        this.rangeTimeComboValue[1].label = this.rangeTime.endDate;
        this.rangeTimeComboValue.refresh();
    }

    onFavoriteFruitChange(selected) {
        this.favoriteFruit = new ArrayCollection<any>([{label: this.fruitList.data[selected][0]}]);
        this.selectedIndex = selected;
    }

    onFavoriteFruitRemoved(value) {
        if (value.length == 0) {
            this.selectedIndex = -1;
        }
    }

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
        this.favoriteFruit = new ArrayCollection<any>([{label: this.fruitList.data[0][0]}]);
    }
}
