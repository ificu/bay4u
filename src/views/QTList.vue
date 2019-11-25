<template>
  <div class="QTList">
    <b-tabs class="QTList-tab" justified v-model="tabIndex" v-if="showMainPage">
      <b-tab title="부품 견적서" :title-link-class="linkClass(0)" >
        <div class="QTList-contents">
          <div class="QTList-title">
            견적 요청 히스토리
          </div>
          <div class="QTList-search">
            <b-input-group>
              <b-dropdown slot="prepend" v-bind:text="dropdownQT">
                <b-dropdown-item @click="dropdownQT='대리점'">대리점</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='차량번호'">차량번호</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='날짜'">날짜</b-dropdown-item>
              </b-dropdown>

              <b-form-input></b-form-input>

              <b-input-group-append>
                <b-button><i class="fas fa-search"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <div class="QTList-history">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/7(수)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        43마4297
                      </b-row>
                      <b-row  class="history-carType">
                        BMW 7Series
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                        <b-button block href="#" v-b-toggle.QTaccordion-1 variant="secondary" size="sm" @click="QTList1Toggle = !QTList1Toggle">
                        <i v-if="!QTList1Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="QTList1Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="QTaccordion-1" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-title">대영 모터스</div>
                        <div class="detailConts-amount">290,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title">벤츠 부품</div>
                        <div class="detailConts-amount">305,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title">코리아 No.1</div>
                        <div class="detailConts-amount">295,000원</div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showQTComparePageToggle">상세 견적 확인</b-button>
                      <b-button @click="showQTShoppingcartPageToggle">개별 부품 선택</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/5(월)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        61거6440
                      </b-row>
                      <b-row  class="history-carType">
                        BMW i8
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#" v-b-toggle.QTaccordion-2 variant="secondary" size="sm" @click="QTList2Toggle = !QTList2Toggle">
                        <i v-if="!QTList2Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="QTList2Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="QTaccordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-title">대영 모터스</div>
                        <div class="detailConts-amount">290,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title">벤츠 부품</div>
                        <div class="detailConts-amount">305,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title">코리아 No.1</div>
                        <div class="detailConts-amount">295,000원</div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showQTComparePageToggle">상세 견적 확인</b-button>
                      <b-button @click="showQTShoppingcartPageToggle">개별 부품 선택</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/5(월)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        11서8137
                      </b-row>
                      <b-row  class="history-carType">
                        BMW X3
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#" v-b-toggle.QTaccordion-3 variant="secondary" size="sm" @click="QTList3Toggle = !QTList3Toggle">
                        <i v-if="!QTList3Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="QTList3Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="QTaccordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-title">대영 모터스</div>
                        <div class="detailConts-amount">290,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title">벤츠 부품</div>
                        <div class="detailConts-amount">305,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title">코리아 No.1</div>
                        <div class="detailConts-amount">295,000원</div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showQTComparePageToggle">상세 견적 확인</b-button>
                      <b-button @click="showQTShoppingcartPageToggle">개별 부품 선택</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </b-tab>
      <b-tab title="견적 확정" :title-link-class="linkClass(1)" active>
        <div class="QTList-contents">
          <div class="QTList-title">
            견적 확정 내역
          </div>
          <div class="QTList-search">
            <b-input-group>
              <b-dropdown slot="prepend" v-bind:text="dropdownQT">
                <b-dropdown-item @click="dropdownQT='대리점'">대리점</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='차량번호'">차량번호</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='날짜'">날짜</b-dropdown-item>
              </b-dropdown>

              <b-form-input></b-form-input>

              <b-input-group-append>
                <b-button><i class="fas fa-search"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <div class="QTList-history">
            
            <b-card no-body class="mb-1" v-for="(qtInfo , idx) in confirmQTdata" v-bind:key="idx">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">{{qtInfo.MONTH}}/{{qtInfo.DAY}}({{qtInfo.DAYWEEK}})</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        {{qtInfo.CAR_NO}}
                      </b-row>
                      <b-row  class="history-carType">
                        {{qtInfo.AGENT_NM}}
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#"  v-b-toggle="'accordion-' + idx"  variant="secondary" size="sm" v-on:click="GetQtList(qtInfo)">
                        <i v-if="!SOList1Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="SOList1Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse :id="'accordion-'+idx" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <!--<li>
                        <div class="detailConts-dealer">대영 모터스</div>
                      </li>-->
                      <li  v-for="(item, index) in detailQTData" v-bind:key = "index">
                        <div class="itemCode" > {{item.CONFIRM_ITM}}</div>
                        <div class="itemName">{{item.NM_ITM}}</div>
                        <div class="detailConts-amount">{{item.AMT | localeNum}}원</div>
                        <div class="delvDay">{{item.DELV_DAY}}</div>
                      </li>
                    </ul>
                    <div class="QTRes-footer">
                        <div class="TotalInfo">
                          <span class="TotalInfo-Title">합계금액</span>
                          <span class="TotalInfo-Text">{{total | localeNum}}</span>
                        </div>
                    </div>
                    <!--
                    <div class="detailConts-compare">
                      <b-button @click="showRODetailPageToggle">정비 명세서 작성</b-button>
                    </div>
                    -->
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          
            <!--
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/5(월)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        61거6440
                      </b-row>
                      <b-row  class="history-carType">
                        BMW i8
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#" v-b-toggle.SOaccordion-2 variant="secondary" size="sm" @click="SOList2Toggle = !SOList2Toggle">
                        <i v-if="!SOList2Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="SOList2Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="SOaccordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-dealer">코리아 No.1</div>
                      </li>
                      <li>
                        <div class="detailConts-icon"><img src="@/assets/icon-bosch.png"></div>
                        <div class="detailConts-title">에어 필터</div>
                        <div class="detailConts-amount">65,000원</div>
                        <div class="detailConts-status"><i class="fas fa-shipping-fast"></i></div>
                      </li>
                      <li>
                        <div class="detailConts-icon"><img src="@/assets/icon-fram.png"></div>
                        <div class="detailConts-title">연료 필터</div>
                        <div class="detailConts-amount">120,000원</div>
                        <div class="detailConts-status"><i class="fas fa-phone"></i></div>
                      </li>
                      <li>
                        <div class="detailConts-icon"><img src="@/assets/icon-trw.png"></div>
                        <div class="detailConts-title">디스크 패드</div>
                        <div class="detailConts-amount">89,000원</div>
                        <div class="detailConts-status"><i class="fas fa-box-open"></i></div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showRODetailPageToggle">정비 명세서 작성</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/5(월)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        11서8137
                      </b-row>
                      <b-row  class="history-carType">
                        BMW X3
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#" v-b-toggle.SOaccordion-3 variant="secondary" size="sm" @click="SOList3Toggle = !SOList3Toggle">
                        <i v-if="!SOList3Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="SOList3Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="SOaccordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-dealer">대영 모터스</div>
                      </li>
                      <li>
                        <div class="detailConts-icon"><img src="@/assets/icon-bosch.png"></div>
                        <div class="detailConts-title">에어 필터</div>
                        <div class="detailConts-amount">65,000원</div>
                        <div class="detailConts-status"><i class="fas fa-shipping-fast"></i></div>
                      </li>
                      <li>
                        <div class="detailConts-icon"><img src="@/assets/icon-fram.png"></div>
                        <div class="detailConts-title">연료 필터</div>
                        <div class="detailConts-amount">120,000원</div>
                        <div class="detailConts-status"><i class="fas fa-phone"></i></div>
                      </li>
                      <hr>
                      <li>
                        <div class="detailConts-dealer">코리아 No.1</div>
                      </li>
                      <li>
                        <div class="detailConts-icon"><img src="@/assets/icon-trw.png"></div>
                        <div class="detailConts-title">디스크 패드</div>
                        <div class="detailConts-amount">89,000원</div>
                        <div class="detailConts-status"><i class="fas fa-box-open"></i></div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showRODetailPageToggle">정비 명세서 작성</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
