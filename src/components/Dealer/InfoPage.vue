<template>
  <div class="InfoPage">
    <b-card
      header="카센타 정보"
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="dark"
      style="height:160px;"
    >
      <b-card-text class="UserInfo-contents">
        <div class="UserInfo-img">
          <img src="@/assets/user-icon.png">
        </div>
        <div class="UserInfo-info">
          <div class="info-name">No.1 카센터</div>
          <div class="info-tel">02-266-5011 / 010-2222-3534</div>
          <div class="info-addr">서울 성남시 분당구 성남대로343번길 9</div>
        </div>
      </b-card-text>
    </b-card>
    <b-card no-body class="QT-Detail">
      <b-tabs v-model="tabIndex" card active-nav-item-class="font-weight-bold">
      <b-tab title="견적 요청" :title-link-class="linkClass(0)" active>
        <b-card-text>
          <div class="Car-Info">
            <div class="CarInfo-Left">
              <div>차량번호</div>
              <b-form-input></b-form-input>
            </div>
            <div class="CarInfo-Right">
              <div>차대번호</div>
              <b-form-input></b-form-input>
            </div>
          </div>   
          <div class="QTReq-List">견적요청 상세</div>       
          <table class="QTReq-Table mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
            <thead>
              <tr>
                <th class="QTItem-Title mdl-data-table__cell--non-numeric">요청 부품</th>
                <th class="QTItem-Qty">수량</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">연료 필터</td>
                <td>1</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">오일 필터</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
          <div class="QTReq-Memo">Memo</div>
          <b-form-textarea
            id="textarea"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-card-text>
      </b-tab>
      <b-tab title="견적 회신" :title-link-class="linkClass(1)">
        <b-card-text>
          <div class="QT-Info">
            <!--
            <div class="CarInfo-Left">
              <div>브랜드</div>
              <b-form-select v-model="selectedBrand" class="mb-3">
                <option :value="null">차량 브랜드 선택</option>
                <option value="AUDI">AUDI</option>
                <option value="VW">VW</option>
                <option value="BMW">BMW</option>
                <option value="Benz">Benz</option>
              </b-form-select> 
            </div>
            -->
            <div class="QT-Title">
              <div><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>차정상세 :           
              </div>
              <!--<b-form-input v-model="headQTData[0].SERIES"></b-form-input>-->
              </div>
            <div class="QT-Content">{{this.series}}</div>
          </div>   
          <div class="QT-Info">
            <div class="QT-Title"><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>담당자 : </div>
            <div class="QT-Content">{{this.angentNm }}</div>
            <div class="QT-Title"><v-icon x-small  class="qt-icon">fas fa-angle-down</v-icon>견적상태 : </div>
            <div class="QT-Content">{{this.estmStsNm}}</div>
          </div>
          <div class="QTRes-List">
            <div class="QTRes-Title">
              <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>견적회신 상세
            </div>  
            <div class="QTRes-Button">
              <b-button-group size="sm">
                <b-button variant="outline-secondary">엑셀 카피 자동 입력</b-button>
                <b-button variant="outline-secondary" v-on:click="GetQtList">견적서 자동 입력</b-button>
                <b-button variant="outline-secondary">선택 삭제</b-button>
                <b-button class="QTRes-ButtonAdd" variant="outline-secondary">부품 추가</b-button>
              </b-button-group>
            </div>  
          </div>       
          <table class="QTRes-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
              <tr>
                <th class="QTItem-Title mdl-data-table__cell--non-numeric">부 품 명</th>
                <th class="QTItem-Brand mdl-data-table__cell--non-numeric">부품코드</th>
                <th class="QTItem-Qty">수량</th>
                <!-- <th class="QTItem-Qty">재고여부</th>-->
                <th class="QTItem-Qty">단가</th>
                <th class="QTItem-Qty">금액</th>
                <th class="QTItem-Qty mdl-data-table__cell--non-numeric">배송구분</th>
              </tr>
            </thead>
            <tbody>              
              <tr  v-for="(qtItem,i) in detailQTData" :key="i" >
                <td class="mdl-data-table__cell--non-numeric">{{qtItem.NM_ITM}}</td>
                <td class="mdl-data-table__cell--non-numeric">{{qtItem.CONFIRM_ITM}}</td>
                <td>{{qtItem.ORDER_QTY | localeNum}}</td>
                <!--<td>              
                  <select>
                    <option value="AUDI" selected>O</option>
                    <option value="VW">X</option>
                    <option value="BMW">소량</option>
                  </select> 
                </td>-->
                <td>{{qtItem.SAL_PRICE | localeNum}}</td>
                <td>{{qtItem.AMT | localeNum}}</td>
                <td class="mdl-data-table__cell--non-numeric">{{qtItem.DELV_DAY}}</td>
              </tr>
            </tbody>
          </table>
          <div class="QTRes-footer" v-if="showSum">
              <div class="TotalInfo">
                <span class="TotalInfo-Title">합계금액</span>
                <span class="TotalInfo-Text">{{total | localeNum}}</span>
              </div>
          </div>
        </b-card-text>
      </b-tab>
      </b-tabs>
    </b-card>   
  </div>   
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
export default {
  name: 'InfoPage',
  data () {
    return {
      selectedBrand: null,
      tabIndex: 0,
      detailQTData:[],
      series:'',
      angentNm:'',
      estmStsNm:'',
      showSum:false
    }
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['text-info']
      } else {
        return ['text-secondary']
      }
    },
    GetQtList(key){
      var param = {};
      param.BsnId = "S009";
      param.CarNo = "11지5432";
      param.VinNo =  this.CarInfo.VinNo;
      param.RequestDataJSON = "S009191111WBAJD3109JB3163630001"

      console.log("======= ROHistory Request result ========");
      console.log(param); 

      var rtnCode = "";

      axios({
          method: 'POST',
          url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetQTData',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          data: param
      })
      .then((result) => {
          console.log("======= ROHistory Return result ========");     
          console.log(result.data); 
         
          this.rtnCode = result.data.ReturnCode;
          var rtnQTData = JSON.parse(result.data.ReturnDataJSON);

          var headQTData = rtnQTData['ESTM_HED'];
          this.detailQTData = rtnQTData['ESTM_DTL'];

          console.log(this.detailQTData); 
        
          /* var qtKeys = Object.keys(rtnQTData );*/

          /*console.log("ESTM_HED : " + this.headQTData );
          console.log("ESTM_DTL : " + this.detailQTData );*/
          this.series = headQTData[0].SERIES;
          this.angentNm = headQTData[0].AGENT_NM;
          this.estmStsNm = headQTData[0].ESTM_STS_NM;
          this.showSum = !this.showSum; 

      })
      .catch((error) => {
          console.log(error);
      })   
    }
  },
    computed:{
      CarInfo: {
          get() { return this.$store.getters.CarInfo },
          set(value) { this.$store.dispatch('UpdateCarInfo',value) }
      },
      UserInfo: {
          get() { return this.$store.getters.UserInfo },
          set(value) { this.$store.dispatch('UpdateUserInfo',value) }
      },

      total: function() {
        let sum = 0;
        this.detailQTData.forEach(function(item) {
          sum += (parseFloat(item.AMT));
        });
        return sum;
      }
    },
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
.card {
  margin-top: 10px;
  margin-right: 10px;
}
.card-body {
  padding: 10px;
}

