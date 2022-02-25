// import amqp from 'amqplib/callback_api.js';
const amqp = require('amqplib/callback_api.js')

const data_0 =
    {
        "path-info": {
            "reservation-number": 711711711, // 예약번호
            "center-code": 711, // 센터코드
            // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
        },
        "basic-info": {
            "user-name": "첫번째",
            "submit-date": "2022-02-08",
            "report-date": "2022-02-08",
            "company-info": {
                "name": "KMI",
                "address": "서울시 종로구 세종대로 23길 54",
                "via": "유선통화",
                "contact": "02-2122-4000"
            },
            "test-type": "Survey/HRV",
            "test-method": "Self-Reporting",
            "test-adequacy": "적합",
        },
        "koss-sf" : {
            "signals": null, // 24, 45, 66, 87
            "signal-texts": "약간 심함",
            "points" : null,
            "rates" : null,
            "means" : null,
            "compensation": null,
            "jobInstability": null,
            "requirements": null,
            "culture": null,
            "autonomy": null,
            "system": null,
            "relationship": null,
            "changes-by-year": null,
            "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
        },
        "phq-9" : {
            "signals": null,
            "signal-texts": null,
            "points" : null,
            "rates": null,
            "comments": "약간 심한 수준의 우울감을 자주 느낌",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "requirement-texts": "전문도움필요",
            "changes-by-year": null,
            "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "gad-7" : {
            "signals": null,
            "signal-texts": null,
            "points" : null,
            "rates": null,
            "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "requirement-texts": "전문도움필요",
            "changes-by-year": null,
            "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "adnm-4" : {
            "signals": null,
            "signal-texts": null,
            "points" : null,
            "rates": null,
            "comments": "일상 생활 적응에 어려움이 있을 수 있음",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "requirement-texts": "전문도움필요",
            "changes-by-year": null,
            "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "pc-ptsd-5" : {
            "signals": null,
            "signal-texts": null,
            "points" : null,
            "rates": null,
            "comments": "일상 생활 적응에 어려움이 있을 수 있음",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "requirement-texts": "전문도움필요",
            "changes-by-year": null,
            "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "isi" : {
            "signals": null,
            "signal-texts": null,
            "points" : null,
            "rates": null,
            "comments": "경미한 불면증이 있는 것으로 보임",
            "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
            "requirement-texts": "전문도움필요",
            "changes-by-year": null,
            "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "css" : {
            "signals": null,
            "signal-texts": null,
            "points" : null,
            "rates": null,
            "comments": "위험한 수준의 자살 사고가 보이지 않음",
            "requirements": "",
            "requirement-texts": "전문도움필요",
            "changes-by-year": null,
            "comment-details": "검사 결과는 자살사고 위험이 없습니다",
        },
    }
