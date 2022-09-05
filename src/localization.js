const localization = {
    info: {
        en: "Lesson {length} is max for now.",
        jp: "レッスン {length} は今のところ最大です。",
        mm: ""
    },
    from: {
        en: "From",
        jp: "から",
        mm: ""
    },
    to: {
        en: "To",
        jp: "まで",
        mm: ""
    },
    submit: {
        en: "Submit",
        jp: "送信",
        mm: ""
    },
    count: {
        en: "Count",
        jp: "カウント",
        mm: ""
    },
    skip: {
        en: "Skip",
        jp: "スキップ",
        mm: ""
    },
    next: {
        en: "Next",
        jp: "次",
        mm: ""
    },
    back: {
        en: "Back",
        jp: "戻る",
        mm: ""
    },
}

export const getLocalization = (key, lang) => {
    return localization[key][lang];
}

export const defaultLang = "en";

export const Levels = {
    5: [0, 10],
    4: [11, 30]
}