.InfoPage {
  height: calc(100% - 10px);
}

.UserInfo-contents {
  display: flex;
}

.UserInfo-img {
  flex: 25%;
  margin:auto;
  width: 90%;
  text-align: center;
}

.UserInfo-info {
  flex: 75%;
  padding: 10px;
}

.UserInfo-info .info-name {
  font-weight: bold;
  font-size: 1.5rem;
  color: #455a63;
  text-align: center; 
}
.UserInfo-info .info-tel {
  margin-top: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #5d4038;
}
.UserInfo-info .info-addr {
  margin-top: 5px;
  font-size: 0.9rem;
}

.Car-Info {
  display: flex;
}
.Car-Info .CarInfo-Left {
  flex: 40%;
  font-weight: bold;
  color: #5d4038;
  margin-right: 5px;
  margin-bottom: 5px;
}
.Car-Info .CarInfo-Right {
  flex: 60%;
  font-weight: bold;
  color: #5d4038;
}
.QT-Info {
  display:flex;
  flex-direction: row;
}
.QT-Title {
  font-weight: bold;
  color: #5d4038;
  margin-right: 5px;
  margin-bottom: 5px;
  width: 72px;
}
.QT-Content {
  flex: auto;
  font-size: 0.8rem;
}
.QTReq-List {
  font-weight: bold;
  color: #5d4038;
}
.QTReq-Table {
  width: 100%;
}
.QTReq-Memo {
  font-weight: bold;
  color: #5d4038;
  margin-top: 10px;
}

.QTRes-List {
  display: flex;
}
.QTRes-List .QTRes-Title {
  font-weight: bold;
  color: #5d4038;
  text-align: left;
  flex: 20%;
}
.QTRes-List .QTRes-Button {
  text-align: right;
  flex: 80%;
  margin-bottom: 10px;
}
.QTRes-ButtonAdd {
  font-weight: bold;
  color: #ff9999;
}
.QTRes-ButtonAdd:hover {
  color: #fff;
}
.QTRes-Table {
  width: 100%;
} 
.QTRes-Table th, tr {
  font-size: 0.8rem;
} 

.QTItem-Brand{
  font-weight: bold;
  color: #967d5f;
}
.QTItem-Title{
  width: 70%;
  font-weight: bold;
  color: #967d5f;
}
.QTItem-Qty{
  width: 20%;
  font-weight: bold;
  color: #967d5f;
}

/*
.QT-Detail {
  height: 100%;
  margin-top: -30px;
  margin-right: 0px;
}*/

.QTRes-footer{
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
    display: flex;
  justify-content: flex-end;
}
.QTRes-footer .TotalInfo{
  margin-right: -1px;
}
.QTRes-footer .TotalInfo-Title{
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    color: #5d4038;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.QTRes-footer .TotalInfo-Text{
     -webkit-box-align: center;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1.1rem;
    font-weight: 400;
    color: #E50914;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.qt-icon{
  color:#5d4038;  
  margin-right: 0.2rem;
}
</style>
