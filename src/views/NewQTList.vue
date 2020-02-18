<template>
  <div class="QTList">
    <b-tabs class="QTList-tabs" fill  v-model="tabIndex" v-if="showMainPage">
			<b-tab title="견적확정 내역" class="p-0 border bg-light" :title-link-class="linkClass(0)">
				<ConfirmList></ConfirmList>
			</b-tab>
			<b-tab title="주문내역" :title-link-class="linkClass(1)">
				<OrderList></OrderList>
			</b-tab>
			<b-tab title="정비 명세서" :title-link-class="linkClass(2)">
				<ROList></ROList>
			</b-tab>
    </b-tabs>
		<div class="footer">
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
      </router-link>
    </div>
		<BackToTop></BackToTop>
  </div>
</template>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
	import ConfirmList from '@/components/QTList/ConfirmList.vue'
	import OrderList from '@/components/QTList/OrderList.vue'
	import ROList from '@/components/QTList/ROList.vue'
	import BackToTop from '@/components/Common/BackToTop.vue'

	export default {
		name: 'QTList',
		data(){
			return{
				tabIndex: 0,
				showMainPage:true,
			}
		},
		created: function()
		{
			if(this.UserInfo.BsnID === '')
			this.UserInfo.BsnID = this.$cookies.get('BsnID');

			if(this.UserInfo.Name === '')
			this.UserInfo.Name = this.$cookies.get('UserNM');

			if(this.$route !== undefined && this.$route.name === "QTList" ) {

				if(this.$route.params.Type !== undefined && (this.$route.params.Type === 'order' || this.$route.params.Type === 'orderHistory')){
					// 주문요청 완료 채팅이나 과거주문내역 조회 넘어왔을 경우
					this.tabIndex = 1;
				}
			}
		},
		computed: {
			UserInfo: {
				get() { return this.$store.getters.UserInfo },
				set(value) { this.$store.dispatch('UpdateUserInfo',value) }
			},
		},
		methods:{
			linkClass(idx) {
				if (this.tabIndex === idx) {
					return ['bg-white', 'text-warning', 'font-weight-bold']
				} else {
					return ['bg-light', 'text-secondary', 'font-weight-light']
				}
			},
		},
		components: {
			ROList,
			OrderList,
			ConfirmList,
			BackToTop,
		}
	}
</script>

<style scoped>
/*
#696565 : 더 짙은 브라운
#afabab : 짙은 부라운
#fcf4df : 베이지
#ff9999 : 옅은 붉은색
#acd3ce : 옅은 녹색
#967d5f : 옅은 브라운
*/
.QTList-tabs {
  padding: 5px 0px ;
  font-size: 0.9rem;
}

/*Footer*/
.footer {
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
.footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}
.footer a span i {
  font-size: 2.5rem;
}
.footer-selected {
  color : #5d4038;
}
</style>