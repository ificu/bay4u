<template>
  <div>
	<v-app>
		<div class="qtlist-title">
			<span>견적 확정 내역</span>
			<CheckLogin></CheckLogin>
		</div>
		<div class="qtlist-search">
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
		<div  class="qtlist-state">
			<v-icon color="#5d4038" style="margin-left:10px;margin-right:3px;font-size:1.1em;">hourglass_empty</v-icon>
			<span style="margin-right:6px;font-size:0.85em;">견적진행중</span>
			<v-icon color="#5d4038" style="margin-right:3px;font-size:1.1em;">mobile_friendly</v-icon>
			<span style="margin-right:6px;font-size:0.85em;">견적회신완료</span>
			<span v-if="UserInfo.UserType ==='SITEF'">
				<v-icon color="#5d4038" style="margin-right:3px;font-size:1.1em;">shopping_cart</v-icon>
				<span style="margin-right:6px;font-size:0.85em;">주문요청</span>
				<v-icon color="#5d4038" style="margin-right:3px;font-size:1.1em;">local_shipping</v-icon>
				<span style="font-size:0.85em;">주문확정</span>
			</span>
		</div>
		<div class="qtlist-history">
			<b-card no-body class="mb-1" v-for="(qtItem , idx) in qtReqList" v-bind:key="idx" >
				<b-card-header header-tag="header" role="tab" header-class="card-header">
					<b-container>
						<b-row>
							<b-col align-self="center" class="history-brand">
								<img height='18' v-if="qtItem[0].CarBrand === 'AUDI'" style="align-self:center;margin-left:-3px;width:40px;" src="@/assets/BRAND-AUDI.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'BENZ'" style="align-self:center;margin-left:4px;" src="@/assets/BRAND-BENZ.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'BMW'" style="align-self:center;margin-left:4px;" src="@/assets/BRAND-BMW.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'CADILLAC'" style="align-self:center;margin-left:2px;" src="@/assets/BRAND-CADILLAC.png">
								<img height='10' v-if="qtItem[0].CarBrand === 'CHRYSLER'" style="align-self:center;margin-left:0px;width:36px;" src="@/assets/BRAND-CHRYSLER.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'CITROEN'" style="align-self:center;margin-left:5px;" src="@/assets/BRAND-CITROEN.png">
								<img height='18' v-if="qtItem[0].CarBrand === 'DODGE'" style="align-self:center;margin-left:0px;width:36px;" src="@/assets/BRAND-DODGE.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'FIAT'" style="align-self:center;margin-left:4px;" src="@/assets/BRAND-FIAT.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'FORD'" style="align-self:center;margin-left:1px;width:38px;" src="@/assets/BRAND-FORD.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'HONDA'" style="align-self:center;margin-left:2px;width:34px;" src="@/assets/BRAND-HONDA.png">
								<img height='15' v-if="qtItem[0].CarBrand === 'JEEP'" style="align-self:center;margin-left:2px;width:34px;" src="@/assets/BRAND-JEEP.png">
								<img height='17' v-if="qtItem[0].CarBrand === 'LANDROVER'" style="align-self:center;margin-left:2px;" src="@/assets/BRAND-LANDROVER.png">
								<img height='17' v-if="qtItem[0].CarBrand === 'JAGUAR'" style="align-self:center;margin-left:2px;" src="@/assets/BRAND-JAGUAR.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'LEXUS'" style="align-self:center;margin-left:4px;" src="@/assets/BRAND-LEXUS.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'LINCOLN'" style="align-self:center; margin-left:6px;" src="@/assets/BRAND-LINCOLN.png">
								<img height='18' v-if="qtItem[0].CarBrand === 'MINI'" style="align-self:center;margin-left:-3px;width:40px;" src="@/assets/BRAND-MINI.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'PEUGEOT'" style="align-self:center; margin-left:4px;" src="@/assets/BRAND-PEUGEOT.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'PORSCHE'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-PORSCHE.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'TOYOTA'" style="align-self:center; margin-left:0px;" src="@/assets/BRAND-TOYOTA.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'VOLVO'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-VOLVO.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'VW'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-VW.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'NISSAN'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-NISSAN.png">
								<img height='30' v-if="qtItem[0].CarBrand === 'MASERATI'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-MASERATI.png">
								<img height='15' v-if="qtItem[0].CarBrand === 'INFINITI'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-INFINITI.png">
								<img height='25' v-if="qtItem[0].CarBrand === 'GM'" style="align-self:center; margin-left:5px;" src="@/assets/BRAND-GM.png">
							</b-col>                    
							<b-col class="history-date" :class="{ 'history-date2' :(qtItem[0].CarSeries !== undefined && qtItem[0].CarSeries !== '') ? true :false}">{{SetQtDate(qtItem[0].ReqDt)}}</b-col>
							<b-col class="history-carInfo" :class="{ 'history-car2' :(qtItem[0].CarSeries !== undefined && qtItem[0].CarSeries !== '') ? true :false}">
								<b-row class="history-carNo">
									<!--견적요청-->
									<v-icon color="#FFF59D" style="margin-right:4px;margin-top:4px;font-size:1.5em;" v-if="ShowQtState(qtItem)">hourglass_empty</v-icon>
									<!--견적회신-->
									<v-icon color="#FFF59D" style="margin-right:4px;margin-top:4px;font-size:1.45em;" v-if="ShowQtConfirmState(qtItem)">mobile_friendly</v-icon>
									<!--주문요청-->
									<v-icon color="#FFF59D" style="margin-right:4px;margin-top:3px;font-size:1.5em;" v-if="ShowOrderState(qtItem)">shopping_cart</v-icon>
									<!--주문확정-->
									<v-icon color="#FFF59D" style="margin-right:4px;margin-top:3px;font-size:1.43em;" v-if="ShowOrdConfirmState(qtItem)">local_shipping</v-icon>
									{{(qtItem[0].CarNo === "*empty*")?"미상차량" : qtItem[0].CarNo }}
								</b-row>
								<!--<b-row class="history-carSeries">
									{{qtItem[0].CarSeries}}
								</b-row>-->                
							</b-col>    
							<b-col align-self="center" class="history-detailHeaderBtn">
								<b-button :id ="'btnGrp-'+qtItem[0].ID" block href="#"  v-b-toggle="'accordion-' + idx"  variant="secondary"  size="sm" v-on:click="ShowQtList(qtItem,idx)">
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
						<b-row class="history-carSeries">
							<b-col><span>{{qtItem[0].CarSeries}}</span></b-col>
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
												<b-col class="pl-2 pr-2 pt-1 pb-0 request-qtInfo">견적<br>요청</b-col>
												<b-col class="request-qtInfo-detail">
													<b-row>
														<span class="history-qtInfo-carNo" v-if="qtReqInfo.CarNo === ''">차량번호 미입력</span>
														<span class="history-qtInfo-carNo" v-if="qtReqInfo.CarNo !== ''"> {{(qtReqInfo.CarNo === "*empty*")?"미상차량" : qtReqInfo.CarNo }}</span>
														<span class="history-qtInfo-dealer">{{qtReqInfo.QTData.ResDealerNm}}</span>
														<span v-if="qtItem.length > 1" class="history-qtInfo-qtCount">{{idx2 + 1}}번째</span>
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
													<b-button block href="#"  v-b-toggle="'accordion-qtReq'+idx2"  variant="secondary" size="sm" v-on:click="ShowQtReqItem(qtReqInfo , idx2)">
													<!--<i v-if="!SOList2Toggle" class="fas fa-chevron-down"></i>
													<i v-if="SOList2Toggle"  class="fas fa-chevron-up"></i>-->
													<span v-if="visibleIcon === true" >
														<i class="fa fa-chevron-up" aria-hidden="true"></i>
													</span>
													<span v-if="visibleIcon !== true" >
														<i class="fas fa-chevron-down"  aria-hidden="true"></i>
													</span>
													</b-button>
												</b-col>               
										</b-row>
									</b-container>
								</b-card-header>
								<b-collapse :id="'accordion-qtReq'+idx2" accordion="my-accordion2" role="tabpanel" v-if="linkToggleQtReq(idx2)">
									<b-card-body>
										<div class="history-detailConts" style="position: relative">
											<ul>
												<li v-for="(item, index) in qtReqItem" v-bind:key = "index">
												<div>
													<div> 
															<span class="itemCode">{{item.ITM_NM}}</span> 
															<span class="itemName" v-if="item.ITM_NM !=='사진입력'" >{{item.ITM_QTY}}개</span>
															<span class="itemName" v-if="item.ITM_NM ==='사진입력'"  @click="ShowQTImage(item.IMG)"><i class="fas fa-image"></i></span>
													</div>
												</div>
												</li>
											</ul>
											<div class="qtReq-image" v-if="qtReqInfo.WebposOnly !=='Y'">
												<span class="qtReq-reqTitle" v-if="qtReqInfo.QTData.IMG !=='*empty*'">차량번호/차대번호 사진촬영</span>
												<span class="qtReq-reqIcon" v-if="qtReqInfo.QTData.IMG !=='*empty*'" @click="ShowQTImage(qtReqInfo.QTData.IMG)"><i class="fas fa-image"></i></span>
												<span class="qtReq-reqTitle" v-if="qtReqInfo.QTData.Memo !=='*empty*'" >메모</span>
												<span class="qtReq-reqIcon" v-if="qtReqInfo.QTData.Memo !=='*empty*'" @click="ShowResmemoPopup(qtReqInfo.QTData)" ><i class="far fa-sticky-note"></i></span>
											</div>
											<div class="history-detailConts-carvin">
												<span v-if="qtReqInfo.WebposOnly === 'Y'" style="color:lightgray;">*</span>
												<span>{{(qtReqInfo.CarVin === '99999999999999999')? "미상차량" : qtReqInfo.CarVin}}</span>
											</div>
										</div>
									</b-card-body>
								</b-collapse>
							</b-card>
							<!--견적확정 정보-->
							<div v-for="(confrimInfo,idx3) in qtReqInfo.ResQTData" v-bind:key="idx3">
								<!--부품지원-->
								<b-card no-body class="mb-1" v-if="confrimInfo.ResFlag === 'WEBPOS'">
									<b-card-header header-tag="header" role="tab" header-class="card-header-default">
										<b-container>
											<b-row>
												<b-col class="pl-2 pr-2 pt-1 response-qtInfo">{{ShowQtStateText(confrimInfo.QTSts,0,2)}}<br>{{ShowQtStateText(confrimInfo.QTSts,2,4)}}</b-col>
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
														<span v-if="qtReqInfo.WebposOnly ==='N'" @click="GoQTChating(qtReqInfo)"><i class ="fas fa-comment-dots"></i></span>
												</b-col>                   
												<b-col class="response-detailBtn">
													<b-button block href="#" :id="'btnAccordion-'+GetIndex(confrimInfo.ID)" v-b-toggle="'accdWebpos-' +confrimInfo.ID"  variant="secondary" size="sm" v-on:click="ShowResItem(confrimInfo , GetIndex(confrimInfo.ID))">
														<!--<i v-if="!SOList1Toggle" class="fas fa-chevron-down"></i>
														<i v-if="SOList1Toggle"  class="fas fa-chevron-up"></i>-->
														<span  v-if="visibleIcon2 === true" >
																<i class="fa fa-chevron-up" aria-hidden="true"></i>
														</span>
														<span  v-if="visibleIcon2 !== true" >
															<i class="fas fa-chevron-down" aria-hidden="true"></i>
														</span>
													</b-button>
												</b-col>              
											</b-row>
										</b-container>
									</b-card-header>
									<b-collapse :id="'accdWebpos-'+confrimInfo.ID" accordion="my-accordion4" role="tabpanel" v-show="linkToggleQtConfirm(GetIndex(confrimInfo.ID))">
										<b-card-body class ="pt-1 pl-0 pr-0">
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
											<div class="qtlist-footer">
												<div class="TotalInfo">
													<v-btn color="#4E342E" dark depressed class="mr-3" @click="ShowQTOrderPopup(confrimInfo)" v-if="confrimInfo.QTSts !== '주문확정' && UserInfo.UserType === 'SITEF'">주문요청</v-btn>
													<span class="TotalInfo-Title">합계</span>
													<span v-if="total === 0" class="TotalInfo-Text" style="margin-left:30px;">{{ total}} 원</span>
													<span v-if="total !== 0" class="TotalInfo-Text">{{ total | localeNum}} 원</span><br>
													<span v-if="totalAmt === 0" class="TotalInfo-Text2" style="margin-left:30px;">({{totalAmt | localeNum}}) 원</span>
													<span v-if="totalAmt !== 0" class="TotalInfo-Text2">({{totalAmt | localeNum}}) 원</span>
												</div>
											</div>
										</b-card-footer>
									</b-collapse>
								</b-card>
								<!--일반 대리점-->
								<!-- <b-card no-body class="mb-1" v-for="(qtInfo , idx3) in confirmQTdata2" v-bind:key="idx3" >-->
								<b-card no-body class="mb-1" v-if="confrimInfo.ResFlag === 'BAY4U'" >
									<b-card-header header-tag="header" role="tab" header-class="card-header-default">
									<b-container>
										<b-row>
											<b-col class="pl-2 pr-2 pt-1 response-qtInfo">{{ShowQtStateText(confrimInfo.QTSts,0,2)}}<br>{{ShowQtStateText(confrimInfo.QTSts,2,4)}}</b-col>
											<b-col class="response-qtInfo-detail">
												<b-row>
														<b-col class="pl-0 pt-1 pb-0">
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
												<span v-if="qtReqInfo.WebposOnly ==='N'" @click="GoQTChating(qtReqInfo)"><i class ="fas fa-comment-dots"></i></span>
											</b-col>                
											<b-col class="response-detailBtn">
												<b-button block href="#" :id="'btnDealerAccordion-'+confrimInfo.ID"  v-b-toggle="'accd-' + confrimInfo.ID"  variant="secondary" size="sm" v-on:click="ShowResItem2(confrimInfo, confrimInfo.ID)">
													<!--<i class="fas fa-chevron-down" :id="'btnIcon'+idx"></i>-->
													<!--<i v-if="!SOList3Toggle" class="fas fa-chevron-down"></i>
													<i v-if="SOList3Toggle"  class="fas fa-chevron-up"></i>-->
														<span  v-if="visibleIcon3 === true" >
																<i class="fa fa-chevron-up" aria-hidden="true"></i>
														</span>
														<span  v-if="visibleIcon3 !== true" >
															<i class="fas fa-chevron-down" aria-hidden="true"></i>
														</span>
												</b-button>
											</b-col>             
										</b-row>
									</b-container>
									</b-card-header>
									<b-collapse :id="'accd-'+confrimInfo.ID" accordion="my-accordion3" role="tabpanel" v-show="linkToggleQtConfirm2(confrimInfo.ID)">
										<b-card-body class ="pt-1 pl-0 pr-0">
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
																<span v-if="item.memo !== undefined && item.memo !== ''" class="dealer-memo-on" @click="ShowResmemoPopup(item)"><i class="fas fa-lightbulb"></i></span>
																<span v-if="item.memo === undefined" class="dealer-memo-off"><i class="far fa-lightbulb"></i></span>
															</div>
														</div>
													</li>
												</ul>
											</div>
										</b-card-body>
											<b-card-footer>
												<div class="qtlist-footer">
													<div class="TotalInfo">
														<v-btn color="#4E342E" dark depressed class="mr-3" @click="ShowQTOrderPopup(confrimInfo)" v-if="confrimInfo.QTSts !== '주문확정'">주문요청</v-btn>
														<span class="TotalInfo-Title">합계</span>
														<span v-if="total2 === 0" class="TotalInfo-Text">{{total2 | localeNum}}원</span>
														<span v-if="total2 !== 0" class="TotalInfo-Text">{{total2 | localeNum}}원</span>
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
		</div>

		<!-- 주문 요청 확인 팝업 -->
    <QTOrder v-if="showQTOrder" @close="showQTOrder=false">
      <span slot="header">{{orderData.DealerName}} 대리점에 <br> 주문요청을 보냅니다</span>
      <span slot="orderlist">
        <div class="order-itemList" v-for="(item, index) in orderList" v-bind:key="index">
					<span class="order-itemCode">{{item.itemCode}}</span> / <span class="order-itemName"> {{item.itemName}}</span>
					<input v-model="item.itemQty" type="number" class="order-itemqty" @change="CalculatorAMT(item)" @focus="$event.target.select()"/>
					<!--<span >{{item.AMT }}개</span>-->
					<span v-if="item.itemPrice === 0" class="order-itemPrice">{{ item.itemPrice | localeNum}}원</span>
					<span v-if="item.itemPrice !== 0" class="order-itemPrice">{{ item.itemPrice | localeNum}}원</span>
					<i class="order-item-btn fas fa-times-circle"  @click="RemoveItem(item)"></i>
        </div>
        <div class="qtlist-footer">
          <div class="TotalInfo">
						<span class="TotalInfo-Title">합계금액</span>
						<span class="TotalInfo-Text">{{sumOrderAmt | localeNum}}</span>
          </div>
        </div>
      </span>
      <span slot="footer">
        주문 하시겠습니까?
        <b-button class="submit-YES" @click="SaveOrder()">YES</b-button>
        <b-button class="submit-NO" @click="showQTOrder=false">NO</b-button>
      </span>
    </QTOrder>

		<!--견적요청 메모-->
		<v-dialog v-model="showResMemo" width="400px">
			<v-card>
				<v-card-title class="headline"><i class="far fa-lightbulb"></i>메모</v-card-title>
				<v-card-text>{{resMemo}}</v-card-text>
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

		<!--견적요청 이미지-->
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
		
		<!-- 프로세싱 메시지 -->
    <MessageBox v-if="showProcessing">
      <div slot="header"><h5>처리 중...</h5></div>
      <span slot="body" class="showProcessing">
        <pre>{{processMsg}}</pre>
        <v-icon large color="orange darken-2">fas fa-sync-alt fa-spin</v-icon>
      </span>
    </MessageBox>
		
		<!-- 확인 메시지 -->
		<MessageBox v-if="showAlert"  @close="showAlert=false">
			<div slot="header"><h5>알림</h5></div>
			<span slot="body" @click="showAlert=false"><pre>{{alertMsg}}</pre>
			</span>
			<div slot="footer">
				<v-btn depressed small color="#967d5f" dark @click="showAlert=false">확인</v-btn>
			</div>
		</MessageBox>
	</v-app>
	</div>
