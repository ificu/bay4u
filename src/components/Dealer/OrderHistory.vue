<template>
	<div class="order-body">	
		<div class="carSeries" v-if="carSeries !== undefined">
			<i class="fas fa-car"></i>&nbsp;{{carSeries}}
		</div>
		<div class="carVin">
			차대번호 : {{carVin}}
		</div>
		<div class="order-list">
			<table>
			<thead>
				<tr>
					<th class="ord-reqdt">주문일자<span class="arrow"></span></th>
					<th class="ord-reqdt">카센터<span class="arrow"></span></th>
					<th class="ord-itemname">부품명<span class="arrow"></span></th>
					<th class="ord-itemcode">부품코드<span class="arrow"></span></th>
					<th class="ord-itemqty">수량<span class="arrow"></span></th>
					<th class="ord-itemprice">단가<span class="arrow"></span></th>
					<th class="ord-itemamt">금액<span class="arrow"></span></th>
					<th class="ord-delv">배송<span class="arrow"></span></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(ordHed,index1) in orderList" :key="index1">
					<td class="ord-reqdt">{{ordHed.ReqDt}}</td>
					<td class="ord-reqdt">{{ordHed.ReqSiteNm}}</td>
					<td colspan="6" class="td-detail" style="bakcground-color:gray">
						<tr class="tr-detail" v-for="(ordDtl, index2) in JSON.parse(ordHed.LineItem)" :key="index2">
							<td class="ord-itemname">{{ordDtl.itemName.replace(/[*]empty[*]/gi, " ")}}</td>
							<td class="ord-itemcode">{{ordDtl.itemCode}}</td>
							<td class="ord-itemqty">{{ordDtl.itemQty|localeNum}}</td>
							<td class="ord-itemprice">{{ordDtl.itemPrice|localeNum}}</td>
							<td class="ord-itemamt">{{ordDtl.AMT|localeNum}}</td>
							<td class="ord-delv">{{ordDtl.delv}}</td>
						</tr>
					</td>
				</tr>
			</tbody>
			</table>
		</div>
	</div>
</template>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import Constant from '@/Constant';
import {datePadding} from '@/utils/common.js'

export default {
	name :'OrderHistory',
	data() {
		return {
			carSeries :'',
			carVin:'',
			headers: [
          { text: '주문일자', value: 'ReqDt',},
          { text: '부품명', value: 'NM_ITM',},
          { text: '부품코드', value: 'CONFIRM_ITM' },
          { text: '수량', value: 'ORDER_QTY', style:'small' },
          { text: '단가', value: 'SAL_PRICE' },
          { text: '금액', value: 'AMT' },
          { text: '배송구분', value: 'DELV_DAY', style:'small' },
				],
			orderList:[]
		}
	},
	props:['OrderData', 'SERIES' , 'VINNO'],
	created(){
		this.$EventBus.$on('OrderHistory.SetOrderInfo', data => {
			//console.log('Event');
			this.SetOrderInfo(data);
		});	
	},
	methods:{
		SetOrderInfo(data)
		{
			this.orderList = data.OrderData;
			this.carSeries = data.SERIES;
			this.carVin = data.VINNO;
		}
	},
	mounted() {
		console.log('OrderData mounted' , this.OrderData);
		console.log('SERIES mounted', this.SERIES);
		console.log('VINNO mounted', this.VINNO);
		this.orderList = this.OrderData;
		this.carSeries = this.SERIES;
		this.carVin = this.VINNO;
	},
	updated() {
		/*console.log('OrderData update' , this.OrderData);
		console.log('SERIES update', this.SERIES);
		console.log('VINNO update', this.VINNO);
		this.orderList = this.OrderData;
		this.carSeries = this.SERIES;
		this.carVin = this.VINNO;*/
	},
	beforeDestroy(){
		this.$EventBus.$off('OrderHistory.SetOrderInfo');
	}
}
</script>

<style scoped>
/*.order-body{
	background-color: pink;
}*/
.carSeries{
	margin-left: 5px;
	color:#000;
	font-size: 0.9rem;
	font-weight: bold;
}
.carVin{
	margin-left: 10px;
	margin-top: 5px;
	color:#0D47A1;
}
.order-list{
	margin-top: 10px;
	margin-left: 5px;
}
table {
  border: 2px solid #6D4C41;
  border-radius: 3px;
  background-color: #fff;
	width: 100%;
}

th {
  background-color: #6D4C41;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
	text-align: center;
}
th td{
	padding: 0px 5px;
}
td {
  background-color: #f9f9f9;
	font-size: 0.85em;
	color: black;
	/*border: 1px solid #8D6E63;*/
}

th{
  /*min-width: 120px;*/
  padding: 8px 10px;
	border: 1px solid #8D6E63;
}
.ord-reqdt{
	width: 75px;
	border: 1px solid #8D6E63;
	padding:0px 5px;
}
.td-detail{
	border: 1px solid #8D6E63;
	padding: 0px 3px;
}
 .ord-itemname{
	width: 160px;
}
td .ord-itemname{
	border-bottom: 0px;
	width:170px;
}
.ord-itemcode{
	width: 100px;
}
td .ord-itemcode{
	width:100px;
	padding-left: 10px;
}
.ord-itemqty{
	width: 60px;
}
td .ord-itemqty{
	width:50px;
	text-align: right;
}
.ord-itemprice{
	width:80px;
}
td .ord-itemprice{
	width:80px;
	text-align: right;
}
.ord-itemamt{
	width: 80px;
}
td .ord-itemamt{
	width: 80px;
	text-align: right;
}
.ord-delv{
	width: 50px;
}
td .ord-delv{
	width:50px;
	padding-left: 10px;
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}
</style>