-->            
          </div>
        </div>
      </b-tab>
      <b-tab title="정비 명세서" :title-link-class="linkClass(2)" >
        <div class="QTList-contents">
          <div class="QTList-title">
            고객 정비 히스토리
          </div>
          <div class="QTList-search">
            <b-input-group>
              <b-dropdown slot="prepend" v-bind:text="dropdownQT">
                <b-dropdown-item @click="dropdownQT='대리점'">대리점</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='차량번호'">차량번호</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='날짜'">날짜</b-dropdown-item>
              </b-dropdown>

              <b-form-input></b-form-input>

              <b-input-group-append>
                <b-button><i class="fas fa-search"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <div class="QTList-history">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/7(수)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        43마4297
                      </b-row>
                      <b-row  class="history-carType">
                        BMW 7Series
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#" v-b-toggle.ROaccordion-1 variant="secondary" size="sm" @click="ROList1Toggle = !ROList1Toggle">
                        <i v-if="!ROList1Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="ROList1Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="ROaccordion-1" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">오일 교환</div>
                        <div class="detailConts-amount detailConts-subtotal">120,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">브레이크 패드 교환</div>
                        <div class="detailConts-amount detailConts-subtotal">160,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">기타</div>
                        <div class="detailConts-amount detailConts-subtotal">5,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-total">총 합계</div>
                        <div class="detailConts-amount detailConts-total">325,000원</div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showRODetailPageToggle">명세서 수정</b-button>
                      <b-button @click="showCustomerDocOptionPageToggle">고객 명세서 발송</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/5(월)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        61거6440
                      </b-row>
                      <b-row  class="history-carType">
                        BMW i8
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#" v-b-toggle.ROaccordion-2 variant="secondary" size="sm" @click="ROList2Toggle = !ROList2Toggle">
                        <i v-if="!ROList2Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="ROList2Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="ROaccordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">오일 교환</div>
                        <div class="detailConts-amount detailConts-subtotal">120,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">브레이크 패드 교환</div>
                        <div class="detailConts-amount detailConts-subtotal">160,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">기타</div>
                        <div class="detailConts-amount detailConts-subtotal">5,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-total">총 합계</div>
                        <div class="detailConts-amount detailConts-total">325,000원</div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showRODetailPageToggle">명세서 수정</b-button>
                      <b-button @click="showCustomerDocOptionPageToggle">고객 명세서 발송</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" role="tab">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">8/5(월)</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        11서8137
                      </b-row>
                      <b-row  class="history-carType">
                        BMW X3
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#" v-b-toggle.ROaccordion-3 variant="secondary" size="sm" @click="ROList3Toggle = !ROList3Toggle">
                        <i v-if="!ROList3Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="ROList3Toggle"  class="fas fa-chevron-up"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse id="ROaccordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">오일 교환</div>
                        <div class="detailConts-amount detailConts-subtotal">120,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">브레이크 패드 교환</div>
                        <div class="detailConts-amount detailConts-subtotal">160,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">기타</div>
                        <div class="detailConts-amount detailConts-subtotal">5,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-total">총 합계</div>
                        <div class="detailConts-amount detailConts-total">325,000원</div>
                      </li>
                    </ul>
                    <div class="detailConts-compare">
                      <b-button @click="showRODetailPageToggle">명세서 수정</b-button>
                      <b-button @click="showCustomerDocOptionPageToggle">고객 명세서 발송</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </b-tab>
    </b-tabs>

    <div class="QTList-Contents" v-if="showQTComparePage">
      <span type="button" class="headerBar-Back" v-on:click="showMainPageToggle">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <p class="headerBar-title">상세 견적 확인</p>
    </div>
    <div v-if="showQTComparePage">
      <QTDetailCompare>
      </QTDetailCompare>
    </div>

    <div class="QTList-Contents" v-if="showQTShoppingcartPage">
      <span type="button" class="headerBar-Back" v-on:click="showMainPageToggle">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <p class="headerBar-title">견적 개별 부품 선택</p>
    </div>
    <div v-if="showQTShoppingcartPage">
      <QTDetailSelect>
      </QTDetailSelect>
    </div>

    <div class="QTList-Contents" v-if="showRODetailPage">
      <span type="button" class="headerBar-Back" v-on:click="showMainPageToggle">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <p class="headerBar-title">정비 명세서 작성</p>
    </div>
    <div v-if="showRODetailPage">
      <QTtoRODetail>
      </QTtoRODetail>
    </div>

    <div class="QTList-Contents" v-if="showCustomerDocPage">
      <span type="button" class="headerBar-Back" v-on:click="showMainPageToggle">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <p class="headerBar-title">고객용 정비 명세서</p>
    </div>
    <div v-if="showCustomerDocPage">
      <CustomerDoc>
      </CustomerDoc>
    </div>

    <div v-if="showCustomerDocOptionPage">
      <v-app>  
      <CustomerDocOption  v-if="showCustomerDocOptionPage" @close="showCustomerDocPageToggle">
                
          <h4 slot="header">고객 명세서 출력 옵션</h4>
          <span slot="body">
            <v-container fluid>
              <v-switch class="mb-n4" v-model="customerDocOption" label="카센터 정보" value input-value="true" disabled></v-switch>
              <v-switch class="mb-n4" v-model="customerDocOption" label="차량 정보" value input-value="true" disabled></v-switch>
              <v-switch class="mb-n4" v-model="customerDocOption" label="공임 내역" value="공임 내역"></v-switch>
              <v-switch class="mb-n4" v-model="customerDocOption" label="부품상세 내역" value="부품상세 내역"></v-switch>
              <v-switch class="mb-n4" v-model="customerDocOption" label="할인 내역" value="할인 내역"></v-switch>
              <v-switch class="mb-n4" v-model="customerDocOption" label="총 가격" value input-value="true" disabled></v-switch>
            </v-container>
          </span>
          <span slot="footer" @click="showCustomerDocPageToggle">
            확인 <i class="fas fa-check"></i>
          </span>
                
      </CustomerDocOption>
      </v-app>  
    </div>

    <div class="QTList-footer" v-if="!showCustomerDocPage">
      <router-link to="/NewQT">
        <span>
          <i class="far fa-clipboard"></i>
        </span>
      </router-link >
      <router-link to="/Chat">
        <span>
          <i class="far fa-comment-dots"></i>
        </span>
      </router-link >
      <router-link to="/QTList">
        <span class="footer-selected">
          <i class="fas fa-copy"></i>
        </span>
      </router-link >
      <router-link to="/UserInfo">
        <span>
          <i class="far fa-address-card"></i>
        </span>
      </router-link >
    </div>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import QTDetailCompare from '@/components/QTList/QTDetailCompare.vue'