</template>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
	import Constant from '@/Constant';
	import CheckLogin from '@/components/Common/CheckLogin.vue'
	import MessageBox from '@/components/Common/MessageBox.vue'
	import QTOrder from '@/components/QTList/QTOrder.vue'
	import {getInputDayWeek , convertDynamoToArrayString, arrayGroupBy, datePadding ,convertArrayToDynamo} from '@/utils/common.js'

	const axios = require('axios').default;

	export default {
		name: 'ConfirmList',
		data(){
			return{
				dropdownQT: '차량번호',
				sampletxtQT: '',
				qtSearchText: '',
				qtList:[],
				qtReqList:[],
				confirmQTdata: [],
				visibleIcon:false,
				visibleIcon2:false,
				detailQTData:[],
				detailQTData2:[],
				visibleIcon3:false,
				showProcessing: false,
				processMsg: '',
				CarInfoData : {
					CarN:'',
					VinNo: '',
					CarBrand:'',
					captureBlobImg:''
				},
				showQTOrder:false,
				showResMemo :false,
				resMemo:'',
				showQTImageFlag:false,
				itemImage:'',
				ordAmtSum:0,
				orderList:[],
				showAlert: false,
				alertMsg: ''
			}
		},
		components: {
			CheckLogin,
			MessageBox,
			QTOrder
		},
		created: function(){

			if(this.UserInfo.BsnID === '')
			this.UserInfo.BsnID = this.$cookies.get('BsnID');

			if(this.UserInfo.Name === '')
			this.UserInfo.Name = this.$cookies.get('UserNM');

			if(this.$route !== undefined && this.$route.name === "QTList" ){

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
				
				if(this.$route.params.CarInfoData !== undefined)
				{
					console.log('CarInfoData :',this.$route.params.CarInfoData);
					this.CarInfoData.CarNo = this.$route.params.CarInfoData.CarNo;
					this.CarInfoData.VinNo = this.$route.params.CarInfoData.VinNo;
					this.CarInfoData.CarBrand = this.$route.params.CarInfoData.CarBrand;
					this.CarInfoData.captureBlobImg = this.$route.params.CarInfoData.captureBlobImg;
				}
				
				if(this.$route.params.Type !== undefined) {
					if(this.$route.params.Type === 'qt'){
						// 견적확정 채팅에서 넘어왔을 경우
						this.tabIndex = 0;
						this.GetQTReqList(docID ,RefID);
					}
					else{
						this.GetQTReqList('','');
					}
				}
				else{
					this.GetQTReqList('','');
				}
			}
			else{
				this.GetQTReqList('','');
			}
		},
		computed: {

			UserInfo: {
				get() { return this.$store.getters.UserInfo },
				set(value) { this.$store.dispatch('UpdateUserInfo',value) }
			},

			total: function() {
				let sum = 0;
				this.detailQTData.forEach(function(item) {
					sum += (parseFloat(item.AMT_PRC));
				});
				return sum;
			},

			totalAmt: function() {
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
			
			sumOrderAmt: function() {
				let sum = 0;
				this.orderList.forEach(function(item) {
					sum += (parseFloat(item.AMT));
				});
				return sum;
			},
		},
		methods:{
			CalculatorAMT(item){
				item.AMT = item.itemPrice * item.itemQty;
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
				if(this.qtSearchText === ''){
					filter = "ReqSite = :id and ReqDt between :startDt and :endDt";
				}
				else{
					var searchCase = this.dropdownQT;
					switch (searchCase) {
						case '차량번호' :
							filter = "ReqSite = :id and (contains(CarNo, :carNo))";
							break;
						case '대리점' :
							filter = "ReqSite = :id and (contains(ResDealer, :resDealer))";
							break;
						case '날짜' :
							filter = "ReqSite = :id and (contains(ReqDt, :reqDt))";
							break;
						default :
							break;
					}
				}

				filter = filter + " and Flag <> :flag ";

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
							param.payload.ExpressionAttributeValues[key2] = (this.qtSearchText === "미상차량")? "*empty*" : this.qtSearchText;
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

				param.payload.ExpressionAttributeValues[":flag"] = "ORDER";

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
						qtItem.CarSeries = element.CarSeries;
						qtItem.CarNo = element.CarNo;
						qtItem.CarVin = element.CarVin;
						qtItem.ReqDt = element.ReqDt;
						qtItem.DealerFlag = 'BAY4YU';
						qtItem.WebposOnly = 'N';
						qtItem.QTSts = element.QTSts;
						qtItem.QTData = element;
						qtItem.ResQTData = [];
						this.qtList.push(qtItem);
					});

					this.GetWebPosQtList(docId ,refID);
				});
			},
			GetWebPosQtList(docId ,refID){
				
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

				console.log("======= Webpos 견적확정 조회 Request result ========");
				console.log(param); 

				var rtnCode = "";

				axios({
						method: 'POST',
						url: Constant.SCPIF_URL + 'GetConfirmQTData',
						headers: Constant.JSON_HEADER,          
						data: param
				})
				.then((result) => {
					console.log("======= Webpos 견적확정 조회 Return result ========");     
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
							qtItem.CarSeries = element.SERIES;
							qtItem.ReqDt = element.YEAR + "-" + element.MONTH + "-" + element.DAY;
							qtItem.DealerFlag = 'WEBPOS';
							qtItem.QTData = element;
							qtItem.QTSts = "견적회신";
							qtItem.ResQTData = [];

							var index = this.qtList.findIndex(i => i.ID === element.ESTM_ID);
							if(index === -1){
								qtItem.WebposOnly = 'Y';
								this.qtList.push(qtItem);
							}
							else{
								this.qtList[index].DealerFlag  = 'WEBPOS';
								//this.qtList[index].QTData = element;
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
						this.ShowQtItem(docId , refID);
					} 

				})
				.catch((error) => {
						console.log(error);
				})   
			},
			GetDealerResData(item, refID) { 

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

					var btnGrp = 'btnGrp-'+item[0].ID;
					if(document.getElementById(btnGrp)!== null && document.getElementById(btnGrp).getAttribute("aria-expanded") === "false" && this.showProcessing === false)
					{ 
						this.processMsg = "견적회신 조회 중입니다. \n잠시만 기다려주세요.";
						this.showProcessing = true;
					}

					axios({
						method: 'POST',
						url: Constant.LAMBDA_URL,
						headers: Constant.JSON_HEADER,
						data: param
					})
					.then((result) => {
						console.log("======= 견적확정 조회 Response result ========");
						console.log( result.data.Items);

						for(var element  of  result.data.Items){
							console.log('element : ' , element.ID);
							let index = el.ResQTData.findIndex(x => x.ID === element.ID);
							if(index === -1){
								let resQtItem = {};
								resQtItem.ID = element.ID;
								resQtItem.DocID = element.DocID;
								resQtItem.CarNo = element.CarNo;
								resQtItem.DealerName = element.ResDealerNm;
								resQtItem.DealerCode = element.ResDealer;
								resQtItem.DealerAgent = '';
								resQtItem.ResFlag = 'BAY4U'
								resQtItem.CarType ='';
								resQtItem.QTSts = el.QTSts;
								resQtItem.ResDetail = JSON.parse(element.LineItem);
								//el.ResQTData.push(resQtItem);
								el.ResQTData.splice(0, 0, resQtItem);
							}
						};

						if(refID !== undefined && refID.length > 1 ){
							let index =-1; 
							// 채팅에서 넘어왔을 경우 상세 조회
							this.$nextTick(function() {
								var target = 'btnDealerAccordion-'+refID;
								if(document.getElementById(target) !== null)
								{ 
									document.getElementById(target).click();
								}
							});     
						}
					});  

					this.showProcessing = false;
					this.processMsg = "";
				});
			},
			GetWebposResData(item, index){
				console.log('webpos item :' , item);
				console.log('webpos index : ', index);
				item.forEach(el =>{
					
					if(el.DealerFlag === "WEBPOS"){
						var param = {};
						param.BsnId = this.UserInfo.BsnID;
						param.CarNo = el.CarNo;
						param.VinNo = el.CarVin;
						param.RequestDataJSON = el.ID;

						console.log("======= Webpos QT Request result ========");
						console.log(param); 

						var btnGrp = 'btnGrp-'+item[0].ID;
						if(document.getElementById(btnGrp) !== null && document.getElementById(btnGrp).getAttribute("aria-expanded") === "false" && this.showProcessing === false)
						{ 
							this.processMsg = "견적회신 조회 중입니다. \n잠시만 기다려주세요.";
							this.showProcessing = true;
						}

						var rtnCode = "";
						axios({
								method: 'POST',
								url: Constant.SCPIF_URL + 'GetQTData',
								headers: Constant.JSON_HEADER,
								data: param
						})
						.then((result) => {
								console.log("======= Webpos QT Return result ========");     
								console.log( JSON.stringify(result.data)); 
							
								this.rtnCode = result.data.ReturnCode;
								el.ResQTData = [];
								if(this.rtnCode === 0)
								{
									var rtnQTData = JSON.parse(result.data.ReturnDataJSON);
									var headQTData = rtnQTData['ESTM_HED'];
									
									if(headQTData.length > 0)
									{
										var dtlQtData = rtnQTData['ESTM_DTL'];
									// console.log('ESTM_STS :', headQTData[0].ESTM_STS);
									// console.log('ESTM_DTL :', dtlQtData.length);
										if(headQTData[0].ESTM_STS !== '0' && headQTData[0].ESTM_STS !== '1' && headQTData[0].ESTM_STS !== '6' && rtnQTData['ESTM_DTL'].length !== 0)
										{
											//var dtlQtData = rtnQTData['ESTM_DTL'];
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
												resQtItem.QTSts = el.QTSts;
												//el.ResQTData.push(resQtItem); 
												el.ResQTData.splice(0, 0, resQtItem);
											});

											if(index !== undefined & index >= 0)
											{
												// 채팅에서 넘어왔을 경우 상세 조회
												this.$nextTick(function() {
																					
													var target = 'btnAccordion-'+index;
													console.log('target : ', document.getElementById(target));
													if(document.getElementById(target) !== null)
													{
														document.getElementById(target).click();
													}
												}); 
											}
										}
									}
								}

								this.showProcessing = false;
								this.processMsg = "";
						})
						.catch((error) => {
								console.log(error);
								this.showProcessing = false;
								this.processMsg = "";
						}) 
					}
				});  
			},
			GetIndex(value){

				let index = -1;
				if(this.qtToggleIndex > -1)
				{
					index = this.qtReqList[this.qtToggleIndex].findIndex(el => el.ID === value);
				}
				return index;
			},
			GoQTChating(item){

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
				
				let dealerNm = '';
				if(item.ResQTData != undefined && item.ResQTData.length > 0)
				{
					dealerNm = item.ResQTData[0].DealerName;
				}

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
								chatDealerNm : dealerNm
						}});
			},
			GoOrderChating(val)
			{
				var msg =  ((this.orderData.CarNo === "*empty*") ? "미상차량" : this.orderData.CarNo) + " 차량 부품 주문 요청 완료!!";
				var now = new Date();
				var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
						+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
				
				var adminYn = localStorage.getItem('AdminYn');
				var adminName = localStorage.getItem('AdminName');
				
				var chatMsg = {};
				chatMsg.from = {'name' : this.UserInfo.BsnID};
				chatMsg.to = {'name' : this.orderData.DealerCode};
				chatMsg.msg  = msg;
				chatMsg.reqTm = chatTime;
				if(adminYn === "Y"){
					chatMsg.SaveName = adminName;
				}
				else{
					chatMsg.SaveName = this.UserInfo.Name;
				}
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
				//param.payload.Item.Status = "0";
				param.payload.Item.ReadYn = "0";
				param.payload.Item.ReqTm = chatMsg.reqTm;
				param.payload.Item.ChatType = "O";
				param.payload.Item.RefID = val;

				if(adminYn === "Y"){
					param.payload.Item.SaveName = adminName;
				}
				else{
					param.payload.Item.SaveName = this.UserInfo.Name;
				}
				
				param.payload.Item.SaveID = this.UserInfo.UserID;
			
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
					
					let qtInfoPram = {};
					qtInfoPram.ResDealer = this.orderData.DealerCode;
					qtInfoPram.QTSts = '주문요청';

					var sendNm = this.UserInfo.Name
					if(adminYn === "Y"){
						sendNm = adminName;
					}

					this.UpdateChatTime(this.orderData.DocID, chatMsg.reqTm);

					this.$sendMessage({
						name: this.UserInfo.BsnID,
						msg,
						recv:  this.orderData.DealerCode,
						chatId: id, 
						docId: this.orderData.DocID,
						reqTm : chatMsg.reqTm,
						qtInfo : qtInfoPram,
						chatType : "O",
						refId: val,
						sendId: this.UserInfo.UserID,
						sendName: sendNm,
						sendFlag: "CARCENTER"
					});

					this.$router.push({name:'Chat', 
							params:{
										chatid: this.orderData.DocID, 
										carNo: this.orderData.CarNo,
										chatFrom: this.UserInfo.BsnID,
										chatTo: this.orderData.DealerCode,
										chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2),
										qtInfo : this.orderData,
										chatDealerNm : this.orderDealerName,
										chatType:'order',
								}});

				})
				.catch((error) => {
					console.log(error);
				});
			},
			linkToggleQt(idx){
				if(this.qtToggleIndex === idx){
					return true;
				}
				else{
					return false;
				}
			},
			linkToggleQtReq(idx){ 
				if(this.qtReqToggleIndex === idx){
					return true;
				}
				else{
					return false;
				}
			},
			linkToggleQtConfirm(idx){
				if(this.qtConfrnToggleIndex === idx){ 
					return true;
				}
				else{
					return false;
				}
			},
			linkToggleQtConfirm2(idx){
				if(this.qtConfrnToggleIndex2 === idx){ 
					return true;
				}
				else{
					return false;
				}
			},
			RemoveItem(item) {
				this.orderList = this.orderList.filter(it => it.itemCode != item.itemCode);
			},
			SetQtDate(value){
				var str = value + '';
				return str.substring(5,7) + '/'+str.substring(8,10) + '(' + getInputDayWeek(value) +')';
			},
			ShowQtState(item){

				if(Array.isArray(item))
				{
					if(item.length === 1) {
						if(item[0].WebposOnly === "Y"){
							if(item[0].QTSts === "견적요청"){
								return true;
							}
							else{
								return false;
							}
						}
						else{
					
							if(item[0].QTData.QTSts === "견적요청" || item[0].QTSts === "견적접수" ){
								return true;
							}
							else{
								return false;
							}
						}
					}
					else{
						let cnt = item.length;
						let result = item.filter(el => (el.QTData.QTSts === "견적요청" || el.QTData.QTSts === "바로주문" || el.QTData.QTSts === "견적접수"));
						if(cnt === result.length){
							return true;
						}
						else{	
							return false;
						}
					}
				}
			},
			ShowQtConfirmState(item){
				if(Array.isArray(item)){
					if(item.length === 1){
						if(item[0].WebposOnly === "Y"){
							if(item[0].QTSts === "견적회신"){
							return true;
							}
							else{
								return false;
							}
						}
						else{
							if(item[0].QTData.QTSts === "견적회신"){
							return true;
							}
							else{
								return false;
							}
						}
					}
					else{
						let cnt = item.length;
						let result = item.filter(el => el.QTData.QTSts === "견적회신");
						if(cnt === result.length){
							return true;
						}
						else{
							let index = item.findIndex(el => (el.QTData.QTSts === "주문요청" || el.QTData.QTSts === "주문확정" ) );
							if(index > -1 ){
								return false;
							}
							else{
								index = item.findIndex(el => el.QTData.QTSts === "견적회신");
								if(index > -1 ){
									return true;
								}
								return false;
							}
						}
					}
				}      
			},
			ShowOrderState(item){
				if(Array.isArray(item))
				{
					if(item.length === 1) {
						if(item[0].QTData.QTSts === "주문요청")
						{
							return true;
						}
						else{
							return false;
						}
					}
					else{
						let cnt = item.length;
						let result = item.filter(el => el.QTData.QTSts === "주문요청");
						let webposResult = item.filter(el => el.QTData.QTSts === "견적회신" && el.DealerFlag === "WEBPOS"); 
						let webposOnlyList = item.filter(el => el.DealerFlag === "WEBPOS"); 

						if(cnt === webposOnlyList.length){
							return false;
						}
						else{
							if(cnt === ( result.length + webposResult.length)){
								return true
							}
							else{
								let index = item.findIndex(el => el.QTData.QTSts === "주문확정");
								if(index > -1 ){
									return false;
								}
								else{
									index = item.findIndex(el => el.QTData.QTSts === "주문요청");
									if(index > -1 ){
										return true;
									}
									return false;
								}
							}
						}
					}
				}
			},
			ShowOrdConfirmState(item){
				if(Array.isArray(item))
				{
					if(item.length === 1) {
						if(item[0].QTData.QTSts === "주문확정"){
							return true;
						}
						else{
							return false;
						}
					}
					else{
						let cnt = item.length;
						let result = item.filter(el => el.QTData.QTSts === "주문확정");
						let webposResult = item.filter(el => el.QTData.QTSts === "견적회신" && el.DealerFlag === "WEBPOS"); 
						let webposOnlyList = item.filter(el => el.DealerFlag === "WEBPOS"); 

						if(cnt === webposOnlyList.length){
							return false;
						}
						else{
							if(cnt === ( result.length + webposResult.length)){
								return true
							}
							else{
								let index = item.findIndex(el => el.QTData.QTSts === "주문확정");
								if(index > -1 ){
									return true;
								}
								else{
									return false;
								}
							}
						}
					}
				}
			},
			ShowQtList(item , targetIndex){
			
				this.qtToggleIndex = -1;
				this.qtReqToggleIndex = -1;
				this.qtConfrnToggleIndex = -1;
				this.qtConfrnToggleIndex2 = ''; 
				this.visibleIcon = false;
				this.visibleIcon2 = false;
				this.visibleIcon3 = false;
				
				var btnGrp = 'btnGrp-'+item[0].ID;
				//console.log('btnGrp :' ,document.getElementById(btnGrp).getAttribute("aria-expanded"));
				if(document.getElementById(btnGrp)!== null && document.getElementById(btnGrp).getAttribute("aria-expanded") === "false"){
					this.GetDealerResData(item);
					this.GetWebposResData(item);
				}
			},
			ShowQtStateText(value , index1 , index2){

				if(value !== '' && value !== undefined){
					if(value !== '견적회신'){
						return value.substring(index1 , index2);
					}
					else{
						if(index1 === 2 && index2 === 4){
							return "완료";
						}
						else{
							return value.substring(index1 , index2);
						}
					}
				}
				else{
					return '';
				}
			},
			ShowQtReqItem(item , index){

				this.qtReqToggleIndex = index;
				this.visibleIcon = !this.visibleIcon;
				//this.SOList2Toggle = !this.SOList2Toggle;
				this.qtReqItem = [];
				if(item.WebposOnly === 'Y'){
					
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
			ShowResItem(item , index){

				this.detailQTData = [];
				this.detailQTData = item.ResDetail;
				this.qtConfrnToggleIndex = index;
				this.visibleIcon2 = !this.visibleIcon2;
			},
			ShowResItem2(item , id){  
				
				this.detailQTData2 = [];
				if(item.ResDetail !== undefined)
				{
					this.detailQTData2 = JSON.parse(convertDynamoToArrayString(JSON.stringify(item.ResDetail)));
				}
				this.qtConfrnToggleIndex2 = id;
				//this.visibleIcon3 = !this.visibleIcon3;
			},
			ShowQtItem(docId , refID){
				// 채팅에서 넘어 온 경우
				if(Array.isArray(this.qtReqList)){
					
					console.log('채팅에서 넘어옴 !  docId ' , docId ) ; 
					console.log('채팅에서 넘어옴 !  refID ' , refID ) ; 
						
					let index = -1;
					for(var i=0; i <= this.qtReqList.length; i++)
					{ 
						// 견적 그룹에서 채팅에서 넘어온 견적ID로 Index 찾기 
						index = this.qtReqList[i].findIndex(element => element.ID === docId);
						if(index >= 0){
							this.qtToggleIndex = i;
							break;
						}
					}

					// 부품지원센터와 일반대리점 견적 확정 내역 조회 
					if( this.qtReqList[i][index].DealerFlag === "WEBPOS")
					{
						this.GetWebposResData(this.qtReqList[i], index);
						this.GetDealerResData(this.qtReqList[i]);
					}
					else{
						this.GetDealerResData(this.qtReqList[i], refID);
						this.GetWebposResData(this.qtReqList[i]);
					}
				} 
			},
			ShowQTOrderPopup(item){
				this.orderList = [];
				this.orderData = item;
				this.showQTOrder = !this.showQTOrder;
				this.orderDealerName = item.DealerName;
				
				if(this.UserInfo.UserType === "SITEF" && item.DealerCode === "PARTS"){
					item.ResDetail.forEach(i => {
						let ordIdx = this.orderList.findIndex(x => x.itemCode === i.CONFIRM_ITM);
						if(ordIdx === -1){
							let orderItem = {}
							orderItem.itemName = i.NM_ITM;
							orderItem.itemCode = i.CONFIRM_ITM;
							orderItem.itemQty = i.ORDER_QTY;
							orderItem.itemPrice = i.PRC_PRICE;
							orderItem.AMT =  i.AMT_PRC;
							this.orderList.push(orderItem);
						}		
					});		
				}
				else{
					this.orderList = JSON.parse(convertDynamoToArrayString(JSON.stringify(item.ResDetail)));
				}
			},
			ShowResmemoPopup(item){
				this.showResMemo = !this.showResMemo;
				if(item.Memo !== undefined){
					this.resMemo = item.Memo;
				}
				else{
					this.resMemo = item.memo;
				}
			},
			ShowQTImage(img) { 
				if(img !== undefined)
				{
					//console.log('img :' , Constant.IMG_URL + img);
					this.showQTImageFlag = true;
					this.itemImage = Constant.IMG_URL + img;
				}
			},
			SaveOrder(){
				if(this.orderList.length === 0 ){
					this.showAlert = true;
					this.alertMsg = "주문 부품이 없습니다.";
					return;
				}
				var now = new Date();
				var ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
															+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
				var param = {};
				param.operation = "list";
				param.tableName = "BAY4U_ORDER_LIST";
				param.payload = {};
				param.payload.FilterExpression ="ReqSite = :site and DocID = :id";
				param.payload.ExpressionAttributeValues = {};
				var key = ":site";
				var key2 = ":id";
				param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;
				param.payload.ExpressionAttributeValues[key2] = this.orderData.DocID;
			
				console.log("======= 주문내역 조회 Request result ========");
				console.log(param); 

				axios({
					method: 'POST',
					url: Constant.LAMBDA_URL,
					headers: Constant.JSON_HEADER,
					data: param
				})
				.then((result) => {

					console.log("=======주문내역 조회  result ========");
					console.log( result.data.Items);

					if(result.data.Items.length > 0){
						let ordId = result.data.Items[0].ID;
						// 주문내역 Update
						param.operation = "update";
						param.tableName = "BAY4U_ORDER_LIST";
						param.payload = {};
						param.payload.Key = {};
						param.payload.Key.ID = ordId;  
						param.payload.UpdateExpression = "Set LineItem=:x, ReqDt=:y, ReqTm=:z ";
						param.payload.ExpressionAttributeValues = {
								":x" :convertArrayToDynamo(JSON.stringify(this.orderList)),
								":y" : now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2),
								":z" : ReqTm,
						};
									
						console.log("======= 주문내역 Update Request ========");
						console.log(JSON.stringify(param));

						axios({
								method: 'POST',
								url: Constant.LAMBDA_URL,
								headers: Constant.JSON_HEADER,
								data: param
						})
						.then((result) => {
							console.log("======= 주문내역 Update result ========");
							console.log(result.data);

							this.GoOrderChating(ordId);
						})
						.catch((error) => {
							console.log(error);
						});
					}
					else{
						// 신규주문 
						var id =  this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
									+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
					/* var ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
															+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);*/
						
						param.operation = "create";
						param.tableName = "BAY4U_ORDER_LIST";
						param.payload = {};
						param.payload.Item = {};
						param.payload.Item.ID = id;
						param.payload.Item.DocID = this.orderData.DocID;  //docId
						param.payload.Item.CarNo = this.orderData.CarNo;
						param.payload.Item.ReqSite =  this.UserInfo.BsnID;
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

							param.operation = "update";
							param.tableName = "BAY4U_QT_LIST";
							param.payload = {};
							param.payload.Key = {};
							param.payload.Key.ID = this.orderData.DocID;  //docId
							param.payload.UpdateExpression = "Set QTSts = :c" ;
							param.payload.ExpressionAttributeValues = {
									":c" : "주문요청",
							};
										
							console.log("======= QT Update Request ========");
							console.log(JSON.stringify(param));

							axios({
									method: 'POST',
									url: Constant.LAMBDA_URL,
									headers: Constant.JSON_HEADER,
									data: param
							})
							.then((result) => {
								console.log("======= QT Update result ========");
								console.log(result.data);

								this.GoOrderChating(id);
							})
							.catch((error) => {
								console.log(error);
							});
						})
						.catch((error) => {
							console.log(error);
						});
					}
				});  
			},
			UpdateChatTime(docID, chatDtaeTime)
			{
				var param = {};
				param.operation = "update";
				param.tableName = "BAY4U_QT_LIST";
				param.payload = {};
				param.payload.Key = {};
				param.payload.Key.ID = docID;
				param.payload.UpdateExpression = "Set ReqSeq = :b ";
				param.payload.ExpressionAttributeValues = {
					":b" : chatDtaeTime
				};

				//console.log("======= Chat time Update Request ========");
				//console.log(JSON.stringify(param));

				axios({
					method: 'POST',
					url: Constant.LAMBDA_URL,
					headers: Constant.JSON_HEADER,
					data: param
				})
				.then((result) => {
					//console.log("======= Chat time Update Request ========");
					//console.log(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
			}
		},
	}
