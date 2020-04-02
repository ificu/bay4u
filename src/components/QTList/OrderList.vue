<template>
	<div>
		<v-app>
		<div class="orderlist-title">
			<span>주문내역</span>
			<CheckLogin></CheckLogin>
		</div>
		<div class="orderlist-search">
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
		<div class="reOrderbutton" @click="ResetOrderData">
			<!-- 재주문 요청-->
			<QTReOrder :orderData="selectedOrder" :orderCarInfo="carInfoData" :orderDealer="selectedDealer">
				<div slot="trigger"  slot-scope="slotProps">
					<v-btn color="#4E342E" dark depressed @click="slotProps.open">재주문하기</v-btn>
				</div>
				<div class="reorder-header" slot="header" slot-scope="slotProps">
					<v-toolbar flat color="#696565"> 
						<v-toolbar-title >
							
						</v-toolbar-title>                 
						<v-spacer></v-spacer>
						<v-toolbar-items>
							<h4>총 {{slotProps.dealerCount}}개 대리점에 <br> 주문요청을 보냅니다</h4> 
						</v-toolbar-items>
							<v-btn icon dark @click="slotProps.close">
								<v-icon>mdi-close</v-icon>
							</v-btn>
					</v-toolbar>
				</div>
			</QTReOrder>
		</div>
		<div class="orderlist-history">
			<b-card no-body class="mb-1" v-for="(item , idx) in orderHistory" v-bind:key="idx">
				<b-card-header header-tag="header" role="tab" header-class="card-header">
					<b-container>
						<b-row>
							<b-col align-self="center" class="history-date">{{SetReqDate(item.ReqDt)}}</b-col>
							<b-col class="history-carInfo">
								<b-row class="history-carNo">
									{{(item.CarNo === "*empty*")?"미상차량" : item.CarNo }}
								</b-row>
								<b-row class="history-dealer">
									{{item.ResDealerNm}}
								</b-row>
							</b-col>
							<b-col align-self="center" class="history-detailBtn">
								<b-button block href="#" v-b-toggle="'ROaccordion' + idx"  variant="secondary" size="sm" @click="GetOrderDetail(item)">
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
				<b-collapse :id="'ROaccordion'+idx" accordion="my-accordion" role="tabpanel" :visible="linkToggle(idx)">
					<b-card-body>
						<div v-if="orderdetail.isHistory" class="history-detailConts">
							<ul>
								<li v-for="(ordItem, dtlIdx) in orderdetail.ordLineItem[idx]" v-bind:key="dtlIdx">
									<b-form-checkbox-group class="pa-0" id="chkOrdGrp" v-model="selectedOrder">
										<b-form-checkbox :value="ordItem">
											<div class="orderItem">
												<div class="detailConts-title detailConts-itemCode">{{ordItem.itemCode}}</div>
												<div class="detailConts-title detailConts-itemName">{{ordItem.itemName}}</div>
												<div class="detailConts-title detailConts-itemQty">{{ordItem.itemQty}}개</div>
												<div class="detailConts-amount detailConts-itemAmt">{{ordItem.AMT | localeNum}}원</div>
											</div>
										</b-form-checkbox>
									</b-form-checkbox-group>
								</li>
							</ul>
						</div>
						<div v-else class="history-detailConts">
							<ul>
								<li v-for="(ordItem, dtlIdx) in orderdetail.ordLineItem" v-bind:key="dtlIdx">
									<div v-if="item.Flag ==='WEBPOS'" class="orderItem-webpos">
										<div class="webpos-title itemCode">{{ordItem.itemCode}}</div>
										<div class="webpos-title itemName">{{ordItem.itemName}}</div>
										<div class="itemQty">{{ordItem.itemQty}}개</div>
										<div class="webpos-amount itemAmt">{{ordItem.AMT | localeNum}}원</div>
									</div>
									<div v-else>
										<b-form-checkbox-group class="pa-0" id="chkOrdGrp" v-model="selectedOrder">
											<b-form-checkbox :value="ordItem" :id="'chk'+idx+'/'+dtlIdx" @change="AddOrdDealer('chk'+idx+'/'+dtlIdx ,item, ordItem)">
												<div class="orderItem">
													<div class="detailConts-title detailConts-itemCode">{{ordItem.itemCode}}</div>
													<div class="detailConts-title detailConts-itemName">{{ordItem.itemName}}</div>
													<div class="detailConts-itemQty">{{ordItem.itemQty}}개</div>
													<div class="detailConts-amount detailConts-itemAmt">{{ordItem.AMT | localeNum}}원</div>
												</div>
											</b-form-checkbox>
										</b-form-checkbox-group>
									</div>
								</li>
							</ul>
						</div>
					</b-card-body>
					<b-card-footer>
						<div  v-if="orderdetail.isHistory" class="orderlist-footer">
							<div class="detailConts-title detailConts-total">총 합계</div>
							<div class="detailConts-amount detailConts-total">{{SumOrdHisAmt(idx) | localeNum}}원</div>
						</div>
						<div  v-else class="orderlist-footer">
							<div class="detailConts-title detailConts-total">총 합계</div>
							<div class="detailConts-amount detailConts-total">{{SumOrderAmt | localeNum}}원</div>
						</div>
					</b-card-footer>
				</b-collapse>
			</b-card>
		</div>
		</v-app>
	</div>
