<template>
  <div class="NewQT">
    <div class="NewQT-contents">
      <div class="NewQT-title">
        차량 번호 / 차대 번호
      </div>
      <div class="NewQT-camera">
        <span>
          <input type="text">
        </span>
        <span>
          <i class="fas fa-camera"></i>
        </span>
      </div>
      <div class="NewQT-desc">
        # 차량 번호판이나 등록증, 차대번호판을 촬영하시면<br> 차량정보가 자동 인식 됩니다.
      </div>
      <div class="NewQT-title">
        차량 정보
      </div>
      <div class="NewQT-carInfo">
        <span>
          <b-form-input v-model="text" placeholder="차량번호"></b-form-input>
        </span>
        <span>
          <b-form-input v-model="text" placeholder="차대번호"></b-form-input>
        </span>
      </div>
      <div class="NewQT-title">
        요청 부품
      </div>
      <div class="NewQT-itemSelect">
        <!-- swiper -->
        <swiper  class="NewQT-itemSelect-wiper" :options="swiperOption">
          <swiper-slide><img v-on:click="showItemCategoryModal('1')" src="@/assets/group1.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('2')" src="@/assets/group2.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('3')" src="@/assets/group3.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('4')" src="@/assets/group4.png"></swiper-slide>
          <swiper-slide></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>


      <div class="NewQT-title">
        견적 요청 리스트
      </div>
      <div class="NewQT-itemList">
        <b-list-group>
          <b-list-group-item v-for="qtItem in qtRequest" v-bind:key="qtItem">
            <b-container>
              <b-row>
                <!--<b-col align-self="center"><img v-bind:src="qtItem.ITM_ICON"></b-col>-->
                <b-col align-self="center">
                  <img src="@/assets/icon-oilfilter.png" v-if="qtItem.ITM_ICON === 'icon-oilfilter.png' ">
                  <img src="@/assets/icon-airfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-airfilter.png' ">
                </b-col>

                <b-col>
                  <b-row>
                    <div class="itemList-title">{{qtItem.ITM_NM}}</div>
                  </b-row>
                  <b-row>
                    <b-input-group>
                        <b-button variant="outline-secondary">▲</b-button>
                        <b-form-input type="number" min="0.00" v-model="qtItem.ITM_QTY"></b-form-input>
                        <b-button variant="outline-secondary">▼</b-button>
                    </b-input-group>
                  </b-row>
                </b-col>
                <b-col align-self="center"><h3 style="margin:auto"><i class="fas fa-times-circle"></i></h3></b-col>
              </b-row>
            </b-container>
          </b-list-group-item>
        </b-list-group>
      </div>


      <div class="NewQT-title">
        메모 추가
      </div>
      <div class="NewQT-QTMemo">
        <span>
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="메모"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </span>
      </div>

      <div class="NewQT-submit">
        <b-button class="submit-list">대리점 선택</b-button>
        <b-button class="submit-OK" v-on:click="showQTConfirmModal">견적 요청</b-button>
      </div>
      <div class="NewQT-title">
      </div>
    </div>
 <!--   <div id="create-post">
      <video id="player" autoplay></video>
      <canvas id="canvas" width="320px" height="240px"></canvas>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="capture-btn">Capture</button>
    </div>-->
    <div class="NewQT-footer">
      <router-link to="/NewQT">
        <span class="footer-selected">
          <i class="fas fa-clipboard"></i>
        </span>
      </router-link >
      <router-link  to="/Chat">
        <span>
          <i class="far fa-comment-dots"></i>
        </span>
      </router-link >
      <router-link to="/QTList">
        <span>
          <i class="far fa-copy"></i>
        </span>
      </router-link >
      <router-link to="/UserInfo">
        <span>
          <i class="far fa-address-card"></i>
        </span>
      </router-link >
    </div>

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
          <li v-for="dealer in dealerList" v-bind:key = "dealer">{{dealer.DEALER_NAME}}</li>
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

  </div>

</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import ItemCategory from '@/components/NewQT/ItemCategory.vue'
import QTConfirm from '@/components/NewQT/QTConfirm.vue'
import Constant from '@/Constant';

export default {
  name: 'NewQT',
  data () {
    return {
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
      swiperOption: {
          slidesPerView: 3,
          spaceBetween: 100,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true
          }
      }
    }
  },
  methods: {
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

      var param = {};
      param.operation = "create";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.key =
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
        this.categoryTitle = result.data.Items[0].GRP_NM;
        this.categoryList = result.data.Items;
      });
    }
  },
  components: {
    ItemCategory: ItemCategory,
    QTConfirm: QTConfirm
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.NewQT-submit {
  margin:auto;
  width: 90%;
  height: 80px;
  display: flex;
}

.submit-list {
  margin:auto;
  flex: 50%;
  margin-right: 5px;
  background-color: #fcf4df;
  color: #333;
  font-weight: bold;
  font-size: 1.3rem;
  border-color: #cccccc;
}
.submit-OK {
  margin:auto;
  flex: 50%;
  margin-left: 5px;
  background-color: #696565;
  border: none;
  font-size: 1.3rem;
  color: #ececec;
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
