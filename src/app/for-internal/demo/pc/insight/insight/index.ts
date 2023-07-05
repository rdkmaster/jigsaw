function uuidv4() {
    return '';
}

export class ArtboardToCode {
    public name: string;
    public layers: any[] = [];
    public markedLayers: any[] = [];

    public result = {
        selector: "awade-layout",
        agentId: uuidv4(),
        id: "root",
        config: {
            moduleType: "common",
            routeParam: "",
            version: "v10.9.71",
        },
        state: [
            {
                "label": "default",
                "styles": {
                    "autoFlex": true
                }
            }
        ],
        children: [],
    };

    constructor(artboard: any) {
        console.log(artboard);
        this.name = artboard.name;
        this.layers = artboard.layers;
        const matchPlx = /^plx:\d{2}-/;
        this.markedLayers = this.layers.filter(layer => matchPlx.test(layer.name))
            .filter(layer => !layer.name.includes('element'));
    }


    layerToCode() {

    }
}