</template>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
	import Constant from '@/Constant';
	import CheckLogin from '@/components/Common/CheckLogin.vue'
	import QTReOrder from '@/components/QTList/QTReOrder.vue'
	import {getInputDayWeek , convertDynamoToArrayString, arrayGroupBy, datePadding ,convertArrayToDynamo} from '@/utils/common.js'
	
	const axios = require('axios').default;
	
	export default {
		name: 'OrderList',
		data(){
			return{
				dropdownSO: '차량번호',
				ROList1Toggle:false,
				ordSearchText:'',
				sampletxtSO: '',
				selectedOrder :[],
				carInfoData : {
					CarN:'',
					VinNo: '',
					CarBrand:'',
					captureBlobImg:''
				},
				orderHistory:[],
				orderdetail:{ isHistory: false, ordLineItem :[]},
				isRouteOrdHis: false,
				selectedDealer:[],
			}
		},
		components: {
			CheckLogin,
			QTReOrder
		},
		create: function()
		{
			
		},
		mounted: function(){
			
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
				
				if(this.$route.params.CarInfoData !== undefined)
				{
					console.log('carInfoData :',this.$route.params.CarInfoData);
					this.carInfoData.CarNo = this.$route.params.CarInfoData.CarNo;
					this.carInfoData.VinNo = this.$route.params.CarInfoData.VinNo;
					this.carInfoData.CarBrand = this.$route.params.CarInfoData.CarBrand;
					this.carInfoData.captureBlobImg = this.$route.params.CarInfoData.captureBlobImg;
				}
	
				if(this.$route.params.Type !== undefined){
					if(this.$route.params.Type === 'order'){
						// 주문요청 완료 채팅에서 넘어왔을 경우
						this.GetOrderHistory(docID, RefID,'');
					}
					else if(this.$route.params.Type === 'orderHistory'){
						// 과거주문내역 조회로 넘어왔을 경우
						this.isRouteOrdHis = true;
						this.GetOrderHistory('', '',this.carInfoData.CarNo);
					}
					else{
						this.GetOrderHistory('','','');
					}  
				}
				else{
					this.GetOrderHistory('','','');
				}
			}
			else{
				this.GetOrderHistory('','','');
			}
		},
		computed: {
			UserInfo: {
				get() { return this.$store.getters.UserInfo },
				set(value) { this.$store.dispatch('UpdateUserInfo',value) }
			},

			SumOrderAmt: function()
			{
				let sum = 0;
				this.orderdetail.ordLineItem.forEach(function(item) {
						sum += (parseFloat(item.AMT));
				});
				return sum;
			}
		},
		methods:{

			GetOrderHistory(docId ,orderID, seachText)
			{
				this.selectedOrder = [];
				// 과거주문 내역 조회일 경우
				if(seachText !== ''){
					this.dropdownSO = '차량번호';
					this.ordSearchText = seachText;
				}

				var now = new Date();
				var beforeDate = new Date();
				beforeDate.setDate(beforeDate.getDate() -7);
				var startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
				var endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
				
				var filter = "ReqSite = :id";
				if(this.ordSearchText === ''){
					filter = "ReqSite = :id and ReqDt between :startDt and :endDt";
				}
				else{
					var searchCase = this.dropdownSO;
					switch (searchCase) {
						case '차량번호' :
							filter = "ReqSite = :id and (contains(CarNo, :carNo))";
							break;
						case '대리점' :
							filter = "ReqSite = :id and (contains(ResDealerNm, :resDealer))";
							break;
						case '날짜' :
							filter = "ReqSite = :id and (contains(ReqDt, :reqDt))";
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
				
				if(this.ordSearchText === ''){
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
							param.payload.ExpressionAttributeValues[key2] = (this.ordSearchText==="미상차량")?"*empty*":this.ordSearchText;
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
							return (a.ReqTm < b.ReqTm) ? 1 : -1;
						});
					}

					this.orderHistory  = result.data.Items;
					//console.log('userType : ' , this.UserInfo.UserType);

					// 과거주문 내역 조회에서 넘어온 경우에만 부품지원센터 내역 조회
					if((this.UserInfo.UserType === "SITE" || this.UserInfo.UserType === "SITEF") && seachText !== ''){
						this.GetWebposOrderList(docId ,orderID);
					}
					else{
						// 채팅에서 넘어 온 경우
						if(docId !== ''  && orderID !== ''){
							this.ShowOrderItem(docId , orderID);
						} 
					}
					
					/*
					if(seachText !== ''){
						// 과거 정비이력에서 넘어 온 경우
							this.ShowOrderHisItem(this.ordSearchText);
						// 초기화
						this.$router.replace({'params': undefined});
					}*/
				});     
			},
			GetOrderDetail(item)
			{ 
				if(this.isRouteOrdHis)
				{ 
					// 정비이력에서 넘어 온 경우 
					for(var i=0;i < this.orderHistory.length; i++)
					{
						let target = 'ROaccordion' + i;
						let accElement =  document.getElementById(target);
						accElement.setAttribute("style", "display:none;");
					}
					this.isRouteOrdHis = false;
				}
				this.ROList1Toggle = !this.ROList1Toggle;
				this.orderdetail.isHistory = false;
				if(item.Flag !== undefined && item.Flag === "WEBPOS"){
					this.orderdetail.ordLineItem = item.LineItem;
				}
				else{
					this.orderdetail.ordLineItem = JSON.parse(convertDynamoToArrayString(item.LineItem));
				}
			},
			GetWebposOrderList(docId ,orderID){
				var param = {};
				param.MethodName = "GetOrderList";
				param.BsnId = this.UserInfo.BsnID;
				if(this.dropdownSO === "차량번호" && this.ordSearchText !== ""){
					param.CarNo = this.ordSearchText;
				}
				if(this.dropdownSO === "날짜" && this.ordSearchText !== ""){
					param.RequestDataJSON = this.ordSearchText;
				}

        console.log("======= Webpos Order Request ========");
        console.log(param); 

        var rtnCode = "";
        var rtnCount = 0;

        axios({
            method: 'POST',
            url: Constant.SCPIF_URL + 'BackendService',
            headers: Constant.JSON_HEADER,
            data: param
        })
        .then((result) => {
					console.log("=======  Webpos Order Return ========");
					console.log(result.data);
					
					if(result.data.ReturnCode === 0){

						let rtnQTData = JSON.parse(result.data.ReturnDataJSON);
						let hedData = rtnQTData['ORD_HED'];
						let dtlData = rtnQTData['ORD_DTL'];
						
						if(hedData.length > 0){
							hedData.forEach(el => {
								let webposItem = {};
								webposItem.ResDealerNm = "부품지원센터";
								webposItem.ReqTm = el.DC_DY_BSN.replace(/[/]/gi, "") + "000000";
								webposItem.DocID = el.ID_TRN;
								webposItem.CarNo = el.CAR_NO;
								webposItem.ResDealer = "PARTS";
								webposItem.ReqSiteNm = el.NM_BSN_UN;
								webposItem.ReqDt = el.DC_DY_BSN;

								if(dtlData.length > 0){
									let list = dtlData.filter(x => x.ID_TRN === el.ID_TRN && x.RO_CD === el.RO_CD ) ;
									webposItem.LineItem = list;
								}
								else{
									webposItem.LineItem = [];
								}
								webposItem.ID = "";
								webposItem.ReqSite = el.ID_BSN_UN;
								webposItem.Flag = "WEBPOS";
								this.orderHistory.push(webposItem);
							});
						}
						if(Array.isArray(this.orderHistory))
						{
							this.orderHistory.sort(function(a, b){
								return (a.ReqTm < b.ReqTm) ? 1 : -1;
							});
						}

						// 채팅에서 넘어 온 경우
						if(docId !== ''  && orderID !== ''){
							this.ShowOrderItem(docId , orderID);
						} 
					}
        })
        .catch((error) => {
          console.log(error); 
        })
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
			SetReqDate(value)
			{
				var str = value + '';
				return str.substring(5,7) + '/'+str.substring(8,10) + '(' + getInputDayWeek(value) +')';
			},
			ShowOrderItem(docId , orderID )
			{
				// 채팅에서 넘어 온 경우
				if(Array.isArray(this.orderHistory)){
					let index =  this.orderHistory.findIndex(i => i.DocID === docId);
					this.orderToggleIndex = index;
					let item = this.orderHistory[index];
					this.GetOrderDetail(item);
				} 
			},
			ShowOrderHisItem(carNo)
			{
				// 과거 정비이력에서 넘어 온 경우
				if(Array.isArray(this.orderHistory)){

					this.$nextTick(function() {     
						this.orderdetail.isHistory = true;                        
						for(var i=0;i < this.orderHistory.length; i++)
						{
							let target = 'ROaccordion' + i;
							let accElement =  document.getElementById(target);
							accElement.setAttribute("style", "display:block;");

							let item = this.orderHistory[i];
							this.orderdetail.ordLineItem.push(JSON.parse(convertDynamoToArrayString(item.LineItem)));
							//this.GetOrderDetail(item);
						}
					}); 
				} 
			},
			SumOrdHisAmt(index)
			{
				let sum = 0;
				this.orderdetail.ordLineItem[index].forEach(function(item) {
						sum += (parseFloat(item.AMT));
				});
				return sum;
			},
			AddOrdDealer(target, dealer , ordItem){
				
				let el = document.getElementById(target);
				let index = this.selectedDealer.findIndex(x => x.ResDealer === dealer.ResDealer);
				
				if(el.checked === true){
					if(index === -1){
						let dealerItem = {};
						let lineItem = [];
						dealerItem.ResDealerNm = dealer.ResDealerNm;
						dealerItem.ResDealer = dealer.ResDealer;
						lineItem.push(ordItem);
						dealerItem.OrderItem = lineItem;
						this.selectedDealer.push(dealerItem);
					}
					else{
						this.selectedDealer[index].OrderItem.push(ordItem);
					}
				}
				else{
					if(index > -1){
						let ordIdx = this.selectedDealer[index].OrderItem.findIndex(y => y.itemCode === ordItem.itemCode);
						if(ordIdx > -1){
							this.selectedDealer[index].OrderItem.splice(ordIdx, 1);
						}
						if(this.selectedDealer[index].OrderItem.length === 0){
							this.selectedDealer.splice(index, 1);
						}
					}
				}
			},
			ResetOrderData()
			{
				for(var i=0;i < this.orderHistory.length; i++ ){
				
					let dtlList = JSON.parse(this.orderHistory[i].LineItem);
					for(var j=0;j < dtlList.length; j++){
						let el = document.getElementById('chk'+i+'/'+j);
						if(el.checked === null)return;
						if(el.checked === true){
							el.checked = false;
						}
					}
				} 

				this.selectedDealer = [];
			},
		}
	}