import QTDetailSelect from '@/components/QTList/QTDetailSelect.vue'
import QTtoRODetail from '@/components/QTList/QTtoRODetail.vue'
import CustomerDoc from '@/components/QTList/CustomerDoc.vue'
import CustomerDocOption from '@/components/QTList/CustomerDocOption.vue'

export default {
  name: 'QTList',
  data () {
    return {
      customerDocOption: "",
      tabIndex: 0,
      dropdownQT: '차량번호',
      dropdownSO: '차량번호',
      dropdownRO: '차량번호',
      QTList1Toggle:false,
      QTList2Toggle:false,
      QTList3Toggle:false,
      SOList1Toggle:false,
      SOList2Toggle:false,
      SOList3Toggle:false,
      ROList1Toggle:false,
      ROList2Toggle:false,
      ROList3Toggle:false,
      showMainPage:true,
      showQTComparePage:false,
      showQTShoppingcartPage:false,
      showRODetailPage:false,
      showCustomerDocPage:false,
      showCustomerDocOptionPage:false,
      swiperOption: {
          slidesPerView: 3,
          spaceBetween: 100,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true
          }
      },
      detailQTData:[],
      confirmQTdata: [],
    }
  },
  methods: {
    listToggleClear() {
      this.QTList1Toggle = false;
      this.QTList2Toggle = false;
      this.QTList3Toggle = false;
      this.SOList1Toggle = false;
      this.SOList2Toggle = false;
      this.SOList3Toggle = false;
      this.ROList1Toggle = false;
      this.ROList2Toggle = false;
      this.ROList3Toggle = false;
    },
    showMainPageToggle() {
      this.showMainPage = true;
      this.showQTComparePage = false;
      this.showQTShoppingcartPage = false;
      this.showRODetailPage = false;
      this.showCustomerDocPage = false;
      this.showCustomerDocOpationPage = false;
      this.listToggleClear();
    },
    showQTComparePageToggle() {
      this.showMainPage = false;
      this.showQTComparePage = true;
      this.showQTShoppingcartPage = false;
      this.showRODetailPage = false;
      this.showCustomerDocPage = false;
      this.showCustomerDocOpationPage = false;
      this.listToggleClear();
    },
    showQTShoppingcartPageToggle() {
      this.showMainPage = false;
      this.showQTComparePage = false;
      this.showQTShoppingcartPage = true;
      this.showRODetailPage = false;
      this.showCustomerDocPage = false;
      this.showCustomerDocOpationPage = false;
      this.listToggleClear();
    },
    showRODetailPageToggle() {
      this.showMainPage = false;
      this.showQTComparePage = false;
      this.showQTShoppingcartPage = false;
      this.showRODetailPage = true;
      this.showCustomerDocPage = false;
      this.showCustomerDocOpationPage = false;
      this.listToggleClear();
    },
    showCustomerDocPageToggle() {
      this.showMainPage = false;
      this.showQTComparePage = false;
      this.showQTShoppingcartPage = false;
      this.showRODetailPage = false;
      this.showCustomerDocPage = true;
      this.showCustomerDocOpationPage = false;
      this.listToggleClear();
    },
    showCustomerDocOptionPageToggle() {
      this.showMainPage = false;
      this.showQTComparePage = false;
      this.showQTShoppingcartPage = false;
      this.showRODetailPage = false;
      this.showCustomerDocPage = true;
      this.showCustomerDocOpationPage = true;
      this.listToggleClear();
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-warning', 'font-weight-bold']
      } else {
        return ['bg-light', 'text-secondary', 'font-weight-light']
      }
    },
    showQTReqList() {
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ReqSite = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

       console.log("chating list pram : " + JSON.stringify(param));

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
        console.log("======= QT List result ========");
        console.log(result.data.Items);
        this.qtReqList = result.data.Items;
        /*
        if(Array.isArray(this.qtReqList))
        {
            console.log(this.qtReqList);
            console.log("TRUE");
            
        }

        result.data.Items.forEach(element => { 
         if(this.resDealers.indexOf(element['ResDealer']) === -1)
         {
            this.resDealers.push(element['ResDealer']);
         }
        });
*/
      });
    },

    GetQtList(item){

      this.detailQTData = [];
      var param = {};
      param.BsnId = item.BSN_ID;
      param.CarNo = item.CAR_NO;
      param.VinNo = item.VIN_NO;
      param.RequestDataJSON = item.ESTM_ID;

      console.log("======= QT Detail Request result ========");
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
                console.log(this.detailQTData);
              }

            }
          }
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    GetConfirmQtList()
    {
      this.confirmQTdata  = [];

      var param = {};
      param.BsnId = this.UserInfo.BsnID;

      console.log("======= Confirm QT Request result ========");
      console.log(param); 

      var rtnCode = "";

      axios({
          method: 'POST',
          //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetConfirmQTData',
          url:'https://bay4u.co.kr/scpif/GetConfirmQTData',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          data: param
      })
      .then((result) => {
          console.log("======= Return result ========");     
          console.log(result.data); 
         
          this.rtnCode = result.data.ReturnCode;

          if(this.rtnCode === 0)
          {
            this.confirmQTdata = JSON.parse(result.data.ReturnDataJSON);
            console.log(this.confirmQTdata);
          }
      })
      .catch((error) => {
          console.log(error);
      })   
    }
  },
  components: {
    QTDetailCompare,
    QTDetailSelect,
    QTtoRODetail,
    CustomerDoc,
    CustomerDocOption,    
  },
  computed: {
    
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
  created : function() {
    //this.showQTReqList();
    if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');

    this.GetConfirmQtList();  
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
.QTList-tab {
  padding: 5px;
  font-size: 0.9rem;
}

.QTList-title {
  margin:auto;
  width: 90%;
  padding-top: 15px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
}

.QTList-search {
  margin:auto;
  width: 90%;
}
.QTList-search .input-group .input-group-prepend .dropdown .btn {
  background-color: #696565;
}
.QTList-search .input-group .input-group-append .btn {
  background-color: #acd3ce;
  border: none;
}

.card-header {
  background-color: #fcf4df;
  padding-top : 0px;
  padding-bottom : 0px;
}

.card-header .container {
  padding-top : 0px;
  padding-bottom : 0px;
}

.QTList-history {
  margin:auto;
  width: 90%;
  padding-top: 20px;
}

.QTList-history .list-group .list-group-item {
  padding: 5px;
  background-color: #e4e4e4;
}
.history-detailConts {
  background-color: #f9f9f9;
  margin: -20px;
  padding: 10px;
}
.history-detailConts ul {
  list-style-type: none;
  padding-left: 0px;
}

.history-date {
  font-size: 1.2rem;
  font-weight: bold;
  flex:15%;
}
.history-car {
  flex:40%;
}
.history-carNo {
  font-size: 1.1rem;
  font-weight: bold;
}
.history-carType {
  font-size: 0.7rem;
}
.history-detailBtn {
  flex:15%;
  text-align: right;
}

.history-detailConts {
  padding: 20px;
}
.history-detailConts li {
  display: flex;
  align-items:center;
}
.detailConts-dealer {
  margin-top: 5px;
  font-size: 1rem;
}
.detailConts-icon {
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
}
.detailConts-title {
  flex: 50%;
  font-size: 0.9rem;
  font-weight: bold;
}
.detailConts-amount {
  flex: 25%;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: right;
  color: #ff9999;
}
.detailConts-status {
  flex: 10%;
  margin-left: 5px;
  color: #999;
}
.detailConts-subtotal {
  color: #999;
}
.detailConts-total {
  font-size: 1.2rem;
}
.detailConts-compare {
  text-align: center;
}
.detailConts-compare button {
  font-weight: bold;
  font-size: 0.9rem;
  background-color: #afabab;
  border: none;
  color: #696565;
  font-size: 1.1rem;
}
.detailConts-compare button:first-child {
  background-color: #967d5f;
  border: 1px solid #ddd;
  color: white;
  font-size: 1.1rem;
}

.QTList-Contents {
  display: flex;
  height: 50px;
  width: 100%;
  background-color: #696565;
  position: fixed;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .33);
  z-index: 100;
}
.QTList-Contents .headerBar-Back {
  flex: 5%;
  align-self: center;
  margin-left: 10px;
  color: white;
  -webkit-appearance:none;
  -moz-appearance:none;
}
.QTList-Contents .headerBar-title {
  flex: 95%;
  text-align: center;
  align-self: center;
  font-weight: bold;
  font-size: 1.3rem;
  margin: auto;
  color: #acd3ce;
}
.QTList-Options {
  z-index: 200;
}

.QTList-footer {
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

.QTList-footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}

.QTList-footer a span i {
  font-size: 2.5rem;
}

.footer-selected {
  color : #5d4038;
}

.history-detailConts .itemName{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.7rem;
  width: 145px;
}

.history-detailConts .itemCode {
  flex: 30%;
  font-size: 0.7rem;
  font-weight: bold;
  color: #EA4335;
}
.history-detailConts .delvDay {
  flex: 10%;
  margin-left: 6px;
  font-size: 0.7rem;
  color: #999;
}

.QTRes-footer{
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
</style>
