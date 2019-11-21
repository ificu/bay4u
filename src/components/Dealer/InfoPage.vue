<template>
  <div class="InfoPage">
    <b-card
      header="카센타 정보"
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="dark"
      style="height:160px;"
    >
      <b-card-text class="UserInfo-contents" v-if="showSiteInfo">
        <div class="UserInfo-img">
          <img src="@/assets/user-icon.png">
        </div>
        <div class="UserInfo-info">
          <div class="info-name">{{this.qtInfo.ReqName}}</div>
          <div class="info-tel"><v-icon small class="qt-icon">fas fa-phone-square</v-icon>{{this.siteInfo.TEL}} / <v-icon small class="qt-icon">fas fa-mobile-alt</v-icon>{{this.siteInfo.HP}}</div>
          <div class="info-addr"><v-icon small class="qt-icon">mdi-domain</v-icon>{{this.siteInfo.ADDR}}</div>
        </div>
      </b-card-text>
    </b-card>
    <b-card no-body class="QT-Detail">
      <b-tabs v-model="tabIndex" card active-nav-item-class="font-weight-bold" >
      <b-tab title="견적 요청" :title-link-class="linkClass(0)">
        <b-card-text>
          <div class="Car-Info">
            <div class="CarInfo-Left">
              <div><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>차량번호</div>
              <b-form-input v-model="this.qtInfo.CarNo"></b-form-input>
            </div>
            <div class="CarInfo-Right">
              <div><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>차대번호</div>
              <b-form-input v-model="this.qtInfo.CarVin"></b-form-input>
            </div>
          </div>   
          <div class="QTReq-List"><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>견적요청 상세</div>       
          <table class="QTReq-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
              <tr>
                <th class="QTItem-Title mdl-data-table__cell--non-numeric">요청 부품</th>
                <th class="QTItem-Qty">수량</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item , index) in qtItems" :key="index">
                <td class="mdl-data-table__cell--non-numeric">{{item.ITM_NM}}</td>
                <td>{{item.ITM_QTY}}</td>
              </tr>
              <!--
              <tr>
                <td class="mdl-data-table__cell--non-numeric">오일 필터</td>
                <td>1</td>
              </tr>
              -->
            </tbody>
          </table>
          <div class="QTReq-Memo"><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>Memo</div>
          <b-form-textarea
            id="textarea"
            rows="3"
            max-rows="6"
            v-model="this.qtInfo.Memo"
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
            <div class="QT-ContentSts">{{this.estmStsNm}}</div>
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
                <th class="QTItem-Title mdl-data-table__cell--non-numeric">브랜드</th>
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
              <tr v-for="(qtItem,i) in detailQTData" :key="i" >
                <td> </td>
                <td class="mdl-data-table__cell--non-numeric"><div class="itemNm" v-b-tooltip.hover :title=qtItem.NM_ITM>{{qtItem.NM_ITM}}</div>
                </td>
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
                <span><b-button>견적 완료 알림</b-button></span>
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
      showSum:false,
      showSiteInfo:false,
      qtInfo:[],
      qtItems:[],
      siteInfo:[]
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
    GetQtList(){
      var param = {};
      param.BsnId = this.qtInfo.ReqSite;
      param.CarNo = this.qtInfo.CarNo;
      param.VinNo =  this.qtInfo.CarVin;
      param.RequestDataJSON = this.qtInfo.ID;

      console.log("======= ROHistory Request result ========");
      console.log(param); 

      var rtnCode = "";

      axios({
          method: 'POST',
          //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetQTData',
          url:'https://bay4u.co.kr/scpif/GetQTData',
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

          if(this.rtnCode === 0)
          {
            var rtnQTData = JSON.parse(result.data.ReturnDataJSON);
            var headQTData = rtnQTData['ESTM_HED'];
            
            if(headQTData.length > 0)
            {
              if(headQTData[0].ESTM_STS !== '1' && rtnQTData['ESTM_DTL'].Length !== 0)
              {
                this.detailQTData = rtnQTData['ESTM_DTL'];
                this.showSum = !this.showSum; 
              }

              /* var qtKeys = Object.keys(rtnQTData );*/
              /*console.log("ESTM_HED : " + this.headQTData );
              console.log("ESTM_DTL : " + this.detailQTData );*/
              this.series = headQTData[0].SERIES;
              this.angentNm = headQTData[0].AGENT_NM;
              this.estmStsNm = headQTData[0].ESTM_STS_NM;
            }
          }
          
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    SetQtInfo(){
      //console.log("QT Info 설정" + JSON.stringify(this.qtInfo));  
      this.tabIndex = 0;
      if(this.qtInfo.length > 0)
      {  
        this.qtInfo.CarVin = this.qtInfo.CarVin.replace("*empty*", "");
        this.qtInfo.Memo = this.qtInfo.Memo.replace("*empty*", "");
        this.qtItems = JSON.parse(this.qtInfo.LineItem);
      }
      else{
        this.qtInfo.CarVin = "";
        this.qtInfo.Memo = "";
        this.qtItems = [];
      }

      // webpos견적 Data 초기화
      this.series = '';
      this.angentNm = '';
      this.estmStsNm = '';
      this.showSum = false;
      this.detailQTData = [];
    },
    GetSiteInfo(){
      this.showSiteInfo = false;
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_SITE";
      param.payload = {};
      param.payload.FilterExpression = "CODE = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ReqSite;

      axios({
        method: 'POST',
        url: 'https://2fb6f8ww5b.execute-api.ap-northeast-2.amazonaws.com/bay4u/backendService',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: param
      })
      .then((result) => {
        console.log("======= Site result ========");
        console.log(result.data);
        this.siteInfo = result.data.Items[0];
        this.showSiteInfo = true;
      });
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
  created: function(){

    this.$EventBus.$on('click-qtInfo', qtItem => {   
        this.qtInfo = qtItem;
        this.SetQtInfo();
        this.GetSiteInfo();
    });

    this.$EventBus.$on('init-qtInfo', chatItem => {   
        this.qtInfo = [];
        this.SetQtInfo();
        this.siteInfo = [];
         this.showSiteInfo = false;
    });
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
.QT-ContentSts{
  flex: auto;
  font-size: 1rem;
  color:#008080;
  font-weight: bold;
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
.card .itemNm{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 145px;
}
</style>