</script>
<style scoped>

.orderlist-title {
  /*margin:auto;
	*/
  width: 96%;
	margin: 0px 8px 10px;
  padding-top: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  display:flex;
}
.orderlist-title span{
  width: 100%;
}
.orderlist-search {
  /*margin:auto;*/
  width: 96%;
	margin: 0px 8px 4px; /*위 0px, 좌우 8px, 아래 10px*/
}
.orderlist-search .input-group .input-group-prepend .dropdown .btn {
  background-color: #696565;
}
.orderlist-search .input-group .input-group-append .btn {
  background-color: #acd3ce;
  border: none;
}
.reOrderbutton{
  text-align: right;
  margin-top: 5px;
  margin-right: 8px;
}
.orderlist-history {
  /*margin:auto;
		margin-bottom: 80px;
	*/
  width: 96%;
  padding-top: 5px;
  margin: 5px 8px 80px 8px /* 위 30px, 오른쪽 10px, 아래 20px, 왼쪽 50px */
}
.orderlist-history .list-group .list-group-item {
  padding: 5px;
  background-color: #e4e4e4;
}
.card-header {
  background-color: #fcf4df;
  padding-top : 0px;
  padding-bottom : 0px;
}
.card-header .container {
  padding-top : 0px;
  padding-bottom : 0px;
  height:50px;
}
.history-date {
  font-size: 1.2rem;
  font-weight: bold;
  flex:15%;
  padding-top: 0;
}
.history-carInfo {
  flex:40%;
  padding-top: 2px;
}
.history-carNo {
  font-size: 1rem;
  font-weight: bold;
}
.history-dealer {
  font-size: 0.7rem;
}
.history-detailBtn {
  flex:15%;
  text-align: right; 
  padding: 1px;
  width: 60px;
}

