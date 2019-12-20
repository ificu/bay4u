<template>
  <div class="QTList">
    <b-tabs class="QTList-tab" justified v-model="tabIndex" v-if="showMainPage">
      <!--<b-tab title="부품요청 내역" :title-link-class="linkClass(0)" >
        <div class="QTList-contents">
          <div class="QTList-title">
            <span>견적 요청 히스토리</span>
            <CheckLogin></CheckLogin>
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
      </b-tab>-->
      <b-tab title="견적확정 내역" :title-link-class="linkClass(0)">
        <div class="QTList-contents">
          <div class="QTList-title">
            <span>견적 확정 내역</span>
            <CheckLogin></CheckLogin>
          </div>
          <div class="QTList-search">
            <b-input-group>
              <b-dropdown slot="prepend" v-bind:text="dropdownQT">
                <b-dropdown-item @click="dropdownQT='대리점'">대리점</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='차량번호'">차량번호</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='날짜'">날짜</b-dropdown-item>
              </b-dropdown>

              <b-form-input v-model="qtSearchText" v-on:keypress.enter="GetQTReqList"></b-form-input>

              <b-input-group-append>
                <b-button @click="GetQTReqList"><i class="fas fa-search"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <div class="QTList-history">
            <!--견적내역-->
            <b-card no-body class="mb-1" v-for="(qtItem , idx) in qtReqList" v-bind:key="idx" >
              <b-card-header header-tag="header" role="tab" header-class="card-header-qtlist">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-date">{{setQtDate(qtItem[0].ReqDt)}}</b-col>
                    <b-col class="history-car">
                      <b-row class="history-carNo">
                        {{(qtItem[0].CarNo === "*empty*")?"미상차량" : qtItem[0].CarNo }}
                      </b-row>
                    </b-col>                    
                    <b-col align-self="center" class="history-detailHeaderBtn">
                      <b-button block href="#"  v-b-toggle="'accordion-' + idx"  variant="secondary"  size="sm" v-on:click="showQtList(qtItem,idx)">
                        <!--<i class="fas fa-chevron-down" :id="'btnDetail'+idx"></i>-->
                        <!--<i v-if="!SOList1Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="SOList1Toggle"  class="fas fa-chevron-up"></i>-->
                      <span class="when-opened">
                        <i class="fa fa-chevron-up" aria-hidden="true"></i>
                      </span>
                      <span class="when-closed">
                        <i class="fas fa-chevron-down" aria-hidden="true"></i>
                      </span>
                      </b-button>
                    </b-col>               
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse :id="'accordion-'+idx" accordion="my-accordion" role="tabpanel">
                <b-card-body body-class="card-body-qtList">
                  <div class="history-detailConts">
                    <!--견적요청 정보-->
                    <b-card no-body class="mb-1">
                       <b-card-header header-tag="header" role="tab" header-class="card-header-qtInfo">
                        <b-container>
                          <b-row>
                            <b-col class="history-qtInfo">요청내역</b-col>
                            <b-col class="history-qtInfo-detail">
                              <b-row class="history-qtInfo-carNo">
                                {{(qtItem[0].CarNo === "*empty*")?"미상차량" : qtItem[0].CarNo }}
                              </b-row>
                              <b-row  class="history-qtInfo-vinNo">
                                {{qtItem[0].CarVin}}
                              </b-row>
                            </b-col>                    
                            <b-col align-self="center" class="history-qtInfo-detailBtn">
                              <b-button block href="#"  v-b-toggle="'accordion-qtReq'"  variant="secondary" size="sm" v-on:click="showQtReqItem(qtItem[0])"
                              >
                                <!--<i v-if="!SOList2Toggle" class="fas fa-chevron-down"></i>
                                <i v-if="SOList2Toggle"  class="fas fa-chevron-up"></i>-->
                                <span class="when-opened">
                                  <i class="fa fa-chevron-up" aria-hidden="true"></i>
                                </span>
                                <span class="when-closed">
                                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                                </span>
                              </b-button>
                            </b-col>               
                          </b-row>
                        </b-container>
                       </b-card-header>
                      <b-collapse :id="'accordion-qtReq'" accordion="my-accordion2" role="tabpanel" v-model="visible" >
                          <b-card-body>
                          <div class="history-detailConts">
                            <ul>
                              <li  v-for="(item, index) in qtReqItem" v-bind:key = "index">
                              <div>
                                <div><span class="itemCode">{{item.ITM_NM}}</span> <span class="itemName">{{item.ITM_QTY}}개</span> </div>
                              </div>
                              </li>
                            </ul>
                          </div>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                    <!--견적확정 정보-->
                    <!--부품지원-->
                    <b-card no-body class="mb-1" v-for="(qtInfo , idx) in confirmQTdata" v-bind:key="idx">
                    <b-card-header header-tag="header" role="tab" header-class="card-header-webpos">
                      <b-container>
                        <b-row>
                          <b-col align-self="center" class="history-webpos-date">{{qtInfo.MONTH}}/{{qtInfo.DAY}}({{qtInfo.DAYWEEK}})</b-col>
                          <b-col class="history-webpo-car">
                            <b-row class="history-carNo">
                              {{qtInfo.CAR_NO}}
                            </b-row>
                            <b-row  class="history-carType">
                              {{qtInfo.AGENT_NM}}
                            </b-row>
                          </b-col>                    
                          <b-col align-self="center" class="history-webpos-detailBtn">
                            <b-button block href="#"  v-b-toggle="'accordion-webpos-' + idx"  variant="secondary" size="sm" v-on:click="GetWebposQtList(qtInfo)">
                              <!--<i v-if="!SOList1Toggle" class="fas fa-chevron-down"></i>
                              <i v-if="SOList1Toggle"  class="fas fa-chevron-up"></i>-->
                              <span class="when-opened">
                                  <i class="fa fa-chevron-up" aria-hidden="true"></i>
                              </span>
                              <span class="when-closed">
                                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                              </span>
                            </b-button>
                          </b-col>              
                        </b-row>
                      </b-container>
                    </b-card-header>
                    <b-collapse :id="'accordion-webpos-'+idx" accordion="my-accordion4" role="tabpanel"  v-model="visible2">
                      <b-card-body>
                        <div class="history-detailConts-webpos">
                          <ul>
                            <li  v-for="(item, index) in detailQTData" v-bind:key = "index">
                              <div>
                                <div class="itemCode" > {{item.CONFIRM_ITM}}</div>
                                <div class="itemName">{{item.NM_ITM}}</div>
                              </div>
                              <div v-if="item.AMT === 0" class="detailConts-amount">{{ item.AMT }}원</div>
                              <div v-if="item.AMT !== 0" class="detailConts-amount">{{ item.AMT | localeNum}}원</div>
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
                    <!--일반 대리점-->
                     <b-card no-body class="mb-1" v-for="(qtInfo , idx) in confirmQTdata2" v-bind:key="idx" >
                       <b-card-header header-tag="header" role="tab" header-class="card-header-qtRes">
                        <b-container>
                          <b-row>
                            <b-col class="history-qtInfo">견적회신</b-col>
                            <b-col class="history-qtInfo-detail">
                              <b-row class="history-qtInfo-carNo">
                                {{(qtInfo.CarNo === "*empty*")?"미상차량" : qtInfo.CarNo }}
                              </b-row>
                              <b-row  class="history-qtInfo-vinNo">
                                {{qtInfo.ResDealerNm}}
                              </b-row>
                            </b-col>                    
                            <b-col align-self="center" class="history-qtInfo-detailBtn">
                              <b-button block href="#"  v-b-toggle="'accordion-qtRes-' + idx"  variant="secondary" size="sm" v-on:click="GetQtList2(qtInfo,idx )">
                               <!--<i class="fas fa-chevron-down" :id="'btnIcon'+idx"></i>-->
                               <!--<i v-if="!SOList3Toggle" class="fas fa-chevron-down"></i>
                                <i v-if="SOList3Toggle"  class="fas fa-chevron-up"></i>-->
                                <span class="when-opened">
                                  <i class="fa fa-chevron-up" aria-hidden="true"></i>
                                </span>
                                <span class="when-closed">
                                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                                </span>
                              </b-button>
                            </b-col>             
                          </b-row>
                        </b-container>
                       </b-card-header>
                      <b-collapse :id="'accordion-qtRes-'+idx" accordion="my-accordion3" role="tabpanel"  v-model="visible3">
                      <b-card-body>
                        <b-container class ="pt-0 pl-1 pr-0">
                          <b-row v-for="(item, index) in detailQTData2" v-bind:key = "index">
                            <b-col class ="pt-0 pl-1">
                              <div>
                                <div><span class="itemCode">{{item.itemCode}}</span> <span class="itemName">{{item.itemName}}</span> </div>
                                <div><span class="itemBrand">{{item.itemBrand}}</span><span class="itemAfterNo"> {{item.afterNo}}</span></div>
                              </div>
                            </b-col>
                            <b-col class="pl-0 pr-0"><span>{{ item.itemQty }}</span></b-col>
                            <b-col class="pl-0 pr-0">
                              <span v-if="item.itemPrice === 0" class="qt-item-price">{{ item.itemPrice | localeNum}}</span>
                              <span v-if="item.itemPrice !== 0" class="qt-item-price">{{ item.itemPrice | localeNum}}</span>
                            </b-col>
                            <b-col class="pl-0">
                              <span v-if="item.AMT === 0" class="detailConts-amount">{{ item.AMT | localeNum}}원</span>
                              <span v-if="item.AMT !== 0" class="detailConts-amount">{{ item.AMT | localeNum}}원</span>
                            </b-col>
                          </b-row>
                          <div class="QTRes-footer">
                            <div class="TotalInfo">
                              <v-btn color="#4E342E" dark depressed class="mr-3" @click="showQTOrderPopup(qtInfo)" >주문하기</v-btn>
                              <span class="TotalInfo-Title">합계금액</span>
                              <span class="TotalInfo-Text">{{total2 | localeNum}}</span>
                            </div>
                          </div>
                        </b-container>
                        <!--
                        <div class="history-detailConts">
                          <ul>
                            <li  v-for="(item, index) in detailQTData2" v-bind:key = "index">
                              <div>
                                <div><span class="itemCode">{{item.itemCode}}</span> <span class="itemName">{{item.itemName}}</span> </div>
                                <div><span class="itemBrand">{{item.itemBrand}}</span><span class="itemAfterNo"> {{item.afterNo}}</span></div>
                              </div>
                              <div v-if="item.AMT === 0" class="detailConts-amount">{{ item.AMT }}원</div>
                              <div v-if="item.AMT !== 0" class="detailConts-amount">{{ item.AMT | localeNum}}원</div>
                            </li>
                          </ul>
                          <div class="QTRes-footer">
                            <div class="TotalInfo">
                              <span class="TotalInfo-Title">합계금액</span>
                              <span class="TotalInfo-Text">{{total2 | localeNum}}</span>
                            </div>
                          </div>
                        </div>-->
                        
                      </b-card-body>
                      </b-collapse>
                     </b-card>
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
      <b-tab title="주문내역" :title-link-class="linkClass(1)">
        <div class="QTList-contents">
          <div class="QTList-title">
            <span>주문내역</span>
            <CheckLogin></CheckLogin>
          </div>
          <div class="QTList-search">
            <b-input-group>
              <b-dropdown slot="prepend" v-bind:text="dropdownSO">
                <b-dropdown-item @click="dropdownSO='대리점'">대리점</b-dropdown-item>
                <b-dropdown-item @click="dropdownSO='차량번호'">차량번호</b-dropdown-item>
                <b-dropdown-item @click="dropdownSO='날짜'">날짜</b-dropdown-item>
              </b-dropdown>

              <b-form-input v-model="ordSearchText"  v-on:keypress.enter="GetOrderHistory('','')"></b-form-input>

              <b-input-group-append>
                <b-button  @click="GetOrderHistory('','')"><i class="fas fa-search"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <div class="QTList-history">
            <b-card no-body class="mb-1" v-for="(item , idx) in orderHistory" v-bind:key="idx">
              <b-card-header header-tag="header" role="tab" header-class="card-header-order">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-order-date">{{setQtDate(item.ReqDt)}}</b-col>
                    <b-col class="history-order-car">
                      <b-row class="history-carNo">
                       {{item.CarNo}}
                      </b-row>
                      <b-row  class="history-carType">
                        {{item.ResDealerNm}}
                      </b-row>
                    </b-col>
                    <b-col align-self="center" class="history-detailBtn">
                      <b-button block href="#"  v-b-toggle="'ROaccordion' + idx"  variant="secondary" size="sm" @click="GetOrderDetail(item)">
                        <!--<i v-if="!ROList1Toggle" class="fas fa-chevron-down"></i>
                        <i v-if="ROList1Toggle"  class="fas fa-chevron-up"></i>-->
                        <span class="when-opened">
                          <i class="fa fa-chevron-up" aria-hidden="true"></i>
                        </span>
                        <span class="when-closed">
                          <i class="fas fa-chevron-down" aria-hidden="true"></i>
                        </span>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-header>
              <b-collapse :id="'ROaccordion'+idx" accordion="my-accordion" role="tabpanel" :visible="linkToggle(idx)" >
                <b-card-body>
                  <div class="history-detailConts">
                    <ul>
                      <li v-for="(ordItem, idx) in orderdetail" v-bind:key="idx">
                        <div class="detailConts-title detailConts-subtotal">{{ordItem.itemCode}}</div>
                        <div class="detailConts-title detailConts-subtotal2">{{ordItem.itemName}}</div>
                        <div class="detailConts-title detailConts-subtotal3">{{ordItem.itemQty}}개</div>
                        <div class="detailConts-amount detailConts-subtotal">{{ordItem.AMT | localeNum}}원</div>
                      </li>
                    <!--  <li>
                        <div class="detailConts-title detailConts-subtotal">브레이크 패드 교환</div>
                        <div class="detailConts-amount detailConts-subtotal">160,000원</div>
                      </li>
                      <li>
                        <div class="detailConts-title detailConts-subtotal">기타</div>
                        <div class="detailConts-amount detailConts-subtotal">5,000원</div>
                      </li>
                      -->
                      <li>
                        <div class="detailConts-title detailConts-total">총 합계</div>
                        <div class="detailConts-amount detailConts-total">{{total4 | localeNum}}원</div>
                      </li>
                    </ul>
                    <!--<div class="detailConts-compare">
                      <b-button @click="showRODetailPageToggle">명세서 수정</b-button>
                      <b-button @click="showCustomerDocOptionPageToggle">고객 명세서 발송</b-button>
                    </div>-->
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
            -->
          </div>
        </div>
      </b-tab>
      <b-tab title="정비 명세서" :title-link-class="linkClass(2)" >
        <div class="QTList-contents">
          <div class="QTList-title">
            <span>고객 정비 히스토리</span>
            <CheckLogin></CheckLogin>
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
              <b-card-header header-tag="header" role="tab" header-class="card-header-order">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-ro-date">8/7(수)</b-col>
                    <b-col class="history-ro-car">
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
            -->
          </div>
        </div>
      </b-tab>
    </b-tabs>
