<template>
    <div class="Customer-Doc" name="CustomerDoc">

      <div class="CustDoc-Group">
        <div class="Title-Section Section-Y">
          <div class="vertical-text">카<br>센<br>터<br>정<br>보</div>
        </div>
        <div class="Title-Conts">
          <div class="UserInfo-img">
            <img src="@/assets/user-icon.png">
          </div>
          <div class="UserInfo-info">
            <div class="info-name">No.1 카센터</div>
            <div class="info-tel">02-266-5011</div>
            <div class="info-addr">서울 성남시 분당구 성남대로343번길 9</div>
            <hr>
            <div class="info-rate">
              <div class="rate-title">카센터 평점</div>
              <div class="rate-star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> (4.9)</div>
            </div>
            <div class="info-RORecord">최근 6개월 주요 정비 이력</div>
            <div class="info-brand">
              <span class="mdl-badge" data-badge="31">AUDI</span>&nbsp;&nbsp;&nbsp;
              <span class="mdl-badge" data-badge="85">BMW</span>&nbsp;&nbsp;&nbsp;
              <span class="mdl-badge" data-badge="6">VOLVO</span>
            </div>
          </div>
        </div>
        <div class="Title-Tail"/>
      </div>

      <div class="CustDoc-Group">
        <div class="Title-Section Section-G">
          <div class="vertical-text">차<br>량</div>
        </div>
        <div class="Title-Conts">
          <div class="Car-info">
            <div class="info-CarNo">29구3541</div>
            <div class="info-CarVin">차대번호 : WDDHF5EB0BA278828</div>
            <div class="info-tel">상세차종 : BMW 520d</div>
          </div>
        </div>
        <div class="Title-Tail"/>
      </div>

      <div class="CustDoc-Group">
        <div class="Title-Section Section-R">
          <div class="vertical-text">정<br>비<br>내<br>역</div>
        </div>
        <div class="Title-Conts">
          <div class="RO-Desc">
            <div class="Desc-Title">정비일자</div>
            <div class="Desc-Date">2019-08-22</div>
            <div class="Desc-Title">정비항목</div>
            <div class="Desc-Item"><i class="fas fa-wrench"></i> 엔진오일 교환 (에어,오일필터)</div>
            <div class="Desc-Amount">65,000원</div>
            <div class="Desc-Item"><i class="fas fa-wrench"></i> 브레이크 교환</div>
            <div class="Desc-Amount">78,000원</div>
            <div class="Desc-ItemTotal">총 합계</div>
            <div class="Desc-AmountTotal">143,000원</div>
            <div class="Desc-Title">기타메모</div>
            <div class="Desc-Memo">타이어도 많이 마모된 거 같습니다.<br>6개월 내에는 교환이 필요해 보입니다.</div>
          </div>
        </div>
        <div class="Title-Tail"/>
      </div>
      <div class="CustDoc-submit">
        <router-link class="submit-OK" to="">
          <b-button class="submit-btn">확인</b-button>
        </router-link >
      </div>
      <br><br><br>
    </div>
</template>

<script>

export default {
  name: 'CustomerDoc',
  data () {
    return {
    }
  },
  methods: {

  },
  components: {

  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
#696565 : 더 짙은 브라운
#afabab : 짙은 부라운
#fcf4df : 베이지
#ff9999 : 옅은 붉은색
#acd3ce : 옅은 녹색
#967d5f : 옅은 브라운
*/
.Customer-Doc {
  padding-top: 65px;
}

.CustDoc-Group {
  width: 90%;
  margin:auto;
  min-height: 50px;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  border-radius: 20px;
  margin-bottom: 20px;
}

.CustDoc-Group .Title-Section {
  flex: 15%;
  border: 1px solid #999;
  border-right: 1px solid #ddd;
  border-radius: 20px 0px 0px 20px;
  padding: 10px;
}
.Section-Y {
  background-color: #fcf4df;
}
.Section-G {
  background-color: #acd3ce;
}
.Section-R {
  background-color: #ff9999;
}
.vertical-text {
    text-align: center;
    font-weight: bold;
}
.CustDoc-Group .Title-Conts {
  flex: 80%;

  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  padding: 10px;
  padding-right: 0px;
}
.CustDoc-Group .Title-Tail {
  flex: 5%;

  border: 1px solid #999;
  border-left: none;
  border-radius: 0px 20px 20px 0px;
  padding: 10px;
}

.UserInfo-img {
  margin:auto;
  width: 90%;
  text-align: center;
}

.UserInfo-info {
  text-align: center;
}

.UserInfo-info .info-name {
  font-weight: bold;
  font-size: 1.3rem;
  color: #455a63;
}
.UserInfo-info .info-tel {
  margin-top: 5px;
  font-weight: bold;
  color: #5d4038;
}
.UserInfo-info .info-addr {
  margin-top: 5px;
  font-size: 0.9rem;
}
.UserInfo-info .info-rate {
  font-size: 0.9rem;
  color: #999;
  text-align: left;
  display: flex;
  margin-bottom: 5px;
}
.UserInfo-info .rate-title {
  flex: 50%;
  text-align: left;
}
.UserInfo-info .rate-star {
  flex: 50%;
  text-align: right;
}


.UserInfo-info .info-RORecord {
  font-size: 0.9rem;
  color: #999;
  text-align: left;
  margin-bottom: 10px;
}
.UserInfo-info .info-brand {
  font-size: 0.9rem;
  color: #acd3ce;
  text-align: right;
}


.Car-info .info-CarNo {
  font-weight: bold;
  font-size: 1.2rem;
  color: #5d4038;
}
.Car-info .info-CarVin {
  font-size: 0.9rem;
  color: #999;
}
.Car-info .info-tel {
  font-size: 0.9rem;
  color: #999;
}


.RO-Desc .Desc-Title {
  font-weight: bold;
  font-size: 1.1rem;
  color: #5d4038;
}

.RO-Desc .Desc-Date {
  margin-left: 15px;
  color: #999;
  margin-bottom: 15px;
}
.RO-Desc .Desc-Item {
  margin-left: 15px;
  font-size: 0.9rem;
  color: #999;
}
.RO-Desc .Desc-Amount {
  text-align: right;
  font-size: 0.9rem;
  color: #999;
}
.RO-Desc .Desc-ItemTotal {
  margin-left: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  color: #999;
}
.RO-Desc .Desc-AmountTotal {
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  color: #ff9999;
  margin-bottom: 15px;
}
.RO-Desc .Desc-Memo {
  padding : 5px;
  border: 1px solid #ddd;
  border-radius: 10px;
  color: #999;
  font-size: 0.8rem;
}


.CustDoc-submit {
  margin:auto;
  width: 90%;
  height: 80px;
  display: flex;
}
.CustDoc-submit .submit-OK {
  margin:auto;
}
.CustDoc-submit .submit-OK .submit-btn {
  margin:auto;
  width: 250px;
  background-color: #fcf4df;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  border-color: #cccccc;
}


</style>