.history-detailConts {
  background-color: #f9f9f9;
	margin: -20px;
	padding: 5px 5px 5px 5px;
}
.history-detailConts ul {
  list-style-type: none;
  padding: 0px;
  display:flex;
  flex-direction: column;
}
.history-detailConts li
{ 
  padding: 6px 0px;
  border-top:lightgrey 1px solid;
}
.history-detailConts li:nth-child(1)
{ 
  border-top:#fff 1px solid;
}
.orderItem{
	display:flex;
  width: 320px;
}
.detailConts-title {
  flex: 50%;
  font-size: 0.9rem;
  font-weight: bold;
}
.detailConts-itemCode {
  color: #0D47A1;
}
.detailConts-itemName {
  margin-left: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detailConts-itemQty {
	flex: 10%;
  margin-left:2px;
  text-align: right;
  font-size: 0.9em;
}
.detailConts-amount {
  flex: 30%;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: right;
  color: #EA4335;
}
.detailConts-itemAmt
{
  color: #0D47A1;
  font-size: 0.9em;
}
.orderItem-webpos{
	display:flex;
  width: 100%px;
}
.orderItem-webpos .webpos-title {
  flex: 40%;
  font-size: 0.9rem;
  font-weight: bold;
}
.orderItem-webpos .webpos-amount {
  flex: 30%;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: right;
  color: #EA4335;
}
.orderItem-webpos .itemCode {
	color: #0D47A1;
	flex: 20%;
}
.orderItem-webpos .itemName {
	margin-left: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
	float: left;
}
.orderItem-webpos .itemQty {
	margin-left:2px;
  text-align: right;
  font-size: 0.9em;
}
.orderItem-webpos .itemAmt
{
  color: #0D47A1;
  font-size: 0.9em;
	flex: 15%;
}

.orderlist-footer{
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: flex;
  justify-content: flex-end;
}
.orderlist-footer .TotalInfo{
  margin-right: -1px;
}
.orderlist-footer .TotalInfo-Title{
	align-items: center;
	margin-bottom: 0;
	font-size: 1rem;
	font-weight: 400;
	color: #5d4038;
	text-align: center;
	white-space: nowrap;
	border-radius: 0.25rem;
}
.orderlist-footer .TotalInfo-Text{
	padding-left: 0.75rem;
	margin-bottom: 0;
	font-size: 1.1rem;
	font-weight: 400;
	color: #E50914;
	white-space: nowrap;
	border-radius: 0.25rem;
}
.orderlist-footer .TotalInfo-Text2{
	float:right;
	color: #E50914;
	font-size: 1rem;
}
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
.reorder-header .v-toolbar{
  border : solid 1px #BDBDBD;
  border-radius: 3px 3px 3px 3px;
}
.reorder-header h4{
  /*margin-right: 10px;*/
  color: #fcf4df;
  font-weight: bold;
}
</style>