<BackToTop></BackToTop>
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

    
    <!-- 주문 요청 확인 팝업 -->
    <QTOrder v-if="showQTOrder" @close="showQTOrder=false">
      <span slot="header">{{orderData.ResDealerNm}} 대리점에 <br> 주문요청을 보냅니다</span>
      <span slot="orderlist">
        <div class="order-itemList" v-for="(item, index) in orderList" v-bind:key="index">
          <span class="order-itemCode">{{item.itemCode}}</span> / <span class="order-itemName"> {{item.itemName}}</span>
          <input v-model="item.itemQty" type="number" class="order-itemqty" @change="calculatorAMT(item)" @focus="$event.target.select()"/>
          <!--<span >{{item.AMT }}개</span>-->
          <span v-if="item.itemPrice === 0" class="order-itemPrice">{{ item.itemPrice | localeNum}}원</span>
          <span v-if="item.itemPrice !== 0" class="order-itemPrice">{{ item.itemPrice | localeNum}}원</span>
          <i class="order-item-btn fas fa-times-circle"  @click="removeItem(item)"></i>
        </div>
        <div class="QTRes-footer">
          <div class="TotalInfo">
           <span class="TotalInfo-Title">합계금액</span>
            <span class="TotalInfo-Text">{{total3 | localeNum}}</span>
          </div>
        </div>
      </span>
      <span slot="footer">
        주문 하시겠습니까?
        <b-button class="submit-YES" @click="SaveOrder()">YES</b-button>
        <b-button class="submit-NO" @click="showQTOrder=false">NO</b-button>
      </span>
    </QTOrder>

  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import QTDetailCompare from '@/components/QTList/QTDetailCompare.vue'
