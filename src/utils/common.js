// 공통 함수
// 날짜 출력 등에서 0 padding을 사용하기 위해
export function datePadding(n, digits) {
    var zero = '';
    var i = 0;
    n = n.toString();
  
    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }

    return zero + n;
}

// 공통 함수
// DynamoDB에는 empty string을 입력 못하기 때문에 적당한 값으로 변경해 주어야 함.
export function convertStringToDynamo(str) {

    if(str === undefined || str === "") {
        str = "*empty*"
    }

    return str;
}
export function convertDynamoToString(str) {
    return str.replace("*empty*", "");
}