</script>
<style scoped>
.qtlist-title {
  /*margin:auto;*/
  width: 96%;
  padding-top: 5px;
	margin: 15px 0px 5px 10px;
	/*margin-top: 15px;
  margin-bottom: 10px;*/
  font-size: 1.5rem;
  font-weight: bold;
  display:flex;
}
.qtlist-title span{
  width: 100%;
}
.qtlist-search {
  /*margin:auto;*/
	margin: 0px 8px 4px; /*위 0px, 좌우 8px, 아래 4px*/
  width: 96%;
}
.qtlist-search .input-group .input-group-prepend .dropdown .btn {
  background-color: #696565;
}
.qtlist-search .input-group .input-group-append .btn {
  background-color: #acd3ce;
  border: none;
}
.qtlist-state{
	margin: 0px 8px 0px 8px;
}
.qtlist-history {
  /*margin:auto;
	margin-top: 0px;*/
  width: 96%;
  margin: 5px 8px 80px 8px; /* 위 3px, 오른쪽 8px, 아래 80px, 왼쪽 8px */
}
.qtlist-history .list-group .list-group-item {
  padding: 5px;
  background-color: #e4e4e4;
}
.card-header{
  background-color: #967d5f;
  color: #fff;
  padding-top : 0px;
  padding-bottom : 0px;
}
.card-header .container {
  padding-top : 0px;
  padding-bottom : 0px;
}
.card-header-qtInfo{
 background-color: #fcf4df;
  padding-top : 0px;
  padding-bottom : 0px;
  padding-left: 0;
  padding-right: 10px;
	color:black;
}
.history-detailConts {
  background-color: #f9f9f9;
  margin: -20px;
  padding: 5px 20px 5px 20px;
}
.history-detailConts-carvin{
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
.history-detailConts li {
  display: flex;
  align-items:center;
}
.history-detailConts .itemCode {
  font-size: 1rem;
  font-weight: bold;
  color: #0D47A1;
  padding-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 155px;
  display: inline-block;
}
.history-detailConts .itemName{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.7rem;
  width: 145px;
  display: inline-block;
}
.history-detailConts .itemName i{
  font-size: 1.8em;
  color:#848180;
}
.qtReq-image{
  margin-left:-10px;
  margin-top: 10px;
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
.history-brand {
  flex:20%;
  max-width:20px;
  margin-right: 20px;
  margin-left: -25px;
}
.history-date {
  font-size: 1.2rem;
  font-weight: bold;
  flex:15%;
  padding-left: 5px;
}
.history-carInfo {
  flex:40%;
  margin-right: -15px;
}
.history-carNo {
  font-size: 1rem;
  font-weight: bold;
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
.history-carSeries {
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;  
  width: 225px;
  padding:0px;
  margin: 0px;
  position: absolute;
  top:24px;
}
.card-body-qtList{
  margin :0px 0px;
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 0px;
  border:#fff 1px solid;
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
.history-qtInfo-carNo {
  font-size: 1.1rem;
  font-weight: bold;
}
.history-qtInfo-dealer{
	font-size: 0.9rem;
	margin-left: 15px;
	margin-top: 5px;
}
.history-qtInfo-qtCount{
	margin-left: 15px;
	margin-top: 5px;
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
.qtInfo-detail-carNo{
  font-size: 1rem;
  font-weight: bold;
}
.qtInfo-detail-dealer{
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
.card-header-webpos .container {
  padding-top : 0px;
  padding-bottom : 0px;
  height:50px;
}
.history-detailConts-webpos{
	padding: 0px;
	display: flex;
}
.history-detailConts-webpos ul{
  width: 100%;
  margin: 0px;
  padding:0px;
}
.history-detailConts-webpos li{ 
  border-top:lightgrey 1px solid;
}
.history-detailConts-webpos li:nth-child(1){ 
  border-top:#fff 1px solid;
}
.history-detailConts-webpos span{
  font-size: 0.94em;
}
.webpos-item{
  margin-left: 10px;
  width: 140px;
}
.webpos-itemQty{
 width:30px;
 margin-left:2px;
}
.webpos-itemQty span{
 float:right;
}
.webpos-itemPrice{
  margin-left:10px;
  width: 50px;
}
.webpos-itemPrice span{
  float:right;
}
.webpos-amt{
  margin-left:10px;
  width: 50px;
}
.webpos-amt span{
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
.qtlist-footer{
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: flex;
  justify-content: flex-end;
}
.qtlist-footer .TotalInfo{
  margin-right: -1px;
}
.qtlist-footer .TotalInfo-Title{
    align-items: center;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    color: #5d4038;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.qtlist-footer .TotalInfo-Text{
    padding-left: 0.75rem;
    margin-bottom: 0;
    font-size: 1.1rem;
    font-weight: 400;
    color: #E50914;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.qtlist-footer .TotalInfo-Text2{
   float:right;
   color: #E50914;
   font-size: 1rem;
}
.card-header-default {
  background-color: #ADD8E6;
  padding-top : 0px;
  padding-bottom : 0px;
  padding-left: 0;
  padding-right: 10px;
	color: black;
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
  flex:46%;
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
.order-itemList {
  width: 99%;
  margin: auto;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #ddd;
  margin-bottom: 5px;
  padding: 3px 0px;
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
.showProcessing
{
  display: block; 
  text-align:center; 
  font-size: 1.2rem;
}
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>