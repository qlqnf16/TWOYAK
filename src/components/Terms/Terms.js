import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { BasicButton } from "../UI/SharedStyles";

const termOfUse = {
  title: "'투약-의약품 복용 이력과 안전 정보를 한눈에!' 이용약관",
  paragraph: [
    {
      key: "1. 제 1조 (목적)",
      value: [
        "본 약관은 정도전이 제공하는 투약 – 나만의 처방전 관리 비서 서비스(이하 “서비스”)의 이용과 관련하여 이용에 관한 권리, 의무, 책임 등의 기본적인 사항을 규정함을 목적으로 합니다."
      ]
    },
    {
      key: "2. 제 2조 (용어 정의)",
      value: [
        "본 약관에서 사용하는 용어의 정의는 다음과 같습니다.",
        "① “서비스”라 함은 스마트폰 및 웹사이트를 통하여 제공하는 투약 서비스 및 관련 제반 서비스를 의미합니다.",
        "② “회원”이라 함은 본 약관에 따라 서비스 이용계약을 체결하고 정도전이 제공하는 “서비스”를 이용하는 고객을 의미합니다(경우에 따라서는 고객, 이용자를 지칭하는 개념으로 사용하기도 한다).",
        "③ “이메일(email)”이라 함은 “회원”의 식별과 “서비스” 이용을 위하여 “회원”이 기입하게 되는 아이디를 의미합니다.",
        "④ “비밀번호”라 함은 “회원”이 “이메일”과 일치되는 회원임을 확인하고 “회원”의 비밀보호를 위해 “회원” 자신이 정한 문자 또는 숫자의 조합을 의미합니다.",
        "⑤ “게시물”이라 함은 “회원”이 서비스를 이용함에 있어 “회원”이 게시한 문자, 문서, 그림, 음향, 링크, 화상, 동영상 및 이들의 조합으로 이루어진 정보나 자료를 의미합니다."
      ]
    },
    {
      key: "3. 제 3조 (약관의 게시)",
      value: [
        "① 정도전은 본 약관의 내용을 “회원”이 알기 쉽도록 약관 문서에 대한 링크를 “서비스” 모바일 앱 및 사이트 등에 게시합니다.",
        "② 정도전은 약관 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호등에 관한 법률(이하 “정보통신망법”), 위치정보의 보호 및 이용 등에 관한 법률(“위치정보법”) 등 관련법을 위해바지 않는 범위에서 본 약관을 변경할 수 있습니다.",
        "③ 정도전은 약관 변경 시 적용일자 및 개정사유를 명시하며 현행약관과 함께 제1항의 방식에 따라 게시합니다. 변경된 약관은 적용일자 14일 전부터 공지합니다. “회원”의 권리, 의무에 중대한 영향을 주는 변경이 아닌 경우에는 적용일자 3일 전부터 공지합니다."
      ]
    },
    {
      key: "4. 제 4조 (약관의 효력 및 개정)",
      value: [
        "① 이 약관은 “서비스”를 신청한 회원이 본 약관에 동의함으로써 효력이 발생합니다.",
        "② 회원이 본 “서비스” 이용을 위해 가입하는 경우, 본 약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로 간주합니다.",
        "③ 정도전은 합리적인 사유가 발생할 경우에 관련법령을 위배하지 않는 범위 내에서 이 약관을 변경할 수 있습니다.",
        "④ 정도전은 이 약관을 변경할 경우에는 적용일 및 개정사유를 명시하여 현행약관과 함께 그 적용일자 이전에 사이트 “공지사항”을 통해 고지합니다.",
        "⑤ 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있습니다. 특별한 사정이 없는 한 변경된 약관의 효력 발생일로부터 7일 이후에도 거부의사를 표시하지 아니하고 “서비스”를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주합니다.",
        "⑥ 1항 내지 5항의 절차에 따라 변경된 약관에 대한 정보를 알지 못해 발생하는 “회원”의 피해는 정도전에서 책임지지 않습니다."
      ]
    },
    {
      key: "5. 제 5조 (약관의 해석)",
      value: [
        "① 정도전은 필요한 경우 “서비스” 내의 개별 항목에 대하여 개별 약관 또는 운영원칙(“이하 서비스 개별 약관”이라 함)을 정할 수 있습니다. 본 약관과 서비스 개별 약관의 내용이 상충되는 경우에는 “서비스 개별 약관”의 내용을 우선하여 적용합니다.",
        "② 본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 공정거래법 등 기타 관계법령 및 정도전이 정한 서비스에 관한 별도의 약관, 이용규정 또는 세부이용지침 등의 규정에 따릅니다."
      ]
    },
    {
      key: "6. 제 6조 (이용계약의 체결)",
      value: [
        "① 이용계약은 “회원”이 되고자 하는 자(이하 “가입신청자”)가 약관 및 개인정보취급방침의 내용에 대하여 동의 후 회원가입신청을 하고 정도전이 승낙함으로써 성립됩니다.",
        "② 이용계약의 성립 시기는 정도전이 가입완료를 신청절차 상에서 표시한 시점으로 합니다."
      ]
    },
    {
      key: "7. 제 7조 (이용계약의 유보)",
      value: [
        "① 정도전은 “가입신청자”의 신청에 대하여 “서비스” 이용을 승낙함을 원칙으로 합니다. 단 정도전은 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용 계약을 해지할 수 있습니다.",
        "- “가입신청자”가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우. 단, 회원자격 상실 후 1년이 경과한 자로서 정도전의 회원 재가입 승낙을 얻은 경우는 예외로 함",
        "- 허위의 정보를 기재하거나, 정도전이 제시하는 내용을 기재하지 않은 경우",
        "- 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하여 신청하는 경우",
        "② 정도전은 다음 각 호에 해당하는 신청에 대하여는 회원가입 신청에 대한 승인제한 사유가 해소될 때까지 승인을 제한할 수 있습니다.",
        "- “서비스” 관련 설비의 여유가 없어 만족스러운 “서비스”를 제공할 수 없다고 판단될 경우",
        "- 시스템에 대한 공격 등 회원 등록이 정도전의 기술상 일시적으로 지장이 있다고 판단되는 경우",
        "- “서비스” 상의 장애가 발생한 경",
        "- 상기사유 이외의 기술상 또는 업무상 문제가 있는 경우",
        "③ 정도전은 상기 항의 승인제한 사유 해소를 위하여 노력합니다. 상기 항에 따라 회원 가입 신청의 승낙을 하지 아니하거나 유보한 경우, 정도전은 원칙적으로 이를 “가입신청자”에게 알리도록 합니다."
      ]
    },
    {
      key: "8. 제 8조 (이용계약의 해지)",
      value: [
        "① “회원”은 “서비스”에서 제공하는 방법을 통하여 언제든지 직접 회원탈퇴를 신청할 수 있으며, 정도전은 관련법 등이 정하는 바에 따라 이를 처리하여야 합니다.",
        "② “회원”이 회원의 의무로 규정된 의무를 이행하지 않은 경우, 정도전은 회원자격을 제한 또는 정지시키거나 이용계약을 해지할 수 있습니다.",
        "③ 정도전은 회원이 자격을 제한 또는 정지시킨 이후 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 회사는 해당 회원의 자격을 상실시킬 수 있습니다.",
        "④ 정도전이 회원의 자격을 상실시키는 경우, 정도전은 “회원”에게 이를 통지한 이후 소명할 기회를 부여합니다.",
        "⑤ “회원”이 계약을 해지할 경우, 해지 즉시 “회원”이 가입신청시 기입했던 모든 정보는 소멸됩니다. 다만 관련법 및 개인정보취급방침에 따라 정도전이 회원정보를 보유하는 경우는 예외로 합니다.",
        "⑥ “회원”이 계약을 해지할 경우, “회원”이 작성한 “게시물” 중 본인의 “이메일”로 등록된 게시물은 삭제되지 않으므로 사전에 삭제 후 탈퇴하셔야 합니다.",
        "⑦ “회원”은 본 조항의 정도전의 조치에 대하여 “서비스” 고객센터를 통해 이의신청을 할 수 있으며, “회원”의 이의가 정당하다고 정도전이 인정하는 경우 정도전은 즉시 “서비스”의 이용을 재개합니다."
      ]
    },
    {
      key: "9. 제 9조 (회원정보의 보호)",
      value: [
        "① 정도전은 “정보통신망법” 등 관계 법령이 정하는 바에 따라 “회원”의 개인정보를 보호하기 위해 노력합니다.",
        "② 개인정보의 보호 및 사용에 대해서는 관련법 및 본 “서비스” 관련 정도전의 개인정보취급방침이 적용됩니다."
      ]
    },
    {
      key: "10. 제 10조 (“회원”과 정도전 간의 통지)",
      value: [
        "① 정도전과 회원에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 “서비스” 내 전자우편주소, “서비스” 내 푸시알림, 전자메세지 등을 이용할 수 있습니다.",
        "② 정도전은 “회원” 전체에 대한 통지의 경우 7일 이상 “서비스” 사이트 또는 장소상의 공지사항에 게시함으로써 제1항의 통지에 갈음할 수 있습니다."
      ]
    },
    {
      key: "11.제 11조 (정도전의 의무)",
      value: [
        "① 정도전은 지속적이고 안정적인 “서비스” 제공을 위하여 최선을 다합니다. 단, 정도전은 “서비스”를 제공하는 설비의 보수, 교체, 고장, 통신두절, 정기점검 또는 운영상 필요에 의한 목적으로 “서비스”를 일시 중지할 수 있습니다.",
        "② 정도전은 “회원”으로부터 제기된 “서비스” 이용과 관련된 의견이나 불만이 정당하다고 객관적으로 인정되는 경우 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우 “회원”에게 그 사유와 처리일정을 통보하여야 합니다.",
        "③ 정도전은 “회원”이 안전하게 “서비스”를 이용할 수 있도록 보안 시스템을 구축하며 개인정보보호정책을 공시하고 준수합니다.",
        '<p style="font-weight: 800; margin: 0;">④	정도전은 “서비스” 운영에 필요한 공지 이외의 광고성 이메일, 알림을 발송할 수 있습니다.</p>',
        "⑤ 정도전은 “정보통신망법” 등 관계 법령이 정하는 바에 따라 “회원”의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 “서비스” 관련 정도전의 개인정보취급방침이 적용됩니다.",
        "⑥ 정도전은 정보통신망 이용촉진 및 정보보호에 관한 법률, 통신비밀보호법, 전기통신사업법 등 “서비스”의 운영, 유지와 관련 있는 법규를 준수합니다."
      ]
    },
    {
      key: "12. 제 12조 (“회원”의 의무)",
      value: [
        '<p style="font-weight: 800; margin: 0;">①	“회원”이 회원가입신청 및 회원정보 변경시 정보를 허위로 등록하거나 타인의 정보를 등록하는 경우, 일체의 권리를 주장할 수 없습니다.</p>',
        '<p style="font-weight: 800; margin: 0;">②	“회원”은 “서비스”를 이용하며 얻은 정보를 정도전의 사전승낙 없이 영리목적으로 이용하거나 제3자에게 이용하게 해서는 안 됩니다.</p>',
        "③ “회원”은 약관에서 규정하는 사항과 기타 정도전이 정한 제반 규정, 공지사항 등 정도전이 공지하는 사항 및 관계 법령을 준수하여야 하며, “회원”은 정도전에서 제공하는 “서비스”를 “서비스” 본래의 이용 목적 이외의 용도로 사용하면 안 됩니다.",
        "④ “회원”은 본 약관 및 관계법령을 준수해야 하며, 기타 정도전의 명예를 손상시키거나 업무수행에 현저한 지장을 초래하는 행위를 해서는 안 됩니다.",
        "⑤ “회원”은 다음 행위를 하여서는 아니되며, 해당 행위를 하는 경우 정도전은 “회원”의 서비스이용제한 및 법적조치를 포함한 제재를 가할 수 있습니다.",
        "- 정도전, “서비스”의 운영자를 사칭하거나 정도전의 임직원을 사칭하는 행위",
        "- 타인의 “이메일”을 도용하는 행위 및 타인과의 관계를 허위로 명시하는 행위",
        "- 해킹 행위를 통해 타인의 “이메일” 및 인증 정보를 취득하는 행위",
        "- 프로그램 등록, 아르바이트 고용 등 비정상적인 방법을 통하여 계정을 대량을 생성하는 행위",
        "- 프로그램상의 버그 및 이에 준하는 것을 이용하여 “서비스”를 이용하는 행위",
        "- 정도전의 업무에 방해가 되는 행위",
        "- 정도전의 명예를 손상시키는 행위",
        "- 악의적 목적으로 본 “서비스”의 게시물을 통해 제3자의 명예를 훼손시키는 행위"
      ]
    },
    {
      key: "13.  제 13조 (“서비스”의 제공)",
      value: [
        "① 정도전은 “회원”에게 아래와 같은 “서비스”를 제공합니다.",
        "- 복용 의약품 입력하기: 사진찍기 혹은 직접 입력하기를 통해 의약품 및 건강기능식품을 기록할 수 있습니다.",
        "- 복용 이력 관리하기: 과거, 현재 복용 중인 의약품과 건강기능식품 내역을 확인하고 관리합니다.",
        "- 현재 복용 중인 성분들간 상호작용 및 의약품안전정보(DUR) 확인하기: 내가 복용 중인 약물 성분간 상호작용과 DUR 정보를 공공데이터를 이용하여 제공합니다.",
        "- 나의 건강 리포트: 나의 투약 이력을 비롯한 건강 정보를 의사 진료 등에 활용할 수 있도록 정리하여 제공합니다.",
        "- 의약품 안전 속보: 식품의약품안전처 고시 등 의약품 제반 정보를 신속하게 제공합니다.",
        "② “서비스”는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.",
        "③ 정도전은 “서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 “서비스” 제공 화면에 공지한 바에 따릅니다."
      ]
    },
    {
      key: "14. 제 14조 (“서비스” 이용 요금)",
      value: [
        '<p style="font-weight: 800; margin: 0;">정도전은 “회원”이 “서비스”를 사용함에 있어 별도의 요금(정보이용료 등)을 부과하지 않습니다. 다만, “서비스”의 부가서비스 이용요금 및 “서비스” 이용 과정 중에 발생하는 통신요금은 “회원”이 부담합니다.</p>'
      ]
    },
    {
      key: "15. 제 15조 (개인정보 연구목적 등에의 제공)",
      value: [
        '<p style="font-weight: 800; margin: 0;">정도전에서 관련법령 등에 근거하여 수집한 “회원”의 개인정보는 개인정보보호법 제18조 제2항 제4호에 근거하여 통계작성 및 학술연구 또는 시장조사 등의 목적을 위하여 필요한 경우 특정 개인을 알아볼 수 없는 형태로 가공하여 목적 외의 용도로 이용하거나 제3자에게 제공할 수 있습니다.</p>'
      ]
    }
  ]
};