// const data_1 =
//     {
//         "path-info": {
//             "reservation-number": 2200803558, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "두번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [45], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [45],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [45],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [45],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [45],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [45],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [45],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_2 =
//     {
//         "path-info": {
//             "reservation-number": 2200803559, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "세번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [66], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [66],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [66],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [66],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [66],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [66],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [66],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_3 =
//     {
//         "path-info": {
//             "reservation-number": 2200803560, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "네번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [87], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [87],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [87],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [87],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [87],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [87],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [87],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_4 =
//     {
//         "path-info": {
//             "reservation-number": 2200803561, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "다섯번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [24], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [24],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [24],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [24],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [24],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [24],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [24],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_5 =
//     {
//         "path-info": {
//             "reservation-number": 2200803562, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "여섯번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [45], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [45],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [45],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [45],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [45],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [45],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [45],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_6 =
//     {
//         "path-info": {
//             "reservation-number": 2200803563, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "일곱번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [66], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [66],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [66],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [66],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [66],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [66],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [66],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_7 =
//     {
//         "path-info": {
//             "reservation-number": 2200803564, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "여덟번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [87], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [87],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [87],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [87],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [87],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [87],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [87],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_8 =
//     {
//         "path-info": {
//             "reservation-number": 2200803565, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "아홉번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [24], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [24],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [24],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [24],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [24],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [24],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [24],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }
// const data_9 =
//     {
//         "path-info": {
//             "reservation-number": 2200803566, // 예약번호
//             "center-code": 114, // 센터코드
//             // 검진일자 => ["basic-info"]["submit-date"]에서 '-' 제거하여 사용.
//         },
//         "basic-info": {
//             "user-name": "열번째",
//             "distinct-number": "22-0126-xxxx-xxxx",
//             "classification-code": "기업 분류",
//             "classification-code-details": "20. 정보통신",
//             "submit-date": "2022-02-08",
//             "report-date": "2022-02-08",
//             "company-info": {
//                 "name": "KMI",
//                 "address": "서울시 종로구 세종대로 23길 54",
//                 "via": "유선통화",
//                 "contact": "02-2122-4000"
//             },
//             "check-list-number": "8",
//             "test-type": "Survey/HRV",
//             "test-method": "Self-Reporting",
//             "test-adequacy": "적합",
//         },
//         "koss-sf" : {
//             "signals": [45], // 24, 45, 66, 87
//             "signal-texts": "약간 심함",
//             "points" : [39.5],
//             "rates" : ["상위 25"],
//             "means" : [54.8],
//             "surroundings": [37.5, "하위 25"],
//             "instability": [11.1, "하위 50"],
//             "demands": [14.1, "하위 25"],
//             "culture": [15.1, "하위 25"],
//             "autonomy": [12.1, "하위 50"],
//             "system": [18.1, "하위 50"],
//             "conflict": [19.1, "하위 25"],
//             "changes-by-year": [25, 50, 75, 100, 25],
//             "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
//         },
//         "phq-9" : {
//             "signals": [45],
//             "signal-texts": "약간 심함",
//             "points" : [27.1],
//             "rates": [75.1],
//             "comments": "약간 심한 수준의 우울감을 자주 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [25, 100, 75, 0, 50],
//             "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "gad-7" : {
//             "signals": [45],
//             "signal-texts": "심각함",
//             "points" : [21.1],
//             "rates": [65.1],
//             "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 50, 0, 75, 25],
//             "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "adnm-4" : {
//             "signals": [45],
//             "signal-texts": "심각함",
//             "points" : [10.1],
//             "rates": [81.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [0, 25, 75, 50, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "pc-ptsd-5" : {
//             "signals": [45],
//             "signal-texts": "중간",
//             "points" : [14.3],
//             "rates": [40.2],
//             "comments": "일상 생활 적응에 어려움이 있을 수 있음",
//             "requirements": "추가 평가 또는 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [75, 0, 50, 100, 100],
//             "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "isi" : {
//             "signals": [45],
//             "signal-texts": "정상",
//             "points" : [14.3],
//             "rates": [28.5],
//             "comments": "경미한 불면증이 있는 것으로 보임",
//             "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [50, 100, 75, 50, 75],
//             "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
//         },
//         "css" : {
//             "signals": [45],
//             "signal-texts": "정상",
//             "points" : [0],
//             "rates": [0],
//             "comments": "위험한 수준의 자살 사고가 보이지 않음",
//             "requirements": "",
//             "requirement-texts": "전문도움필요",
//             "changes-by-year": [100, 75, 50, 0, 25],
//             "comment-details": "검사 결과는 자살사고 위험이 없습니다",
//         },
//     }

// const data = [
//     data_0, data_1, data_2, data_3, data_4, data_5, data_6, data_7, data_8, data_9
// ]


// Step 1: create connection
amqp.connect('amqp://localhost', (connectionError, connection) => {
    if(connectionError) {
        throw connectionError;
    }
    // Step 2: create channel
    connection.createChannel((channelError, channel) => {
        if(channelError) {
            throw channelError;
        }
        // Step 3: assert queue
        const queueName = "task_queue_4";
        channel.assertQueue(queueName, {
            durable: false
        });
        // Step 4: send message to queue
        // for (let i = 0; i < 1; i++) {
        //     const message = JSON.stringify(data[i])
        //     channel.sendToQueue(queueName, Buffer.from(message), {
        //         persistent: true
        //     });
        //     console.log(`[x] Sent data_${i} successfully.`)
        // }
        const message = JSON.stringify(data_0)
        channel.sendToQueue(queueName, Buffer.from(message), {
            persistent: true
        });
        console.log(`[x] Sent data successfully.`)

    })


    setTimeout(() => {
        connection.close();
        process.exit(0)
    }, 1000)
})
