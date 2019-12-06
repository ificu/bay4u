<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
              mdl-layout--fixed-tabs">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title"><h2>수입차 부품 견적 시스템<img src="@/assets/logo.png"></h2></span>
      </div>
      <!-- Tabs -->
      <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a class="mdl-layout__tab">HOME</a>
        <a href="#tab-page" class="mdl-layout__tab is-active"><div class="tab-focus">견적 작업</div></a>
        <a class="mdl-layout__tab">이력 조회</a>
        <a class="mdl-layout__tab">부품/정비 Tip</a>
        <a class="mdl-layout__tab">영업관리</a>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">준비중...</span>
      <CheckLogin></CheckLogin>
    </div>
    <main class="mdl-layout__content">
      <section class="mdl-layout__tab-panel is-active" id="tab-page">
        <div class="page-content">
          <!-- Your content goes here -->
          <div class="content-userList">
            <UserListPage v-on:selectChat="setQtInfo" :chatInfo="chatInfo"  v-on:setQtInfo="setQtInfo"></UserListPage>
          </div>

          <div class="content-chatTab">
            <ChatingPage></ChatingPage>
          </div>

          <div class="content-info">
            <InfoPage></InfoPage>
          </div>

          <!-- 알림 메시지 팝업 -->
          <MessageBox v-if="showAlertMsg"  @close="closeMsg(alertMsgPath)">
            <div slot="header"><h5 >알림</h5></div>
            <span slot="body" @click="closeMsg(alertMsgPath)"><pre>{{alertMsg}}</pre>
            </span>
            <div slot="footer" v-if="showAlerMsgBtn">
              <v-btn depressed small color="#967d5f" dark @click="closeMsg(alertMsgPath)"> 확인</v-btn>
            </div>
          </MessageBox>
          
        </div>
      </section>
    </main>
  </div>   
</template>

<script>
import UserListPage from '@/components/Dealer/UserListPage.vue'
import ChatingPage from '@/components/Dealer/ChatingPage.vue'
import InfoPage from '@/components/Dealer/InfoPage.vue'
import CheckLogin from '@/components/Common/CheckLogin.vue'
import MessageBox from '@/components/Common/MessageBox.vue'

export default {
  name: 'MainPage',
  data () {
    return {
      showAlertMsg: false,
      showAlerMsgBtn: true,
      qtKey: '',
      chatInfo:[],
      alertMsg: "",
      alertMsgPath: "",
    }
  },
  computed:{
    CarInfo: {
        get() { return this.$store.getters.CarInfo },
        set(value) { this.$store.dispatch('UpdateCarInfo',value) }
    },
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
    }
  },
  methods: {
    setQtInfo(info) {
      this.chatInfo = info;
      console.log(this.chatInfo);
    },
    closeMsg(path) {     
        this.showAlertMsg = false;
        this.logOut();
        if(path.length > 0 && path == 'Login')
        {
            this.$router.push('/');
        }
    },    
    logOut( )
    {
        var cookiesList = this.$cookies.keys();
        
        for(var i=0; i<cookiesList.length; i++)
        {
         this.$cookies.remove(cookiesList[i]);
        }
     
        this.UserInfo.UserID = "";
        this.UserInfo.BsnID = "";
        this.UserInfo.Name = "";
        this.UserInfo.EntNo = "";

        this.CarInfo.CarNo = "";
        this.CarInfo.VinNo = "";

        this.$router.push('/');
    }    
  },
  components: {
    UserListPage,
    ChatingPage,
    InfoPage,
    CheckLogin,
    MessageBox
  },
  created : function() {
    // 혹시 모바일에서 접근하는 케이스라면 에러 처리 하자.
    if (navigator.userAgent.match("iPad|iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS") != null) 
    { 
      this.alertMsg = "로그인 정보가 잘못 설정되었습니다.\n다시 로그인 해주세요."
      this.showAlertMsg = !this.showAlertMsg;
      this.alertMsgPath = "Login";
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

.tab-focus {
  color: #fcf4df;
  font-weight: bold;
}

h2 {
  color: white;
  font-weight: bold;
  text-shadow: 7px 7px 7px #ddd;
}

a:hover {
  text-decoration: none;
}

.mdl-layout__tab-panel {
  height: 100%;
}

.page-content {
  display: flex;
  height: 100%;
  min-height: 80vh;
  /*background-color: aqua;*/
}

.page-content .content-userList{
  flex: 20%;
  border-right: 1px solid #aaa;
  /*height: 100%;*/
  background: #f8f9fa;
}
.page-content .content-chatTab{
  flex: 30%;
  padding: 10px;
  /*height: 100%;*/
}
.page-content .content-info{
  flex: 50%;
}
</style>