import QTDetailSelect from '@/components/QTList/QTDetailSelect.vue'
import QTtoRODetail from '@/components/QTList/QTtoRODetail.vue'
import CustomerDoc from '@/components/QTList/CustomerDoc.vue'
import CustomerDocOption from '@/components/QTList/CustomerDocOption.vue'
import CheckLogin from '@/components/Common/CheckLogin.vue'
import QTOrder from '@/components/QTList/QTOrder.vue'
import BackToTop from '@/components/Common/BackToTop.vue'
import Constant from '@/Constant';
import {getInputDayWeek , convertDynamoToArrayString, arrayGroupBy, datePadding ,convertArrayToDynamo} from '@/utils/common.js'

export default {
  name: 'QTList',
  data () {
    return {
      customerDocOption: "",
      tabIndex: 0,
      orderToggleIndex:-1,
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
      qtReqList:[],
      qtReqItem:[],
      detailQTData:[],
      confirmQTdata: [],
      detailQTData2:[],
      confirmQTdata2: [],
      showQTOrder:false,
      orderData:[],
      orderDealerName:"",
      orderList:[],
      orderHistory:[],
      orderdetail:[],
      qtSearchText:'',
      ordSearchText:'',
      visible:true,
      visible2:true,
      visible3:true,
      orderVisible:false
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
    linkToggle(idx)
    {
      if(this.orderToggleIndex === idx)
      {
        return true;
      }
      else{
        return false;
      }
    },
    GetQTReqList() {
      
      var now = new Date();
      var beforeDate = new Date();
      beforeDate.setDate(beforeDate.getDate() -7);
      var startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
      var endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
      
      var filter = "ReqSite = :id";
      if(this.qtSearchText === '')
      {
        filter = "ReqSite = :id and ReqDt between :startDt and :endDt";
      }
      else{

        var searchCase = this.dropdownQT;
        switch (searchCase) {
          case '차량번호' :
            console.log('차량번호 검색!!');
            filter = "ReqSite = :id and CarNo = :carNo";
            break;
          case '대리점' :
            console.log('대리점 검색!!');
            filter = "ReqSite = :id and ResDealer = :resDealer";
            break;
          case '날짜' :
            console.log('날짜 검색!!');
            filter = "ReqSite = :id and ReqDt = :reqDt";
            break;
          default :
            break;
        }
      }

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = filter;
      param.payload.ExpressionAttributeValues = {};
      
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

      if(this.qtSearchText === '')
      {
        var key2 = ":startDt";
        var key3 = ":endDt";
        param.payload.ExpressionAttributeValues[key2] = startDate;
        param.payload.ExpressionAttributeValues[key3] = endDate;
      }
     else{

        var searchCase = this.dropdownQT;
        switch (searchCase) {
          case '차량번호' :
            var key2 = ":carNo";
            param.payload.ExpressionAttributeValues[key2] = this.qtSearchText;
            break;
          case '대리점' :
            var key2 = ":resDealer";
            param.payload.ExpressionAttributeValues[key2] = this.qtSearchText;
            break;
          case '날짜' :
            var key2 = ":reqDt";
            param.payload.ExpressionAttributeValues[key2] = this.qtSearchText;
            break;
          default :
            break;
        }
      }

      console.log("======= QT Request result ========");
      console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= QT List result ========");
        console.log(result.data.Items);

        if(Array.isArray(result.data.Items))
        {
          result.data.Items.sort(function(a, b){
            return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
          });
        }

        var qtGroupList = arrayGroupBy(result.data.Items, function(item)
        {
          return [item.CarNo, item.ReqDt];
        });

        this.qtReqList =  qtGroupList;

      });
    },
    GetWebposQtList(item){

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
          url: Constant.SCPIF_URL + 'GetQTData',
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
          console.log("======= QT LiST Return result ========");     
          console.log( JSON.stringify(result.data)); 
         
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
                console.log("ESTM_DTL : " , this.detailQTData);
              }

            }
          }
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    GetConfirmQtList(item)
    {
      this.confirmQTdata  = [];

      var param = {};
      param.BsnId = this.UserInfo.BsnID;
      param.RequestDataJSON = item[0].ID;

      console.log("======= 견적확정 조회 Request result ========");
      console.log(param); 

      var rtnCode = "";

      axios({
          method: 'POST',
          url: Constant.SCPIF_URL + 'GetConfirmQTData',
          headers: Constant.JSON_HEADER,          
          data: param
      })
      .then((result) => {
          console.log("======= 견적확정 조회 Return result ========");     
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
    },
    GetConfirmQtList2(item)
    {
      //console.log('Item : ' , item);
    
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      //param.payload.FilterExpression = "ResDealer = :id and ReqDt = :reqDt";
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      var key2 = ":reqDt";
      param.payload.ExpressionAttributeValues[key] = item[0].ID;
     // param.payload.ExpressionAttributeValues[key2] = item[0].ReqDt;

      console.log("======= 견적확정 조회 Request result ========");
      console.log(param); 

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= QT Confirm result ========");
        console.log( result.data.Items);
        this.confirmQTdata2  = result.data.Items;
      });  
    },
    GetQtList2(item , index){
      this.SOList3Toggle = !this.SOList3Toggle;
      this.detailQTData2 = JSON.parse(item.LineItem);

      var btnAdd = document.querySelector("#btnIcon" + index);
      
     /* if(this.SOList3Toggle){
        btnAdd.setAttribute("class", "fas fa-chevron-up");
      }
      else{
        btnAdd.setAttribute("class", "fas fa-chevron-down");
      }*/
    },
    GetOrderHistory(docId ,orderID)
    {
      
      var now = new Date();
      var beforeDate = new Date();
      beforeDate.setDate(beforeDate.getDate() -7);
      var startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
      var endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
      
      var filter = "ReqSite = :id";
      if(this.ordSearchText === '')
      {
        filter = "ReqSite = :id and ReqDt between :startDt and :endDt";
      }
      else{

        var searchCase = this.dropdownSO;
        switch (searchCase) {
          case '차량번호' :
            filter = "ReqSite = :id and CarNo = :carNo";
            break;
          case '대리점' :
            filter = "ReqSite = :id and ResDealerNm = :resDealer";
            break;
          case '날짜' :
            filter = "ReqSite = :id and ReqDt = :reqDt";
            break;
          default :
            break;
        }
      }

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_ORDER_LIST";
      param.payload = {};
      param.payload.FilterExpression = filter;
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;
     
     if(this.ordSearchText === '')
      {
        var key2 = ":startDt";
        var key3 = ":endDt";
        param.payload.ExpressionAttributeValues[key2] = startDate;
        param.payload.ExpressionAttributeValues[key3] = endDate;
      }
     else{

        var searchCase = this.dropdownSO;
        switch (searchCase) {
          case '차량번호' :
            var key2 = ":carNo";
            param.payload.ExpressionAttributeValues[key2] = this.ordSearchText;
            break;
          case '대리점' :
            var key2 = ":resDealer";
            param.payload.ExpressionAttributeValues[key2] = this.ordSearchText;
            break;
          case '날짜' :
            var key2 = ":reqDt";
            param.payload.ExpressionAttributeValues[key2] = this.ordSearchText;
            break;
          default :
            break;
        }
      }

      console.log("======= 주문내역 조회 Request result ========");
      console.log(param); 

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("=======주문내역 조회 result ========");
        console.log( result.data.Items);

        if(Array.isArray(result.data.Items))
        {
          result.data.Items.sort(function(a, b){
            return (a.ReqDt < b.ReqDt) ? 1 : -1;
          });
        }

        this.orderHistory  = result.data.Items;
        if(docId !== ''  && orderID !== '')
        {
          this.showOrderItem(docId , orderID);
        } 

      });  
      
    },
    GetOrderDetail(item)
    {
      this.ROList1Toggle = !this.ROList1Toggle
      this.orderdetail = JSON.parse(item.LineItem);
    },
    setQtDate(value)
    {
      var str = value + '';
      return str.substring(5,7) + '/'+str.substring(8,10) + '(' + getInputDayWeek(value) +')';
    },
    showQtList(item, index)
    {
      this.SOList1Toggle = !this.SOList1Toggle;
      this.visible = false;
      this.visible2 = false;
      this.visible3 = false;
      this.qtReqItem = [];
      this.GetConfirmQtList2(item);
      this.GetConfirmQtList(item);

      var btnAdd = document.querySelector("#btnDetail" + index);
    },
    collapseAll(){
      this.$refs.collapsible.map(c => c.collapsed = true)
    },
    showQtReqItem(item)
    {
      this.SOList2Toggle = !this.SOList2Toggle;
   
      console.log(item.LineItem);
      this.qtReqItem = [];
      this.qtReqItem =  JSON.parse(convertDynamoToArrayString(item.LineItem));
    },
    showQTOrderPopup(item)
    {
      this.orderData = item;
      this.showQTOrder = !this.showQTOrder;
     // this.orderDealerName = item.ResDealerNm;
      this.orderList = JSON.parse(item.LineItem);

      console.log(this.orderData);
    },
    removeItem(item) {

      this.orderList = this.orderList.filter(it => it.itemCode != item.itemCode);
    },
    calculatorAMT(item){
     
      item.AMT = item.itemPrice * item.itemQty;
    },
    SaveOrder()
    {
      var now = new Date();
      var id =  this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                        + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var param = {};
      param.operation = "create";
      param.tableName = "BAY4U_ORDER_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.orderData.DocID;  //docId
      param.payload.Item.CarNo = this.orderData.CarNo;
      param.payload.Item.ReqSite =  this.UserInfo.BsnID
      param.payload.Item.ReqSiteNm = this.UserInfo.Name;
      param.payload.Item.ResDealer = this.orderData.ResDealer;
      param.payload.Item.ResDealerNm = this.orderData.ResDealerNm;
      param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.orderList));
      param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      param.payload.Item.ReqTm = ReqTm;
         
      console.log("======= Order Request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= Order result ========");
        console.log(result.data);
        this.goChating(id);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    goChating(val)
    {
      var msg =  this.orderData.CarNo + " 차량 부품 주문 요청 완료!!";
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.orderData.ResDealer};
      chatMsg.msg  = msg;
      chatMsg.reqTm = chatTime;
      this.msgDatas = chatMsg;
        
      var param = {};
      var id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var key = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      param.operation = "create";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.orderData.DocID;
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo =  this.orderData.ResDealer;
      param.payload.Item.Message = chatMsg.msg;
      param.payload.Item.Status = "0";
      param.payload.Item.ReqTm = chatMsg.reqTm;
      param.payload.Item.ChatType = "O";
      param.payload.Item.RefID = val;

      console.log("Send Msg : ", JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Chat Save result ========");
        console.log(result.data);

        this.$sendMessage({
          name: this.UserInfo.BsnID,
          msg,
          recv:  this.orderData.ResDealer,
          chatId: this.orderData.DocID,
          reqTm : chatMsg.reqTm,
        });

        this.$router.push({name:'Chat', 
            params:{
                  chatid: this.orderData.DocID, 
                  carNo: this.orderData.CarNo,
                  chatFrom: this.UserInfo.BsnID,
                  chatTo: this.orderData.ResDealer,
                  chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2),
                  qtInfo : this.orderData,
                  chatType:'order',
              }});

      })
      .catch((error) => {
        console.log(error);
      });
    },
    showOrderItem(docId , orderID)
    {
      console.log('docId : ' , docId);
      if(Array.isArray(this.orderHistory)){
        var index =  this.orderHistory.findIndex(i => i.DocID === docId);
        console.log('index:' , index);
        this.orderToggleIndex = index;
      } 
    }
  },

  components: {
    QTDetailCompare,
    QTDetailSelect,
    QTtoRODetail,
    CustomerDoc,
    CustomerDocOption,
    CheckLogin:CheckLogin,
    QTOrder:QTOrder,
    BackToTop:BackToTop
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
    },

    total2: function() {
        let sum = 0;
        this.detailQTData2.forEach(function(item) {
          sum += (parseFloat(item.AMT));
        });
        return sum;
    },

    total3: function() {
        let sum = 0;
        this.orderList.forEach(function(item) {
          sum += (parseFloat(item.AMT));
        });
        return sum;
    },

    total4: function()
    {
      let sum = 0;
        this.orderdetail.forEach(function(item) {
          sum += (parseFloat(item.AMT));
        });
        return sum;
    }
  },
  created : function() {
    //this.showQTReqList();

    if(this.$route !== undefined && this.$route.name === "QTList" ) {
       //  this.GetConfirmQtList();
      var docID = '';
      if(this.$route.params.DocID !== undefined)
      {
        docID = this.$route.params.DocID;
      }
      var orderID = '';
      if(this.$route.params.OrderID !== undefined)
      {
        orderID = this.$route.params.OrderID;
      }
      this.GetQTReqList();
      this.GetOrderHistory(docID, orderID);
       
      // 주문요청 완료 채팅에서 넘어왔을 때
      if(this.$route.params.Type !== undefined) {
        if(this.$route.params.Type === 'order')
        {
          this.tabIndex = 1;
        }
      }
    }
    else{
      if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');

      this.GetQTReqList();
      this.GetOrderHistory();
    //  this.GetConfirmQtList();  
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
  display:flex;
}

.QTList-title span{
  width: 100%;
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

.card-header-qtlist{
  background-color: #967d5f;
  color: #fff;
  padding-top : 0px;
  padding-bottom : 0px;
}
.card-body-qtList{
  margin :0px 0px;
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 0px;
  border:#fff 1px solid;
}
.card-header-qtInfo
{
  background-color: #fcf4df;
  padding-top : 0px;
  padding-bottom : 0px;
  padding-left: 0;
  padding-right: 10px;
}
.history-qtInfo {
  font-size: 0.9rem;
  font-weight: bold;
  flex:30%;
}
.history-qtInfo-detail {
  flex:55%;
  padding: 0;
}
.history-qtInfo-carNo {
  font-size: 1.1rem;
  font-weight: bold;
}
.history-qtInfo-vinNo {
  font-size: 0.7rem;
}
.history-qtInfo-detailBtn{
  flex:5%;
  padding: 0px;
}
.card-header-qtRes {
  background-color: #ADD8E6;
  padding-top : 0px;
  padding-bottom : 0px;
  padding-left: 0;
  padding-right: 10px;
}
/*
.card-header {
  background-color: #fcf4df;
  padding-top : 0px;
  padding-bottom : 0px;
}*/

.card-header .container {
  padding-top : 0px;
  padding-bottom : 0px;
}

.card-header-webpos {
  background-color: #ADD8E6;
  padding-top : 0px;
  padding-bottom : 0px;
  padding-left: 0;
  padding-right: 10px;
}

.card-header-webpos .container {
  padding-top : 0px;
  padding-bottom : 0px;
  height:50px;
}

.card-header-order {
  background-color: #fcf4df;
  padding-top : 0px;
  padding-bottom : 0px;
}
.card-header-order .container {
  padding-top : 0px;
  padding-bottom : 0px;
  height:50px;
}
.history-order-date {
  font-size: 1.2rem;
  font-weight: bold;
  flex:15%;
  padding-top: 0;
}
.history-order-car {
  flex:40%;
  padding-top: 2px;
}

.card-header-ro {
  background-color: #fcf4df;
  padding-top : 0px;
  padding-bottom : 0px;
}
.card-header-ro .container {
  padding-top : 0px;
  padding-bottom : 0px;
  height:50px;
}
.history-ro-date {
  font-size: 1.2rem;
  font-weight: bold;
  flex:15%;
  padding-top: 0;
}
.history-ro-car {
  flex:40%;
  padding-top: 2px;
}

.QTList-history {
  margin:auto;
  width: 90%;
  padding-top: 20px;
  margin-bottom: 60px;
}

.QTList-history .list-group .list-group-item {
  padding: 5px;
  background-color: #e4e4e4;
 
}
.history-detailConts {
  background-color: #f9f9f9;
  margin: -20px;
  padding: 5px 20px 5px 20px
}

.history-detailConts ul {
  list-style-type: none;
   margin: -10px;
   padding: 10px 0px;
}

.qt-item-price{
  font-size: 0.9rem;
}

.history-date {
  font-size: 1.2rem;
  font-weight: bold;
  flex:15%;
}
.history-webpos-date {
  font-size: 1.2rem;
  font-weight: bold;
  padding-top: 0px;
}
.history-webpo-car {
  flex:40%;
  padding-top: 0px;
}

.history-webpos-detailBtn {
  /*flex:15%;*/
  text-align: right; 
  padding: 5px 10px;
  width: 60px;
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
  /*background-color: #E50914;*/
  padding: 1px;
  width: 60px;
}
.history-detailHeaderBtn {
  flex:15%;
  text-align: right; 
  padding: 1px;
  width: 60px;
}
.history-detailHeaderBtn .btn-block {
  background-color: #fcf4df;
  color: #333;
}
/*
.history-detailConts {
  padding: 20px;
}*/

.history-detailConts li {
  display: flex;
  align-items:center;
}
.history-detailConts-webpos
{
   padding: 10px 15px;
}
.history-detailConts-webpos li
{
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
  flex: 30%;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: right;
  color: #EA4335;
}
.detailConts-status {
  flex: 10%;
  margin-left: 5px;
  color: #999;
}
.detailConts-subtotal {
  color: #0D47A1;
}
.detailConts-subtotal2 {
  font-size: 0.9em;
  flex:30%
}
.detailConts-subtotal3 {
  font-size: 0.9em;
  flex:10%
}
.detailConts-total {
  font-size: 1.2rem;
  margin-top: 15px;
}
.detailConts-compare {
  text-align: center;
  margin-top: 20px;
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
  /*flex: 30%;*/
  font-size: 1rem;
  font-weight: bold;
  color: #0D47A1;
  padding-right: 5px;
}
.history-detailConts .itemBrand{
  font-size: 0.7rem;
  color: #6A1B9A;
  padding-right: 4px;
}
.history-detailConts .itemAfterNo {
  font-size: 0.7rem;
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
.order-itemList {
  width: 98%;
  margin: auto;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #ddd;
  margin-bottom: 5px;
  padding: 3px 2px;
  display: flex;
}
.order-itemCode {
  font-size: 0.9em;
  font-weight: bold;
  margin-right: 5px;
  margin-left: 5px;
}
.order-itemName {
  font-size: 0.8em;
  margin-right: 5px;
  margin-left: 5px;
}
.order-itemqty
{
  width:25px;
  font-size: 0.8em;
  margin-right: 5px;
  margin-left: 5px;
  border:gray 1px solid;
}
.order-itemPrice{
  margin-right: 5px;
  margin-left: 5px;
  font-size: 0.8em;
}
.order-item-btn{
  float: right;
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
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
