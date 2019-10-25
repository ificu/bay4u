<template>
    <div class="QTDetail-Swiper" name="QTDetailSelect">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                대리점 정보
              </div>
              <div class="Header-DealerInfo">
                <div class="Header-DealerName">
                  대영 모터스
                </div>
                <div class="Header-DealerTel">
                  02-6255-3410
                </div>
              </div>
            </div>
            <div class="Item-QTList">
              <ul>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('대영 모터스', '에어 필터', '65,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-bosch.png"></div>
                  <div class="detailConts-title"><div>에어 필터</div> <div style="color:#aaa">[당일]</div></div>
                  <div class="detailConts-amount">65,000원</div>
                </li>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('대영 모터스', '연료 필터', '120,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-fram.png"></div>
                  <div class="detailConts-title"><div>연료 필터</div> <div style="color:#aaa">[당일]</div></div>
                  <div class="detailConts-amount">120,000원</div>
                </li>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('대영 모터스', '디스크 패드', '89,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-trw.png"></div>
                  <div class="detailConts-title"><div>디스크 패드</div> <div style="color:#acd3ce">[익일]</div></div>
                  <div class="detailConts-amount">89,000원</div>
                </li>
              </ul>
            </div>
            <div class="Item-QTTotal">
              <div class="QTTotal-Title">
                합계
              </div>
              <div class="QTTotal-Amount">
                274,000원
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                대리점 정보
              </div>
              <div class="Header-DealerInfo">
                <div class="Header-DealerName">
                  벤츠 부품
                </div>
                <div class="Header-DealerTel">
                  02-2121-6650
                </div>
              </div>
            </div>
            <div class="Item-QTList">
              <ul>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('벤츠 부품', '에어 필터', '65,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-bosch.png"></div>
                  <div class="detailConts-title"><div>에어 필터</div> <div style="color:#aaa">[당일]</div></div>
                  <div class="detailConts-amount">65,000원</div>
                </li>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('벤츠 부품', '연료 필터', '110,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-mann.png"></div>
                  <div class="detailConts-title"><div>연료 필터</div> <div style="color:#aaa">[당일]</div></div>
                  <div class="detailConts-amount">110,000원</div>
                </li>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('벤츠 부품', '디스크 패드', '89,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-trw.png"></div>
                  <div class="detailConts-title"><div>디스크 패드</div> <div style="color:#aaa">[당일]</div></div>
                  <div class="detailConts-amount">89,000원</div>
                </li>
                <li>
                  <div class="detailConts-title"><div>배송비</div></div>
                  <div class="detailConts-amount">4,000원</div>
                </li>
              </ul>
            </div>
            <div class="Item-QTTotal">
              <div class="QTTotal-Title">
                합계
              </div>
              <div class="QTTotal-Amount">
                268,000원
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="Swiper-Item">
            <div class="Item-Header">
              <div class="Header-Title">
                대리점 정보
              </div>
              <div class="Header-DealerInfo">
                <div class="Header-DealerName">
                  코리아 No.1
                </div>
                <div class="Header-DealerTel">
                  02-3351-1452
                </div>
              </div>
            </div>
            <div class="Item-QTList">
              <ul>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('코리아 No.1', '에어 필터', '70,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-bosch.png"></div>
                  <div class="detailConts-title"><div>에어 필터</div> <div style="color:#acd3ce">[익일]</div></div>
                  <div class="detailConts-amount">70,000원</div>
                </li>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('코리아 No.1', '연료 필터', '120,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-fram.png"></div>
                  <div class="detailConts-title"><div>연료 필터</div> <div style="color:#aaa">[당일]</div></div>
                  <div class="detailConts-amount">120,000원</div>
                </li>
                <li>
                  <b-form-checkbox size="lg" @change="selectCheckbox('코리아 No.1', '디스크 패드', '99,000원')"></b-form-checkbox>
                  <div class="detailConts-icon"><img src="@/assets/icon-trw.png"></div>
                  <div class="detailConts-title"><div>디스크 패드</div> <div style="color:#acd3ce">[익일]</div></div>
                  <div class="detailConts-amount">99,000원</div>
                </li>
              </ul>
            </div>
            <div class="Item-QTTotal">
              <div class="QTTotal-Title">
                합계
              </div>
              <div class="QTTotal-Amount">
                289,000원
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="Selected-Item">
        <div class="Header-Title">
          선택 부품
        </div>
        <div class="Header-Desc">
          # 선택하신 부품은 대리점으로 각각 주문 됩니다.
        </div>
        <hr>
        <div class="qtConfirm-itemList" v-for="item in selectedItems" v-bind:key = "item">
          <span class="qtConfirm-itemDel">{{item.dealer}}</span>
          <span class="qtConfirm-itemDel">{{item.title}}</span>
          <span class="qtConfirm-itemDel">{{item.amount}}</span>
          <i class="qtConfirm-itemDel fas fa-times-circle"></i>
        </div>
      </div>

      <div class="Swiper-submit">
        <router-link class="submit-OK" v-bind:to="{name:'Chat', params:{chatid:1, append:'true'}}">
          <b-button class="submit-btn">대리점 개별 부품 주문</b-button>
        </router-link >
      </div>
      <br><br><br>
    </div>
</template>

<script>
export default {
  name: 'QTDetailSelect',
  data () {
    return {
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
.QTDetail-Swiper {
  padding-top: 100px;
}

.Swiper-Item {
  width: 80%;
  min-height: 300px;
  margin:auto;
  border: 1px solid #999;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  padding: 10px;
}

.Swiper-Item .Item-Header {
  height: 60px;
  border-bottom: 1px solid #ddd;
}
.Swiper-Item .Item-Header .Header-Title {
  font-weight: bold;
  font-size: 1.2rem;
}
.Swiper-Item .Item-Header .Header-DealerInfo {
  display: flex;
}
.Swiper-Item .Item-Header .Header-DealerInfo .Header-DealerName {
  flex: 50%;
  padding-left: 10px;
  color: #afabab;
}
.Swiper-Item .Item-Header .Header-DealerInfo .Header-DealerTel {
  flex: 50%;
  text-align: right;
  padding-right: 10px;
  color: #afabab;
}
.Swiper-Item .Item-Header .Header-Title {
  font-weight: bold;
  font-size: 1.3rem;
}
.Swiper-Item .Item-Header .Header-DealerInfo {
  display: flex;
}
.Swiper-Item .Item-Header .Header-DealerInfo .Header-DealerName {
  flex: 50%;
  padding-left: 10px;
  margin-bottom: 10px;
}

.Swiper-Item .Item-QTList {
  background-color: #f9f9f9;
  padding: 5px;
}
.Swiper-Item .Item-QTList ul {
  list-style-type: none;
  padding-left: 0px;
}
.Swiper-Item .Item-QTList li {
  display: flex;
  align-items:center;
  margin-bottom: 10px;
}
.custom-control {
  padding-right: 0px;
}
.detailConts-icon {
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
}
.detailConts-title {
  flex: 60%;
  font-size: 0.9rem;
  font-weight: bold;
}
.detailConts-amount {
  flex: 40%;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: right;
  color: #ff9999;
}

.Swiper-Item .Item-QTTotal {
  display: flex;
  background-color: #afabab;
  height: 45px;
  border-radius: 0px 0px 5px 5px;
  padding: 10px;
}
.Swiper-Item .Item-QTTotal .QTTotal-Title {
  flex: 50%;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fcf4df;
}
.Swiper-Item .Item-QTTotal .QTTotal-Amount {
  flex: 50%;
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 3px #333;
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
  color: #967d5f; /*afabab*/
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

</style>
