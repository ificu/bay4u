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
      <b-tab title="견적확정 내역" :title-link-class="linkClass(0)" class="p-0 border bg-light">
        <div class="QTList-contents" >
          <div class="QTList-title">
            <span>견적 확정 내역</span>
            <CheckLogin></CheckLogin>
          </div>
          <div class="QTList-search">
            <b-input-group>
              <b-dropdown slot="prepend" v-bind:text="dropdownQT">
                <b-dropdown-item @click="dropdownQT='대리점';sampletxtQT='';">대리점</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='차량번호';sampletxtQT='';">차량번호</b-dropdown-item>
                <b-dropdown-item @click="dropdownQT='날짜';sampletxtQT='2019-12-01';">날짜</b-dropdown-item>
              </b-dropdown>

              <b-form-input v-model="qtSearchText" v-on:keypress.enter="GetQTReqList('','')" :placeholder="sampletxtQT"></b-form-input>

              <b-input-group-append>
                <b-button @click="GetQTReqList('','')"><i class="fas fa-search"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <div class="QTList-history">
            <!--견적내역-->
            <b-card no-body class="mb-1" v-for="(qtItem , idx) in qtReqList" v-bind:key="idx" >
              <b-card-header header-tag="header" role="tab" header-class="card-header-qtlist">
                <b-container>
                  <b-row>
                    <b-col align-self="center" class="history-brand">
                      <img height='18' v-if="qtItem[0].CarBrand === 'AUDI'" style="align-self:center; margin-left:-3px;" src="@/assets/BRAND-AUDI.png">
                      <img height='30' v-if="qtItem[0].CarBrand === 'BENZ'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-BENZ.png">
                      <img height='30' v-if="qtItem[0].CarBrand === 'BMW'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-BMW.png">
                      <img height='30' v-if="qtItem[0].CarBrand === 'FORD'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-FORD.png">
                      <img height='25' v-if="qtItem[0].CarBrand === 'LEXUS'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-LEXUS.png">
                      <img height='30' v-if="qtItem[0].CarBrand === 'VW'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-VW.png">
                    </b-col>                    
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
              <b-collapse :id="'accordion-'+idx" accordion="my-accordion" role="tabpanel" :visible="linkToggleQt(idx)">
                <b-card-body body-class="card-body-qtList" v-for="(qtReqInfo , idx2) in qtItem" v-bind:key="idx2" >
                  <div class="history-detailConts">
                    <!--견적요청 정보-->
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" role="tab" header-class="card-header-qtInfo">
                        <b-container>
                           <b-row>
                              <b-col class="pl-2 pr-2 pt-1 pb-0 request-qtInfo">견적요청</b-col>
                              <b-col class="request-qtInfo-detail">
                                <b-row>
                                  <span class="history-qtInfo-carNo" v-if="qtReqInfo.CarNo === ''">차량번호 미입력</span>
                                  <span class="history-qtInfo-carNo" v-if="qtReqInfo.CarNo !== ''"> {{(qtReqInfo.CarNo === "*empty*")?"미상차량" : qtReqInfo.CarNo }}</span>
                                  <span class="history-qtInfo-dealer">{{qtReqInfo.QTData.ResDealerNm}}</span>
                                </b-row>
                                <b-row class="request-qtInfo-carType">
                                  <span v-if="qtReqInfo.DealerFlag ==='WEBPOS'">
                                    {{qtReqInfo.QTData.SERIES}}
                                  </span>
                                  <span v-if="qtReqInfo.DealerFlag !=='WEBPOS'">
                                     {{(qtReqInfo.QTData.CarBrand === "*empty*") ?'': qtReqInfo.QTData.CarBrand}}  {{(qtReqInfo.QTData.CarSeries === "*empty*") ? '' : qtReqInfo.QTData.CarSeries }}
                                  </span>
                                </b-row>
                              </b-col>  
                            
                              <b-col class="request-qtInfo-detailBtn">
                                <b-button block href="#"  v-b-toggle="'accordion-qtReq'+idx2"  variant="secondary" size="sm" v-on:click="showQtReqItem(qtReqInfo)">
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
                      <b-collapse :id="'accordion-qtReq'+idx2" accordion="my-accordion2" role="tabpanel" :visible="linkToggleQtReq(idx2)" >
                        <b-card-body>
                          <div class="history-detailConts" style="position: relative">
                            <ul>
                              <li v-for="(item, index) in qtReqItem" v-bind:key = "index">
                              <div>
                                <div> 
                                    <span class="itemCode">{{item.ITM_NM}}</span> 
                                    <span class="itemName" v-if="item.ITM_NM !=='사진입력'" >{{item.ITM_QTY}}개</span>
                                    <span class="itemName" v-if="item.ITM_NM ==='사진입력'"  @click="showQTImage(item.IMG)"><i class="fas fa-image"></i></span>
                                </div>
                              </div>
                              </li>
                            </ul>
                            <div class="qtReq-image" v-if="qtReqInfo.DealerFlag !=='WEBPOS'">
                              <span class="qtReq-reqTitle" v-if="qtReqInfo.QTData.IMG !=='*empty*'">차량번호/차대번호 사진촬영</span>
                              <span class="qtReq-reqIcon" v-if="qtReqInfo.QTData.IMG !=='*empty*'" @click="showQTImage(qtReqInfo.QTData.IMG)"><i class="fas fa-image"></i></span>
                              <span class="qtReq-reqTitle" v-if="qtReqInfo.QTData.Memo !=='*empty*'" >메모</span>
                              <span class="qtReq-reqIcon" v-if="qtReqInfo.QTData.Memo !=='*empty*'" @click="showResmemoPopup(qtReqInfo.QTData)" ><i class="far fa-sticky-note"></i></span>
                            </div>
                            <div class="history-detailConts-carvin"><span>{{(qtReqInfo.CarVin === '99999999999999999')? "미상차량" : qtReqInfo.CarVin}}</span></div>
                          </div>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                    <!--견적확정 정보-->
                    <div v-for="(confrimInfo , idx3) in qtReqInfo.ResQTData" v-bind:key="idx3">
                      <!--부품지원-->
                      <!--<b-card no-body class="mb-1" v-for="(qtInfo , idx) in confirmQTdata" v-bind:key="idx">-->
                      <b-card no-body class="mb-1" v-if="confrimInfo.ResFlag === 'WEBPOS'">
                        <b-card-header header-tag="header" role="tab" header-class="card-header-webpos">
                          <b-container>
                            <b-row>
                              <!--<b-col align-self="center" class="history-webpos-date">{{GetConfirmValue(qtReqInfo.ID,"MONTH")}}/{{GetConfirmValue(qtReqInfo.ID,"DAY")}}({{GetConfirmValue(qtReqInfo.ID,"DAYWEEK")}})</b-col>-->
                              <b-col class="pl-2 pr-2 pt-1 response-qtInfo">견적회신</b-col>
                              <b-col class="response-qtInfo-detail">
                                <b-row>
                                  <b-col class="pl-1 pt-1 pb-0">
                                    <span class="qtInfo-detail-carNo">{{confrimInfo.CarNo}}</span>
                                    <span class="qtInfo-detail-dealer">{{confrimInfo.DealerName}} / {{confrimInfo.DealerAgent}}</span>
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <span id="disabled-wrapper" class="qtInfo-detail-carType">{{confrimInfo.CarType}}</span>
                                  <b-tooltip target="disabled-wrapper">
                                    {{confrimInfo.CarType}}
                                  </b-tooltip>
                                </b-row>
                              </b-col>  
                              <b-col class="response-qtInfo-chat">
                                  <span v-if="qtReqInfo.WebposOnly ==='N'" @click="goQTChating(qtReqInfo)"><i class ="fas fa-comment-dots"></i></span>
                              </b-col>                   
                              <b-col class="response-detailBtn">
                                <b-button block href="#"  v-b-toggle="'accordion-webpos-' + idx3"  variant="secondary" size="sm" v-on:click="showResItem(confrimInfo)">
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
                      <b-collapse :id="'accordion-webpos-'+idx3" accordion="my-accordion4" role="tabpanel" :visible="linkToggleQtConfirm(idx2)">
                        <b-card-body class ="pt-1 pl-1 pr-1">
                          <div class="history-detailConts-webpos">
                            <ul>
                              <li v-for="(item, index) in detailQTData" v-bind:key = "index">
                                 <div class="webpos-item">
                                  <span class="webpos-itemName">{{item.NM_ITM}}</span>
                                  <span class="webpos-itemCode">{{item.CONFIRM_ITM}}</span>
                                </div>
                                <div class="webpos-itemQty"><span>{{item.ORDER_QTY}}개</span></div>
                                <div class="webpos-itemPrice">
                                  <span v-if="item.PRC_PRICE === 0" >{{ item.PRC_PRICE }}</span>
                                  <span v-if="item.PRC_PRICE !== 0" >{{ item.PRC_PRICE | localeNum}}</span>
                                  <span v-if="item.SAL_PRICE === 0" >({{ item.SAL_PRICE }})</span>
                                  <span v-if="item.SAL_PRICE !== 0" >({{ item.SAL_PRICE | localeNum}})</span>
                                </div>
                                <div class="webpos-amt">
                                  <span v-if="item.AMT_PRC === 0">{{ item.AMT_PRC }}</span>
                                  <span v-if="item.AMT_PRC !== 0">{{ item.AMT_PRC | localeNum}}</span>
                                  <span v-if="item.AMT === 0">({{ item.AMT }})</span>
                                  <span v-if="item.AMT !== 0">({{ item.AMT | localeNum}})</span>
                                </div>
                                <div class="webpos-delvDay"><span>{{item.DELV_DAY}}</span></div>
                              </li>
                            </ul>
                          </div>
                        </b-card-body>
                        <b-card-footer>
                          <div class="QTRes-footer">
                            <div class="TotalInfo">
                              <span class="TotalInfo-Title">합계</span>
                              <span class="TotalInfo-Text">{{total | localeNum}}원</span>
                            </div>
                          </div>
                        </b-card-footer>
                      </b-collapse>
                      </b-card>
                      <!--일반 대리점-->
                      <!-- <b-card no-body class="mb-1" v-for="(qtInfo , idx3) in confirmQTdata2" v-bind:key="idx3" >-->
                      <b-card no-body class="mb-1" v-if="confrimInfo.ResFlag === 'BAY4U'" >
                        <b-card-header header-tag="header" role="tab" header-class="card-header-qtRes">
                        <b-container>
                          <b-row>
                            <b-col class="pl-2 pr-2 pt-1 response-qtInfo">견적회신</b-col>
                            <b-col class="response-qtInfo-detail">
                              <b-row>
                                  <b-col class="pl-1 pt-1 pb-0">
                                    <span class="qtInfo-detail-carNo">{{(confrimInfo.CarNo) === "*empty*" ? "미상차량" :confrimInfo.CarNo }}</span>
                                    <span class="qtInfo-detail-dealer">{{confrimInfo.DealerName}}</span>
                                  </b-col>
                              </b-row>
                              <b-row>
                                  <span id="disabled-wrapper" class="qtInfo-detail-carType">{{qtReqInfo.QTData.CarBrand}} {{qtReqInfo.QTData.CarSeries}}</span>
                                  <b-tooltip target="disabled-wrapper">
                                    {{qtReqInfo.QTData.CarBrand}} {{qtReqInfo.QTData.CarSeries}}
                                  </b-tooltip>
                              </b-row>
                            </b-col>
                            <b-col class="response-qtInfo-chat">
                              <span v-if="qtReqInfo.WebposOnly ==='N'" @click="goQTChating(qtReqInfo)"><i class ="fas fa-comment-dots"></i></span>
                            </b-col>                
                            <b-col class="response-detailBtn">
                              <b-button block href="#"  v-b-toggle="'accordion-qtDealer-' + confrimInfo.ID"  variant="secondary" size="sm" v-on:click="showResItem2(confrimInfo)">
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
                      <b-collapse :id="'accordion-qtDealer-'+confrimInfo.ID" accordion="my-accordion3" role="tabpanel" :visible="linkToggleQtConfirm2(idx2)">
                        <b-card-body class ="pt-1 pl-1 pr-1">
                          <div class="dealer-qtInfo">
                            <ul>
                              <li v-for="(item, index) in detailQTData2" v-bind:key = "index">
                                <div class="dealer-item">
                                  <div><span class="dealer-itemBrand">{{item.itemBrand}}</span></div>
                                  <div><span class="dealer-itemCode">{{item.itemCode}}</span> / <span class="dealer-itemName">{{item.itemName}}</span></div>
                                </div>
                                <div class="dealer-Price">
                                  <span v-if="item.AMT === 0" class="dealer-itemAmount">{{ item.AMT | localeNum}}원</span>
                                  <span v-if="item.AMT !== 0" class="dealer-itemAmount">{{ item.AMT | localeNum}}원</span>
                                  <span v-if="item.itemPrice === 0" class="dealer-itemPrice">{{ item.itemPrice | localeNum}}</span>
                                  <span v-if="item.itemPrice !== 0" class="dealer-itemPrice">{{ item.itemPrice | localeNum}}</span>
                                  <span class="dealer-itemQty">{{ item.itemQty }}개</span>
                                  
                                </div>
                                <div class="dealer-delv">
                                  <div><span>{{item.delv}}</span></div>
                                  <div>
                                    <span v-if="item.memo !== undefined && item.memo !== ''" class="dealer-memo-on" @click="showResmemoPopup(item)"><i class="fas fa-lightbulb"></i></span>
                                    <span v-if="item.memo === undefined" class="dealer-memo-off"><i class="far fa-lightbulb"></i></span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <!--<b-container>
                            <b-row v-for="(item, index) in detailQTData2" v-bind:key = "index">
                              <b-col class ="pt-0 pl-1">
                              <div class="dealer-qtInfo">
                                <div class="dealer-item">
                                  <div><span class="dealer-itemBrand">{{item.itemBrand}}</span></div>
                                  <div><span class="dealer-itemCode">{{item.itemCode}}</span> / <span class="dealer-itemName">{{item.itemName}}</span></div>
                                </div>
                                <div class="dealer-Price">
                                  <span v-if="item.AMT === 0" class="dealer-itemAmount">{{ item.AMT | localeNum}}원</span>
                                  <span v-if="item.AMT !== 0" class="dealer-itemAmount">{{ item.AMT | localeNum}}원</span>
                                  <span v-if="item.itemPrice === 0" class="dealer-itemPrice">{{ item.itemPrice | localeNum}}</span>
                                  <span v-if="item.itemPrice !== 0" class="dealer-itemPrice">{{ item.itemPrice | localeNum}}</span>
                                  <span class="dealer-itemQty">{{ item.itemQty }}개</span>
                                </div>
                              </div>
                              </b-col>
                            </b-row>
                          </b-container>-->
                        </b-card-body>
                      <b-card-footer>
                        <div class="QTRes-footer">
                          <div class="TotalInfo">
                              <v-btn color="#4E342E" dark depressed class="mr-3" @click="showQTOrderPopup(confrimInfo)" >주문하기</v-btn>
                              <span class="TotalInfo-Title">합계</span>
                              <span class="TotalInfo-Text">{{total2 | localeNum}}원</span>
                          </div>
                        </div>
                      </b-card-footer>
                      </b-collapse>
                      </b-card>
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
                <b-dropdown-item @click="dropdownSO='대리점';sampletxtSO=''">대리점</b-dropdown-item>
                <b-dropdown-item @click="dropdownSO='차량번호';sampletxtSO=''">차량번호</b-dropdown-item>
                <b-dropdown-item @click="dropdownSO='날짜';sampletxtSO='2019-12-01'">날짜</b-dropdown-item>
              </b-dropdown>

              <b-form-input v-model="ordSearchText"  v-on:keypress.enter="GetOrderHistory('','','')" :placeholder="sampletxtSO"></b-form-input>

              <b-input-group-append>
                <b-button  @click="GetOrderHistory('','','')"><i class="fas fa-search"></i></b-button>
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
      <span slot="header">{{orderData.DealerName}} 대리점에 <br> 주문요청을 보냅니다</span>
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
  <v-app>
    <v-dialog v-model="showQTImageFlag" width="500px">
        <v-card>
          <v-card-title class="headline" >이미지 확인</v-card-title>
          <v-img class="grey lighten-3 mr-4 ml-4"  v-bind:src="itemImage" max-width="800px"></v-img>

          <v-card-actions>
            <v-spacer></v-spacer>  
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
    <v-dialog v-model="showResMemo" width="400px">
        <v-card>
          <v-card-title class="headline"><i class="far fa-lightbulb"></i>메모</v-card-title>
          <v-card-text>
          {{resMemo}}
         </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>  
            <v-btn
              color="#00BFA5"
              outlined
              @click="showResMemo = false;resMemo=''"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>  
  </v-app>
  </div>
