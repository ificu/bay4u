<template lang="html">
	<div>
		<slot name="trigger" :open="open"></slot>
		<transition name="ReOrder">
			<div v-if="modalOpen" class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">
						<div class="modal-header">
								<h4>
								<slot name="header" :close="close" :dealerCount="dealerCount">
								<!--  -->
								</slot>
								</h4>
						</div>

						<div class="modal-body">
							<v-container  id="scroll-target" style="max-height:495px" class="overflow-y-auto pa-0">
								<div>
									<div class="body-subTitle" ><h6>주문요청 내역</h6></div>
									<div class="body-item" v-for="(item, index) in orderItems" v-bind:key="index">
										<div class="body-dealerTitle">{{item.ResDealerNm}}
											<span v-if="item.DealerType ==='A'" class="main-dealer" ><i class="fas fa-star"></i></span>
										</div>
										<div class="body-orderList">
											<div class="orderList-items" v-for="(orditem, index2) in item.OrderItem" v-bind:key="index2">
												<div class="orderList-item">
													<span class="order-itemCode">{{orditem.itemCode}}</span><br>
													<span class="order-itemName">{{orditem.itemName}}</span>
												</div>
												<input v-model="orditem.itemQty" type="number" pattern="\d*" placeholder="number" class="order-itemqty" @change="calculatorAMT(orditem)" @focus="$event.target.select()"/>	
												<span v-if="orditem.itemPrice === 0" class="order-itemPrice">0원</span>
												<span v-if="orditem.itemPrice !== 0" class="order-itemPrice">{{ orditem.itemPrice | localeNum}}원</span>
												<i class="orderList-itemDel fas fa-times-circle"  @click="removeItem(index , index2)"></i>
											</div>
											<div class="orderList-footer">
											<div class="TotalInfo">
												<span class="TotalInfo-Title">합계금액</span>
												<span class="TotalInfo-Text">{{SumOrdAmt(item.OrderItem) | localeNum}}원</span>
											</div>
										</div>
										</div>
									</div>
								</div>

								<!--<div class="body-subTitle">
									<h6>주문 요청 대리점</h6>
								</div>
								<div class="body-dealer">
								<div class="body-dealerTitle">대리점 리스트</div>
								<div class="body-dealerList">
									<v-list shaped dense>
                    <v-list-item-group v-model="selectedDealer" multiple>
                      <v-list-item v-for="(dealer, index) in dealerList" v-bind:key="index"
                        :value="dealer"
                        active-class="brown--text text--accent-4"
                      >
                      <template v-slot:default="{ active, toggle }">
                          <v-list-item-action  class="ml-n4 mt-1">
                            <v-checkbox
                              :input-value="active"
                              :true-value="dealer"
                              color="brown accent-4"
                              @click="toggle"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content class="ml-n5 pt-0 dealerList">
                            <v-list-item-title>
                              <span>{{dealer.DEALER_NAME}}</span>
                              <span v-if="dealer.TYPE ==='A'"><i class="fas fa-star"></i></span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
								</div>
								</div>
								<div class="body-subTitle">
								<h6>주문 요청 리스트</h6>
								</div>

								<div class="body-orderList">
									<div class="orderList-items" v-for="(item, index) in orderList" v-bind:key="index">
										<div class="orderList-item">
											<span class="order-itemCode">{{item.itemCode}}</span><br>
											<span class="order-itemName">{{item.itemName}}</span>
										</div>
										<input v-model="item.itemQty" type="number" pattern="\d*" placeholder="number" class="order-itemqty" @change="calculatorAMT(item)" @focus="$event.target.select()"/>	
										<span v-if="item.itemPrice === 0" class="order-itemPrice">0원</span>
										<span v-if="item.itemPrice !== 0" class="order-itemPrice">{{ item.itemPrice | localeNum}}원</span>
										<i class="orderList-itemDel fas fa-times-circle"  @click="removeItem(item)"></i>
									</div>
								</div>
								<div class="orderList-footer">
									<div class="TotalInfo">
										<span class="TotalInfo-Title">합계금액</span>
										<span class="TotalInfo-Text">{{orderTotal | localeNum}}원</span>
									</div>
								</div>-->
								</v-container>
						</div>

						<div class="modal-footer">
							<v-btn color="#EF9A9A" dark depressed @click="goQTRequest">견적요청</v-btn>
							<v-btn color="#4E342E" dark depressed @click="saveReQT">재주문하기</v-btn>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- 알림 메시지 팝업 -->
		<MessageBox v-if="showAlertMsg"  @close="showAlertMsg = false">
			<div slot="header"><h5 >알림</h5></div>
			<span slot="body" @click="showAlertMsg = false"><pre class="msgText">{{alertMsg}}</pre>
			</span>
			<div slot="footer">
				<v-btn depressed small color="#967d5f" dark @click="showAlertMsg = false"> 확인</v-btn>
			</div>
		</MessageBox>
		<!-- 프로세싱 메시지 -->
    <MessageBox v-if="showProcessing">
      <div slot="header"><h5 >처리 중...</h5></div>
      <span slot="body" class="showProcessing">
        <pre>{{processMsg}}</pre>
        <v-icon large color="orange darken-2">fas fa-sync-alt fa-spin</v-icon>
      </span>
    </MessageBox>
	</div>
