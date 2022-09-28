import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap jigsaw-icon {
            margin-right: 50px;
            line-height: 1;
        }
        .live-demo-wrap jigsaw-switch,
        .live-demo-wrap jigsaw-input,
        .live-demo-wrap jigsaw-checkbox,
        .live-demo-wrap jigsaw-button-bar,
        .live-demo-wrap jigsaw-radios-lite,
        .live-demo-wrap jigsaw-tile-lite {
            margin-right: 20px;
        }
    `]
})
export class BadgeBasicDemoComponent {
    public nice = "Nice";
    public dot = "dot";

    public cities = [
        {label: "北京", id: 1},
        {label: "上海-一个很长的地址", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]

    public textualHtml = `<div style='display:flex; align-items:center; color:white; height:40px;'>
           这里用了 <strong style="color:#dc3838">HTML</strong> 片段</div>
    `;
    public iconicHtml = `<div style='display:flex; align-items:center; justify-content:center; color:white; font-size:20px;
        width:40px; height:40px; cursor:pointer'><i class="iconfont iconfont-e9d2"></i></div>`;
    public imageHtml = `<img style="width:100px" src="data:image/webp;base64,UklGRq4MAABXRUJQVlA4WAoAAAAgAAAA8QAAYwAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBwCgAA0DMAnQEq8gBkAD61TqFMpyQjIioSy7jgFoljANHw/FUhIr8+4T0MDqgN6CyDtlPf/50Ay6DmPRlHwAnbdodAvq9VATxotGv9ieXT3vftNVS+2ncXmHqmkR9y9Qs+zJag9WOEu/Er+AkGPZlju2UECQ70D963l8CVfTrqHcfXfX9uL4PTbr7qFyQNt62uC9ie0M4054jyNazgkarZjeSySDr94hic6wTEpHirR95SBB44gw0oc/clgzICpEhjaFQxTXb/jdaX8wk46Lz0qV2Rd5Ps8dUXnA5chDmAe89puI/wI584+Z9jfyh3xcniM+1a1Co6m4tuxnOeEgJ0CTudfL81wryujPKQOJt7CQAkEA037QOrJskFHiR9XTDeYcU3y2IBCwDPeLD336gluO0tcSL7M1wAf856P6JiHY0RXCJ/6soMpSq5I6GecgLVCoCbPzAo3Kni2qfpHpSJzxsYXNITGqLYqEWieXQg5F0ujfSeByZVOBLTxId9/R9QGCgELe8oZjVJb1HMnmBBMAIu5xbzj8YK+fQDlLdzjEh4XvA/CYkO/A7gAP75WEjJX4yqsfXDX7whr1RdxtAJOnwaUrSF4NPuDqbp5qyrqYDzQsPF0IA0i9aw7x415y55E4VlX1K3BASi7BOkFM1GcmQ18pMQwp+RSNQ6vSbz6dsmIm22m7ijDXgIKOhnpRoSeNWEURx+tVP+1ExM1QcB426+VzlumOZktTvJEDAQ/4RxQp448BF8cFCW15eGNvfEiTbq/T8R5NwxzJn+RUla+lNKuGya+KlNFjn7AvoMSgp30GG/ZoABavvUrXQlE9Voeo1pWShj2fD9J5u8+lgWj58ne247rXloLv+pUzMiT2pDkOO/IYe7UCfFTzvUgE/wQ00iU0uOVyG7odssXDFnryfKn2U3omGC3aTeRU8pmRBxmKij12Uk6ZivgriY81plxkN+/KmUcxVWUGoiHimfoLkSgZdgspBN8j7Q04pvnVZ4v5V6OPiBFKA+ah/UeElt+DCSlb2wM/XTijV+vPCinwo9s4hXyq47tynW15umzTWliGxhRx6n+ys0oKckwm6FWuVtxFC5VdTiLTQ8JvQq2nQcEPw766mMxxSwd3lTQfcJl1s6LLC8LVgLkbFbupN/R9Eokp6WwqWWwnZnMhLJug+6m6IMWMLfQd6uXxgC2B2WTpx0lbyW6rAKD8f1P2P5wgA4lY/TBEqxi9ne9xwKO4IuLynfHaq3xFi3JPGCHoX/jQ6ofOan9AbTb9HAPbFeJeGItyd9+AgeNYnhgM/GfjfpLsKN7nTYWyKroFyPDBt9In1PhvIdecdOoSv1SlRNYHLHVa5lDh4WCofDI8REw5x9fcZvz36hUOeVE2fqOjs7LR7OdAiDKyePXmAu3ZVSubee9Fc2B/M+OrQfpnE/9kF/0/4wnft9VtvBYz6pbtkMkuBB9pm+hoUIvQKpKLNh7RgmHGazSj9D4YQ9NI8ksDEebDEmNW2CSxQUpQSOS5mEA1d1HhKIbgT5M9a+Sd57VpQU7r14caMaUZEUygWv2FW4lX3XfSWjMywgZw5y0K8kPMdH3qH0oC24BHam2E/bdZ7+muqfxCsTgrewG28MiBThZYXmcEwTSqU5C9pmVkSwmDdDLvLadkCyaG/gP3i419qNQmHPMHrVQFhrKZpYOz5rL2PxSYoS74WuEG2HLUrW7vYLfGdauJOF/hr9GD2i4hrsB00C4JfMNbgtP7E8Xxn/loB5ibloaIgQp28vsfLWypVbj2/xSdaIL+SAb+Ah/s0dPCL6wtFif1NsWVQnVbAdPJ1hozqXJEvPoM+EDCrdNVPGrhdcdXV/SiZ39E7jDTIRtzVTaaJ0Uy2g1xQpG48/ih4xfR4kekDQmpc4JGE4vcRG7BiDWnCGl0Z8dEfs+j5+xKR3DW6HoGzE1FhhL0BbFcbdDgSbInbZiVay2iu+g69EPI8BSqT0GaU4tfIXlFVwUc5wEQdhCvjKrKu/YGxAiFA8tajQYtJhZpkZ5Ey2ZTsqGLMhtgXpJecRvbzHFsvYcrX3UUSqYeQE7SaEI7oXSGDfx95vVxA+ICBxreBUNVO5PWlLXjrBg/mmVJuFqt4rkRM1jQQ5T3OXZT+kAt3w1CJChL9pSBV8x8GQg5J6+637+DvmYG10OeiefGzjmLJAzD/TYZc6kPl8GawZRBQ0yB2c8ZfC7Dzu/82IxNWeOGUzbZNeVWzQ7Qez9O8vuA4aphZRviE9rh4NOB+FldvUjBHlt6/8dXg5Qiod7D8Vsgd82XAtjwxLstgHtO6HWM9IKMzLtwn/tTt/CbVP+Rv25jArHd8w2gDguJ89B/38p15UjWvAFuykVNATi8bjsrfuiSg2kfZ1FQHcZRD4rr6/398iS7rHfWrjwmPuh3dZdW05v1+YysHSsXKPEuD4BVD5IT4bTQk8W85OIeeDiNHQe1e52bPV8MyGZTDPS97WPm8W+ppFuoVLN5wArE1ZBzLV6mrqf/ujA6JlA2m13cK+mhl/gG0q/3A4nEWPzdsPB9r1Ef6K4rxX2Z5Qbity8EZ2oD60Q8Lz6vrk+UxLN2IhD08Vj24bnffUi5h/Zg3nWk/7IgQYZKlSa7Klz2ESDo3zWzxbwsbUi36LhHcEGVQXD7Zw0FbzvGwNsI2cXlB35jZOYItjYb1h7SKn3Xfw47m7GePjs4njLcn6i+pKXsjihgL8VjaYavb4rSxZfDnRlooXow5fM7KZ5NxrZuCPFgAQcz7FEvqvFAhjwED6cNr8W/9TfBvdgsw4z3dYkLXW11c7puMElRmAFx/DJ/Eyg/vqV67QBuRqzSOLjH6qSYXmqERR0NntFZSnzVCD1ckQuzp+fSky3UkKvabH02JNASEO1bZkXqz+fnHGaK/DjNMNyC09JpJ8VxWTQsEWX8ldH768d9J/5/yoiPIAVzl49GNY8VQhnnWTrnp6CloEDJqEEeU0WVH6G8caglP2wxt+pxsJ0XojXhFpIcI+tt2JRJVUzdzMMueMX0szlQZhLBX5WLYCBMq/jtCLXtR5ADNGDr4yqFK6sG8xpgNR2UF0RL+l9AVC5Gkou/aBEgQkygZMfZwkMveHmmZoA5x7W0F2SfNJ8EgkVQELyhAGkYB06RJ42SsCRHCpcjWQQAB4q/WSRtFl9vRQ2IEhQNLMEzz80+1YiXvkElx71NrefJvt75EkR4ob5bAEw+w29lcSOpBDgrVySafJZDOM+Mo6uU2/9AIlzckitYsrV9JIlZsTg2XbtFRU43OLAkMZ5dHigLRNk1nmRGAQXEz6YrEKTfAg4WALjoukQopyvQ+gNeTpDzjKRPOXUCHn8jQEp1pGgIrfB47jX4OOWi/d173F+Cr8/kgFKQZOaOz/OM3sKdInZMbtwlAL0DJa63tiq7heWijKoBxxiZR3IM86ok9Uwg94dUdZ+zATzM3ud/gEM61aUye4+YPo+k/abLWzGX5z69Soxnz+s1YkEIasmjPH2eZlzSz3pFm4kz1BSeG6CbzO/ufF9+vivlPCpIZTTAAAAAABqS0cS4h0eoAEilTTE5AAAAA=">`;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了`jigsaw-badge`指令的简单用法，支持将文本、数字、图标等内容作为徽标的内容，也支持边框和背景，还支持偏移微调徽标的位置。';
    description: string = '';
}
