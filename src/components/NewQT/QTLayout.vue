<template>
  <v-app>
    <!-- 1. 차량번호/차대번호 촬영 인식 CARD -->
    <v-card class="mx-auto mb-2 mt-2" width="93%">
      <v-app-bar dark color="brown darken-2" height="40px">
        <v-card-title>1. 차량번호/ 차대번호 촬영 인식</v-card-title>
      </v-app-bar>
      <v-card-subtitle class="pb-0">차량 번호판이나 등록증, 차대번호를 촬영하시면 자동 인식 됩니다.</v-card-subtitle>
      <v-img class="grey lighten-3 mr-4 ml-4" min-height="115" v-bind:height="imgSize" v-bind:src="captureImg" ref="picImg" ></v-img>

      <div class="text-right mr-6 mt-n10 mb-4">
        <v-btn icon small color="teal"  @click="changeImageSize">
          <v-icon v-if="imgSize === '115' ">fas fa-expand</v-icon>
          <v-icon v-if="imgSize === '100%' ">fas fa-compress</v-icon>
        </v-btn>
      </div>    

      <div class="text-center mt-2 mb-4">
        <v-btn fab small color="success" @click="showQTCameraModal(true, 'CARNO')">
          <v-icon>fas fa-camera</v-icon>
        </v-btn>
      </div>    
      <div>
        <div class="text-left pl-6 mb-n9"><v-btn  color="#FFECB3" depressed @click="CarInfoClear()">CLEAR</v-btn></div>
        <div class="text-right mb-2 pr-6"><v-btn  color="#FFECB3" depressed @click="SetDummyCar()">미상차량</v-btn></div>
        <!-- 과거 정비이력 Popup / 차량번호 입력 -->
        <v-dialog v-model="showROHistDialog" transition="dialog-bottom-transition" >
          <template v-slot:activator="{ on: { click } }">
            <v-text-field class="pr-6 pl-4 mb-n4" label="차량번호" v-model="CarInfo.CarNo" outlined dense color="success" append-outer-icon="search" @click:append-outer="checkWebPOSHist" v-on:keypress.enter="checkWebPOSHist"></v-text-field>
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
                <ROHistory :RoHistoryData="roList"></ROHistory>
              </v-container>
            </v-card-text>         
            </v-card>
        </v-dialog>

        <v-text-field label="차대번호" v-model="CarInfo.VinNo" outlined dense color="success"  class="pr-6 pl-4" append-outer-icon="search" @click:append-outer="checkWebPOSHist" v-on:keypress.enter="checkWebPOSHist"></v-text-field>
        <!--<v-text-field label="차량종류" outlined dense color="success" class="mt-n5"></v-text-field>-->
        <v-btn outlined small color="red darken-1" class="mt-n6 mb-4 mr-4 float-right" v-if="showVINSearchBtn" @click="checkCarVin">차대번호 조회</v-btn>
        <v-btn outlined small color="red darken-1" class="mt-n6 mb-4 mr-1 float-right" v-if="showROHistBtn" @click="showROHistDialog=!showROHistDialog">정비이력</v-btn>

        <!-- 차대번호 조회 동의 Popup-->
        <v-dialog v-model="showVINSearchAgreePopup">
          <v-card>
            <v-card-title class="headline" >고객 확인 필요</v-card-title>
            <v-card-text>차대번호 조회를 위해선 고객동의를 받으시고 아래 차량 소유주명을 입력하셔야 합니다.</v-card-text>
            <v-card class="ml-4 mr-4" outlined>
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
    </v-card>

    <!-- 2. 요청 부품 선택 CARD -->
    <v-card class="mx-auto mb-2" width="93%">
      <v-app-bar dark color="brown darken-2" height="40px">
        <v-card-title>2. 요청 부품 선택</v-card-title>
      </v-app-bar>
      <div class="mb-4 mt-4">
        <!-- swiper -->
        <swiper  class="NewQT-itemSelect-wiper" :options="swiperOption">
          <swiper-slide><img v-on:click="showItemCategoryModal('1')" src="@/assets/group1.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('9')" src="@/assets/group9.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('2')" src="@/assets/group2.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('3')" src="@/assets/group3.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('4')" src="@/assets/group4.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('5')" src="@/assets/group5.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('6')" src="@/assets/group6.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('7')" src="@/assets/group7.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('8')" src="@/assets/group8.png"></swiper-slide>
          <swiper-slide></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

        <!-- 기타부품 추가 --> 
         <div class="tempItems">
            <v-text-field label="기타부품"  outlined dense color="success" class="tempItem ml-4" v-model="tempItem.ITM_NM"></v-text-field>
            <v-card class="d-flex" flat  tile dense >
              <v-btn tile outlined depressed  @click="subCounter()">-</v-btn>
             <!-- <v-btn fab dark x-small color="#757575" @click="subCounter()">
                <v-icon dark>mdi-minus</v-icon>
              </v-btn>-->
              <div class="qtyInput">
               <input type="number" v-on:keypress.enter="addNewItem(tempItem)" v-model.number="tempItem.ITM_QTY" >
              </div>
             <!-- <v-btn fab x-small dark color="#757575" @click="addCounter()">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>-->
                <v-btn tile outlined depressed @click="addCounter()">+</v-btn>
            </v-card>
            <v-btn class="mx-2 " fab color="success" x-small @click="addNewItem(tempItem)">입력</v-btn>
        </div>   
        <div class="ml-6 mt-2 mb-2">
          <small color = "success"># 부품명 입력 후 "입력"버튼을 누르면 추가 됩니다.</small>
          <!--<v-btn small  color="indigo" outlined @click="addNewItem(tempItem)">기타부품추가</v-btn>-->
        </div>

      <div>
        <v-textarea outlined class="ml-4 mr-4" color="success" label="사진 및 추가 요청사항" auto-grow rows="3" value="" v-model="qtReqMemo"></v-textarea>
      </div>
      <div>
        <v-btn outlined small color="teal accent-4" class="mt-n6 mb-4 mr-4 float-right"  @click="showQTCameraModal(true, 'ITEMIMG')">부품 사진 입력</v-btn>
      </div>
    </v-card>  

    <!-- 3. 견적요청 리스트 확인 CARD -->
    <v-card class="mx-auto mb-12" width="93%">
      <v-app-bar dark color="brown darken-2" height="40px">
        <v-card-title>3. 견적요청 리스트 확인</v-card-title>
      </v-app-bar>
      <v-list two-line subheader class="ml-4 mr-4">
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
            <img src="@/assets/icon-pic.png" v-else-if="qtItem.ITM_ICON === 'icon-pic.png' ">            
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="qtItem.ITM_NM"></v-list-item-title>
            <v-list-item-subtitle> 
              <v-card
                class="d-flex flex-row-reverse"
                flat
                tile
                dense
                id="reqList"
              >
               <!-- <v-btn text icon small @click="subCounter(index)">
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-btn>-->
                <v-btn tile outlined depressed  @click="addCounter(index)">+</v-btn>
                <div class="qtyInput">
                  <!--<v-text-field  v-model.number="qtItem.ITM_QTY" type="number" ></v-text-field>-->
                  <input type="number"  v-model.number="qtItem.ITM_QTY" >                  
                </div>
                <!--<v-btn text small min-width="10px" max-width="15px">
                  {{qtItem.ITM_QTY}}
                </v-btn>
                <v-btn text icon small @click="addCounter(index)">
                  <v-icon>keyboard_arrow_up</v-icon>
                </v-btn>-->
                <v-btn tile outlined depressed   @click="subCounter(index)">-</v-btn>
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
        <div class="text-center mt-2 mb-4">
          <b-button v-on:click="showQTConfirmModal" block class = "red lighten-3">최종 견적 요청</b-button>
        </div>      
      </v-list>    
    </v-card>    
    <v-divider></v-divider>

    <!-- 부품 카테고리 팝업 -->
    <ItemCategory v-if="showItemCategory" @close="showItemCategory=false">
      <h4 slot="header">{{categoryTitle}}</h4>
      <span slot="body">
        
        <b-form-group>
          <b-form-checkbox
            v-for="item in categoryList"
            v-model="selectedCategory"
            :key="item.ITM_VAL"
            :value="item.ITM_VAL"
            @change="addNewItem(item)"
            size="lg"
          >
            {{ item.ITM_NM }}
          </b-form-checkbox>
        </b-form-group>
      </span>
      <span slot="footer" @click="showItemCategory=false">
        확인 <i class="fas fa-check"></i>
      </span>
    </ItemCategory>

    <!-- 견적 요청 확인 팝업 -->
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

    <!-- 카메라 표시 팝업 -->
    <transition>
        <QTCamera 
          v-if="showQTCamera" 
          v-on:closeQTCameraModal="showQTCameraModal(false, '')"
          v-on:updatePic="updatePic"
          :cameraType="imgCaptureType"
          >
        </QTCamera>
    </transition>

    <!-- 알림 메시지 팝업 -->
    <MessageBox v-if="showAlertMsg"  @close="closeMsg(alertMsgPath)">
      <div slot="header"><h5 >알림</h5></div>
      <span slot="body" @click="closeMsg(alertMsgPath)"><pre>{{alertMsg}}</pre>
      </span>
      <div slot="footer" v-if="showAlerMsgBtn">
        <v-btn depressed small color="#967d5f" dark @click="closeMsg(alertMsgPath)"> 확인</v-btn>
      </div>
      <div slot="footer" v-if="showAlerMsgConfirmBtn">
        <v-btn depressed small color="#967d5f" dark @click="CheckReqVinNoQT(true)">확인</v-btn>
        <v-btn depressed small color="blue-grey lighten-2"  @click="CheckReqVinNoQT(false)">취소</v-btn>
      </div>
    </MessageBox>

  </v-app>  
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import ItemCategory from '@/components/NewQT/ItemCategory.vue'
import QTConfirm from '@/components/NewQT/QTConfirm.vue'
import QTCamera from '@/components/NewQT/QTCamera.vue'
import ROHistory from '@/components/NewQT/ROHistory.vue'
import MessageBox from '@/components/Common/MessageBox.vue'
import {datePadding, convertStringToDynamo, convertArrayToDynamo} from '@/utils/common.js'
import Constant from '@/Constant';

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
      captureImg: "",                   // 카메라에서 촬영된 차량번호 or 차대번호 이미지
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
      imgCaptureType: "",
      imgSize: "115",
      tempItem:{                        // 기타부품 추가
        ITM_ICON:" ",
        ITM_QTY:1,
        GRP_ID:" ",
        ITM_NM:" ",
        ITM_VAL:" ",
        GRP_NM:" ",
        SEQ:0
      },
      roList: [],
    }
  },
  methods: {
      showQTCameraModal(showFlag, type){
        this.showQTCamera = showFlag;
        this.imgCaptureType = type;
      },
      updatePic(pic){
        if(this.imgCaptureType === "CARNO") {
          this.captureImg = pic;
          pic = pic.replace("data:image/png;base64,", "");
          this.CarInfo.CarNo = "이미지 인식 중...";
          this.CarInfo.VinNo = "이미지 인식 중...";
          this.checkImgVIN(pic);
          this.checkImgCarNo(pic);
        }
        else if(this.imgCaptureType === "ITEMIMG") {
          var seq = this.qtRequest.length + 1;

          var now = new Date();
          var key = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                    + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

          var item = {
            "ITM_ICON": "icon-pic.png",
            "ITM_QTY": 1,
            "GRP_ID":"0",
            "ITM_NM":"사진입력",
            "ITM_VAL": "사진Item-" + seq,
            "SEQ": seq,
            "IMG": key
          };
          this.qtRequest.push(item);

          var param = {};

          param.operation = "create";
          param.tableName = "BAY4U_IMG";
          param.payload = {};
          param.payload.Item = {};
          param.payload.Item.ID = key;
          param.payload.Item.IMG = pic;

          axios({
              method: 'POST',
              url: Constant.LAMBDA_URL,
              eaders: Constant.JSON_HEADER,
              data: param
          })
          .then((result) => {
            console.log("======= IMG Save result ========");
            console.log(result.data);
            })
          .catch((error) => {
            console.log(error);
          });          
        }
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
          url: Constant.GOOGLE_URL,
          headers: Constant.JSON_HEADER,
          data: param
        }).then((result) => {
          console.log("======= Google API result ========");
          console.log(result.data);

          if(this.CarInfo.VinNo === "이미지 인식 중...") this.CarInfo.VinNo = "";

          var textArea;
          var vinNo;
          for (var img of result.data.responses) {
            textArea = img.fullTextAnnotation.pages[0].blocks[0];
            //console.log("Area : ", JSON.stringfy(textArea));
            var regType = /^[A-Za-z0-9+]*$/; // 영문 또는 숫자만 체크
            for (var text of img.textAnnotations) {
              if(regType.test(text.description)) {
                if(text.description.length == 17) {
                  // 이 것을 차대번호로 인지
                  console.log("VIN-17 : ", JSON.stringify(text));
                  this.CarInfo.VinNo = text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
                }
                if(text.description.length == 16 || text.description.length == 18) {
                  // 이 것을 차대번호로 인지
                  this.alertMsg = "차대번호가 인식되었으나\n한자리 정도 오차가 있습니다.\n정확한 차대번호를 확인해 주세요.";
                  this.showAlertMsg = !this.showAlertMsg;
                  this.alertMsgPath = "";

                  console.log("VIN-16/18 : ", JSON.stringify(text));
                  this.CarInfo.VinNo = text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
                }
              }
            }

            // 여전히 인식 안된 경우 두개의 문자열을 연결하여 한번 더 체크해 보자. 
            if(this.CarInfo.VinNo === "" || this.CarInfo.VinNo === null) {
              var preCheckedString = "";
              for (var text of img.textAnnotations) {
                if(regType.test(text.description)) {
                  if(preCheckedString !== ""){
                    var checkString = preCheckedString + text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
                    if(checkString.length == 17) {
                      console.log("VIN-pre : ", JSON.stringify(text));
                      this.CarInfo.VinNo = checkString;
                    }
                  }
                  preCheckedString = text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
                }
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
        this.CarInfo.VinNo = "";

        axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          // 차대번호가 있는데 괜히 덮어 씌어지지 않게 처리
          if(this.CarInfo.VinNo === "" || this.CarInfo.VinNo === null) {
            console.log("======= checkCarVin result ========");
            console.log(result.data);
            if(result.data.Count > 0) {
              this.CarInfo.VinNo = result.data.Items[0].VIN;
              this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
            }
            else {
              this.CarInfo.VinNo = "";

              // DB에 차량이 없다면 Intravan 통해서 국토부 조회 체크 

              param = {};
              param.carNo = this.CarInfo.CarNo;
              param.entNo = this.UserInfo.EntNo;

              axios({
                  method: 'POST',
                  url: Constant.INTRA_PKGIF_URL,
                  headers: Constant.JSON_HEADER,
                  data: param
              })
              .then((result) => {
                  console.log("======= checkIntraVanPkg result ========");
                  console.log(result.data); 
                  if(result.data.success === true) {
                    this.CarInfo.VinNo = result.data.data;
                    this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
                  }
                  else {
                    // 조회 에러가 났다면 고객명을 입력받아 차대 원부 조회
                    this.showVINSearchAgreePopup = true;
                  }
              })
              .catch((error) => {
                  console.log(error);
              })

              this.CarInfo.VinNo = "국토부 차대번호 조회 중...";
            }
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
            url: Constant.INTRAIF_URL,
            headers: Constant.JSON_HEADER,
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
                this.CarInfo.VinNo = "국토부 조회 중 오류";
            }
        })
        .catch((error) => {
            console.log(error);
        })

        this.CarInfo.VinNo = "차대 원부 조회 중...";
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
          url: Constant.AIBRIL_URL,
          headers: Constant.AIBRIL_HEADER,
          data: param
        }).then((result) => {
          console.log("======= Aibril API result ========");
          console.log(result.data);

          if(this.CarInfo.CarNo === "이미지 인식 중...") this.CarInfo.CarNo = "";

          for (var img of result.data.results) {
            if(img.carNo.length > 4) {
              console.log("CarNo : ", img.carNo);
              this.CarInfo.CarNo = img.carNo;
              this.checkWebPOSHist();
            }
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      // WebPOS에 과거 정비내역이 있는지 체크
      checkWebPOSHist(){
        if((this.CarInfo.CarNo === '' || this.CarInfo.CarNo === null || this.CarInfo.CarNo === undefined) &&
            (this.CarInfo.VinNo === '' || this.CarInfo.VinNo === null || this.CarInfo.VinNo === undefined)) 
        return;

        var param = {};
        param.BsnId = this.UserInfo.BsnID;
        param.CarNo = this.CarInfo.CarNo;
        param.VinNo = this.CarInfo.VinNo;

        this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');

        console.log("======= ROHistory Request result ========");
        console.log(param); 

        var rtnCode = "";
        var rtnCount = 0;
      
        axios({
            method: 'POST',
            url: Constant.SCPIF_URL + 'GetROList',
            headers: Constant.JSON_HEADER,
            data: param
        })
        .then((result) => {
            console.log("======= ROHistory Return result ========");
            console.log(result.data); 
            if(result.data.ReturnDataCount > 0) {
              this.showROHistBtn = true;
              this.roList = JSON.parse(result.data.ReturnDataJSON);
              this.CarInfo.VinNo = result.data.ReturnObject;
            }
            else if (result.data.ReturnObject !== "" && result.data.ReturnObject !== null) {
              this.CarInfo.VinNo = result.data.ReturnObject;
            }
            else {
              // 정비이력 조회는 차량번호 입력 or 인식 후 자동 처리 되므로 차대번호 조회도 자동 처리하자...
              this.checkCarVin();
            }
            
            this.showVINSearchBtn = true;
        })
        .catch((error) => {
            console.log(error);
        })
        this.CarInfo.VinNo = "WebPOS 이력 조회 중...";
        
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
        param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

        axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          console.log("======= dealerList result ========");
          console.log(result.data);
          this.dealerCount = result.data.Count;
          this.dealerList = result.data.Items;
        });

        // 기타부품 체크
        if(this.tempItem.ITM_NM.replace(/\s/gi, "") !== "")
        { 
          console.log("기타부품추가추");
          var tmpItemNm = this.tempItem.ITM_NM.replace(/\s{1}/i, "");
          var newItem = {};
          newItem.ITM_ICON = " ";
          newItem.ITM_QTY = this.tempItem.ITM_QTY;
          newItem.GRP_ID = " ";
          newItem.ITM_NM = tmpItemNm;

          newItem.ITM_VAL = tmpItemNm + this.qtRequest.length + 1 ;
          newItem.GRP_NM = " ";
          newItem.SEQ =  this.qtRequest.length + 1;
          this.qtRequest.push(newItem);

          // 기타부품 초기화
          this.tempItem.ITM_QTY = 1;
          this.tempItem.ITM_NM = " ";
          this.tempItem.ITM_VAL = " ";
          this.tempItem.SEQ = 0;
        }

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
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          console.log("======= categoryList result ========");
          console.log(result.data);

        if(Array.isArray(result.data.Items))
        {
          result.data.Items.sort(function(a, b){
            return (a.SORT > b.SORT) ? 1 : -1;
          });
        }

          this.categoryTitle = result.data.Items[0].GRP_NM;
          this.categoryList = result.data.Items;
        });

        this.showItemCategory = !this.showItemCategory;
      },
      addNewItem(item) {
        if(item.ITM_VAL === " ")
        {
            var tmpItmNm = item.ITM_NM.replace(/\s{1}/i, "");
            var tempItem = {};
            tempItem.ITM_ICON = " ";
            tempItem.ITM_QTY = item.ITM_QTY;
            tempItem.GRP_ID = " ";
            if(item.ITM_NM.replace(/\s/gi, "") === ""){
              return;
            }
            else{
              tempItem.ITM_NM = tmpItmNm;
            }
            
            tempItem.ITM_VAL = tmpItmNm + this.qtRequest.length + 1 ;
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
        if(this.selectedCategory.indexOf(item.ITM_NM) >= 0){
          this.$delete(this.selectedCategory , this.selectedCategory.indexOf(item.ITM_NM));
        }
        /*console.log(Array.isArray(this.selectedCategory));
        console.log('selectedCategory : ' + this.selectedCategory);*/
      },
      addNewQTRequest() {
        
        var param = {};
        param.BsnId = this.UserInfo.BsnID;
        param.UserID = this.UserInfo.UserID;
        param.CarNo = this.CarInfo.CarNo;
        param.VinNo = this.CarInfo.VinNo;
        if(Array.isArray(this.roList) && this.roList.length > 0  ){
          
          param.KTYPNR  = this.roList[0].KTYPNR ;
          param.CD_CR_DTL = this.roList[0].CD_CR_DTL ;
          param.MCODE = this.roList[0].MCODE ;
          
        }
        else{
          
          param.KTYPNR  = '0' ;
          param.CD_CR_DTL = '' ;
          param.MCODE = '' ;
         
        }
        
        param.Memo = this.qtReqMemo;
        if(this.qtRequest !== undefined || this.qtRequest !== null || this.qtRequest.length !== 0 )
        {
            param.RequestDataJSON = JSON.stringify(this.qtRequest);
        }

        console.log('param : ' + JSON.stringify(param));

        axios({
            method: 'POST',
            url: Constant.SCPIF_URL + 'SaveQTData',
            headers: Constant.JSON_HEADER,
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
             var imgKey = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
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
              param.payload.Item.IMG = imgKey;
              //param.payload.Item.LineItem = JSON.stringify(this.qtRequest);
              param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.qtRequest));

              console.log(JSON.stringify(param));

              axios({
                method: 'POST',
                url: Constant.LAMBDA_URL,
                headers: Constant.JSON_HEADER,
                data: param
              })
              .then((result) => {
                console.log("======= Data Save result ========");
                console.log(result.data);
                })
              .catch((error) => {
                console.log(error);
              });

              var qtInfoData = param.payload.Item;

              param = {};

              param.operation = "create";
              param.tableName = "BAY4U_IMG";
              param.payload = {};
              param.payload.Item = {};
              param.payload.Item.ID = imgKey;
              param.payload.Item.IMG = this.captureImg;

              axios({
                  method: 'POST',
                  url: Constant.LAMBDA_URL,
                  headers: Constant.JSON_HEADER,
                  data: param
              })
              .then((result) => {
                console.log("======= IMG Save result ========");
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
                                        chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2),
                                        qtInfo : qtInfoData
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
      checkQtData() {

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
      closeMsg(path) {     
          this.showAlertMsg = false;
          if(path.length > 0 && path == 'Login')
          {
              this.$router.push('/');
          }
      },
      CheckReqVinNoQT(value) {
        if(value === true)
        {
           this.CarInfo.VinNo = "99999999999999999";
           this.addNewQTRequest();
           
           console.log("this.alertYesNo : ", this.alertYesNo);
           console.log("VinNo : ", this.CarInfo.VinNo);
           
        }
        
        this.showAlertMsg = false;
        this.showAlerMsgConfirmBtn = false;
        this.alertYesNo = value;

      },
      SetDummyCar() {
        this.CarInfo.VinNo = "99999999999999999";
        this.e6 = 2;
      },
      CarInfoClear() {
        this.CarInfo.CarNo = "";
        this.CarInfo.VinNo = "";
        this.showVINSearchBtn = false;
        this.showROHistBtn = false;
        this.captureImg = "";
        this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');
        this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
      },
      changeImageSize() {
        if(this.imgSize === "100%")
          this.imgSize = "115";
        else
        this.imgSize = "100%";
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

.tempItems{
  display:list-item;
  display: flex;
}

.tempItems .v-card{
  height: 40px;
  width: 90px;
  margin-left:4px;
  border : solid 1px #BDBDBD;
  border-radius: 3px 3px 3px 3px;
}

.tempItems .v-card .v-btn {
    height: 40px;
    width: 19px;
    min-width: 5px;
    margin: 0px 0px;
    border:0px;
    font-size: 1.6em;
    text-align: center;
}
.qtyInput{
  height: 40x;
  width: 50px;
  border-right: solid 1px #BDBDBD;
  border-left: solid 1px #BDBDBD;
  padding-top: 4px;
  text-align: center;
}
.qtyInput input {
  width: 26px;
  height:  30px;
  padding: 0;
  font-size:0.9rem;
  text-align: center;
}

/*
.tempItems .v-card .v-btn .v-icon {
  height: 10px;
  width: 10px;
  min-width: 10px;
  margin: 0px;
}
*/
#reqList  {
  border : solid 1px #BDBDBD;
  border-radius: 3px 3px 3px 3px;
  width: 100px;
  float: right;
  margin-right: 15px;
}
#reqList .v-btn {
  height: 35px;
  width: 20px;
  min-width: 5px;
  margin: 0px 0px;
  border:0px;
  font-size: 1.6em;
  text-align: center;
}
/*
#reqList .v-btn  .v-icon {
  height: 10px;
  width: 10px;
  min-width: 10px;
  margin: 0px;;
}*/

</style>