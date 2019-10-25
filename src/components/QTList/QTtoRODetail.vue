<template>
    <div class="QTDetail-Swiper" name="QTtoRODetail">
      <div class="RO-Title">
        공임 선택
      </div>
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                에어컨/히터
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>필터 교환</b-form-checkbox>
              <b-form-checkbox>컨트롤 모듈 교환</b-form-checkbox>
              <b-form-checkbox>컴프레셔 교환</b-form-checkbox>
              <b-form-checkbox>모터 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                엔진오일
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>에어필터 교환</b-form-checkbox>
              <b-form-checkbox>연료필터 교환</b-form-checkbox>
              <b-form-checkbox>카본필터 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                자동변속기
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>트랜스미션 교환</b-form-checkbox>
              <b-form-checkbox>오일 쿨러 교환</b-form-checkbox>
              <b-form-checkbox>펌프 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                브레이크
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>페달 교환</b-form-checkbox>
              <b-form-checkbox>디스크 교환</b-form-checkbox>
              <b-form-checkbox>캘리퍼 교환</b-form-checkbox>
              <b-form-checkbox>실린더 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                Cooling 시스템
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>호스 교환</b-form-checkbox>
              <b-form-checkbox>라디에이터 교환</b-form-checkbox>
              <b-form-checkbox>워터 펌프 교환</b-form-checkbox>
              <b-form-checkbox>써모스탯 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                Exhaust 시스템
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>파이프 교환</b-form-checkbox>
              <b-form-checkbox>가스켓 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                전기 장비
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>헤드램프 교환</b-form-checkbox>
              <b-form-checkbox>실내램프 교환</b-form-checkbox>
              <b-form-checkbox>퓨즈박스 교환</b-form-checkbox>
              <b-form-checkbox>배터리 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                Steering
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>챔버 교환</b-form-checkbox>
              <b-form-checkbox>ARM 교환</b-form-checkbox>
              <b-form-checkbox>Rack 교환</b-form-checkbox>
              <b-form-checkbox>휠 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                Suspension
              </div>
            </div>
            <div class="Item-QTList">
              <b-form-checkbox>Suspension 교환</b-form-checkbox>
              <b-form-checkbox>Ball joint 교환</b-form-checkbox>
              <b-form-checkbox>Lower arm 교환</b-form-checkbox>
              <b-form-checkbox>Upper arm 교환</b-form-checkbox>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="Selected-Item">
        <div class="Header-Title">
          정비 상세 내역
        </div>
        <hr>
        <div class="ROList-Lineitem">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" role="tab">
              <b-container>
                <b-row>
                  <b-col align-self="center" class="ROLineitem-DetailBtn">
                      <b-button block href="#" v-b-toggle.QTaccordion-1 variant="secondary" size="sm">
                      <i class="fas fa-chevron-down"></i>
                    </b-button>
                  </b-col>
                  <b-col align-self="center" class="ROLineitem-Title">
                    <b-row class="ROTitle-Item">
                      필터 교환
                    </b-row>
                    <b-row  class="ROTitle-Amount">
                      90,000원
                    </b-row>
                  </b-col>
                  <b-col align-self="center" class="ROLineitem-QTSelect" v-on:click="showItemCategoryModal">
                    <span><i class="fas fa-plus-square"></i></span>
                  </b-col>
                  <b-col align-self="center" class="ROLineitem-Del"><i class="qtConfirm-itemDel fas fa-times-circle"></i></b-col>
                </b-row>
              </b-container>
            </b-card-header>
            <b-collapse id="QTaccordion-1" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <div class="history-detailConts">
                  <div class="qtConfirm-itemList">
                    <span class="qtConfirm-itemDel">오일 필터</span>
                    <span class="qtConfirm-itemDel">36,000원</span>
                    <i class="qtConfirm-itemDel fas fa-times-circle"></i>
                  </div>
                  <div class="qtConfirm-itemList">
                    <span class="qtConfirm-itemDel">연료 필터</span>
                    <span class="qtConfirm-itemDel">42,000원</span>
                    <i class="qtConfirm-itemDel fas fa-times-circle"></i>
                  </div>
                  <div class="qtConfirm-itemSubtotal">
                    <span class="itemSubtotal-title">부품 합계</span>
                    <span class="itemSubtotal-amount">78,000원</span>
                  </div>
                  <hr>
                  <div class="qtConfirm-itemtotal">
                    <span class="itemtotal-title">공임 포함 비용</span>
                    <span class="itemtotal-amount"><b-form-input style="width: 80px; display: inline; text-align: right;" placeholder="90,000"></b-form-input>원</span>
                    <i class="itemtotal-icon fas fa-calculator"></i>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" role="tab">
              <b-container>
                <b-row>
                  <b-col align-self="center" class="ROLineitem-DetailBtn">
                      <b-button block href="#" v-b-toggle.QTaccordion-2 variant="secondary" size="sm">
                      <i class="fas fa-chevron-down"></i>
                    </b-button>
                  </b-col>
                  <b-col align-self="center" class="ROLineitem-Title">
                    <b-row class="ROTitle-Item">
                      브레이크 패드 교환
                    </b-row>
                    <b-row  class="ROTitle-Amount">

                    </b-row>
                  </b-col>
                  <b-col align-self="center" class="ROLineitem-QTSelect" v-on:click="showItemCategoryModal">
                    <span><i class="fas fa-plus-square"></i></span>
                  </b-col>
                  <b-col align-self="center" class="ROLineitem-Del"><i class="qtConfirm-itemDel fas fa-times-circle"></i></b-col>
                </b-row>
              </b-container>
            </b-card-header>
          </b-card>
        </div>
      </div>

      <div class="Swiper-submit">
        <router-link class="submit-OK" to="">
          <b-button class="submit-btn">고객용 명세서 생성</b-button>
        </router-link >
      </div>
      <br><br><br>
      <ItemCategory v-if="showItemCategory" @close="showItemCategory=false">
        <h4 slot="header">견적 부품 선택</h4>
        <span slot="footer" @click="showItemCategory=false">
          확인 <i class="fas fa-check"></i>
        </span>
      </ItemCategory>
    </div>
