<template>
  <v-card class="mainPage-web">
    <v-toolbar
      color="#9e9e9e"
      dark
      flat
      height = '30px'
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="mt-3"><h4>수입차 부품 견적 시스템<img height = "25px" src="@/assets/logo.png"></h4></v-toolbar-title>

      <v-spacer></v-spacer> 
      <div v-if="hidden">
       <CheckLogin></CheckLogin>
      </div>
      <v-btn icon  @click="hidden = !hidden">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          fixed-tabs
          background-color="#9e9e9e"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab href="#tab-1" disabled>HOME</v-tab>
          <v-tab href="#tab-2" selected>견적 작업</v-tab>
          <v-tab href="#tab-3" disabled>이력 조회</v-tab>
          <v-tab href="#tab-4" disabled>부품/정비 TIP</v-tab>
          <v-tab href="#tab-5" disabled>영업 관리</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
     <v-tabs-items v-model="tab" class='chatTabItem'>
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
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
       </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
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
      hidden:false,
      showAlertMsg: false,
      showAlerMsgBtn: true,
      qtKey: '',
      chatInfo:[],
      alertMsg: "",
      alertMsgPath: "",
      tab: null,
      items: [
        'HOME', '견적 작업', '이력 조회', '부품/정비 TIP', '영업관리',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      
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
html,body {height:100%; overflow:hidden}

.tab-focus {
  color: #fcf4df;
  font-weight: bold;
}

h4 {
  color: white;
  font-weight: bold;
}

a:hover {
  text-decoration: none;
}

.mainPage-web {
  overflow-y: hidden;
}

.page-content {
  display: flex;
  height: calc(100vh - 80px);
  /*background-color: aqua;*/
}

.page-content .content-userList{
  flex: 15%;
  border-right: 1px solid #aaa;
  /*height: 100%;*/
  background: #f8f9fa;
}
.page-content .content-chatTab{
  flex: 20%;
  padding: 10px;
  /*height: 100%;*/
}
.page-content .content-info{
  flex: 55%;
}
</style>
