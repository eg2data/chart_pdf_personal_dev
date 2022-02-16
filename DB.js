const dataList =
    {
        "basic-info": {
            "user-name": "박의근",
            "distinct-number": "22-0126-xxxx-xxxx",
            "classification-code": "기업 분류",
            "classification-code-details": "20. 정보통신",
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
            "signals": [87], // 24, 45, 66, 87. 더 나은 비율을 찾아볼까, 그냥 갈까?
            "points" : [39.5],
            "rates" : ["상위 25"],
            "means" : [54.8],
            "surroundings": [37.5, "하위 25"], // 37.5, 25
            "instability": [11.1, "하위 50"],
            "demands": [14.1, "하위 25"],
            "culture": [15.1, "하위 25"],
            "autonomy": [12.1, "하위 50"],
            "system": [18.1, "하위 50"],
            "conflict": [19.1, "하위 25"],
            "changes-by-year": [25, 50, 75, 100, 25],
            "comment-details": "스트레스 측정 점수는 39.5점으로, 참고치 하위 25%에 해당합니다.",
        },
        "phq-9" : {
            "signals": [45],
            "points" : [27.1],
            "rates": [75.1],
            "comments": "약간 심한 수준의 우울감을 자주 느낌",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [25, 100, 75, 0, 50],
            "comment-details": "검사 결과는 약간 심한 수준의 우울감을 자주 느끼고 있습니다. 우울증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "gad-7" : {
            "signals": [87],
            "points" : [21.1],
            "rates": [65.1],
            "comments": "주의가 필요한 과도한 걱정, 불안을 느낌",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [100, 50, 0, 75, 25],
            "comment-details": "검사 결과는 중간 수준의 불안감을 자주 느끼고 있습니다. 불안장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "adnm-4" : {
            "signals": [66],
            "points" : [10.1],
            "rates": [81.2],
            "comments": "일상 생활 적응에 어려움이 있을 수 있음",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [0, 25, 75, 50, 100],
            "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. 적응장애 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "pc-ptsd-5" : {
            "signals": [66],
            "points" : [14.3],
            "rates": [40.2],
            "comments": "일상 생활 적응에 어려움이 있을 수 있음",
            "requirements": "추가 평가 또는 전문가의 도움이 필요함",
            "changes-by-year": [75, 0, 50, 100, 100],
            "comment-details": "검사 결과는 심각한 수준의 적응 스트레스를 자주 느끼고 있습니다. PTSD 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "isi" : {
            "signals": [24],
            "points" : [14.3],
            "rates": [28.5],
            "comments": "경미한 불면증이 있는 것으로 보임",
            "requirements": "2주 이상 지속 시 전문가의 도움이 필요함",
            "changes-by-year": [50, 100, 75, 50, 75],
            "comment-details": "검사 결과는 경미한 수준의 불면증을 자주 느끼고 있습니다. 2주 이상 지속 시 전문가의 도움이 필요합니다. 불면증 진단은 병력 및 여러 검사 결과와 전문의의 종합적인 판단에 의해 이루어지므로, 추가 평가 또는 전문가의 도움이 필요합니다.",
        },
        "css" : {
            "signals": [24],
            "points" : [0],
            "rates": [0],
            "comments": "위험한 수준의 자살 사고가 보이지 않음",
            "requirements": "",
            "changes-by-year": [100, 75, 50, 0, 25],
            "comment-details": "검사 결과는 자살사고 위험이 없습니다",
        },
    }

function getData(key) {
    if (dataList[key]["signals"] == 24) {
        dataList[key]["signal-texts"] = "정상"
        dataList[key]["requirement-texts"] = "전문도움필요" // 공백처리 시 안보임
    } else if (dataList[key]["signas"] == 45) {
        dataList[key]["signal-texts"] = "중간"
        dataList[key]["requirement-texts"] = "전문도움필요"

    } else if (dataList[key]["signals"] == 66) {
        dataList[key]["signal-texts"] = "약간 심함"
        dataList[key]["requirement-texts"] = "전문도움필요"

    } else if (dataList[key]["signals"] == 87) {
        dataList[key]["signal-texts"] = "심각함"
        dataList[key]["requirement-texts"] = "전문도움필요"

    }
    return dataList[key]
};

export { getData };