</template>

<script>
import ItemCategory from './ItemCategory.vue'

export default {
  name: 'QTtoRODetail',
  data () {
    return {
      showItemCategory: false,
      selectedItems: [],
      swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
      }
    }
  },
  methods: {
    selectCheckbox(dealer, title, amount) {
       console.log("click!!! " + dealer + " | " + title + " | " + amount);
       var tmp = {};
       tmp.dealer = dealer;  tmp.title = title;  tmp.amount = amount;
       this.selectedItems.push(tmp);
    },
    showItemCategoryModal() {
      this.showItemCategory = !this.showItemCategory;
    }
  },
  components: {
    ItemCategory
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

.RO-Title {
  font-weight: bold;
  font-size: 1.3rem;
  color: #ff9999;
  margin-bottom: 10px;
  padding-left: 10px;
}

.QTDetail-Swiper {
  padding-top: 65px;
}

.Swiper-Item {
  width: 80%;
  min-height: 200px;
  margin:auto;
  border: 1px solid #999;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  padding: 10px;
}

.Swiper-Item .Item-Header {
  height: 35px;
  border-bottom: 1px solid #ddd;
}
.Swiper-Item .Item-Header .Header-Title {
  font-weight: bold;
  font-size: 1.1rem;
  color: #afabab;
}

.Swiper-Item .Item-QTList .custom-control {
  margin-left: 15px;
  margin-top: 10px;
}


.Swiper-submit {
  margin:auto;
  width: 90%;
  height: 80px;
  display: flex;
}

.Swiper-submit .submit-OK {
  margin:auto;
}

.Swiper-submit .submit-OK .submit-btn {
  margin:auto;
  width: 250px;
  background-color: #fcf4df;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  border-color: #cccccc;
}
/*
#696565 : 더 짙은 브라운
#afabab : 짙은 부라운
#fcf4df : 베이지
#ff9999 : 옅은 붉은색
#acd3ce : 옅은 녹색
#967d5f : 옅은 브라운
*/
.ROLineitem-DetailBtn {
  margin-left: -15px;
}
.ROLineitem-Title {
  flex: 50%;
}
.ROLineitem-Title .ROTitle-Item {
  font-weight: bold;
}
.ROLineitem-Title .ROTitle-Amount {
  font-weight: bold;
  color: #ff9999;
}
.ROLineitem-QTSelect {
  margin: -15px;
  font-size: 1.8rem;
  text-align: center;
  color :  #967d5f;
}
.ROLineitem-Del {
  margin: -25px;
  font-size: 1.5rem;
  text-align: right;
  color : #acd3ce;
}

.Selected-Item {
  width: 90%;
  min-height: 100px;
  margin:auto;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}

.Selected-Item .Header-Title {
  font-weight: bold;
  font-size: 1.2rem;
  color: #967d5f;
}
.Selected-Item .Header-Desc {
  font-style: italic;
  text-align: right;
  font-size: 0.8rem;
}

.qtConfirm-itemList {
  margin: auto;
  border: thin solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 3px 5px;
  display: flex;
}
.qtConfirm-itemList .qtConfirm-itemDel {
  margin-left: auto;
  text-align: center;
  flex: auto;
  align-self: center;
}
.qtConfirm-itemList .qtConfirm-itemDel:first-child {
  text-align: left;
  color: #aaa;
}
.qtConfirm-itemList .qtConfirm-itemDel:nth-child(3) {
  text-align: right;
  color: #967d5f;
}
.qtConfirm-itemList .qtConfirm-itemDel:last-child {
  text-align: right;
  color: #acd3ce;
}

.qtConfirm-itemSubtotal {
  margin: auto;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
}
.qtConfirm-itemSubtotal .itemSubtotal-title {
  margin-left: auto;
  text-align: left;
  flex: auto;
  align-self: center;
}
.qtConfirm-itemSubtotal .itemSubtotal-amount {
  text-align: right;
  color: #acd3ce;
}

.qtConfirm-itemtotal {
  margin: auto;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
}
.qtConfirm-itemtotal .itemtotal-title {
  margin-left: auto;
  text-align: left;
  flex: auto;
  align-self: center;
}
.qtConfirm-itemtotal .itemtotal-amount {
  text-align: right;
  color: #ff9999;
}
.qtConfirm-itemtotal .itemtotal-amount .form-contorl {
  width: 80px;
  display: inline;
}
.qtConfirm-itemtotal .itemtotal-icon {
  text-align: right;
  color: #ccc;
  margin-left: 10px;
}
/*
#696565 : 더 짙은 브라운
#afabab : 짙은 부라운
#fcf4df : 베이지
#ff9999 : 옅은 붉은색
#acd3ce : 옅은 녹색
#967d5f : 옅은 브라운
*/
</style>