const TermOfInfo = {
  title: "개인정보 수집 및 이용에 대한 안내",
  description:
    "정보통신망법 규정에 따라 투약에 회원가입 신청하시는 분께 수집하는 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간 등을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.",
  paragraph: [
    ,
    {
      key: "1. 개인정보 처리 목적",
      value: [
        "정도전은 수집한 개인정보를 다음의 목적을 위해 활용합니다.",
        "이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며 이용",
        "목적이 변경될 시에는 동의를 구할 것입니다",
        "처방전 사진 전송 또는 직접 입력을 통한 의약품 이력 생성",
        "과거, 현재 복용 중인 의약품 및 건강기능식품 관리 서비스 제공",
        "건강 컨텐츠 및 임상연구정보 제공",
        "의약품안전사용정보(DUR) 제공",
        "‘투약 – 나만의 처방전 관리 비서’ 웹/모바일 서비스 제공을 위한 회원정보 연동",
        "서비스 이용에 대한 통계",
        "온라인 상담 답변 처리를 위한 자료",
        "신규 서비스 개발과 개인 맞춤 서비스 제공을 위한 자료",
        "소비자 기본법 제 52조에 의거한 소비자 위해 정보 수집",
        "통계작성 및 학술연구 또는 시장조사 등에 필요한 교육, 연구 자료",
        "채용 시 본인확인, 입사전형, 지원서 수정, 합격 여부 확인, 채용 자격요건 확인",
        "서비스 품질 개선을 위한 자료 수집"
      ]
    },
    {
      key: "2. 개인정보 처리 및 보유기간",
      value: [
        '<p style="font-weight: 800;">정도전은 원칙적으로 개인정보의 수집목적 또는 제공받은 목적이 달성된 때에는 귀하의 개인정보를 지체 없이 파기합니다.</p>',
        '<p style="font-weight: 800;">회원가입정보의 경우: 회원가입을 탈퇴하거나 회원에서 제명된 때</p>',
        '<p style="font-weight: 800;">채용되지 않은 경우: 채용절차 종료 후 6개월</p>',
        '<p style="font-weight: 800;">설문조사, 행사 등의 목적을 위하여 수집한 경우: 당해 설문조사, 행사 등이 종료한 때</p>',
        '<p style="font-weight: 800;">(비식별화 된 정보의 경우 서비스 개선을 위한 목적으로 계속 보관이 가능)</p>',
        '<p style="font-weight: 800;">전자상거래 등에서 소비자 보호에 관한 법률에 따른 정보의 경우:</p>',
        '<p style="font-weight: 800;">- 계약 또는 청약철회 등에 관한 기록: 5년 보관</p>',
        '<p style="font-weight: 800;">- 대금결제 및 재화 등의 공급에 관한 기록: 5년 보관</p',
        '<p style="font-weight: 800;">- 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 보관</p>',
        '<p style="font-weight: 800;">전자금융거래법에서 규정하고 있는 정보의 경우:</p>',
        '<p style="font-weight: 800;">- 전자금융에 관한 기록: 5년 보관</p>'
      ]
    },
    {
      key: "3. 개인정보의 제3자 제공에 관한 사항",
      value: [
        '<p style="font-weight: 800; margin: 0;">정도전은 귀하의 동의가 있거나 관련법령의 규정에 의한 경우를 제외하고는 고지한 범위를 넘어 귀하의 개인정보를 이용하거나 타인 또는 타기업·기관에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>',
        '<p style="font-weight: 800;">이용자들이 사전에 공개에 동의한 경우 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</p>',
        '<p style="font-weight: 800;">통계작성·학술연구 또는 시장조사 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 가공하여 제공하는 경우</p>'
      ]
    },
    {
      key: "4. 정보주체와 법정대리인의 권리/의무 및 그 행사방법에 관한 사항",
      value: [
        "1) 정도전은 고객이 개인정보에 대한 열람, 정정 및 삭제를 요구하는 경우에는 고객의 요구에 성실하게 응대하고, 지체없이 처리합니다. 개인정보를 보호하기 위하여 가입된 이메일의 인증 절차를 거치며 이외의 전화·우편 등 기타 신청방법에 의한 고객의 개인정보의 열람, 정정 및 삭제 절차는 제공하지 않습니다.",
        "[개인정보의 열람]",
        "- 고객은 가입된 이메일을 통해서 개인정보의 열람을 요구할 수 있으며, 신속하게 이에 대하여 응대합니다.",
        "[개인정보의 정정·삭제]",
        "- 정도전은 고객이 개인정보에 대한 정정·삭제를 요구하는 경우, 개인정보에 오류가 있다고 판명되는 등 정정·삭제를 할 필요가 있다고 인정되는 경우에는 지체없이 정정·삭제를 합니다. 정도전은 정정·삭제 내용의 사실 확인에 필요한 증빙자료를 요청할 수 있습니다.",
        "2) 정도전은 개인정보의 전부 또는 일부에 대하여 열람, 정정 및 삭제를 거절할 정당한 이유가 있는 경우에는 고객에게 이를 통지하고 그 이유를 설명합니다."
      ]
    },
    {
      key: "5. 아동의 개인정보보호",
      value: [
        '<p style="font-weight: 800; margin: 0;"">투약 서비스는 만14세 미만 아동의 회원가입을 받지 않고 있습니다. 허위 정보로 가입을 하는 것은 서비스 약관을 위반하는 것으로 제재를 받을 수 있습니다.</p>'
      ]
    },
    {
      key: "6. 처리하는 개인정보의 항목",
      value: [
        "정도전은 회원가입 시 서비스 이용을 위해 필요한 최소한의 개인정보만을 수집합니다.",
        "귀하가 정도전의 서비스를 이용하기 위해서는 회원가입 시 필수항목과 선택항목이 있는데, 선택항목은 입력하지 않더라도 서비스 이용에는 제한이 없습니다.",
        "[회원가입 시 수집항목]",
        "필수항목: 이메일, 비밀번호, 닉네임",
        "선택항목: 생년월일, 성별, 흡연여부, 음주 정도, 카페인 섭취 정도",
        "서비스 이용 과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.",
        "서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보",
        "서비스 목적을 달성하기 위해 정도전은 이용자로부터 아래와 같은 정보를 제공받을 수 있습니다.",
        "- 가족력, 질병 이력, 의약품 및 건강기능식품 복용 이력, 처방전 사진, 의약품 및 건강기능식품 복용·사용 후기 및 그에 포함된 사진",
        "* 그 외 특정 목적을 위해 특정 목적을 위해 단기적으로 개인정보를 수집할 경우에는 별도로 공지하고 수집합니다.",
        "[입사지원 시 수집항목]",
        "이름, 생년월일, 성별, 비밀번호, 전화번호, 휴대폰번호, 국적, 이메일, 사진, 주소, 취미, 특기, 장애여부, 혼인여부, 수상경력, 학력사항, 성적, 가족사항, 자격사항, 경력사항",
        "[개인정보 수집방법]",
        "다음과 같은 방법으로 개인정보를 수집합니다.",
        "홈페이지, 모바일, 서면양식, FAX, 전화, 상담 게시판, 이메일, 이벤트 응모",
        "생성정보 수집 툴을 통한 수집(방문자 분석 툴과 같은 수집 툴)"
      ]
    },
    {
      key: "7. 개인정보 파기에 관한 사항",
      value: [
        "정도전은 개인정보 처리 목적이 달성된 후에는 원칙적으로 개인정보를 즉시 파기합니다.",
        "[파기절차]",
        "이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 파기방법에 의하여 즉시 파기합니다.",
        "[파기방법]",
        "회원가입 정보는 정보가 저장된 데이터베이스 서버에서 삭제됩니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다."
      ]
    },
    {
      key: "8. 동의철회 / 회원탈퇴 방법",
      value: [
        "귀하는 회원가입 시 개인정보의 수집·이용 및 제공에 대해 동의하신 내용을 언제든지 철회하실 수 있습니다. 회원탈퇴는 서비스 화면에서 회원탈퇴를 클릭하거나 가입하신 이메일을 통하여 요청하실 수 있습니다."
      ]
    },
    {
      key: "9. 개인정보보호책임자에 관한 사항",
      value: [
        "정도전은 귀하의 개인정보를 보호하고 개인정보와 관련한 신속하게 처리할 수 있도록 아래와 같이 개인정보보호책임자를 두고 있습니다.",
        "[개인정보보호책임자]",
        "책임자: 박승준",
        "이메일: tino7060@korea.ac.kr"
      ]
    },
    {
      key: "10. 정보주체의 권익침해에 대한 구제방법",
      value: [
        "“정보주체”는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다. 아래의 기관은 정도전과는 별개의 기관으로서, 정도전의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.",
        "",
        "개인정보 침해신고센터 (한국인터넷진흥원 운영)",
        "소관업무: 개인정보 침해사실 신고, 상담 신청",
        "홈페이지: privacy.kisa.or.kr",
        "전화: (국번없이) 118",
        "주소: (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층",
        "대검찰청 사이버범죄수사단 (www.spo.go.kr)",
        "경찰청 사이버안전국 (cyberbureau.police.go.kr)"
      ]
    },
    {
      key: "11. 개인정보의 안전성 확보조치에 관한 사항",
      value: [
        "[개인정보의 암호화]",
        "이용자의 개인정보 중 비밀번호는 암호화 되어 저장 및 관리되고 있어 본인만이 알 수 있습니다.",
        "[개인정보에 대한 접근 제한]",
        "개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 취하고 있습니다."
      ]
    },
    {
      key: "12.  개인정보 처리방침의 변경에 관한 사항",
      value: [
        "이 개인정보처리방침은 2019년 3월 13일에 제정되었으며 내용의 추가·삭제 및 수정이 있을 시에는 변경되는 개인정보처리방침을 시행하기 최소 7일전에 투약 홈페이지를 통해 공지하도록 하겠습니다."
      ]
    }
  ]
};

const TermContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TermWrapper = styled.div`
  padding-top: 24px;
`;

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
`;

const Index = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

const GobackButton = styled(BasicButton)`
  position: fixed;
  bottom: 1.25rem;
  z-index: 300;
`;

function TermsOfUse({ routes }) {
  const TermOfUseParagraph = (
    <TermWrapper>
      <Header>{termOfUse.title}</Header>
      <br />
      {termOfUse.paragraph.map((i, k) => (
        <div key={k}>
          <Index>{i.key}</Index>
          {i.value.map((j, l) => (
            <div style={{ textAlign: "left" }} key={l}>
              {ReactHtmlParser(j)}
            </div>
          ))}
          <br />
        </div>
      ))}
    </TermWrapper>
  );

  const TermOfInfoParagraph = (
    <TermWrapper>
      <Header>{TermOfInfo.title}</Header>
      <br />
      {TermOfInfo.paragraph.map((i, k) => (
        <div key={k}>
          <Index>{i.key}</Index>
          {i.value.map((j, l) => (
            <div style={{ textAlign: "left" }} key={l}>
              {ReactHtmlParser(j)}
            </div>
          ))}
          <br />
        </div>
      ))}
    </TermWrapper>
  );

  return (
    <TermContainer>
      {routes.match.params.id === "use"
        ? TermOfUseParagraph
        : TermOfInfoParagraph}
      <GobackButton onClick={() => routes.history.goBack()}>
        확인완료
      </GobackButton>
    </TermContainer>
  );
}

export default TermsOfUse;
