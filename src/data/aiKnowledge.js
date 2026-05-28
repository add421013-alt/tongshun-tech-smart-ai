export const aiSafetyNotice =
  '實際產品規格、保固判定、庫存、價格、維修與服務內容，仍需依官方公告、售後檢測與專人確認為準。';

export const aiFallbackAnswer =
  '您好，這部分我可以先協助您初步了解。若涉及正式規格、價格、庫存、保固、維修或企業採購，建議留下預約資訊，由專人依您的需求確認，會比較準確。';

const warrantyAnswer =
  '目前提供一年內非人為因素有限保固服務。若經確認屬於非人為損壞情況，將由專人協助後續更換與處理流程。實際保固範圍、判定方式與服務內容，仍需依官方售後規範與檢測結果為準。';

export const aiKnowledge = [
  {
    keywords: ['app', '做什麼', '用途', '介紹', '統順', 'tech smart ai'],
    answer:
      '您好，這個 App 是統順 Tech Smart AI 的產品展示與服務入口，主要提供智慧眼鏡產品介紹、圖片導覽、教學影片、AI 客服與預約了解功能。您可以先瀏覽款式，再透過預約由專人協助說明。',
  },
  {
    keywords: ['智慧眼鏡', '功能', '可以做什麼', '差在哪', '一般眼鏡'],
    answer:
      '智慧音訊眼鏡結合眼鏡外型與音訊功能，適合日常通勤、辦公、通話、教學與商務場合使用。不同款式在外型、材質與風格上會有差異，實際配戴感建議預約了解會更準確。',
  },
  {
    keywords: ['推薦', '怎麼選', '選哪款', '適合我', '不知道選'],
    answer:
      '我先幫您簡單分類：日常通勤、辦公與長時間配戴可先看 TBI1001 / TBI1002；正式商務、會議、接待場合可優先看 TBM1003 / TBM1004。若您重視臉型、顏色與配戴感，建議預約讓專人協助比對。',
  },
  {
    keywords: ['方形', '方框', 'TBI1001', '1001'],
    answer:
      'TBI1001 是經典全框方形款，視覺感比較俐落、穩重，適合通勤、辦公與日常配戴。若您平常喜歡比較有線條感、正式一點的外型，可以優先看這款。',
  },
  {
    keywords: ['圓形', '圓框', 'TBI1002', '1002'],
    answer:
      'TBI1002 是經典全框圓形款，整體感覺比較柔和、日常、耐看，適合通勤、生活穿搭與語言學習等情境。若您想要比較親和、不太銳利的造型，可以優先看這款。',
  },
  {
    keywords: ['金屬方形', 'TBM1003', '1003', '商務方形'],
    answer:
      'TBM1003 是商務金屬方形款，外型更偏正式與專業，適合會議、接待、展會或商務場合。若您希望產品看起來更有質感與專業形象，可以優先考慮這款。',
  },
  {
    keywords: ['金屬圓形', 'TBM1004', '1004', '酒紅', '透酒紅'],
    answer:
      'TBM1004 是商務金屬圓形款，風格比較輕商務、知性、有質感。透酒紅會比較有特色，曜石黑則更低調穩重。實際效果仍建議依個人臉型與穿搭確認。',
  },
  {
    keywords: ['顏色', '黑色', '灰色', '藍色', '天空藍', '深空灰', '曜石黑'],
    answer:
      '顏色選擇可以依使用場合判斷：曜石黑比較百搭穩重，深空灰偏低調科技感，天空藍較有年輕感與辨識度，透酒紅則更有特色。若用於商務場合，黑色與灰色通常會比較保守安全。',
  },
  {
    keywords: ['保固', '保修', '保固期', '一年', '一年內', '換新'],
    answer: warrantyAnswer,
  },
  {
    keywords: ['壞掉', '故障', '不能用', '沒反應', '異常', '維修', '修理'],
    answer:
      '很抱歉讓您遇到這種情況。若產品出現異常，建議先保留購買與產品資訊，並聯繫真人客服協助確認。若屬於一年內非人為因素造成的損壞，會依售後規範與檢測結果協助處理。',
  },
  {
    keywords: ['摔到', '摔壞', '泡水', '進水', '人為', '撞到'],
    answer:
      '這類情況需要由售後協助確認實際狀態。一般來說，保固服務會區分非人為與人為因素，若有摔落、泡水、撞擊或外觀損傷，仍需依檢測結果與官方售後規範判定。',
  },
  {
    keywords: ['藍牙', '藍芽', '連線', '配對', '連不上', '斷線'],
    answer:
      '若遇到連線問題，您可以先確認眼鏡電量、手機藍牙是否開啟，並重新進行配對。若仍無法連線，建議查看教學影片或聯繫客服協助排查。',
  },
  {
    keywords: ['充電', '電量', '續航', '沒電', '充不進去'],
    answer:
      '充電與續航會依使用方式、音量、通話時間與環境有所不同。若遇到充電異常，建議先確認充電線、接點與電源來源；若仍無法改善，可聯繫客服協助確認。',
  },
  {
    keywords: ['價格', '售價', '多少錢', '報價', '費用'],
    answer:
      '目前 App 第一版採預約了解與專人說明模式，沒有直接顯示售價。不同需求可能涉及個人、企業或通路方案，建議留下預約資訊，由專人提供較準確的說明。',
  },
  {
    keywords: ['庫存', '現貨', '有貨', '缺貨', '到貨'],
    answer:
      '庫存與到貨狀況會隨時間變動，AI 無法保證即時庫存。建議透過預約或客服確認目前可提供的款式、顏色與服務安排。',
  },
  {
    keywords: ['預約', '試戴', '了解', '聯絡', '專人'],
    answer:
      '可以的。您可以到「預約」頁面留下姓名、手機、LINE、想了解的產品與方便時間，後續會由專人協助說明。若有特定款式或顏色，也可以在備註中先寫清楚。',
  },
  {
    keywords: ['企業', '大量', '採購', '團購', '公司', '通路', '合作'],
    answer:
      '若是企業採購、團購、通路合作或大量需求，建議直接留下預約資訊，並在備註中說明數量、用途與合作方向，專人會依需求協助確認方案。',
  },
  {
    keywords: ['客服', '真人', '電話', 'line', '賴', '聯繫'],
    answer:
      '若需要真人協助，可以透過 App 內客服資訊聯繫。客服時間為每日 10:00 - 18:00，電話與 LINE ID 可在預約頁或客服區查看。',
  },
  {
    keywords: ['隱私', '個資', '資料', '安全', '電話會不會外流'],
    answer:
      '預約表單收集的姓名、電話、LINE 與需求資訊，主要用於產品諮詢、預約聯繫與客服回覆。實際資料使用仍依 App 內隱私權政策與服務條款為準。',
  },
];

