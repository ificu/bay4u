<template>
  <v-app>
    <div class="InfoPage" id="InfoPage">
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
              <div class="CarInfo-Button">
                <v-btn class="ma-2" id="CarInfo-Button" outlined fab color="#acd3ce" elevation="5" @click="showQTImage(qtInfo.IMG)">
                  사진<br>확인
                </v-btn>             
              </div>              
            </div>   
            <div class="QTReq-List"><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>견적요청 상세</div>       
            <table class="QTReq-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th class="QTItem-Title mdl-data-table__cell--non-numeric">요청 부품</th>
                  <th class="QTItem-Qty">수량</th>
                  <th class="QTItem-String">첨부파일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item , index) in qtItems" :key="index">
                  <td class="mdl-data-table__cell--non-numeric">{{item.ITM_NM}}</td>
                  <td>{{item.ITM_QTY}}</td>
                  <td>
                    <v-btn outlined small color="#00BFA5" class="float-right" v-if="item.IMG !== undefined" @click="showQTImage(item.IMG)">사진 확인</v-btn>
                  </td>
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
            <div class="QT-Info"  v-if="UserInfo.UserType === 'DEALER'">
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
            <div class="QT-Info"  v-if="UserInfo.UserType === 'DEALER'">
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
                  <b-button variant="outline-secondary" v-on:click="GetQtList" v-if="UserInfo.UserType === 'DEALER'">견적서 자동 입력</b-button>
                  <b-button variant="outline-secondary" @click="selectedDeleteItem">선택 삭제</b-button>
                  <b-button id="clipboardBtn" @click="clipboardAdd" style="display:none">test...</b-button>
                  <!-- <b-button class="QTRes-ButtonAdd" variant="outline-secondary">부품 추가</b-button>-->
                <!--부품추가-->
                 <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <b-button id="btnItmAdd" class="QTRes-ButtonAdd" variant="outline-secondary" v-on="on">부품 추가</b-button>
                  </template>
                  <v-card>
                    <v-card-title>
                     <!-- <span class="headline">{{ formTitle }}</span>-->
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                           <v-text-field v-model="editedItem.itemCode" label="부품번호" @focus="$event.target.select()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-combobox v-model="editedItem.itemBrand" :items="afterBrand" label="브랜드" ></v-combobox>    
                             <!--<v-text-field v-model="editedItem.itemBrand" label="브랜드"></v-text-field>-->
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-combobox v-model="editedItem.carBrand" :items="carBrand" label="차종" ></v-combobox>
                             <!-- <v-text-field v-model="editedItem.carBrand" label="차종"></v-text-field>-->
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.itemName" label="부품명" @focus="$event.target.select()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.afterNo" label="After No" @focus="$event.target.select()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                              <v-text-field :value="editedItem.itemQty  | localeNum" label="수량" 
                              @input="value =>editedItem.itemQty = value"  
                              @change="onCalculatorAMT"
                              @focus="$event.target.select()"
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                              <v-text-field :value="editedItem.itemPrice | localeNum" label="단가"
                                @input="value =>editedItem.itemPrice = value" 
                                @change="onCalculatorAMT"
                                @focus="$event.target.select()" 
                                ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                              <v-text-field :value="editedItem.AMT | localeNum" label="금액"  
                              @input="value => editedItem.AMT = value"
                              @focus="$event.target.select()"
                              ></v-text-field>
                          </v-col>                    
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="12">
                              <v-text-field v-model="editedItem.memo" label="비고"  @focus="$event.target.select()"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#00BFA5" outlined  @click="close">취소</v-btn>
                      <v-btn color="#A1887F"  @click="addItem">{{btnEditText}}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                </b-button-group>
              </div>  
            </div>      
            <!-- 
            <table class="QTRes-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th class="QTItem-Title mdl-data-table__cell--non-numeric">브랜드</th>
                  <th class="QTItem-Title mdl-data-table__cell--non-numeric">부 품 명</th>
                  <th class="QTItem-Brand mdl-data-table__cell--non-numeric">부품코드</th>
                  <th class="QTItem-Qty">수량</th>
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
                  <td>{{qtItem.SAL_PRICE | localeNum}}</td>
                  <td>{{qtItem.AMT | localeNum}}</td>
                  <td class="mdl-data-table__cell--non-numeric">{{qtItem.DELV_DAY}}</td>
                </tr>
              </tbody>
            </table>-->
            <div v-if="UserInfo.UserType === 'DEALER'">
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="detailQTData"
              class="elevation-1"
              fixed-header
              height="390px"
              :items-per-page="itemsPerPage"
              hide-default-footer
              no-data-text=''
            >   
              <!--header-->
              <template v-slot:header.NM_ITM="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.CONFIRM_ITM="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.ORDER_QTY="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.SAL_PRICE="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.AMT="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.DELV_DAY="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <!-- contents -->
              <template v-slot:item.NM_ITM="{ item }">
               <div class="item-itemName" v-b-tooltip.hover :title=item.NM_ITM  >{{ item.NM_ITM }}</div>
              </template>
              <template v-slot:item.CONFIRM_ITM="{ item }">
               <div class="item-itemcode">{{ item.CONFIRM_ITM }}</div>
              </template>
              <template v-slot:item.ORDER_QTY="{ item }">
               <span class="item-numeric-qty">{{ item.ORDER_QTY | localeNum}}</span>
              </template>
              <template v-slot:item.SAL_PRICE="{ item }">
               <span class="item-numeric">{{ item.SAL_PRICE | localeNum}}</span>
              </template>
              <template v-slot:item.AMT="{ item }">
               <span class="item-numeric">{{ item.AMT | localeNum}}</span>
              </template>
              <template v-slot:item.DELV_DAY="{ item }">
               <div class="item-delv">{{ item.DELV_DAY }}</div>
              </template>
            </v-data-table>
            <div class="QTRes-footer" v-if="showSum">
              <div class="TotalInfo">
                <span class="TotalInfo-Title">합계금액</span>
                <span class="TotalInfo-Text">{{total | localeNum}}</span>
                <span><b-button v-on:click="sendQTconfirmMsg()">{{txtQTConfirm}}</b-button></span>
                <!--<v-btn @click="SendSMS" >SMS전송</v-btn>-->
              </div>
            </div>
            </div>
            <div  v-else>
            <v-data-table
              v-model="selected"
              :headers="headers2"
              :items="detailQTData"
              class="elevation-1"
              fixed-header
              height="390px"
              :items-per-page="itemsPerPage"
              hide-default-footer
              no-data-text=''
              show-select
              :single-select="singleSelect"
              item-key="itemCode"
            >      
              <!--header-->
              <template v-slot:header.itemCode="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemBrand="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.carBrand="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemName="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.afterNo="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemQty="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemPrice="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.AMT="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.memo="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <!-- contents -->
              <template v-slot:item.itemCode="{ item }">
               <span class="item-delv">{{ item.itemCode }}</span>
              </template>
              <template v-slot:item.itemBrand="{ item }">
               <span class="item-delv">{{ item.itemBrand }}</span>
              </template>   
              <template v-slot:item.carBrand="{ item }">
               <span class="item-delv">{{ item.carBrand }}</span>
              </template> 
              <template v-slot:item.itemName="{ item }">
               <span class="item-delv">{{ item.itemName }}</span>
              </template> 
              <template v-slot:item.afterNo="{ item }">
               <span class="item-delv">{{ item.afterNo }}</span>
              </template> 
              <template v-slot:item.itemQty="{ item }">
               <span class="item-numeric-qty">{{ item.itemQty|localeNum}}</span>
              </template>
              <template v-slot:item.itemPrice="{ item }">
               <span class="item-numeric">{{ item.itemPrice|localeNum}}</span>
              </template>
              <template v-slot:item.AMT="{ item }">
               <span class="item-numeric">{{ item.AMT|localeNum}}</span>
              </template>       
              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" >
                  edit
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  delete
                </v-icon>
              </template>
           
            </v-data-table>
            <div class="QTRes-footer">
                <div class="TotalInfo">
                  <span class="TotalInfo-Title">합계금액</span>
                  <span class="TotalInfo-Text">{{total | localeNum}}</span>
                  <span><b-button v-on:click="saveQTConfirm()">{{txtQTConfirm}}</b-button></span>
                  <!--<v-btn @click="SendSMS" >SMS전송</v-btn>-->
                </div>

            </div>
            </div>
          </b-card-text>
        </b-tab>
        </b-tabs>
      </b-card>   

      <v-dialog v-model="showQTImageFlag" width="500px">
        <v-card>
          <v-card-title class="headline" >이미지 확인</v-card-title>
          <v-img class="grey lighten-3 mr-4 ml-4"  v-bind:src="itemImage" max-width="800px"></v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
             <v-btn
              color="#A1887F"
              @click="saveImage"
            >
              저장
            </v-btn>      
            <v-btn
              color="#00BFA5"
              outlined
              @click="showQTImageFlag = false; itemImage = '';"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  

    </div>   
  </v-app>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import {datePadding, convertDynamoToString , convertDynamoToArrayString, convertArrayToDynamo} from '@/utils/common.js'