</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
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
import { isArray } from 'util'
import { join } from 'path'

const axios = require('axios').default;

export default {
  name: 'QTList',
  data () {
    return {
      customerDocOption: "",
      tabIndex: 0,
      orderToggleIndex:-1,
      qtToggleIndex:-1,
      qtReqToggleIndex:-1,
      qtConfrnToggleIndex:-1,
      qtConfrnToggleIndex2:-1,
      dropdownQT: '차량번호',
      dropdownSO: '차량번호',
      dropdownRO: '차량번호',
      sampletxtQT: '',
      sampletxtSO: '',
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
      qtList:[],
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
      showQTImageFlag:false,
      itemImage:'',
      showResMemo :false,
      resMemo:'',
     // visible:false,
     // visible2:false,
     // visible3:true,
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
      if(this.orderToggleIndex === idx){
        return true;
      }
      else{
        return false;
      }
    },
    linkToggleQt(idx)
    {
      if(this.qtToggleIndex === idx){
        return true;
      }
      else{
        return false;
      }
    },
    linkToggleQtReq(idx)
    {
      if(this.qtReqToggleIndex === idx){
        return true;
      }
      else{
        return false;
      }
    },
    linkToggleQtConfirm(idx)
    {
      if(this.qtConfrnToggleIndex === idx){ 
        return true;
      }
      else{
        return false;
      }
    },
    linkToggleQtConfirm2(idx)
    {
      if(this.qtConfrnToggleIndex2 === idx){ 
        return true;
      }
      else{
        return false;
      }
    },
    GetQTReqList(docId ,refID) {
      
      this.qtList =[];
      this.qtReqList = [];

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

        result.data.Items.forEach(element => {
					let qtItem = {};
          qtItem.ID = element.ID;
          qtItem.CarBrand = element.CarBrand;
					qtItem.CarNo = element.CarNo;
					qtItem.CarVin = element.CarVin;
					qtItem.ReqDt = element.ReqDt;
          qtItem.DealerFlag = 'BAY4YU';
          qtItem.WebposOnly = 'N';
          qtItem.QTData = element;
          qtItem.ResQTData = [];
					this.qtList.push(qtItem);
				});

				this.GetWebPosQtList(docId ,refID);

      /*
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

        // 채팅에서 넘어왔을 경우
        if(docId !== ''  && refID !== '')
        {
          this.showQtItem(docId , refID);
        } 
      */
      });
    },
    GetWebPosQtList(docId ,refID)
    {
      this.confirmQTdata  = [];
      
      var param = {};
      param.BsnId = this.UserInfo.BsnID;

      if(this.qtSearchText !== '')
      {
        var searchCase = this.dropdownQT;
        switch (searchCase) {
          case '차량번호' :
            param.CarNo = this.qtSearchText;
            break;
          case '대리점' :
            //param.payload.ExpressionAttributeValues[key2] = this.qtSearchText;
            break;
          case '날짜' :
            param.RequestDataJSON = this.qtSearchText;
            break;
          default :
            break;
        }
      }

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
					this.confirmQTdata.forEach(element => {
						let qtItem = {};
						qtItem.ID = element.ESTM_ID;
						qtItem.CarNo = element.CAR_NO;
						qtItem.CarVin = element.VIN_NO;
						qtItem.ReqDt = element.YEAR + "-" + element.MONTH + "-" + element.DAY;
						qtItem.DealerFlag = 'WEBPOS';
						qtItem.QTData = element;
            qtItem.ResQTData = [];

						var index = this.qtList.findIndex(i => i.ID === element.ESTM_ID);
						if(index === -1){
              qtItem.WebposOnly = 'Y';
							this.qtList.push(qtItem);
            }
            else{
              this.qtList[index].DealerFlag  = 'WEBPOS';
              this.qtList[index].QTData = element;
              this.qtList[index].ResQTData = [];
            }
					});
				}
					
				if(Array.isArray(this.qtList))
				{
					this.qtList.sort(function(a, b){
						return (a.ReqDt < b.ReqDt) ? 1 : -1;
					});
				}

				var qtGroupList = arrayGroupBy(this.qtList, function(item)
				{
					return [item.CarNo, item.ReqDt];
				});

        this.qtReqList =  qtGroupList;
        console.log('qtReqList' , this.qtReqList );

				// 채팅에서 넘어왔을 경우
        if(docId !== ''  && refID !== '')
        {
          this.showQtItem(docId , refID);
        } 

      })
      .catch((error) => {
          console.log(error);
      })   
    },
    showConfirmVlue(docId)
    {
        if(Array.isArray(this.confirmQTdata)){
        let index =  this.confirmQTdata.findIndex(i => i.ESTM_ID === docId);
        if(index >= 0)
        {
          return true;
        }
        else{
          return false;
        }  
      } 
    },
    showConfirmVlue2(docId)
    {
        
        if(Array.isArray(this.confirmQTdata2)){
        let index =  this.confirmQTdata2.findIndex(i => i.DocID === docId);
       // console.log('data : ', this.confirmQTdata2);
      //  console.log('docId ' ,docId );
       // console.log('index222' ,index );
        if(index >= 0)
        {
          return true;
        }
        else{
          return false;
        }  
      } 
    },
    GetConfirmValue(docId,key)
    {
      let str = "";
      if(Array.isArray(this.confirmQTdata)){
        let index =  this.confirmQTdata.findIndex(i => i.ESTM_ID === docId);
        if(index >= 0)
        {
            str =  this.confirmQTdata[index][key];
        }
        else{
          str = "";
        }  
      } 
      return str;
    },
    GetConfirmValue2(docId,key)
    {
      if(Array.isArray(this.confirmQTdata2)){
        let index =  this.confirmQTdata2.findIndex(i => i.DocID === docId);
        if(index >= 0)
        {
          if(key!== undefined){
            return this.confirmQTdata2[index][key];
          }
          else{
            return  this.confirmQTdata2[index];
          }
        }
        else{
          return "";
        }  
      } 
    },
    GetConfirmQtList(item)
    {
      this.confirmQTdata  = [];
      
      var param = {};
      param.BsnId = this.UserInfo.BsnID;
      param.CarNo = item[0].CarNo;
      param.RequestDataJSON = item[0].ReqDt;

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
    GetConfirmQtList2(item , index)
    {
      
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.FilterExpression = "CarNo = :id and ReqDt = :reqDt";
      //param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      var key2 = ":reqDt";
      param.payload.ExpressionAttributeValues[key] = item[0].CarNo;
      param.payload.ExpressionAttributeValues[key2] = item[0].ReqDt;

      console.log("======= 견적확정 조회 Request result ========");
      console.log(param); 

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= 견적확정 조회 Response result ========");
        console.log( result.data.Items);
        this.confirmQTdata2  = result.data.Items;

        if(index >= 0)
        {
          // 채팅에서 넘어왔을 경우 상세 조회
          this.qtConfrnToggleIndex2 = index;
          //this.GetQtList2(this.GetConfirmValue2(item[0].ID));
        }
      });  
    },
    GetOrderHistory(docId ,orderID, seachText)
    {
      
      // 과거주문 내역 조회일 경우
      if(seachText !== '')
      {
        this.dropdownSO = '차량번호';
        this.ordSearchText = seachText;
      }

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
      this.orderdetail = JSON.parse(convertDynamoToArrayString(item.LineItem));
    },
    setQtDate(value)
    {
      var str = value + '';
      return str.substring(5,7) + '/'+str.substring(8,10) + '(' + getInputDayWeek(value) +')';
    },
    showQtList(item, index)
    {
      this.SOList1Toggle = !this.SOList1Toggle;
      //this.visible = false;
      //this.visible2 = false;
      //this.visible3 = false;
      this.orderToggleIndex = -1;
      this.qtToggleIndex = -1;
      this.qtReqToggleIndex = -1;
      this.qtConfrnToggleIndex2 = -1;
      
  //  this.qtReqItem = [];
  //  this.GetConfirmQtList(item);
  //  this.GetConfirmQtList2(item);

      this.GetDealerResData(item);
      this.GetWebposResData(item);

      console.log('item : ' , item);
    },
    GetWebposResData(item, index){
     
      item.forEach(el =>{

        var param = {};
        param.BsnId = this.UserInfo.BsnID;
        param.CarNo = el.CarNo;
        param.VinNo = el.CarVin;
        param.RequestDataJSON = el.ID;

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
            el.ResQTData = [];
            if(this.rtnCode === 0)
            {
              var rtnQTData = JSON.parse(result.data.ReturnDataJSON);
              var headQTData = rtnQTData['ESTM_HED'];
              
              if(headQTData.length > 0)
              {
                if(headQTData[0].ESTM_STS !== '0' && headQTData[0].ESTM_STS !== '1' && headQTData[0].ESTM_STS !== '6' && rtnQTData['ESTM_DTL'].Length !== 0)
                {
                  var dtlQtData = rtnQTData['ESTM_DTL'];
                  console.log("ESTM_DTL : " , dtlQtData);

                  headQTData.forEach(element => {
                
                    //console.log('element : ',element);
                    let resQtItem = {};
                    resQtItem.ID = element.ESTM_ID;
                    resQtItem.DocID = element.ESTM_ID;
                    resQtItem.CarNo = element.CAR_NO;
                    resQtItem.DealerName = '부품지원센터';
                    resQtItem.DealerCode = 'PARTS';
                    resQtItem.DealerAgent = element.AGENT_NM;
                    resQtItem.ResFlag = 'WEBPOS';
                    resQtItem.CarType = element.SERIES;
                    resQtItem.ResDetail = dtlQtData;
                    el.ResQTData.push(resQtItem);              
                  });

                  if(index >= 0)
                  {
                    // 채팅에서 넘어왔을 경우 상세 조회
                    this.qtConfrnToggleIndex = index;
                    console.log('item11 : ' ,item);
                    this.showResItem(item[index].ResQTData[0])
                  } 
                }
              }
            }
        })
        .catch((error) => {
            console.log(error);
        }) 

      });  
    },
    GetDealerResData(item, index) { 

      console.log('dealer item :', item);

      item.forEach(el =>{
        var param = {};
        param.operation = "list";
        param.tableName = "BAY4U_QT_RETURN_LIST";
        param.payload = {};
        param.payload.FilterExpression = "DocID = :id";
        param.payload.ExpressionAttributeValues = {};
        var key = ":id";
        param.payload.ExpressionAttributeValues[key] = el.ID;
        
        console.log("======= 견적확정 조회 Request result ========");
        console.log(param); 

        axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          console.log("======= 견적확정 조회 Response result ========");
          console.log( result.data.Items);
          //this.confirmQTdata2  = result.data.Items;

          result.data.Items.forEach(element => {

            let resQtItem = {};
            resQtItem.ID = element.ID;
            resQtItem.DocID = element.DocID;
            resQtItem.CarNo = element.CarNo;
            resQtItem.DealerName = element.ResDealerNm;
            resQtItem.DealerCode = element.ResDealer;
            resQtItem.DealerAgent = '';
            resQtItem.ResFlag = 'BAY4U'
            resQtItem.CarType ='';
            resQtItem.ResDetail = JSON.parse(element.LineItem);
            el.ResQTData.push(resQtItem);

          });

          if(index >= 0)
          {
            // 채팅에서 넘어왔을 경우 상세 조회
            this.qtConfrnToggleIndex2 = index;
            
            if(item[index].ResQTData.length > 0)
            {
              this.showResItem2(item[index].ResQTData[0])
            }
          }
        });  
      });

    },
    showQtReqItem(item)
    {
      console.log('item : ', item);
      //this.SOList2Toggle = !this.SOList2Toggle;
      this.qtReqItem = [];
      if(item.DealerFlag === 'WEBPOS'){
        
        item.ResQTData[0].ResDetail.forEach(element => {
           let detailItem = {};
           detailItem.ITM_NM = (isNaN(element.WG_ITM)) ? element.WG_ITM  : element.NM_ITM ;
           detailItem.ITM_QTY = element.ORDER_QTY;
           this.qtReqItem.push(detailItem);
        });
      }
      else{
         this.qtReqItem = JSON.parse(convertDynamoToArrayString(item.QTData.LineItem)); 
      }
    },
    showResItem(item)
    {
      console.log('resItem :', item.ResDetail);
      this.detailQTData = [];
      this.detailQTData = item.ResDetail;
    },
    showResItem2(item){
      this.SOList3Toggle = !this.SOList3Toggle;
      
      console.log('resItem :', item);
      this.detailQTData2 = [];
      if(item.ResDetail !== undefined)
      {
        this.detailQTData2 = JSON.parse(convertDynamoToArrayString(JSON.stringify(item.ResDetail)));
      }
      //this.detailQTData2 = JSON.parse(convertDynamoToArrayString(item.LineItem));
    },
    showQTOrderPopup(item)
    {
      this.orderData = item;
      console.log(this.orderData);
      this.showQTOrder = !this.showQTOrder;
      this.orderDealerName = item.DealerName;
      this.orderList = JSON.parse(convertDynamoToArrayString(JSON.stringify(item.ResDetail)));
     // this.orderList = JSON.parse(convertDynamoToArrayString(item.ResDetail));
      
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
      param.payload.Item.ResDealer = this.orderData.DealerCode;
      param.payload.Item.ResDealerNm = this.orderData.DealerName;
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
        this.goOrderChating(id);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    goOrderChating(val)
    {
      var msg =  this.orderData.CarNo + " 차량 부품 주문 요청 완료!!";
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.orderData.DealerCode};
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
      param.payload.Item.ChatTo =  this.orderData.DealerCode;
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
          recv:  this.orderData.DealerCode,
          chatId: this.orderData.DocID,
          reqTm : chatMsg.reqTm,
        });

        this.$router.push({name:'Chat', 
            params:{
                  chatid: this.orderData.DocID, 
                  carNo: this.orderData.CarNo,
                  chatFrom: this.UserInfo.BsnID,
                  chatTo: this.orderData.DealerCode,
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
        let index =  this.orderHistory.findIndex(i => i.DocID === docId);
        console.log('index:' , index);
        this.orderToggleIndex = index;
        let item = this.orderHistory[index];
        this.GetOrderDetail(item);
      } 
    },
    showQtItem(docId , refID)
    {
      // 채팅에서 넘어왔을 경우 처리
      if(Array.isArray(this.qtReqList)){
        
        console.log('채팅에서 넘어옴 ! ' , docId , refID) ; 
          
        let index = -1;
        for(var i=0; i <= this.qtReqList.length; i++)
        {
          index = this.qtReqList[i].findIndex(element => element.ID === docId);
          if(index >= 0){
             console.log('index:' , index);
             this.qtToggleIndex = i;
            // this.GetConfirmQtList(this.qtReqList[i]);
            // this.GetConfirmQtList2(this.qtReqList[i] , index);

            this.GetDealerResData(this.qtReqList[i], index);
            this.GetWebposResData(this.qtReqList[i], index);
           
             break;
          }
        }
      } 
    },
    goQTChating(item)
    {   
      
      let qtInfoKeys =  Object.keys(item);
      let docId = '';
      if((qtInfoKeys.find(element => element === 'ESTM_ID')) !== undefined){
        docId = item.ESTM_ID;
      }

      if((qtInfoKeys.find(element => element === 'DocID')) !== undefined){
        docId = item.DocID;
      }
      else if((qtInfoKeys.find(element => element === 'ID')) !== undefined){
        docId = item.ID;
      }
      
      console.log('go chat : ' , docId);

      let now = new Date();
      // 견적요청 채팅창으로 이동
      this.$router.push({name:'Chat', 
        params:{
              chatid: docId, 
              carNo: item.CarNo,
              chatFrom: this.UserInfo.BsnID,
              chatTo: item.ResDealer,
              chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2),
              qtInfo : item,
              chatType:'qt',
          }});
    },
    showQTImage(img) { 

      if(img !== undefined)
      {
        this.showQTImageFlag = true;
        console.log('img :' , Constant.IMG_URL + img);
        this.itemImage = Constant.IMG_URL + img;
      }
    },
    showResmemoPopup(item)
    {
      this.showResMemo = !this.showResMemo;
      if(item.Memo !== undefined){
        this.resMemo = item.Memo;
      }
      else{
        this.resMemo = item.memo;
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

    if(this.UserInfo.BsnID === '')
    this.UserInfo.BsnID = this.$cookies.get('BsnID');

    if(this.$route !== undefined && this.$route.name === "QTList" ) {
      var docID = '';
      if(this.$route.params.DocID !== undefined)
      {
        docID = this.$route.params.DocID;
      }
      var RefID = '';
      if(this.$route.params.RefID !== undefined)
      {
        RefID = this.$route.params.RefID;
      }
      var CarNo = '';
      if(this.$route.params.CarNo !== undefined)
      {
        CarNo = this.$route.params.CarNo;
      }
      
      if(this.$route.params.Type !== undefined) {
        if(this.$route.params.Type === 'qt')
        {
          // 견적확정 채팅에서 넘어왔을 경우
          this.tabIndex = 0;
          this.GetQTReqList(docID ,RefID);
          this.GetOrderHistory('', '','');
        }
        if(this.$route.params.Type === 'order')
        {
          // 주문요청 완료 채팅에서 넘어왔을 경우
          this.tabIndex = 1;
          this.GetQTReqList('','');
          this.GetOrderHistory(docID, RefID,'');
        }
        if(this.$route.params.Type === 'orderHistory')
        {
          // 과거주문내역 조회로 넘어왔을 경우
          this.tabIndex = 1;
          this.GetQTReqList('','');
          this.GetOrderHistory('', '',CarNo);
        }
      }
      else{
          this.GetQTReqList('','');
          this.GetOrderHistory('', '','');
      }
    }
    else{
      if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');

      this.GetQTReqList('','');
      this.GetOrderHistory('','','');
    }
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

.QTList-tab {
  padding: 5px;
  font-size: 0.9rem;
}

.QTList-title {
  margin:auto;
  width: 96%;
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
  width: 96%;
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
.request-qtInfo {
  font-size: 0.9rem;
  font-weight: bold;
  flex:6%;
}
.request-qtInfo-detail {
  flex:60%;
  padding:0px 8px;
}
.request-qtInfo-detailBtn{
  flex:5%;
  text-align: right; 
  padding: 10px 0px;
}
.request-qtInfo-carType{
  font-size: 0.7em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 210px;
}
.qtInfo-detail-carNo
{
  font-size: 1rem;
  font-weight: bold;
}
.qtInfo-detail-dealer
{
  font-size: 0.9em;
  margin-left: 6px;
}
.qtInfo-detail-carType {
  font-size: 0.7rem;
  margin-top: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 210px;
}
.history-qtInfo-carNo {
  font-size: 1.1rem;
  font-weight: bold;
}
.history-qtInfo-dealer
{
   font-size: 0.9rem;
   margin-left: 15px;
   margin-top: 5px;
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
  width: 96%;
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
  padding: 5px 20px 5px 20px;
}
.history-detailConts-carvin
{
  position:absolute;
  top: 0;
  right: 10px;
  margin-top: 5px;
}

.history-detailConts ul {
  list-style-type: none;
  margin: -10px;
  padding: 10px 0px;
}
.qtReq-image{
  margin-left:-10px;
}
.qtReq-image span{
  margin-right: 10px;
}
.qtReq-reqTitle{
  margin-top: 0px;
  vertical-align:4px;
}
.qtReq-reqIcon{
  font-size: 1.5em;
  color:#848180;
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
/*
.history-webpo-car {
  flex:40%;
  padding-top: 0px;
}*/

.history-car {
  flex:40%;
  margin-right: -15px;
}
.history-carNo {
  font-size: 1rem;
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
.history-brand {
  flex:20%;
  max-width:20px;
  margin-right: 20px;
  margin-left: -25px;
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

/* 부품지원센터 견적회신 */
.response-qtInfo {
  font-size: 0.9rem;
  font-weight: bold;
  flex:6%;
}
.response-qtInfo-detail {
  flex:55%;
  padding:0px 8px;
}
.response-qtInfo-chat {
  padding: 10px 5px;
}
.response-qtInfo-chat i{
  color:#0D47A1;
  font-size: 2.0em;
}
.response-detailBtn {
  text-align: right; 
  width: 60px;
  padding: 10px 0px;
}
.history-detailConts-webpos
{
   padding: 0px;
   display: flex;
}
.history-detailConts-webpos span
{
   font-size: 0.94em;
}
.history-detailConts-webpos li
{ 
  margin:0px 6px;
  border-top:lightgrey 1px solid;
}
.history-detailConts-webpos li:nth-child(1)
{ 
  margin:0px 6px;
  border-top:#fff 1px solid;
}
.webpos-item{
  margin-left: 10px;
  width: 140px;
}
.webpos-itemName{
  display: inline-block;
  /*overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  width:110px;*/
}
.webpos-itemCode{
  color:#000;
}
.webpos-itemQty{
 width:30px;
 margin-left:2px;
}
.webpos-itemQty span{
 float:right;
}
.webpos-itemPrice
{
  margin-left:10px;
  width: 50px;
}
.webpos-itemPrice span
{
  float:right;
}
.webpos-amt
{
  margin-left:10px;
  width: 50px;
}
.webpos-amt span
{
  float:right;
  font-size: 0.9em;
  font-weight: bold;
}
.webpos-delvDay{
  flex:20%
}
.webpos-delvDay span{
  float: right;
  margin-right:10px;
}

/*일반대리점 견적회신 */
.dealer-qtInfo{
  display: flex;
  padding: 0;
}
.dealer-qtInfo ul{
  width: 100%;
  margin: 0px;
  padding:0px;
}
.dealer-qtInfo span{
  font-size: 0.95em;
}
.dealer-qtInfo li
{ 
  margin:0px 6px;
  border-top:lightgrey 1px solid;
}
.dealer-qtInfo li:nth-child(1)
{ 
  margin:0px 6px;
  border-top:#fff 1px solid;
}
.dealer-item
{
  margin-left: 2px;
  flex:50%;
}
.dealer-Price{
  flex: 35%;
}
.dealer-Price span{
  float: left;
}
.dealer-Price span:last-child{
  float: left;
  padding-left: 5px;
}
.dealer-Price span:first-child{
  float: right;
}
.dealer-delv{
  float: right;
  text-align: center;
  margin:0px;
  padding: 0px 5px;
}
.dealer-delv .dealer-memo-on
{
  font-size: 1.3em;
  color:#FFBB00;
}
.dealer-delv .dealer-memo-off
{
  font-size: 1.2em;
  color:#696565;
}
.dealer-itemPrice{
  padding: 0px 5px;
}
.dealer-itemAmount{
  font-weight: bold;
  text-align: right;
}
/*
.dealer-itemCode
{
  font-size: 0.8em;
}
.dealer-itemName{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
}
.dealer-itemBrand
{
  font-size: 0.8rem;
}
.dealer-itemQty
{
  font-size: 0.8rem;
}
*/


.history-detailConts .itemName{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.7rem;
  width: 145px;
}
.history-detailConts .itemName i{
  font-size: 1.5em;
  color:#848180;
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
  text-align: center;
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
