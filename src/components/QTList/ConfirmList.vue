<template>
  <div>
		<div class="qtlist-title">
			<span>견적 확정 내역</span>
			<CheckLogin></CheckLogin>
		</div>
		<div class="QTList-search">

		</div>
		<div class="QTList-history">

		</div>
	</div>
</template>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
	import Constant from '@/Constant';
	import CheckLogin from '@/components/Common/CheckLogin.vue'
	import {getInputDayWeek , convertDynamoToArrayString, arrayGroupBy, datePadding ,convertArrayToDynamo} from '@/utils/common.js'

	const axios = require('axios').default;

	export default {
		name: 'ConfirmList',
		data(){
			return{
				dropdownQT: '차량번호',
			}
		},
	}
</script>
<style scoped>
.qtlist-title {
  margin:auto;
  width: 96%;
  padding-top: 15px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  display:flex;
}

.qtlist-title span{
  width: 100%;
}
</style>