const typoMap = {
  藍芽: '藍牙',
  眼靜: '眼鏡',
  智慧眼靜: '智慧眼鏡',
  保固期: '保固',
  換貨: '換新',
  修理: '維修',
  價錢: '價格',
  賴: 'line',
  聯絡: '聯繫',
};

export function answerAiQuestion(input) {
  const text = String(input || '').trim().toLowerCase();
  if (!text) return '';

  let normalized = text;
  Object.entries(typoMap).forEach(([wrong, right]) => {
    normalized = normalized.replaceAll(wrong.toLowerCase(), right.toLowerCase());
  });

  let best = null;
  let bestScore = 0;

  aiKnowledge.forEach((item) => {
    let score = 0;
    item.keywords.forEach((kw) => {
      const key = String(kw).toLowerCase();
      if (normalized.includes(key)) score += key.length >= 4 ? 3 : 2;
      if (key.includes(normalized) && normalized.length >= 2) score += 1;
    });

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  });

  if (best && bestScore > 0) return best.answer;

  return aiFallbackAnswer;
}

export const aiQuickQuestions = [
  ['這個 App 是做什麼的？', answerAiQuestion('這個 App 是做什麼的')],
  ['我不知道該選哪一款？', answerAiQuestion('我不知道該選哪一款')],
  ['方形和圓形怎麼選？', answerAiQuestion('方形和圓形怎麼選')],
  ['商務場合推薦哪一款？', answerAiQuestion('商務場合推薦哪一款')],
  ['有哪些顏色可以選？', answerAiQuestion('有哪些顏色')],
  ['保固怎麼算？', answerAiQuestion('保固')],
  ['產品故障怎麼處理？', answerAiQuestion('故障')],
  ['可以預約試戴或了解嗎？', answerAiQuestion('預約')],
  ['企業採購可以嗎？', answerAiQuestion('企業採購')],
  ['如何聯繫真人客服？', answerAiQuestion('真人客服')],
];