import Constant from '@/Constant';

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
      siteInfo:[],
      showQTImageFlag:false,
      itemImage:'',
      selected: [],
      singleSelect:false,
      dialog: false,
      btnEditText:'추가',
      headers: [
          {
            text: '브랜드',
            align: 'center',
            sortable: false,
          },
          { text: '부품명', value: 'NM_ITM',},
          { text: '부품코드', value: 'CONFIRM_ITM' },
          { text: '수량', value: 'ORDER_QTY' ,align: 'end', },
          { text: '단가', value: 'SAL_PRICE' },
          { text: '금액', value: 'AMT' },
          { text: '배송구분', value: 'DELV_DAY' },
        ],
      headers2: [
          { text: '부품번호', value: 'itemCode',},
          { text: '브랜드', value: 'itemBrand',},
          { text: '차종', value: 'carBrand',},
          { text: '부품명',  value: 'itemName',},
          { text: '애프터번호', value: 'afterNo',},
          { text: '수량',  value: 'itemQty',},
          { text: '단가', value: 'itemPrice', },
          { text: '금액', value: 'AMT',},
          { text: '비고', value: 'memo',},
          { text: '', value: 'action', sortable: false },
        ],
      editedItem: {
        seq:0,
        itemCode: '',
        itemBrand: '',
        carBrand: '',
        itemName: '',
        afterNo: '',
        itemQty:0,
        itemPrice:0,
        AMT:0,
        memo:'',
      },
      itemsPerPage: -1,
      carBrand:['BENZ','BMW','AUDI','VW','FORD','VOLVO','JAGUAR','MASERATI','INFINITI','LEXUS','TOYOTA','HONDA'],
      afterBrand:['MANN','FRAM','BOSCH','TRW'],
      testData: {},      
      txtQTConfirm: '견적 확정 회신', 
    }
  },
  methods: {
    onCalculatorAMT(){
     this.editedItem.AMT = this.editedItem.itemPrice * this.editedItem.itemQty;
    },
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

      console.log("======= QT LIST Request result ========");
      console.log(param); 

      var rtnCode = "";

      axios({
          method: 'POST',
          url: Constant.SCPIF_URL + 'GetQTData',
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
          console.log("======= QT LIST Return result ========");     
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
                //console.log(JSON.stringify(rtnQTData['ESTM_DTL'])); 
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
      console.log('UserType : ' , this.UserInfo );
      console.log("QT Info 설정" + JSON.stringify(this.qtInfo));  
      this.tabIndex = 0;
      
      if( this.qtInfo.LineItem !== undefined)
      { 
        if(this.qtInfo.LineItem.length > 0)
        {  
          this.qtInfo.CarVin = convertDynamoToString(this.qtInfo.CarVin);
          this.qtInfo.Memo = convertDynamoToString(this.qtInfo.Memo); 
          this.qtItems = JSON.parse(convertDynamoToArrayString(this.qtInfo.LineItem));
        }
        else{
          this.qtInfo.CarVin = "";
          this.qtInfo.Memo = "";
          this.qtItems = [];
        }

        var btnAdd =  document.querySelector('#btnItmAdd');
        btnAdd.removeAttribute("disabled", "true");
       
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
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Site result ========");
        console.log(result.data);
        this.siteInfo = result.data.Items[0];
        this.showSiteInfo = true;
      });
    },
    sendQTconfirmMsg()
    {
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var msg = this.qtInfo.CarNo + " 차량에 대한 견적이 완료됐습니다.";
      var qtMsg = {};
      qtMsg.from = {'name' : this.UserInfo.BsnID};
      qtMsg.msg  = msg;
      qtMsg.reqTm = chatTime;
      this.$EventBus.$emit('send-QTConfirm' , qtMsg)
      /*
      var param = {};
      param.system = "BAY4U";
      param.telNo = "01085429796";
      param.callbackNo = "01037329517";
      param.msg = "테스트 전송 입니다.";

      axios({
        method: 'POST',
        url: Constant.SCPIF_URL + 'SendSMS',
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });      
      */
    },
    showQTImage(img) { 
      console.log("Image : ", img);
      this.showQTImageFlag = true;
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_IMG";
      param.payload = {};
      param.payload.FilterExpression = "ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = img;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Image Data result ========");
        console.log(result.data);

        this.itemImage = result.data.Items[0].IMG;
        
      });      
    },
    saveImage() {
      console.log("Info : ", this.qtInfo);
      var link   = document.createElement('a');
      link.href = this.itemImage;
      link.target = '_self';
      if(this.qtInfo.CarVin !== '' )
        link.download = this.qtInfo.CarVin + '.png';
      else
        link.download = this.qtInfo.ID + '.png';
      link.click();
    },
    SendSMS()
    {
      var param = {};
      param.TranPhone = "010-8542-9796";
      param.TranCallback = "1600-9691";
      param.TranMsg =  "모바일 견적요청이 완료되었습니다.";

      console.log("======= SendSMS Request result ========");
      console.log(param); 

      axios({
          method: 'POST',
          //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/SendSMS',
          url:'https://bay4u.co.kr/scpif/SendSMS',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          data: param
      })
      .then((result) => {
          console.log("======= SendSMS Return result ========");     
          console.log(result.data); 
          console.log(result.data.ReturnMessage)
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    editItem (item) {
        this.btnEditText = '수정';
        this.editedIndex = this.detailQTData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;        
      },
    deleteItem (item) {
      const index = this.detailQTData.indexOf(item);
      confirm('삭제하시겠습니까?') && this.detailQTData.splice(index, 1);
    },
    selectedDeleteItem () {
    
      if(this.selected.length > 0 )
      {
          this.selected.forEach(item =>{
             const index = this.detailQTData.indexOf(item);
             this.detailQTData.splice(index, 1);
          });
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    addItem () {
      this.btnEditText = '추가';
      this.editedItem.seq = this.detailQTData.length + 1;
      if (this.editedIndex > -1) {
        Object.assign(this.detailQTData[this.editedIndex], this.editedItem)
      } else {
        this.detailQTData.push(this.editedItem)
      }
      this.close()
    },
    saveQTConfirm()
    {
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var msg = this.qtInfo.CarNo + " 차량에 대한 견적이 완료됐습니다.";
      var qtMsg = {};
      qtMsg.from = {'name' : this.UserInfo.BsnID};
      qtMsg.msg  = msg;
      qtMsg.reqTm = chatTime;
      this.$EventBus.$emit('send-QTConfirm' , qtMsg)

      var param = {};

      var id =  this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                        + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      param.operation = "create";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.qtInfo.ID;  //docId
      param.payload.Item.CarNo = this.qtInfo.CarNo;
      param.payload.Item.ResDealer = this.UserInfo.BsnID;
      param.payload.Item.ReqSite = this.qtInfo.ReqSite;
      param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.detailQTData));
      param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      param.payload.Item.ReqTm = ReqTm;
      param.payload.Item.ReqId = this.UserInfo.UserID;
              
      console.log("======= QT Save Request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= QT Save result ========");
        console.log(result.data);
        })
      .catch((error) => {
        console.log(error);
      });
    },
    getQTConfirm()
    {
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ID;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= QT Confirm result ========");
        console.log( result.data);
        if(result.data.Items.length > 0)
          this.txtQTConfirm = "견적 재회신";
        else
          this.txtQTConfirm = "견적확정 회신";
        this.detailQTData = JSON.parse(result.data.Items[0].LineItem);
      });
    },
    clipboardAdd() {
      console.log("======= clipboardAdd ========");
      var clipText = document.getElementById('clipboardBtn').value;

      var copyData = clipText.split(/\r\n|\r|\n/);
      console.log('copyData : ', copyData);

      var idx = 0;
      for(var item of copyData ){

        this.editedItem.seq = idx++;
        var val = item.split('	');
        this.editedItem.itemCode = val[0];
        this.editedItem.itemBrand =  val[1];
        this.editedItem.carBrand =  val[2];
        this.editedItem.itemName =  val[3];
        this.editedItem.afterNo =  val[4];
        this.editedItem.itemQty =  val[5].replace(',','');
        this.editedItem.itemPrice =  val[6].replace(',','');
        this.editedItem.AMT =  val[7].replace(',','');
        this.editedItem.memo =  val[8];
 
        this.detailQTData.push(this.editedItem);
      }
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
      },
      
  },

  created: function(){

    this.$EventBus.$on('click-qtInfo', qtItem => {   
        this.qtInfo = qtItem;
        this.SetQtInfo();
        this.GetSiteInfo();
        if(this.UserInfo.UserType !== 'DEALER'){
          this.getQTConfirm();
        }
    });

    this.$EventBus.$on('init-qtInfo', chatItem => {   
        this.qtInfo = [];
        this.SetQtInfo();
        this.siteInfo = [];
        this.showSiteInfo = false;
    });

    this.$EventBus.$on('click-showImage', img => {   
        this.itemImage = img;
        this.showQTImageFlag = true;
    });    

    //document.getElementById('InfoPage').addEventListener('paste', handlePaste, true);
    //console.log('event..........', );

    document.addEventListener('paste', function (event) {
      var clipText = event.clipboardData.getData('Text');
      console.log('clipText : ', clipText);
      document.getElementById('clipboardBtn').value = clipText;
      document.getElementById('clipboardBtn').click();

      
    });
  },
  mounted: function()
  {
    if(this.qtInfo.length === 0)
    {
        var btnAdd =  document.querySelector('#btnItmAdd');
        btnAdd.setAttribute("disabled", "true");
    }
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
.card {
  margin-top: 10px;
  margin-right: 10px;
}
.card-body {
  padding: 10px;
}
.v-application{
  width: 100%;
  height: 100%;
}
.InfoPage {
 /*height: calc(100% - 10px);)*/
 height: 90%;
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
  flex: 30%;
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
.Car-Info .CarInfo-Button {
  flex: 10%;
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
.QTItem-String{
  width: 40%;
  font-weight: bold;
  color: #967d5f;
  text-align: center;
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
.header-item
{
  font-size: 0.9rem;
  font-weight: bold;
  color: #967d5f;
  width: 100px;
  /*
   border:tomato solid 1px;
  text-align: center;
  */
}
.header-item2
{
  font-size: 0.8rem;
  font-weight: bold;
  color: #967d5f;
}
.item-itemName
{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  font-size: 0.8rem;
}
.item-delv
{
  width: 55px;
  font-size: 0.8rem;
}
.item-itemcode
{
   font-size: 0.8rem;
   font-weight: bold;
   width: 120px;
}
.item-numeric  {
  width: 55px;
  font-size: 0.8rem;
  text-align: right;
  float:right;
}
.item-numeric-qty  {
  width: 35px;
  font-size: 0.8rem;
  text-align: right;
  float:right;
}
</style>
