<template>
  <v-app>
    
    <v-stepper v-model="e6" vertical>
        <v-stepper-step color="accent" :complete="e6 > 1" step="1" @click="e6 = 1">
          차량번호 / 차대번호 촬영 인식
          <small>차량 번호판이나 등록증, 차대번호를 촬영하시면 자동 인식 됩니다.</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-12" height="120px">
            <v-img height="115" v-bind:src="captureImg" ref="picImg"></v-img>
            <div class="text-center mt-2 mb-4">
              <v-btn fab small color="success" @click="showQTCameraModal(true)">
                <v-icon>fas fa-camera</v-icon>
              </v-btn>
            </div>
          </v-card>
          <div>
          <div class="text-right mb-2"><v-btn  color="#FFECB3" depressed @click="SetDummyCar()">미상차량</v-btn></div>
            <!-- 과거 정비이력 Popup-->
            <v-dialog v-model="showROHistDialog" transition="dialog-bottom-transition" >
              <template v-slot:activator="{ on: { click } }">
                <v-text-field label="차량번호" v-model="CarInfo.CarNo" outlined dense color="success"  v-on:keypress.enter="checkWebPOSHist"></v-text-field>
              </template>
              <v-card>
                <v-toolbar dark color="primary"> 
                  <v-toolbar-title>
                   <v-icon medium>fas fa-edit</v-icon>
                    과거 정비이력
                    </v-toolbar-title>                 
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                      <!--<v-btn dark text @click="dialog = false">Save</v-btn>-->
                  </v-toolbar-items>
                  <v-btn icon dark @click="showROHistDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <v-container>
                    <ROHistory></ROHistory>
                  </v-container>
                </v-card-text>         
                </v-card>
            </v-dialog>

            <v-text-field label="차대번호" v-model="CarInfo.VinNo" outlined dense color="success" class="mt-n5" ></v-text-field>
            <!--<v-text-field label="차량종류" outlined dense color="success" class="mt-n5"></v-text-field>-->
            <v-btn outlined small color="red darken-1" class="mt-n6 mb-4 float-right" v-if="showVINSearchBtn" @click="checkCarVin">차대번호 조회</v-btn>
            <v-btn outlined small color="red darken-1" class="mt-n6 mb-4 mr-1 float-right" v-if="showROHistBtn" @click="showROHistDialog=!showROHistDialog">정비이력</v-btn>

            <!-- 차대번호 조회 동의 Popup-->
            <v-dialog v-model="showVINSearchAgreePopup">
              <v-card>
                <v-card-title class="headline" >고객 확인 필요</v-card-title>
                <v-card-text>차대번호 조회를 위해선 고객동의를 받으시고 아래 차량 소유주명을 입력하셔야 합니다.</v-card-text>
                <v-card  class="ml-4 mr-4" outlined>
                  <v-text-field label="고객명" v-model="custName" outlined dense color="success" class="pr-4 pl-4 pt-4 mb-n6"></v-text-field>
                  <v-checkbox v-model="chkCustAgree" color="green darken-1" dense label="차대번호를 조회를 위한 고객명 입력을 동의하셨습니다."></v-checkbox>
                </v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="checkIntraVanVin">조회</v-btn>
                  <v-btn color="green darken-1" text @click="showVINSearchAgreePopup = false">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>        

          </div>
          <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
          <v-btn text></v-btn>
        </v-stepper-content>

        <v-stepper-step color="accent"  :complete="e6 > 2" step="2"  @click="e6 = 2">요청 부품 선택</v-stepper-step>
        <v-stepper-content step="2">
          <div class="mb-4">
            <!-- swiper -->
            <swiper  class="NewQT-itemSelect-wiper" :options="swiperOption">
              <swiper-slide><img v-on:click="showItemCategoryModal('1')" src="@/assets/group1.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('2')" src="@/assets/group2.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('3')" src="@/assets/group3.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('4')" src="@/assets/group4.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('5')" src="@/assets/group5.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('6')" src="@/assets/group6.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('7')" src="@/assets/group7.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('8')" src="@/assets/group8.png"></swiper-slide>
              <swiper-slide><img v-on:click="showItemCategoryModal('9')" src="@/assets/group9.png"></swiper-slide>
              <swiper-slide></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div>
            <v-textarea outlined color="success" label="기타 메모 입력" auto-grow rows="3" value="" v-model="qtReqMemo"></v-textarea>
          </div>
          <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
          <v-btn text @click="e6 = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step color="accent" :complete="e6 > 3" step="3"  @click="e6 = 3">견적요청 리스트 확인</v-stepper-step>
        <v-stepper-content step="3">
          
          <v-list two-line subheader>
            <v-list-item v-for="(qtItem, index) in qtRequest" v-bind:key="index">
              <v-list-item-avatar>
                <img src="@/assets/icon-oilfilter.png" v-if="qtItem.ITM_ICON === 'icon-oilfilter.png' ">
                <img src="@/assets/icon-airfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-airfilter.png' ">
                <img src="@/assets/icon-battery.png" v-else-if="qtItem.ITM_ICON === 'icon-battery.png' ">
                <img src="@/assets/icon-beltdrive.png" v-else-if="qtItem.ITM_ICON === 'icon-beltdrive.png' ">
                <img src="@/assets/icon-brakedisc.png" v-else-if="qtItem.ITM_ICON === 'icon-brakedisc.png' ">
                <img src="@/assets/icon-brakepad.png" v-else-if="qtItem.ITM_ICON === 'icon-brakepad.png' ">
                <img src="@/assets/icon-brakepadsensor.png" v-else-if="qtItem.ITM_ICON === 'icon-brakepadsensor.png' ">
                <img src="@/assets/icon-cabinfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-cabinfilter.png' ">
                <img src="@/assets/icon-cooling.png" v-else-if="qtItem.ITM_ICON === 'icon-cooling.png' ">
                <img src="@/assets/icon-engineoil.png" v-else-if="qtItem.ITM_ICON === 'icon-engineoil.png' ">
                <img src="@/assets/icon-filter.png" v-else-if="qtItem.ITM_ICON === 'icon-filter.png' ">
                <img src="@/assets/icon-fuelfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-fuelfilter.png' ">
                <img src="@/assets/icon-ignition.png" v-else-if="qtItem.ITM_ICON === 'icon-ignition.png' ">
                <img src="@/assets/icon-missionfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-missionfilter.png' ">
                <img src="@/assets/icon-oilfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-oilfilter.png' ">
                <img src="@/assets/icon-sensor.png" v-else-if="qtItem.ITM_ICON === 'icon-sensor.png' ">
                <img src="@/assets/icon-wiper.png" v-else-if="qtItem.ITM_ICON === 'icon-wiper.png' ">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="qtItem.ITM_NM"></v-list-item-title>
                <v-list-item-subtitle> 
                  <v-card
                     class="d-flex flex-row-reverse"
                     flat
                    tile
                    dense
                  >
                    <v-btn text icon small @click="subCounter(index)">
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                    <div class="qtyInput">
                      <!--<v-text-field  v-model.number="qtItem.ITM_QTY" type="number" ></v-text-field>-->
                      <input type="number"  v-model.number="qtItem.ITM_QTY" >
                    </div>
                    <!--<v-btn text small min-width="10px" max-width="15px">
                      {{qtItem.ITM_QTY}}
                    </v-btn>-->
                    <v-btn text icon small @click="addCounter(index)">
                      <v-icon>keyboard_arrow_up</v-icon>
                    </v-btn>
                  </v-card>        

                </v-list-item-subtitle>
              </v-list-item-content>   
              <v-list-item-action>
                <v-btn class="mr-n4" icon @click="removeItem(qtItem)">
                  <v-icon class="mr-n4 pl-4" color="grey lighten-1">highlight_off</v-icon>
                </v-btn>
              </v-list-item-action>  
            </v-list-item>
            <v-divider></v-divider>

            <!-- 기타부품 추가 -->            
            <div class="tempItems">
                <v-text-field label="기타부품"  outlined dense color="success" class="tempItem" v-model="tempItem.ITM_NM"></v-text-field>
                <v-card class="d-flex flex-row-reverse" flat  tile dense>
                  <v-btn text icon small @click="subCounter()">
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-btn>
                  <div class="qtyInput">
                    <!--<v-text-field  type="number" v-model="tempItem.ITM_QTY"></v-text-field>-->
                    <input type="number"  v-model.number="tempItem.ITM_QTY" >
                  </div>
                  <v-btn text icon small @click="addCounter()">
                    <v-icon>keyboard_arrow_up</v-icon>
                  </v-btn>
                </v-card>  
                <v-btn class="mx-2 " fab dark color="indigo" x-small @click="addNewItem(tempItem)"><v-icon dark>mdi-plus</v-icon></v-btn>
            </div>
            <div class="text-right mb-2 mt-6" >
              <!--<v-btn small  color="indigo" outlined @click="addNewItem(tempItem)">기타부품추가</v-btn>-->
            </div>
          </v-list>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn text @click="e6 = 2">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step color="accent"  step="4" @click="e6 = 4">견적 요청 전송</v-stepper-step>
        <v-stepper-content step="4">
          <div class="NewQT-submit">
            <b-button class="submit-list">대리점 선택</b-button>
            <b-button class="submit-OK" v-on:click="showQTConfirmModal">견적 요청</b-button>
          </div>
          <v-btn text @click="e6 = 3">Back</v-btn>
        </v-stepper-content>
    </v-stepper>

    <ItemCategory v-if="showItemCategory" @close="showItemCategory=false">
      <h4 slot="header">{{categoryTitle}}</h4>
      <span slot="body">
        <b-form-group>
          <b-form-checkbox
            v-for="item in categoryList"
            v-model="selectedCategory"
            :key="item.ITM_VAL"
            :value="item.ITM_VAL"
            inline
            @change="addNewItem(item)"
          >
            {{ item.ITM_NM }}
          </b-form-checkbox>
        </b-form-group>
      </span>
      <span slot="footer" @click="showItemCategory=false">
        확인 <i class="fas fa-check"></i>
      </span>
    </ItemCategory>

    <QTConfirm v-if="showQTConfirm" @close="showQTConfirm=false">
      <span slot="header">총 {{dealerCount}}개 대리점에 <br> 견적요청을 보냅니다</span>
      <span slot="list1">
        <ul class="qtConfirm-dealerList">
          <li v-for="(dealer, index) in dealerList" v-bind:key="index">{{dealer.DEALER_NAME}}</li>
        </ul>
      </span>
      <span slot="list2">
        <div class="qtConfirm-itemList" v-for="(item, index) in qtRequest" v-bind:key="index">
          <span class="qtConfirm-itemDel">{{item.ITM_NM}}</span>
          <span class="qtConfirm-itemDel">{{item.ITM_QTY }}개</span>
            <i class="qtConfirm-itemDel fas fa-times-circle"  @click="removeItem(item)"></i>
        </div>
      </span>
      <span slot="footer">
        전송 하시겠습니까?
        <!--
        <router-link v-bind:to="{name:'Chat', params:{chatid:1}}">
          <b-button class="submit-YES" @click="addNewQTRequest()">YES</b-button>
        </router-link >-->
        <b-button class="submit-YES" @click="checkQtData()">YES</b-button>
        <b-button class="submit-NO" @click="showQTConfirm=false">NO</b-button>
      </span>
    </QTConfirm>

    <transition>
        <QTCamera 
          v-if="showQTCamera" 
          v-on:closeQTCameraModal="showQTCameraModal(false)"
          v-on:updatePic="updatePic"
          >
        </QTCamera>
    </transition>

    <MessageBox v-if="showAlertMsg"  @close="closeMsg(alertMsgPath)">
      <div slot="header"><h5 >알림</h5><i class="closeModalBtn fas fa-times" @click="closeMsg(alertMsgPath)"></i></div>
      <span slot="body" @click="closeMsg(alertMsgPath)"><pre>{{alertMsg}}</pre>
      </span>
      <div slot="footer" v-if="showAlerMsgBtn">
        <v-btn depressed small color="indigo" dark @click="closeMsg(alertMsgPath)"> 확인</v-btn>
      </div>
      <div slot="footer" v-if="showAlerMsgConfirmBtn">
        <v-btn depressed small color="indigo" dark @click="CheckReqVinNoQT(true)">확인</v-btn>
        <v-btn depressed small color="blue-grey lighten-2"  @click="CheckReqVinNoQT(false)">취소</v-btn>
      </div>
    </MessageBox>

  </v-app>  
