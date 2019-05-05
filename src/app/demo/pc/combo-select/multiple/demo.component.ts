import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
})
export class ComboSelectMultipleDemo {
    multiple: boolean = true;

    toggleMultiple() {
        this.multiple = !this.multiple;
        this.selectedCity = new ArrayCollection();
    }

    valueChange(value) {
        console.log(value);
    }

    selectedCity: ArrayCollection<any> = new ArrayCollection([{label: "北京", closable: false}]);
    cities = [
        {label: "北京", closable: false},
        {label: "上海", closable: false},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"},
        {label: "盐城"},
        {label: "徐州"},
        {label: "连云港"},
        {label: "连云港1"},
        {label: "连云港2"},
        {label: "连云港3"},
        {label: "哈尔滨"}
    ];


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '设置combo为单选模式';
    description: string = '`autoClose="true"`属性可以让combo在选中值有变化的时候自动关闭下拉，' +
        '再配合下拉视图的单选状态可以让combo进入典型的单选模式。';
    tags: string[] = [
        'JigsawComboSelect.autoClose',
        'JigsawTile.multipleSelect'
    ];
}
