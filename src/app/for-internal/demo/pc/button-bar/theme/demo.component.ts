import { AfterContentInit, Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class ButtonBarThemeDemoComponent implements AfterContentInit {
    multiple: boolean = false;

    selectedCity: any[];
    selectedCityStr: string;
    cities = new ArrayCollection([
        { label: "选中状态", id: 1 },
        { label: "正常状态并且特别的长", id: 2 },
        { label: "正常状态", id: 3 },
        { label: "禁用状态", id: 4, disabled: true },
        { label: "正常状态2", id: 5 },
        { label: "禁用状态2", id: 6, disabled: true }
    ]);
    selectedTypes = [{ id: 4 }];

    basicSelectChange(cityArr: ArrayCollection<any>) {
        this.selectedCityStr = cityArr.map(city => city.label).join(",");
    }

    ngAfterContentInit() {
        this.resetSelection();
    }

    resetSelection() {
        this.selectedCity = [{ label: "选中状态", id: 1 }];
        this.selectedCityStr = this.selectedCity
            .map(city => city.label)
            .join(",");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