</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import ItemCategory from '@/components/NewQT/ItemCategory.vue'
import QTConfirm from '@/components/NewQT/QTConfirm.vue'
import QTCamera from '@/components/NewQT/QTCamera.vue'
import ROHistory from '@/components/NewQT/ROHistory.vue'
import MessageBox from '@/components/Common/MessageBox.vue'
import {datePadding, convertStringToDynamo, convertArrayToDynamo} from '@/utils/common.js'

const axios = require('axios').default;

export default {
name: 'QTStep',
  data () {
    return {
      e6: 1,
      text: '',
      itmQty: 1,
      dealerCount: 0,
      categoryTitle: "",
      categoryList: [],                 // DB에서 조회해 온 견적 요청 부품 군 리스트
      selectedCategory: [],             // 견적 요청 부품 군 중 선택된 리스트
      dealerList: [],                   // 요청할 딜러 리스트를 담는 배열
      qtRequest: [],                    // 견적 요청 리스트를 담는 JSON 배열
      showItemCategory: false,          // 견적 요청 부품 선택 팝업
      showQTConfirm: false,             // 최종 견적 요청 확인 팝업
      showQTCamera: false,              // 카메라 쵤영을 위한 팝업
      captureImg: "",
      swiperOption: {
          slidesPerView: 3,
          spaceBetween: 120,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true
          }
      },
      showROHistDialog: false,          // WebPOS 정비이력 조회 팝업
      showVINSearchAgreePopup: false,   // 국토부 차대번호 조회를 위한 동의 팝업
      qtReqMemo: "",
      showROHistBtn: false,             // 정비이력 조회 버튼 표시 여부
      showVINSearchBtn: false,          // 차대번호 조회 버튼 표시 여부
      chkCustAgree: false,              // 차대번호 조회를 위한 고객 동의 체크 여부
      custName: "",
      showAlertMsg: false,
      showAlerMsgConfirmBtn :false,
      showAlerMsgBtn: true,
      alertMsg: "",
      alertMsgPath: "",
      alertYesNo: false,
      tempItem:{                        // 기타부품 추가
        ITM_ICON:" ",
        ITM_QTY:1,
        GRP_ID:" ",
        ITM_NM:" ",
        ITM_VAL:" ",
        GRP_NM:" ",
        SEQ:0
      }
    }
  },
  methods: {
      showQTCameraModal(showFlag){
        this.showQTCamera = showFlag;
      },
      updatePic(pic){
        this.captureImg = pic;
        pic = pic.replace("data:image/png;base64,", "");
        this.checkImgVIN(pic);
        this.checkImgCarNo(pic);
      },
      // Google OCR API를 통해 이미지에서 차대번호 추출
      checkImgVIN(pic){
        var param = {};
        param.requests = [];
        var req = {};
        req.image = {};
        req.image.content = pic;
        req.features = [];
        var reqType = {};
        reqType.type = "TEXT_DETECTION";
        req.features.push(reqType);
        param.requests.push(req);

        axios({
          method: 'POST',
          url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyApWMx0PYvexvPKJkmMA9lAwWvMC5K6FZU',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: param
        }).then((result) => {
          console.log("======= Google API result ========");
          console.log(result.data);
          var textArea;
          var vinNo;
          for (var img of result.data.responses) {
            textArea = img.fullTextAnnotation.pages[0].blocks[0];
            //console.log("Area : ", JSON.stringfy(textArea));
            for (var text of img.textAnnotations) {
              if(text.description.length == 16 || text.description.length == 17) {
                // 이 것을 차대번호로 인지
                console.log("VIN : ", JSON.stringfy(text));
                this.CarInfo.VinNo = text.description.replace("I", "1").replace("O", "0").replace("g", "9");
              }
            }
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      // DB에서 차대번호를 조회 이력이 있는지 체크
      checkCarVin(){
        var param = {};
        param.operation = "list";
        param.tableName = "BAY4U_CAR_VIN";
        param.payload = {};
        param.payload.FilterExpression = "CAR = :carno";
        param.payload.ExpressionAttributeValues = {};
        var key = ":carno";
        param.payload.ExpressionAttributeValues[key] = this.CarInfo.CarNo;

        this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');

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
          console.log("======= checkCarVin result ========");
          console.log(result.data);
          if(result.data.Count > 0) {
            this.CarInfo.VinNo = result.data.Items[0].VIN;
            this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
          }
          else {
            this.CarInfo.VinNo = "";
            this.showVINSearchAgreePopup = true;
          }
        });
      },
      // 인트라밴을 통해 차대번호를 체크
      checkIntraVanVin(){
        if(this.chkCustAgree === false || this.custName === "") return;

        var param = {};
        param.carNo = this.CarInfo.CarNo;
        param.custName = this.custName;

        axios({
            method: 'POST',
            //url:'http://bay4u.co.kr:8085/api/intravan',
            url:'https://bay4u.co.kr/extif',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: param
        })
        .then((result) => {
            console.log("======= checkIntraVanVin result ========");
            console.log(result.data); 
            if(result.data.success === true) {
              this.CarInfo.VinNo = result.data.data;
              this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
            }
            else {
              if(result.data.data.indexOf("소유자 성명") >= 0)
                this.CarInfo.VinNo = "소유자 성명 불일치";
              else if(result.data.data.indexOf("일치하는 차량이 없습니다.") >= 0)
                this.CarInfo.VinNo = "차량번호 미 존재";
              else
                this.CarInfo.VinNo = "국토부 차대번호 조회 중...";
            }
        })
        .catch((error) => {
            console.log(error);
        })

        this.CarInfo.VinNo = "국토부 차대번호 조회 중...";
        this.showVINSearchAgreePopup = false;
      },
      // Aibril Vision API를 통해 이미지에서 차량번호 추출
      checkImgCarNo(pic){
        var param = {};
        param.name = "최범진";
        param.returnResultImage = false;
        param.image = pic;

        axios({
          method: 'POST',
          url: 'https://visionai.skcc.com/ocr/alpr/recognize',
          headers: {
            'api-key': '7bfee9e0-b19a-4f14-a3a0-42c259aac9f2',
            'Content-Type': 'application/json'
          },
          data: param
        }).then((result) => {
          console.log("======= Aibril API result ========");
          console.log(result.data);
          for (var img of result.data.results) {
            console.log("CarNo : ", img.carNo);
            this.CarInfo.CarNo = img.carNo;
            this.checkWebPOSHist();
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      // WebPOS에 과거 정비내역이 있는지 체크
      checkWebPOSHist(){
        var param = {};
        param.BsnId = this.UserInfo.BsnID;
        param.CarNo = this.CarInfo.CarNo;

        this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');

        console.log("======= ROHistory Request result ========");
        console.log(param); 

        var rtnCode = "";
        var rtnCount = 0;
      
        axios({
            method: 'POST',
            //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetROList',
            url:'https://bay4u.co.kr/scpif/GetROList',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: param
        })
        .then((result) => {
            console.log("======= ROHistory Return result ========");
            console.log(result.data); 
            if(result.data.ReturnDataCount > 0) {
              this.showROHistBtn = true;
            }
            
            this.showVINSearchBtn = true;
        })
        .catch((error) => {
            console.log(error);
        })

        // 정비이력 조회는 차량번호 입력 or 인식 후 자동 처리 되므로 차대번호 조회도 자동 처리하자...
        this.checkCarVin();
      },
      showQTConfirmModal() {
        this.dealerList = [];

        var param = {};
        param.operation = "list";
        param.tableName = "BAY4U_CARCENTER_DEALER";
        param.payload = {};
        param.payload.FilterExpression = "CARCENTER = :id";
        param.payload.ExpressionAttributeValues = {};
        var key = ":id";
        param.payload.ExpressionAttributeValues[key] = 's009';

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
          console.log("======= dealerList result ========");
          console.log(result.data);
          this.dealerCount = result.data.Count;
          this.dealerList = result.data.Items;
        });

        this.showQTConfirm = !this.showQTConfirm;
      },
      showItemCategoryModal(id) {
        var param = {};
        param.operation = "list";
        param.tableName = "BAY4U_ITM_CTGRY";
        param.payload = {};
        param.payload.FilterExpression = "GRP_ID = :id";
        param.payload.ExpressionAttributeValues = {};
        var key = ":id";
        param.payload.ExpressionAttributeValues[key] = id;

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
          console.log("======= categoryList result ========");
          console.log(result.data);
          this.categoryTitle = result.data.Items[0].GRP_NM;
          this.categoryList = result.data.Items;
        });

        this.showItemCategory = !this.showItemCategory;
      },
      addNewItem(item) {
        
        if(item.ITM_VAL === " ")
        {
            var tempItem = {};
            tempItem.ITM_ICON = " ";
            tempItem.ITM_QTY = item.ITM_QTY;
            tempItem.GRP_ID = " ";
            if(item.ITM_NM === " "){
              tempItem.ITM_NM = "기타부품";
            }
            else{
              tempItem.ITM_NM = item.ITM_NM;
            }
            
            tempItem.ITM_VAL = tempItem.ITM_NM + this.qtRequest.length + 1 ;
            tempItem.GRP_NM = " ";
            tempItem.SEQ =  this.qtRequest.length + 1;
            this.qtRequest.push(tempItem);
            
            // 기타부품 초기화
            item.ITM_QTY = 1;
            item.ITM_NM = " ";
            item.ITM_VAL = " ";
            item.SEQ = 0;
        }
        else{

          if(this.selectedCategory.indexOf(item.ITM_VAL) === -1) { // 새로 추가된 경우
            item.SEQ = this.qtRequest.length + 1;
            this.qtRequest.push(item);
          }
          else { // 체크 해제 한 경우
            this.qtRequest = this.qtRequest.filter(it => it.ITM_VAL != item.ITM_VAL);
          }
        }
         /*console.log(Array.isArray(this.requests));*/
        console.log('qtRequest : ' + JSON.stringify(this.qtRequest));
      },
      removeItem(item) {
        /*console.log('Index : ' + this.selectedCategory.indexOf(item.ITM_NM));*/
        this.qtRequest = this.qtRequest.filter(it => it.ITM_VAL != item.ITM_VAL);
        if(this.selectedCategory.indexOf(item.ITM_VAL) >= 0){
          this.$delete(this.selectedCategory , this.selectedCategory.indexOf(item.ITM_VAL));
        }
        /*console.log(Array.isArray(this.selectedCategory));
        console.log('selectedCategory : ' + this.selectedCategory);*/
      },
      addNewQTRequest() {

       //  var str = convertArrayToDynamo(JSON.stringify(this.qtRequest));
       //  console.log("STR : ", str);

        var param = {};
        param.BsnId = this.UserInfo.BsnID;
        param.UserID = this.UserInfo.UserID;
        param.CarNo = this.CarInfo.CarNo;
        param.VinNo = this.CarInfo.VinNo;
        param.Memo = this.qtReqMemo;
        if(this.qtRequest !== undefined || this.qtRequest !== null || this.qtRequest.length !== 0 )
        {
            param.RequestDataJSON = JSON.stringify(this.qtRequest);
        }

        console.log('param : ' + JSON.stringify(param));

        axios({
            method: 'POST',
            //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/SaveQTData',
            url:'https://bay4u.co.kr/scpif/SaveQTData',            
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        data: param
        })
        .then((result) => {
          console.log("======= SaveQTData result ========");
          console.log(result.data);

           var rtnCode = result.data.ReturnCode;
           if(rtnCode === 0)
           {
             param = {};

             var now = new Date();
             var key = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                        + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

              param.operation = "create";
              param.tableName = "BAY4U_QT_LIST";
              param.payload = {};
              param.payload.Item = {};
              param.payload.Item.ID = result.data.ReturnObject;
              param.payload.Item.CarNo = convertStringToDynamo(this.CarInfo.CarNo);
              param.payload.Item.CarVin = convertStringToDynamo(this.CarInfo.VinNo);
              param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
              param.payload.Item.ReqSite = convertStringToDynamo(this.UserInfo.BsnID);
              param.payload.Item.ReqName = convertStringToDynamo(this.UserInfo.Name);
              param.payload.Item.ReqSeq = key;
              param.payload.Item.ResDealer = "PARTS";
              param.payload.Item.Memo = convertStringToDynamo(this.qtReqMemo);
              //param.payload.Item.LineItem = JSON.stringify(this.qtRequest);
              param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.qtRequest));

              console.log(JSON.stringify(param));

              axios({
                  method: 'POST',
                  url: 'https://2fb6f8ww5b.execute-api.ap-northeast-2.amazonaws.com/bay4u/backendService',
                  headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
              },
              data: param
              })
              .then((result) => {
                console.log("======= Data Save result ========");
                console.log(result.data);
                })
              .catch((error) => {
                console.log(error);
              });

              //this.$router.push({name:'Chat', params:{chatid:1}});
              this.$router.push({name:'Chat', 
                                  params:{
                                        chatid: result.data.ReturnObject, 
                                        carNo: this.CarInfo.CarNo,
                                        chatFrom: this.UserInfo.BsnID,
                                        chatTo: "parts",
                                        chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)
                                    }});
           }

        })
        .catch((error) => {
          console.log(error);
        });
 
      },
      addCounter: function(idx) {
        if(idx === undefined)
        {
           this.tempItem.ITM_QTY++;
        }
        else{
          this.qtRequest[idx].ITM_QTY++;
        }
      },
      subCounter: function(idx) {

        if(idx === undefined)
        {
          this.tempItem.ITM_QTY--;
          if( this.tempItem.ITM_QTY < 0)
          {
            this.tempItem.ITM_QTY = 0;
          }
        }
        else
        {
          this.qtRequest[idx].ITM_QTY--;
          if( this.qtRequest[idx].ITM_QTY < 0)
          {
              this.qtRequest[idx].ITM_QTY = 0;
          }
        }
      },
      checkQtData()
      {

        if(this.UserInfo === null){
          //alert("로그인 정보가 없습니다. \r 다시 로그인 해주세요.");
          this.alertMsg = "로그인 정보가 없습니다.\n다시 로그인 해주세요."
          this.showAlertMsg = !this.showAlertMsg;
          this.alertMsgPath = "Login";
          return false;
        }

        if(this.UserInfo.BsnID === undefined || this.UserInfo.BsnID === null || this.UserInfo.BsnID.length === 0 )
        {
          this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
          this.showAlertMsg = !this.showAlertMsg;
          this.alertMsgPath = "Login";
          return false;
        }

        if(this.UserInfo.UserID === undefined || this.UserInfo.UserID === null || this.UserInfo.UserID === 0 )
        {
          this.alertMsg = "로그인 정보가 없습니다.\n다시 로그인 해주세요."
          this.showAlertMsg = !this.showAlertMsg;
          this.alertMsgPath = "Login";
          return false;
        }

        if(this.UserInfo.BsnID === undefined || this.UserInfo.BsnID === null || this.UserInfo.BsnID.length === 0 )
        {
          this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
          this.showAlertMsg = !this.showAlertMsg;
          this.alertMsgPath = "Login";
          return false;
        }

        if(this.UserInfo.Name === undefined || this.UserInfo.Name === null || this.UserInfo.Name.length === 0 )
        {
          this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
          this.showAlertMsg = !this.showAlertMsg;
          this.alertMsgPath = "Login";
          return false;
        }
        /*
        if(this.CarInfo.CarNo === undefined || this.CarInfo.CarNo === null || this.CarInfo.CarNo.length === 0 )
        {
          this.alertMsg = "차량번호가 없습니다."
          this.showAlertMsg = !this.showAlertMsg;
          return false;
        }
        */
        if(this.CarInfo.VinNo === undefined || this.CarInfo.VinNo === null || this.CarInfo.VinNo.length === 0 )
        {
          this.alertMsg = "차대번호가 없습니다.\n차대번호 없이 요청하시겠습니까?"
          this.showAlertMsg = !this.showAlertMsg;
          this.showAlerMsgBtn = false;
          this.showAlerMsgConfirmBtn = !this.showAlerMsgConfirmBtn;  
          return false;
        }
      /*
        if(this.qtRequest === undefined || this.qtRequest === null || this.qtRequest.length === 0 )
        {
          this.alertMsg = "견적요청 리스트가 없습니다."
          this.showAlertMsg = !this.showAlertMsg;
          return false;
        }
     */
        this.addNewQTRequest();
      },
      closeMsg(path){     
          this.showAlertMsg = false;
          if(path.length > 0 && path == 'Login')
          {
              this.$router.push('/');
          }
      },
      CheckReqVinNoQT(value)
      {
        if(value === true)
        {
           this.CarInfo.VinNo = "99999999999999999";
           this.addNewQTRequest();
           
           //console.log("this.alertYesNo : ", this.alertYesNo);
           //console.log("VinNo : ", this.CarInfo.VinNo);
        }
        
        this.showAlertMsg = false;
        this.showAlerMsgConfirmBtn = false;
        this.alertYesNo = value;

      },
      SetDummyCar()
      {
        this.CarInfo.VinNo = "99999999999999999";
        this.e6 = 2;
      }
    },
    components: {
      ItemCategory: ItemCategory,
      QTConfirm: QTConfirm,
      QTCamera: QTCamera,
      ROHistory:ROHistory,
      MessageBox: MessageBox
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
      msgDatas: {
          get() { return this.$store.getters.msgDatas },
          set(value) { this.$store.dispatch('UpdateSetMsgData',value) }
      },
    },
    mounted() {
      datePadding();
      convertStringToDynamo();
    },
    created : function() {
      if(this.UserInfo.BsnID === '')
        this.UserInfo.BsnID = this.$cookies.get('BsnID');

      if(this.$cookies.get('CarNo') !== undefined || this.$cookies.get('CarNo') !== '' || this.$cookies.get('CarNo') !== 'null') {
        this.CarInfo.CarNo = this.$cookies.get('CarNo');
      }
      if(this.$cookies.get('VinNo') !== undefined || this.$cookies.get('VinNo') !== '' || this.$cookies.get('VinNo') !== 'null') {
        this.CarInfo.VinNo = this.$cookies.get('VinNo');
      }
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.v-enter-active, .v-leave-active {
    transition: opacity 1s, transform 1s;
}
.v-enter {
    opacity:0;
    transform: translateY(20px);
}

.NewQT-submit {
  margin:auto;
  height: 80px;
  display: flex;
}

.NewQT-submit .submit-list {
  margin:auto;
  flex: 50%;
  margin-right: 5px;
  background-color: #fcf4df;
  color: #333;
  font-weight: bold;
  font-size: 1.3rem;
  border-color: #cccccc;
}
.NewQT-submit .submit-OK {
  margin:auto;
  flex: 50%;
  margin-left: 5px;
  background-color: #696565;
  border: none;
  font-size: 1.3rem;
  color: #ececec;
}

.NewQT-title {
  margin:auto;
  width: 90%;
  height: 60px;
  padding-top: 25px;
  font-size: 1.5rem;
  font-weight: bold;
}

.NewQT-desc {
  margin:auto;
  width: 90%;
  font-size: 0.8rem;
  font-style: italic;
  text-align: right;
  color: #aaa;
}

.NewQT-camera {
  margin:auto;
  width: 90%;
  height: 30px;
  display: flex;
}

.NewQT-camera span:first-child {
  flex:90%;
}

.NewQT-camera span input {
  background-color: #ebebeb;
  height: 30px;
  line-height: 30px;
  width: 95%;
  border-style: none;
  font-size: 1rem;
}

.NewQT-camera span:last-child {
  flex:10%;
}

.NewQT-camera span i {
  color: #ff9999;
  font-size: 2rem;
}

.NewQT-carInfo {
  margin:auto;
  width: 90%;
  height: 90px;
}

.NewQT-carInfo span input {
  background-color: #ebebeb;
  height: 40px;
  line-height: 30px;
  width: 95%;
  border-style: none;
  font-size: 1rem;
  margin-bottom: 5px;
  padding: 5px;
}

.NewQT-itemSelect-wiper {
  width: 90%;
}

.NewQT-itemList {
  width: 90%;
  margin: auto;
}

.NewQT-itemList .list-group .list-group-item {
  padding : 2px;
}

.NewQT-itemList .list-group .list-group-item .container {
  padding : 2px;
}

.NewQT-itemList .list-group .list-group-item .container .row .col:first-child {
  flex : 15%;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) {
  flex : 60%;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:first-child {
  height: 30px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:first-child {
  height: 30px;
}
.itemList-title {
  font-weight: bold;
  font-size: 1.1rem;
}
.itemList-brand {
  margin-left: auto;
  font-size: 0.8rem;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group {
  margin-left:auto;
  width: 80px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .btn:first-child {
  height: 30px;
  padding: 3px;
  border-radius: 7px 0px 0px 7px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .btn:last-child {
  height: 30px;
  padding: 3px;
  border-radius: 0px 7px 7px 0px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .form-control {
  height: 30px;
  padding: 3px;
  text-align: center;
  border-color: #6c757d;
  border-left: none;
  border-right: none;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:last-child {
  flex : 15%;
}

.NewQT-QTMemo {
  width: 90%;
  margin: auto;
}

.NewQT-footer {
  z-index: 100;
  position: fixed;
  display:flex;
  bottom: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 70px;
  border-top: 1px solid #bebebe;
  background: #eeeeee;
}

.footer-selected {
  color : #5d4038;
}

.NewQT-footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}

.NewQT-footer a span i {
  font-size: 2.5rem;
}

.swiper-slide {
  height: 160px;
}

.qtConfirm-dealerList {
  margin-bottom: 0px;
  padding-left: 20px;
}
.qtConfirm-itemList {
  width: 90%;
  margin: auto;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #ddd;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 3px 5px;
  display: flex;
}
.qtConfirm-itemDel {
  margin-left: auto;
  text-align: right;
  flex: auto;
  align-self: center;
}

.submit-YES {
  margin:auto;
  flex: 50%;
  margin-right: 5px;
  background-color: #acd3ce;
  color: #333;
  font-weight: bold;
  border-color: #cccccc;
  margin-left: 10px;
}
.submit-NO {
  margin:auto;
  flex: 50%;
  margin-left: 5px;
  background-color: #afabab;
  border: none;
  color: #ececec;
}

.custom-control {
  margin-bottom: 20px;
}
.qtyInput{
  background-color: #ddd;
  height: 20x;
  width: 30px;
  text-align: right;
  border: 1px solid #78909C;
}
.qtyInput .v-input{
  /*background-color: gold;*/
  height:  20px;
  width: 25px;
  font-size:0.9rem;
  position:absolute;
  padding-top: 0px;
  padding-left: 2px;
  bottom:10px;
  float: right; 
}
.qtyInput input{
  background-color: inherit;
  width: 26px;
  height:  30px;
  padding: 0;
  font-size:0.9rem;
}
.tempItems{
  display:list-item;
  /*height:  20px;*/
  display: flex;
}
.tempItems .tempItem{
  height:  20px;
  width: 150px;

}
</style>