<template>
  <v-app>
    
    <v-stepper v-model="e6" vertical>
        <v-stepper-step color="accent" :complete="e6 > 1" step="1">
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
            <!-- 과거 정비이력 Popup-->
            <v-dialog v-model="dialog" transition="dialog-bottom-transition" >
              <template v-slot:activator="{ on: { click } }">
                <v-text-field label="차량번호" v-model="CarInfo.CarNo" outlined dense color="success"  v-on:keypress.enter="click"></v-text-field>
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
                  <v-btn icon dark @click="dialog = false">
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
            <v-text-field label="차량종류" outlined dense color="success" class="mt-n5"></v-text-field>

          </div>
          <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
          <v-btn text></v-btn>
        </v-stepper-content>

        <v-stepper-step color="accent"  :complete="e6 > 2" step="2">요청 부품 선택</v-stepper-step>
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

        <v-stepper-step color="accent" :complete="e6 > 3" step="3">견적요청 리스트 확인</v-stepper-step>
        <v-stepper-content step="3">
          <v-list two-line subheader>
            <v-list-item v-for="(qtItem, index) in qtRequest" v-bind:key="index">
              <v-list-item-avatar>
                <img src="@/assets/icon-oilfilter.png" v-if="qtItem.ITM_ICON === 'icon-oilfilter.png' ">
                <img src="@/assets/icon-airfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-airfilter.png' ">
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
                    <v-btn text icon small>
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                    <v-btn text small min-width="10px" max-width="15px">
                      <div>1</div>
                    </v-btn>
                    <v-btn text icon small>
                      <v-icon>keyboard_arrow_up</v-icon>
                    </v-btn>
                  </v-card>        

                </v-list-item-subtitle>
              </v-list-item-content>   
              <v-list-item-action>
                <v-btn class="mr-n4" icon>
                  <v-icon class="mr-n4 pl-4" color="grey lighten-1">highlight_off</v-icon>
                </v-btn>
              </v-list-item-action>  
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn text @click="e6 = 2">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step color="accent"  step="4">견적 요청 전송</v-stepper-step>
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
          <li v-for="(dealer, index) in dealerList" v-bind:key = "index">{{dealer.DEALER_NAME}}</li>
        </ul>
      </span>
      <span slot="list2">
        <div class="qtConfirm-itemList" v-for="item in selectedCategory" v-bind:key = "item">
          <span class="qtConfirm-itemDel">{{item}}</span>
          <span class="qtConfirm-itemDel">1개</span>
          <i class="qtConfirm-itemDel fas fa-times-circle"></i>
        </div>
      </span>
      <span slot="footer">
        전송 하시겠습니까?
        <router-link v-bind:to="{name:'Chat', params:{chatid:1}}">
          <b-button class="submit-YES" @click="addNewQTRequest()">YES</b-button>
        </router-link >
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

  </v-app>  
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import ItemCategory from '@/components/NewQT/ItemCategory.vue'
import QTConfirm from '@/components/NewQT/QTConfirm.vue'
import QTCamera from '@/components/NewQT/QTCamera.vue'
import ROHistory from '@/components/NewQT/ROHistory.vue'
import {datePadding, convertStringToDynamo} from '@/utils/common.js'

export default {
name: 'QTStep',
  data () {
    return {
      e6: 1,
      text: '',
      itmQty: 1,
      dealerCount: 0,
      categoryTitle: "",
      categoryList: [],
      selectedCategory: [],
      dealerList: [],
      qtRequest: [],
      showItemCategory: false,
      showQTConfirm: false,
      showQTCamera: false,
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
      dialog: false,
      qtReqMemo: ""
    }
  },
  methods: {
      showQTCameraModal(showFlag){
        this.showQTCamera = showFlag;
      },
      updatePic(pic){
        this.captureImg = pic;
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
        if(this.selectedCategory.indexOf(item.ITM_VAL) === -1) { // 새로 추가된 경우
            this.qtRequest.push(item);
        }
        else { // 체크 해제 한 경우
          this.qtRequest = this.qtRequest.filter(it => it.ITM_VAL != item.ITM_VAL);
        }
        console.log('qtRequest : ' + JSON.stringify(this.qtRequest));
      },
      addNewQTRequest() {
        console.log('addNewQTRequest : ' + JSON.stringify(this.qtRequest));
        console.log('UserInfo : ' + JSON.stringify(this.UserInfo));

        var now = new Date();
        var key = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                    + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

        console.log('key : ' + key);

        var param = {};
        param.operation = "create";
        param.tableName = "BAY4U_QT_LIST";
        param.payload = {};
        param.payload.Item = {};
        param.payload.Item.ID = key;
        param.payload.Item.CarNo = convertStringToDynamo(this.CarInfo.CarNo);
        param.payload.Item.CarVin = convertStringToDynamo(this.CarInfo.CarVin);
        param.payload.Item.ReqDt = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2);
        param.payload.Item.ReqSite = this.UserInfo.BsnID;
        param.payload.Item.ResDealer = "parts";
        param.payload.Item.Memo = convertStringToDynamo(this.qtReqMemo);
        param.payload.Item.LineItem = JSON.stringify(this.qtRequest);

        console.log('param : ' + JSON.stringify(param));

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
          //console.log("======= categoryList result ========");
          //console.log(result.data);
        });
      },
    },
    components: {
      ItemCategory: ItemCategory,
      QTConfirm: QTConfirm,
      QTCamera: QTCamera,
      ROHistory:ROHistory
    },    
    computed:{
      CarInfo: {
          get() { return this.$store.getters.CarInfo },
          set(value) { this.$store.dispatch('UpdateCarInfo',value) }
      },
      UserInfo: {
          get() { return this.$store.getters.UserInfo },
          set(value) { this.$store.dispatch('UpdateUserInfo',value) }
      }
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
</style>