</template>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import Constant from '@/Constant';
import MessageBox from '@/components/Common/MessageBox.vue'
import {datePadding, convertStringToDynamo, convertArrayToDynamo, dataURItoBlob , sleep} from '@/utils/common.js'

const axios = require('axios').default;

export default {
  name: 'ReOrder',
  directives: {
    focus: {
    // directive definition
      inserted: function(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
			initialFocus: null,
      modalOpen: false,
      scrollY: window.scrollY,
			storedY: null,
			selectedDealer: [],     // 선택한 주문요청 대리점 리스트
			dealerList: [],         // 주문요청 대리점 리스트
			orderList:[],						// 주문요청 부품 리스트
			qtList:[],							// 견적요청 리스트
			orderItems:[],
			reOrderCarNo: '',
			reOrderVinNo: '',
			reOrderBrand: '',
			reOrderMemo: '',
			reOrderCaptureBlobImg: '',
			qtInfoData: {},
			sendDocId: '',
      sendDealer: '',
      senddealerNm: '',
			sendqtInfoData: {},
			sendOrdData:[],
			saveCount: 0,
			showAlertMsg: false,
			alertMsg: '',
			showProcessing: false,
      processMsg: '',
    };
	},
	props:['orderData', 'orderCarInfo', 'orderDealer'],
	components: {
    MessageBox: MessageBox,
  }, 
  mounted() {
		window.addEventListener('scroll', this.getWindowOffset);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.getWindowOffset);
  },
  methods: {
    open(event) {
      //console.log('evnet :' , event);
      this.initialFocus = event.target;
      this.modalOpen = true;
			this.fixBody();

			this.orderList = this.orderData;
			//this.orderItems = this.orderDealer;
			this.SetDealer(this.orderDealer);

			this.reOrderCarNo = this.orderCarInfo.CarNo;
			this.reOrderVinNo = this.orderCarInfo.VinNo;
			this.reOrderBrand = this.orderCarInfo.CarBrand;
			this.reOrderMemo = this.orderCarInfo.Memo;
			this.reOrderCaptureBlobImg = this.orderCarInfo.captureBlobImg;
			//console.log('orderList : ', this.orderList);
			/*console.log('orderItems :', this.orderItems);
			console.log('reOrderCarNo : ', this.reOrderCarNo);
			console.log('reOrderVinNo : ', this.reOrderVinNo);
			console.log('reOrderBrand : ', this.reOrderBrand);
			console.log('reOrderCaptureBlobImg : ', this.reOrderCaptureBlobImg);*/
			/*this.qtList = [];
			this.orderList.forEach(item => {
				let qtItem = {};
				qtItem.ITM_ICON = " ";
				qtItem.ITM_QTY = item.itemQty;
				qtItem.GRP_ID = " ";
				qtItem.ITM_NM = item.itemName;
				qtItem.SORT = item.seq;
				qtItem.ITM_VAL = item.itemName + item.seq;
				qtItem.GRP_NM = " ";
				qtItem.SEQ = item.seq;
				this.qtList.push(qtItem);
			});*/

			//this.getDealerList();
    },
    close() {
      this.modalOpen = false;
      this.freeBody();
      this.initialFocus.focus();
    },
    fixBody() {
      this.storedY = this.scrollY;
      document.documentElement.setAttribute(
        'style',
        `position: fixed; top: ${-1 *
          this.scrollY}px; height: 100%; width: 100%`
      );
    },
    freeBody() {
      document.documentElement.setAttribute('style', `position: relative;`);
      //console.log(this.storedY);
      window.scroll(0, this.storedY);
    },
    checkKeyEvent(event) {
			// close modal and return early if escape
			//console.log('event.key :', event.key);
      if (event.key === 'Escape') {
        this.modalOpen = false;
        return;
      }
      const focusableList = this.$refs.modalContainer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      // escape early if only 1 or no elements to focus
      if (focusableList.length < 2 && event.key === 'Tab') {
        event.preventDefault();
        return;
      }
      const last = focusableList.length - 1;
      if (
        event.key === 'Tab' &&
        event.shiftKey === false &&
        event.target === focusableList[last]
      ) {
        event.preventDefault();
        focusableList[0].focus();
      } else if (
        event.key === 'Tab' &&
        event.shiftKey === true &&
        event.target === focusableList[0]
      ) {
        event.preventDefault();
        focusableList[last].focus();
      }
    },
    getWindowOffset() {
      this.scrollY = window.scrollY;
		},
		SetDealer(data){
			if(data.length === 0 )return;

			var param = {};
			param.operation = "list";
			param.tableName = "BAY4U_CARCENTER_DEALER";
			param.payload = {};
			param.payload.ExpressionAttributeValues = {};
			
			let filter = "";

			if(data.length === 1){
				filter = filter + "CARCENTER = :center and  DEALER = :dealer";
				param.payload.ExpressionAttributeValues[":dealer"] = data[0].ResDealer;
			}
			else{
				let idx = 1;
				for(let item of data)
				{ 
					if(idx === 1){
						filter = filter + "CARCENTER = :center and ( DEALER = :dealer"+idx;
					}
					else{
						filter = filter + " OR DEALER = :dealer"+idx + ")";
					}
					param.payload.ExpressionAttributeValues[":dealer"+idx] = item.ResDealer;
					idx++;
				}
			}
      
			param.payload.FilterExpression = filter;
			param.payload.ExpressionAttributeValues[":center"] = this.UserInfo.BsnID;
			
			console.log("======= dealerList request ========");
			console.log(param);
			
			axios({
				method: 'POST',
				url: Constant.LAMBDA_URL,
				headers: Constant.JSON_HEADER,
				data: param
			})
			.then((result) => {
				console.log("======= dealerList result ========");
				console.log(result.data);
				if(result.data.Items.length > 0){
					for(var i=0; i < data.length; i++){
						let dealerCode = data[i].ResDealer;
						let dealerIdx = result.data.Items.findIndex(x => x.DEALER === dealerCode);
						if(dealerIdx > -1){
							data[i].ResDealerNm = result.data.Items[dealerIdx].DEALER_NAME;
							data[i].DealerType = result.data.Items[dealerIdx].TYPE;
						}
					}
				}

				if(Array.isArray(data))
				{
					data.sort(function(a, b){
					return (a.DealerType > b.DealerType) ? 1 : -1;
					});
				}
				this.orderItems = data;
				//this.orderDealer = [];
				//console.log('orderItems :', this.orderItems);
			});
		},
		getDealerList() {
	
			this.dealerList = [];
		
			var param = {};
			param.operation = "list";
			param.tableName = "BAY4U_CARCENTER_DEALER";
			param.payload = {};
			param.payload.FilterExpression = "CARCENTER = :id and DEALER <> :dealer";
			param.payload.ExpressionAttributeValues = {};
			var key = ":id";
			var key2 = ":dealer";
			param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;
			param.payload.ExpressionAttributeValues[key2] = "PARTS";

			//console.log("======= dealerList request ========");
			//console.log(param);
			
			axios({
				method: 'POST',
				url: Constant.LAMBDA_URL,
				headers: Constant.JSON_HEADER,
				data: param
			})
			.then((result) => {
				//console.log("======= dealerList result ========");
				//console.log(result.data);
				if(Array.isArray(result.data.Items))
				{
					result.data.Items.sort(function(a, b){
					return (a.TYPE > b.TYPE) ? 1 : -1;
					});
				}

				this.dealerList = result.data.Items;

				let mainDealer = this.dealerList.find(element => element.TYPE === 'A')
				if(mainDealer !== undefined){
					this.selectedDealer = [mainDealer];
				}
				
			});
		},
		calculatorAMT(item){
      item.AMT = item.itemPrice * item.itemQty;
		},
		closeMsg() {     
      this.showAlertMsg = false;
    },
		saveReQT(){
			
			/*if(this.selectedDealer.length === 0){
				this.showAlertMsg = true;
				this.alertMsg = "주문 할 대리점을 선택 해 주세요.";
				return;
			}*/

			if(this.orderItems.length === 0){
				this.showAlertMsg = true;
				this.alertMsg = "주문요청 리스트가 없습니다.\n주문 부품을 선택 해 주세요.";
				return;
			}

			let index = this.orderItems.findIndex(i => i.DealerType === 'A');
			if(index === -1){
				// 선택 된 대리점 중 대표대리점이 없으면 첫번째 대리점을 대표로 설정
				//this.selectedDealer[0].TYPE = 'A'
				this.orderItems[0].DealerType  = 'A';
			}

			if(this.reOrderCarNo === '' || this.reOrderCarNo === undefined){
				this.reOrderCarNo = "*empty*";
			}
			
			if(this.reOrderVinNo === '' || this.reOrderVinNo === undefined){
				this.reOrderVinNo = "99999999999999999";
			}
			
			if(this.reOrderBrand === '' || this.reOrderBrand === undefined){
				this.reOrderBrand = "차종 선택";
			}

			if(this.reOrderMemo === '' || this.reOrderMemo === undefined){
				this.reOrderMemo = "*empty*";
			}

			let now = new Date();
			let reqSeq = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
									+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
			let docId = '';
			let imgKey = '';

			if(this.showProcessing === false)
			{ 
				this.processMsg = "재주문 중입니다. \n잠시만 기다려주세요.";
				this.showProcessing = true;
			}
			
			this.orderItems.forEach(dealer => {
				this.saveCount++;
	
				now = new Date();
				reqSeq = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
									+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
				docId = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)  + this.reOrderVinNo + 
											datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2) + this.saveCount;
				imgKey = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                  + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2) + this.saveCount;

				// 신규견적 생성
				let param = {};
				param.operation = "create";
				param.tableName = "BAY4U_QT_LIST";
				param.payload = {};
				param.payload.Item = {};
				param.payload.Item.ID = docId;
				param.payload.Item.CarNo = this.reOrderCarNo;
				param.payload.Item.CarVin = this.reOrderVinNo;
				param.payload.Item.CarBrand = this.reOrderBrand;
				param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
				param.payload.Item.ReqSite = this.UserInfo.BsnID;
				param.payload.Item.ReqSiteType = this.UserInfo.UserType;
				param.payload.Item.ReqName = this.UserInfo.Name;
				param.payload.Item.ReqSeq = reqSeq;
				param.payload.Item.ResDealer = dealer.ResDealer;
				param.payload.Item.ResDealerNm = dealer.ResDealerNm;
				param.payload.Item.Memo = this.reOrderMemo;

				if(dealer.ResDealer === "PARTS"){
					param.payload.Item.QTSts = "주문요청";
					param.payload.Item.Flag = 'ORDER';
				}
				else{
					param.payload.Item.QTSts = "바로주문";
				}

				if(this.reOrderCaptureBlobImg !== '')
					param.payload.Item.IMG = imgKey + ".png";
				else
					param.payload.Item.IMG = "*empty*";
				
				this.qtList = [];
				dealer.OrderItem.forEach(el => {
					let qtItem = {};
					qtItem.ITM_ICON = " ";
					qtItem.ITM_QTY = el.itemQty;
					qtItem.GRP_ID = " ";
					qtItem.ITM_NM = el.itemName;
					qtItem.SORT = el.seq;
					qtItem.ITM_VAL = el.itemName + el.seq;
					qtItem.GRP_NM = " ";
					qtItem.SEQ = el.seq;
					this.qtList.push(qtItem);
				});

				param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.qtList));

				this.qtInfoData = param.payload.Item;
				if(dealer.DealerType === 'A')
				{
					this.sendDocId =  docId;
					this.sendDealer = dealer.ResDealer;
					this.sendDealerNm = dealer.ResDealerNm;
					this.sendqtInfoData = this.qtInfoData;
					this.sendOrdData = dealer;
				}
				console.log("======= QT Save Request ========");
				console.log(JSON.stringify(param));

				axios({
					method: 'POST',
					url: Constant.LAMBDA_URL,
					headers: Constant.JSON_HEADER,
					data: param
				})
				.then((result) => {
					console.log("======= QT Save result ========");
					console.log(result.data);

					// 견적회신 저장
					//this.saveReQTConfirm(docId , dealer);
				
					var chatDocId = param.payload.Item.ID;
					var paramData = param.payload.Item;
					
					if(dealer.ResDealer === "PARTS"){
						// 부품지원센터이면 주문Data 생성
						this.SaveOrder(paramData , dealer);
					}
					else{
						this.saveChating(chatDocId , dealer, ' ', paramData);
					}
					
					if(this.reOrderCaptureBlobImg !== '') {
						param = {};
						param.name = imgKey + ".png";
						param.type = "image/png";

						axios({
								method: 'POST',
								url: Constant.IMGUPLOAD_URL,
								headers: Constant.IMGUPLOAD_HEADER,
								data: param
						})
						.then((result) => {
							console.log("======= IMG Save result ========");
							console.log(result.data);

							param = this.reOrderCaptureBlobImg;

							axios({
									method: 'PUT',
									url: result.data.uploadURL,
									data: param
							})
							.then((result) => {
								console.log("======= IMG Upload result ========");
								console.log(result);
							})
							.catch((error) => {
								console.log(error);
								this.saveCount = 0;
							}); 

						})
						.catch((error) => {
							console.log(error);
							this.saveCount = 0;
						}); 
					}
				})
				.catch((error) => {
					console.log(error);
					this.showProcessing = false;
					this.alertMsg = "견적 저장 중 에러가 발생했습니다.\n다시 요청해 주세요.";
					this.showAlertMsg = !this.showAlertMsg;
					this.showAlerMsgBtn = true;
				});
			});
		},
		/*saveReQTConfirm(docId , dealer){

      let now = new Date();
      let id =  dealer.DEALER + this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)
      + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      let ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                        + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      let param = {};
      param.operation = "create";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = docId;
      param.payload.Item.CarNo = this.reOrderCarNo;
      param.payload.Item.ResDealer = dealer.DEALER;
      param.payload.Item.ReqSite = this.UserInfo.BsnID;
      param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.orderList));
      param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      param.payload.Item.ReqTm = ReqTm;
      param.payload.Item.ResDealerNm = dealer.DEALER_NAME;
              
      console.log("======= QT Return request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= QT Return result ========");
				console.log(result.data);
				
				// 주문요청 저장
				this.saveReOrder(docId, dealer)

      })
      .catch((error) => {
				console.log(error);
				this.showProcessing = false;
				this.saveCount = 0;
      });
    },
		saveReOrder(docId, dealer)
    {
			let now = new Date();
      let ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                            + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      let param = {};
      param.operation = "list";
      param.tableName = "BAY4U_ORDER_LIST";
      param.payload = {};
      param.payload.FilterExpression ="ReqSite = :site and DocID = :id";
			param.payload.ExpressionAttributeValues = {};
			
      let key = ":site";
      let key2 = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;
      param.payload.ExpressionAttributeValues[key2] = docId;
     
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
					// 주문내역이 있으면 Update
          let ordId = result.data.Items[0].ID;
 
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

						this.saveChating(docId , dealer, ordId);
						
          })
          .catch((error) => {
						console.log(error);
						this.showProcessing = false;
						this.saveCount = 0;
          });
        }
        else{
          // 신규주문 
          let id =  this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
          
          param.operation = "create";
          param.tableName = "BAY4U_ORDER_LIST";
          param.payload = {};
          param.payload.Item = {};
          param.payload.Item.ID = id;
          param.payload.Item.DocID = docId;  //docId
          param.payload.Item.CarNo = this.reOrderCarNo;
          param.payload.Item.ReqSite =  this.UserInfo.BsnID;
          param.payload.Item.ReqSiteNm = this.UserInfo.Name;
          param.payload.Item.ResDealer = dealer.DEALER;
          param.payload.Item.ResDealerNm = dealer.DEALER_NAME;
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
						
						this.saveChating(docId , dealer , id);

          })
          .catch((error) => {
						console.log(error);
						this.showProcessing = false;
						this.saveCount = 0;
          });
        }
      });  
		},*/
		saveChating(docId , dealer ,val, paramData)
    {
			let saveSeq = docId.substring(docId.length - 1);
			let msg =  ((this.reOrderCarNo === "*empty*") ? "미상차량" : this.reOrderCarNo) + " 차량 부품 바로주문 요청 완료!!";
			if(dealer.ResDealer === "PARTS"){
				msg =  ((this.reOrderCarNo === "*empty*") ? "미상차량" : this.reOrderCarNo) + " 차량 부품 바로주문 완료!!";
			}

      let now = new Date();
      let chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      let chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : dealer.ResDealer};
      chatMsg.msg  = msg;
      chatMsg.reqTm = chatTime;
        
      let param = {};
      let id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2)+saveSeq;
      let key = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2)+saveSeq;

      param.operation = "create";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = docId;
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo =  dealer.ResDealer;
      param.payload.Item.Message = chatMsg.msg;
      //param.payload.Item.Status = "0";
      param.payload.Item.ReadYn = "0";
      param.payload.Item.ReqTm = chatMsg.reqTm;
      param.payload.Item.ChatType = "O";
			param.payload.Item.RefID = val;
			
			var adminYn = localStorage.getItem('AdminYn');
      var adminName = localStorage.getItem('AdminName');
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
        
        /*let qtInfoPram = {};
        qtInfoPram.ResDealer =  dealer.DEALER;
        qtInfoPram.QTSts = '주문요청';
				*/
				var sendNm = this.UserInfo.Name
        if(adminYn === "Y"){
          sendNm = adminName;
				}
				
        this.$sendMessage({
          name: this.UserInfo.BsnID,
          msg,
          recv:   dealer.ResDealer,
          chatId: id,
          docId: docId,
          reqTm : chatMsg.reqTm,
          qtInfo : paramData,
          chatType : "O",
					refId: val,
					sendId: this.UserInfo.UserID,
					sendName: sendNm,
					sendFlag: "CARCENTER"
				});
				
				if( this.orderItems.length === this.saveCount )
				{
					this.showProcessing = false;
					this.close();

					this.$router.push({name:'Chat', 
							params:{
										chatid: docId, 
										carNo:  this.reOrderCarNo,
										chatFrom: this.UserInfo.BsnID,
										chatTo: this.sendDealer,
										chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2),
										qtInfo : this.sendOrdData,
										chatDealerNm : this.sendDealerNm,
										chatType:'order',
								}});
				}
				id = '';
      })
      .catch((error) => {
				console.log(error);
				this.showProcessing = false;
				this.saveCount = 0;
      });
		},
		SaveOrder(saveData, dealer){

			// 신규주문 
			var now = new Date();
			var ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
															+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

			var id =  this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
						+ datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
			
			var param = {};
			param.operation = "create";
			param.tableName = "BAY4U_ORDER_LIST";
			param.payload = {};
			param.payload.Item = {};
			param.payload.Item.ID = id;
			param.payload.Item.DocID = saveData.ID
			param.payload.Item.CarNo = saveData.CarNo;
			param.payload.Item.ReqSite =  this.UserInfo.BsnID;
			param.payload.Item.ReqSiteNm = this.UserInfo.Name;
			param.payload.Item.ResDealer = saveData.ResDealer;
			param.payload.Item.ResDealerNm = saveData.ResDealerNm;
			param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(dealer.OrderItem)); 
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

				this.saveChating(saveData.ID , dealer, id, saveData);
			})
			.catch((error) => {
				console.log(error);
			});
		},
		goQTRequest()
		{ 
			
			if(this.orderItems.length === 0){
				this.showAlertMsg = true;
				this.alertMsg = "견적요청 부품이 없습니다.\n견적 부품을 선택 해 주세요.";
				return;
			}

			if(this.reOrderCarNo === '' || this.reOrderCarNo === undefined){
				this.reOrderCarNo = "";
			}
			
			if(this.reOrderVinNo === '' || this.reOrderVinNo === undefined){
				this.reOrderVinNo = "99999999999999999";
			}
			
			if(this.reOrderBrand === '' || this.reOrderBrand === undefined){
				this.reOrderBrand = "차종 선택";
			}

			this.qtList = [];
			this.orderItems.forEach(item => {
				var count = 1;
				item.OrderItem.forEach(el => {
					let qtItem = {};
					qtItem.ITM_ICON = " ";
					qtItem.ITM_QTY = el.itemQty;
					qtItem.GRP_ID = " ";
					qtItem.ITM_NM = el.itemName;
					qtItem.SORT = count;
					qtItem.ITM_VAL = el.itemName + count;
					qtItem.GRP_NM = " ";
					qtItem.SEQ = count;
					this.qtList.push(qtItem);
					count++;
				});
			});

			this.close();

			let newQtData = {};
			newQtData.CarNo = this.reOrderCarNo;
			newQtData.VinNo = this.reOrderVinNo;
			newQtData.CarBrand = this.reOrderBrand;
			newQtData.LineItem = this.qtList;

			// 신규 견적요청 이동
			this.$router.push({ name:'NewQT',
													params:{
																NewQTData: newQtData,
													}
			});
		},
		SumOrdAmt(data){
			let sum = 0;
			data.forEach(function(item) {
				sum += (parseFloat(item.AMT));
			});
			return sum;
		},
		removeItem(index , ordIndex) {
			//this.orderList = this.orderList.filter(it => it.itemCode != item.itemCode);
			this.orderItems[index].OrderItem.splice(ordIndex, 1);
			if(this.orderItems[index].OrderItem.length === 0){
				this.orderItems.splice(index, 1);
			}
    },
	},
	computed:{
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
		},
		
		orderTotal: function() {
        let sum = 0;
        this.orderList.forEach(function(item) {
          sum += (parseFloat(item.AMT));
        });
        return sum;
		},
		dealerCount: function() {
			let dealerCount = 0;
			//dealerCount = this.selectedDealer.length;
			dealerCount = this.orderItems.length;
			return dealerCount;
    },
  },
};
</script>

