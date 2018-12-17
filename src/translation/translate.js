import zh_CN from "translation/zh_CN.json";
import zh_TW from "translation/zh_TW.json";

export default function t (text, locale) {
    switch(locale) {
        case "en_US": {
            return text;
        }
        case "zh_CN": {
            return zh_CN[text];
        }
        case "zh_TW": {
            return zh_TW[text];
        }
        default: {
            return text;
        }
    }
}