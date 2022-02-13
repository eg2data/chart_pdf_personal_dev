const dataList =
    {
        "basic-info": {
            "user-name": "박의근",
            "distinct-number": "22-0126-xxxx-xxxx",
            "classification-code": "기업 분류",
            "submit-date": "2022-02-08",
            "report-date": "2022-02-08",
            "company-info": {
                "name": "KMI",
                "address": "서울시 종로구 세종대로 23길 54",
                "via": "유선통화",
                "contact": "02-2122-4000"
            },
            "check-list-number": "8",
            "test-type": "Survey/HRV",
            "test-method": "Self-Reporting",
            "test-adequacy": "적합",
        },
        "koss-sf" : {
            "signals": [1],
            "points" : [39.5],
            "rates" : [25],
            "means" : [54.8],
            "surroundings": [39.5, 25],
            "instability": [11, 50],
            "demands": [4, 25],
            "culture": [15, 25],
            "autonomy": [2, 50],
            "system": [8, 50],
            "conflict": [19, 25],
            "changes-by-year": [25, 50, 75, 100, 0],
            "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
        },
        "phq-9" : {
            "signals": [3],
            "points" : [27],
            "rates": [72],
            "signal-texts": "약간 심함",
            "comments": "약간 심한 수준의 우울감을 자주 느낌",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [25, 50, 75, 100, 0],
            "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "gad-7" : {
            "signals": [4],
            "points" : [21],
            "rates": [65],
            "signal-texts": "중간",
            "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [25, 50, 75, 100, 0],
            "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "adnm-4" : {
            "signals": [4],
            "points" : [9],
            "rates": [81.25],
            "signal-texts": "심각함",
            "comments": "일상 생활 적응에 어려움이 있을 수 있음",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [25, 50, 75, 100, 0],
            "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "pc-ptsd-5" : {
            "signals": [2],
            "points" : [4],
            "rates": [40],
            "signal-texts": "중간",
            "comments": "일상 생활 적응에 어려움이 있을 수 있음",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [25, 50, 75, 100, 0],
            "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "isi" : {
            "signals": [1],
            "points" : [14],
            "rates": [28.5],
            "signal-texts": "경미함",
            "comments": "경미한 불면증이 있는 것으로 보임",
            "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
            "changes-by-year": [25, 50, 75, 100, 0],
            "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "css" : {
            "signals": [1],
            "points" : [0],
            "rates": [0],
            "signal-texts": "자살위험아님",
            "comments": "위험한 수준의 자살 사고가 보이지 않음",
            "requirements": "",
            "changes-by-year": [25, 50, 75, 100, 0],
            "comment-details": "검사 결과는 자살사고 위험이 없습니다",
        },
    }



function getData(key) {
    return dataList[key]
};

export { getData };