<style lang="css" scoped>
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
		display: table;
		transition: opacity .3s ease;
	}
	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}
	.modal-container {
		width: 90%;
		margin: 0px auto;
		background-color: transparent;
		border-radius: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
		transition: all .3s ease;
		font-family: Helvetica, Arial, sans-serif;
	}
	.modal-header {
		background-color: #696565;
		border: none;
		text-align: center;
		display: flex;
		height: 80px;
		position:relative;
	}
	.modal-body {
		background-color: #fff;
		font-family: 'Noto Sans KR', sans-serif;
	}
	.modal-footer {
		background-color: #fff;
		font-size: 0.9rem;
		font-weight: bold;
		height: 55px;
	}
	.modal-enter {
		opacity: 0;
	}
	.modal-leave-active {
		opacity: 0;
	}
	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	}
	.body-subTitle {
		margin-top: 0px;
		text-align: left;
	}
	.body-subTitle input {
		margin-left: 20px;
	}
	.body-subTitle h6 {
		font-weight: bold;
	}
	.modal-body .custom-control {
		margin-left: 15px;
		font-size: 0.9rem;
	}
	.body-dealerTitle {
		width: 98%;
		background-color: #eee;
		/*margin: auto;
		border-style: solid;
		border-width: thin;
		border-color: #ddd;*/
		padding: 5px 10px;
		font-size: 0.9rem;
		font-weight: bold;
		text-align: left;
	}
	.body-dealerList {
		width: 98%;
		margin: auto;
		border-style: solid;
		border-width: thin;
		border-color: #ddd;
		/*padding: 5px 10px;*/
		font-size: 0.9rem;
		text-align: left;
		border-top-style: none;
	}
	.body-item{
		border-style: solid;
		/*border-width: thin;*/
		border-width:2px;
		border-color: #ddd;
		border-radius: 5px;
		margin-top: 5px;
		margin-bottom: 5px;
		background-color:#EFEBE9;
	}
	.dealerList span:nth-child(1){
  font-size: 1.1em;
	}
	.dealerList span:nth-child(2){
		color:#FFBB00;
		margin-right: 5px;
		float:right;
		text-align: end;
	}
	.main-dealer{
		color:#FFBB00;
		margin-left: 6px;
	}
	.body-orderList{
		background-color: #fff;
	}
	.orderList-items {
		width: 98%;
		margin: auto;
		border-top-style:dotted;
		border-top-width: thin;
		border-top-color: #ddd;
		/*border-style: solid;
		border-radius: 5px;
		border-color: #ddd;*/
		font-size: 0.9rem;
		margin-bottom: 5px;
		padding: 3px 2px;
		display: flex;
	}
	.orderList-items:first-child{
		border-top:0px;
	}
	.orderList-item
	{
		font-weight: bold;
		text-align: left;
		flex:60%;
	}
	.order-itemCode {
		font-size: 0.9em;
		font-weight: bold;
		margin-left: 5px;
		line-height: 15px;
	}
	.order-itemName {
		font-size: 0.8em;
		margin-left: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 170px;
		display: inline-block;
		line-height: 15px;
		color: #616161;
	}
	.order-itemqty{
		width:30px;
		height: 30px;
		font-size: 0.8em;
		border:gray 1px solid;
		text-align: right;
		align-self: center;
		padding-right: 5px;
	}
	.order-itemPrice{
		margin-right: 5px;
		margin-left: 5px;
		font-size: 0.9em;
		font-weight: bold;
		text-align: right;
		align-self: center;
		flex: auto;
	}
	.orderList-itemDel {
		margin-left: auto;
		margin-right: 5px;
		text-align: right;
		flex: auto;
		align-self: center;
	}
	.orderList-footer{
		font-size: 1.25rem;
		line-height: 1.5;
		/*border-radius: 0.3rem;*/
		padding-bottom: 2px;
		border-top-style: solid;
		border-top-width: thin;
		border-top-color: #ddd;
		display: flex;
		justify-content: flex-end;
	}
	.orderList-footer .TotalInfo{
    margin-right: 5px; 
	}
	.orderList-footer .TotalInfo-Title{
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    color: #5d4038;
    margin-right:10px;
	}
	.orderList-footer .TotalInfo-Text{
    padding-left: 0.75rem;
    margin-bottom: 0;
    font-size: 1.1rem;
    font-weight: 400;
    color: #E50914;
	}
	.msgText{
		font-size: 1em;
	}
</style>
