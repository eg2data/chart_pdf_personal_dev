import fs from "fs";
import labelmake from "labelmake";
import template from "./labelmake-template.json"
// labelmake-template.json > "fontName":"NanumGothic" ---- 직접 추가 말고 다른 방법이 있을까.
import { getData } from "./DB.js"
import { generateChart } from "./generateChart.js"

const NanumGothic = fs.readFileSync("./NanumGothic-Regular.ttf")
const font = {
    NanumGothic : {
        data: NanumGothic,
        subset: false
    }
};

generateChart()
    .then(( charts ) => {
        const inputs = [
            {
                // getData를 통해 string을 그대로 가져오는 것만 여기서 필요하고
                // 차트는 차트만 가져오면 ok -> 차트 그리는 곳에서 getData를 통해 int를 가져오는 것이고
                // "template에 지정한 field이름": getData("DB.js에서 가져오는 방식")
                // "template에 지정한 field이름": charts['생성한 차트 이름']
                "user-name": getData("basic-info")["user-name"],
                "distinct-number": getData("basic-info")["distinct-number"],
                "classification-code": getData("basic-info")["classification-code"],
                "submit-date": getData("basic-info")["submit-date"],
                "report-date": getData("basic-info")["report-date"],
                "company-info-name": getData("basic-info")["company-info"]["name"],
                "company-info-address": getData("basic-info")["company-info"]["address"],
                "company-info-via": getData("basic-info")["company-info"]["via"],
                "company-info-contact": getData("basic-info")["company-info"]["contact"],
                "check-list-number": getData("basic-info")["check-list-number"],
                "test-type": getData("basic-info")["test-type"],
                "test-method": getData("basic-info")["test-method"],
                "test-adequacy": getData("basic-info")["test-adequacy"],

                "overall-user-name": getData("basic-info")["user-name"],
                "overall-classification-code": getData("basic-info")["classification-code"],
                // "overall-koss-sf-signals": charts['koss-sf-signals'],
                "overall-koss-sf-points": getData("koss-sf")["points"].toString(),
                "overall-koss-sf-rates": getData("koss-sf")["rates"].toString(),
                "overall-koss-sf-means": getData("koss-sf")["means"].toString(),
                // "overall-phq-9-signals": charts['phq-9-signals'],
                "overall-phq-9-points": getData("phq-9")["points"].toString(),
                "overall-phq-9-rates": getData("phq-9")["rates"].toString(),
                "overall-phq-9-comments": getData("phq-9")["comments"],
                // "overall-gad-7-signals": charts['gad-7-signals'],
                "overall-gad-7-points": getData("gad-7")["points"].toString(),
                "overall-gad-7-rates": getData("gad-7")["rates"].toString(),
                "overall-gad-7-comments": getData("gad-7")["comments"],
                // "overall-adnm-4-signals": charts['adnm-4-signals'],
                "overall-adnm-4-points": getData("adnm-4")["points"].toString(),
                "overall-adnm-4-rates": getData("adnm-4")["rates"].toString(),
                "overall-adnm-4-comments": getData("adnm-4")["comments"],
                // "overall-pc-ptsd-5-signals": charts['pc-ptsd-5-signals'],
                "overall-pc-ptsd-5-points": getData("pc-ptsd-5")["points"].toString(),
                "overall-pc-ptsd-5-rates": getData("pc-ptsd-5")["rates"].toString(),
                "overall-pc-ptsd-5-comments": getData("pc-ptsd-5")["comments"],
                // "overall-isi-signals": charts['isi-signals'],
                "overall-isi-points": getData("isi")["points"].toString(),
                "overall-isi-rates": getData("isi")["rates"].toString(),
                "overall-isi-comments": getData("isi")["comments"],
                // "overall-css-signals": charts['css-signals'],
                "overall-css-points": getData("css")["points"].toString(),
                "overall-css-rates": getData("css")["rates"].toString(),
                "overall-css-comments": getData("css")["comments"],

                // "koss-sf-signals": charts['koss-sf-signals'],
                // "koss-sf-surroundings": charts['koss-sf-surroundings'],
                // "koss-sf-instability": charts['koss-sf-instability'],
                // "koss-sf-demands": charts['koss-sf-demands'],
                // "koss-sf-culture": charts['koss-sf-culture'],
                // "koss-sf-autonomy": charts['koss-sf-autonomy'],
                // "koss-sf-system": charts['koss-sf-system'],
                // "koss-sf-conflict": charts['koss-sf-conflict'],
                // "koss-sf-changes-by-year": charts['koss-sf-changes-by-year'],
                "koss-sf-comment-details": getData("koss-sf")["comment-details"],

                // "phq-9-signals": charts['phq-9-signals'],
                "phq-9-rates": getData("phq-9")["rates"].toString(),
                "phq-9-signal-texts": getData("phq-9")["signal-texts"],
                // "phq-9-rate-bar": charts['phq-9-rate-bar'],
                "phq-9-comments": getData("phq-9")["comments"],
                "phq-9-requirements": getData("phq-9")["requirements"],
                // "phq-9-changes-by-year": charts['phq-9-changes-by-year'],
                "phq-9-comment-details": getData("phq-9")["comment-details"],

                // "gad-7-signals": charts['gad-7-signals'],
                "gad-7-rates": getData("gad-7")["rates"].toString(),
                "gad-7-signal-texts": getData("gad-7")["signal-texts"],
                // "gad-7-rate-bar": charts['gad-7-rate-bar'],
                "gad-7-comments": getData("gad-7")["comments"],
                "gad-7-requirements": getData("gad-7")["requirements"],
                // "gad-7-changes-by-year": charts['gad-7-changes-by-year'],
                "gad-7-comment-details": getData("gad-7")["comment-details"],

                // "adnm-4-signals": charts['adnm-4-signals'],
                "adnm-4-rates": getData("adnm-4")["rates"].toString(),
                "adnm-4-signal-texts": getData("adnm-4")["signal-texts"],
                // "adnm-4-rate-bar": charts['adnm-4-rate-bar'],
                "adnm-4-comments": getData("adnm-4")["comments"],
                "adnm-4-requirements": getData("adnm-4")["requirements"],
                // "adnm-4-changes-by-year": charts['adnm-4-changes-by-year'],
                "adnm-4-comment-details": getData("adnm-4")["comment-details"],

                // "pc-ptsd-5-signals": charts['pc-ptsd-5-signals'],
                "pc-ptsd-5-rates": getData("pc-ptsd-5")["rates"].toString(),
                "pc-ptsd-5-signal-texts": getData("pc-ptsd-5")["signal-texts"],
                // "pc-ptsd-5-rate-bar": charts['pc-ptsd-5-rate-bar'],
                "pc-ptsd-5-comments": getData("pc-ptsd-5")["comments"],
                "pc-ptsd-5-requirements": getData("pc-ptsd-5")["requirements"],
                // "pc-ptsd-5-changes-by-year": charts['pc-ptsd-5-changes-by-year'],
                "pc-ptsd-5-comment-details": getData("pc-ptsd-5")["comment-details"],

                // "isi-signals": charts['isi-signals'],
                "isi-rates": getData("isi")["rates"].toString(),
                "isi-signal-texts": getData("isi")["signal-texts"],
                // "isi-rate-bar": charts['isi-rate-bar'],
                "isi-comments": getData("isi")["comments"],
                "isi-requirements": getData("isi")["requirements"],
                // "isi-changes-by-year": charts['isi-changes-by-year'],
                "isi-comment-details": getData("isi")["comment-details"],

                // "css-signals": charts['css-signals'],
                "css-rates": getData("css")["rates"].toString(),
                "css-signal-texts": getData("css")["signal-texts"],
                // "css-rate-bar": charts['css-rate-bar'],
                "css-comments": getData("css")["comments"],
                "css-requirements": getData("css")["requirements"],
                // "css-changes-by-year": charts['css-changes-by-year'],
                "css-comment-details": getData("css")["comment-details"],
            }
        ];


        labelmake({ inputs, template, font })
            .then((pdf) => {
                fs.writeFileSync(__dirname + "/complete_til_general_220107_3.pdf", pdf, "utf-8"); // jpg 출력 방법은?
            });
    })

