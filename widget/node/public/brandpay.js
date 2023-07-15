// API 키 설정
// 문서: https://docs.tosspayments.com/guides/brandpay/integration#api-키-설정-및-sdk-준비
const clientKey = 'test_ck_7XZYkKL4MrjaGOZ6xNkV0zJwlEWR';
const customerKey = 'user_2'; // 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID로 변경하세요.

// brandpay 초기화
const brandpay = BrandPay(clientKey, customerKey, {
  // redirectUrl: window.location.origin + '/callback-auth',
  redirectUrl : 'http://localhost:4000/api/order/callback-auth'
});

// 결제 위젯 객체
let paymentMethodsWidget = null;

initialize();

async function initialize() {
  // 결제 수단 위젯 객체 초기화
  paymentMethodsWidget = brandpay.createPaymentMethodsWidget({ amount: 50000 });

  // 결제 수단 위젯 렌더
  paymentMethodsWidget.render('#payment-methods-widget', {
    ui: {
      promotionSection: {
        summary: {
          visible: false,
        },
        description: {
          visible: false,
          defaultOpen: false,
        },
      },
    },
  });
}

// document
//   .querySelector('#payment-form')
//   .addEventListener('submit', handleSubmit);
// document.querySelector('#button').addEventListener('click', updateAmount);
// document.querySelector('#button2').addEventListener('click', handleSubmit2);
document.querySelector('#addPaymentMethod1').addEventListener('click', addPaymentMethod1);
document.querySelector('#addPaymentMethod2').addEventListener('click', addPaymentMethod2);

// 결제 금액 업데이트
async function updateAmount(e) {
  e.preventDefault();
  paymentMethodsWidget.updateAmount(45000);
}

// 결제 하기
async function handleSubmit(e) {
  e.preventDefault();

  // 위젯 결제 정보
  const widgetPaymentParams = paymentMethodsWidget.getPaymentParams();

  await brandpay.requestPayment({
    orderId: 'ORDER_ID', // 주문에 대한 고유한 ID 값
    orderName: '생수 외 1건', // 결제에 대한 주문명
    successUrl: window.location.origin + '/success',
    failUrl: window.location.origin + '/fail',
    ...widgetPaymentParams,
  });
}
// 자동결제 약관동의 하기
async function handleSubmit2(e) {
  console.log("----------")
  alert("")
  e.preventDefault();
  console.log(brandpay)
  brandpay
      .requestAgreement('빌링') // 자동결제 선택 약관 동의 호출
      .then(function () {
        // 성공 처리
        console.log("성공한건가")
      })
      .catch(function (error) {
        console.log(error)
        if (error.code === 'USER_CANCEL') {
          // 사용자가 창을 닫아 취소한 경우에 대한 처리
        }
      })
}
// 카드에 대한 결제수단 등록
async function addPaymentMethod2(e) {
  console.log("asf")
  brandpay
      .addPaymentMethod('카드')
      .then(function (methods) {
        // 성공 처리
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          // 사용자가 결제창을 닫은 경우 에러 처리
        }
      })
}
// 계좌에 대한 결제수단 등록
async function addPaymentMethod1(e) {
  console.log("asf")
  brandpay
      .addPaymentMethod('계좌')
      .then(function (methods) {
        // 성공 처리
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          // 사용자가 결제창을 닫은 경우 에러 처리
        }
      })
}