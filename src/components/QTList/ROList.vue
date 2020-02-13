<template>
	<div>
		<div class="rolist-title">
			<span>고객 정비히스토리</span>
			<CheckLogin></CheckLogin>
		</div>
		<div class="rolist-search">
			<b-input-group>
				<b-dropdown slot="prepend" v-bind:text="dropdownRO">
					<b-dropdown-item @click="dropdownRO='대리점'">대리점</b-dropdown-item>
					<b-dropdown-item @click="dropdownRO='차량번호'">차량번호</b-dropdown-item>
					<b-dropdown-item @click="dropdownRO='날짜'">날짜</b-dropdown-item>
				</b-dropdown>
				<b-form-input></b-form-input>
				<b-input-group-append>
					<b-button><i class="fas fa-search"></i></b-button>
				</b-input-group-append>
			</b-input-group>
		</div>
		<div class="rolist-history">
			<b-card no-body class="mb-1">
				<b-card-header header-tag="header" role="tab" header-class="card-header">
					<b-container>
						<b-row>
							<b-col align-self="center" class="history-ro-date">8/7(수)</b-col>
							<b-col class="history-ro-car">
								<b-row class="history-carNo">
									43마4297
								</b-row>
								<b-row  class="history-series">
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
								<!--<b-button @click="showRODetailPageToggle">명세서 수정</b-button>
								<b-button @click="showCustomerDocOptionPageToggle">고객 명세서 발송</b-button>
								-->
								<b-button>명세서 수정</b-button>
								<b-button>고객 명세서 발송</b-button>
							</div>
						</div>
					</b-card-body>
				</b-collapse>
			</b-card>
		</div>
	</div>
</template>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
	import CheckLogin from '@/components/Common/CheckLogin.vue'

	export default {
		name: 'ROList',
		data(){
			return{
				dropdownRO: '차량번호',
				ROList1Toggle:false,
			}
		},
		components: {
			CheckLogin
		}
	}
</script>
<style scoped>
.rolist-title {
  margin:auto;
  width: 96%;
  padding-top: 15px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  display:flex;
}
.rolist-title span{
  width: 100%;
}
.rolist-search {
  margin:auto;
  width: 96%;
}
.rolist-search .input-group .input-group-prepend .dropdown .btn {
  background-color: #696565;
}
.rolist-search .input-group .input-group-append .btn {
  background-color: #acd3ce;
  border: none;
}
.rolist-history {
  margin:auto;
  width: 96%;
  padding-top: 5px;
  margin-bottom: 80px;
}
.rolist-history .list-group .list-group-item {
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
.history-carNo {
  font-size: 1rem;
  font-weight: bold;
}
.history-series {
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
  padding: 5px 20px 5px 20px;
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
.detailConts-subtotal {
  color: #0D47A1;
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
</style>

