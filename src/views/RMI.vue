<template>
  <v-app id="inspire">
<!--좌측 Navigation-->      
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          link
          @click="clickMenu(item.rmi)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

<!--상단 Title-->
    <v-app-bar
      app
      clipped-left
      color="#df4f3d"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon
        class="mx-4"
        large
      >
        mdi-car-cog
      </v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Repair & Maintanance Information</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row
        align="center"
        style="max-width: 850px"
      >
        <v-autocomplete
            class="pt-8 pr-4"
            v-model="carMakerId"
            :items="carMakerLists"
            item-text="MakeName"
            item-value="MakeId"
            label="제조사"
            small-chips
            clearable
            style="max-width: 250px; font-size:10px;"
            @change="changeMakeName"
            >
        </v-autocomplete>
        <v-autocomplete
            class="pt-8 pr-4"
            v-model="carRangeId"
            :items="carRangeLists"
            item-text="RangeName"
            item-value="RangeId"
            label="차량 종류"
            small-chips
            clearable
            style="max-width: 350px; font-size:10px;"
            @change="changeRangeName"
            >
        </v-autocomplete>   
        <v-autocomplete
            class="pt-8 pr-4"
            v-model="carTypeId"
            :items="carTypeLists"
            item-text="TypeName"
            item-value="TypeId"
            label="차량 타입"
            small-chips
            clearable
            style="max-width: 250px; font-size:10px;"
            @change="changeTypeName"
            >
        </v-autocomplete>         
      </v-row>
    </v-app-bar>
<!--들어갈 내용....-->
      <RMIADJUST v-if="checkShowPage('ADJUST')" ></RMIADJUST>
      <RMIMANUALS v-if="checkShowPage('MANUALS')" ></RMIMANUALS>
      <RMIGRAPHIC v-if="checkShowPage('GRAPHIC')" ></RMIGRAPHIC>
      <RMIMAINTENANCE  v-if="checkShowPage('MAINTENANCE')"></RMIMAINTENANCE>
      <RMITIMES v-if="checkShowPage('TIMES')" ></RMITIMES>
      <RMIDAIGNOSTICVALUES v-if="checkShowPage('DAIGNOSTICVALUES')" ></RMIDAIGNOSTICVALUES>
      <RMIRELAYSFUSES v-if="checkShowPage('RELAYSFUSES')" ></RMIRELAYSFUSES>
      <RMIWIRING v-if="checkShowPage('WIRING')" ></RMIWIRING>

  </v-app>
</template>

<script>
  import RMIADJUST from '@/components/RMI/RMI-ADJUST.vue'
  import RMIMANUALS from '@/components/RMI/RMI-MANUALS.vue'
  import RMIGRAPHIC from '@/components/RMI/RMI-GRAPHIC.vue'
  import RMIMAINTENANCE from '@/components/RMI/RMI-MAINTENANCE.vue'
  import RMITIMES from '@/components/RMI/RMI-TIMES.vue'
  import RMIDAIGNOSTICVALUES from '@/components/RMI/RMI-DAIGNOSTICVALUES.vue'
  import RMIRELAYSFUSES from '@/components/RMI/RMI-RELAYSFUSES.vue'
  import RMIWIRING from '@/components/RMI/RMI-WIRING.vue'

  const axios = require('axios').default;
  const url = "https://rmi-services.tecalliance.net";

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      subPageList: ['ADJUST', 'MANUALS', 'GRAPHIC','MAINTENANCE','TIMES','DAIGNOSTICVALUES','RELAYSFUSES','WIRING'],
      showPageList: [],
      jsonHeader: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Origin':'https://rmi-services.tecalliance.net', 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36', 'Authorization': 'TecRMI {{AuthToken}}' },
      menuItems: [
        { icon: 'mdi-cube-scan', text: 'OverView', rmi: 'OVERVIEW' },
        { icon: 'mdi-car-info', text: '정비 참고 정보', rmi: 'ADJUST' },
        { icon: 'mdi-notebook-multiple', text: '정비 참고 매뉴얼', rmi: 'MANUALS' },
        { icon: 'mdi-floor-plan', text: '차량 분해 도면', rmi: 'GRAPHIC' },
        { icon: 'mdi-playlist-play', text: '정기 점검 항목', rmi: 'MAINTENANCE' },
        { icon: 'mdi-history', text: '표준 공임 시간', rmi: 'TIMES' },
        { icon: 'mdi-laptop-chromebook', text: '차량 진단 데이터', rmi: 'DAIGNOSTICVALUES' },
        { icon: 'mdi-currency-sign', text: 'Fueses & Relay', rmi: 'RELAYSFUSES' },
        { icon: 'mdi-car-brake-abs', text: '경보등 정보', rmi: 'LIGHT' },
        { icon: 'mdi-car-shift-pattern', text: '배선 정보', rmi: 'WIRING' },
      ],
      carMakerLists: [],
      carRangeLists: [],
      carTypeLists: [],
      carMakerId: '',
      carRangeId: '',
      carTypeId: '',
      rmiAuthKey: '',
    }),
    components: {
        RMIADJUST,
        RMIMANUALS,
        RMIGRAPHIC,
        RMIMAINTENANCE,
        RMITIMES,
        RMIDAIGNOSTICVALUES,
        RMIRELAYSFUSES,
        RMIWIRING
    },    
    created () {
      this.$vuetify.theme.dark = true;
      this.getAuthKey();
      this.setShowPage('ADJUST');
    },
    methods: {
      clickMenu(page) {
        if(this.subPageList.includes(page) === true) {
          var param = {
              rmiAuthKey: this.rmiAuthKey,
              carTypeId: this.carTypeId
          }
          this.setShowPage(page);
          this.$EventBus.$emit('RMI-'+page+'.InitData', param);  
        }
      },
      checkShowPage(page) {
        return this.showPageList.find( (n) => {
          return n.view === page;
        })['show']; 
      },
      getShowPage() {
        return this.showPageList.find( (n) => {
          return n.show === true;
        })['view']; 
      },
      setShowPage(page) {
        this.showPageList = [];
        for(var view of this.subPageList) {
          this.showPageList.push({'view':view, 'show': (view===page?true:false)});
        }
      },
      getAuthKey() {
          var param = {};
          param.Company = "SK Network-South Korea_3303624";
          param.Account = "rmi-ws_004553-1-KR";
          param.Password = "SkCho123!";

          axios({
              method: 'POST',
              url: url + "/Auth/Login",
              headers: this.jsonHeader,
              data: param
          })
          .then((result) => {
              this.rmiAuthKey = result.headers['x-authtoken'];

              // 조회 후 Maker List 조회
              param = {};
              param.ShowCar = true;
              param.CountryCode = "kr";
              param.LanguageCode = "en";

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;
              console.log('rmiAuthKey : ', this.rmiAuthKey);

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/MakeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('Maker List 조회 : ', result);
                  this.carMakerLists = result.data;

                  if(result.data.length == 1) {
                      this.carMakeId = result.data[0].MakeId;
                      this.changeMakeName();
                  }                        
              });    
          });            
      },
      changeMakeName() {
          console.log('changeMakeName : ', this.carMakerId);

          this.carRangeLists = [];
          this.carTypeLists = [];

          this.carRangeId = '';
          this.carTypeId = '';

          if(this.carMakerId !== undefined) {
              var param = {};
              param.ShowCar = true;
              param.MakeId = this.carMakerId;
              param.CountryCode = "kr";
              param.LanguageCode = "en";

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/RangeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('RangeList 조회 : ', result);
                  this.carRangeLists = result.data;

                  if(result.data.length == 1) {
                      this.carRangeId = result.data[0].RangeId;
                      this.changeRangeName();
                  }                    
              });       
          }      
      },
      changeRangeName() {
          console.log('changeRangeName : ', this.carRangeId);

          this.carTypeLists = [];
          this.carTypeId = '';                      

          if(this.carRangeId !== undefined) {
              var param = {};
              param.ShowCar = true;
              param.RangeId = this.carRangeId;
              param.CountryCode = "kr";
              param.LanguageCode = "en";

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/TypeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('TypeList 조회 : ', result);
                  this.carTypeLists = result.data;

                  if(result.data.length == 1) {
                      this.carTypeId = result.data[0].TypeId;
                      this.changeTypeName();
                  }
              });      
          }       
      },
      changeTypeName() {
          console.log('changeTypeName : ', this.carTypeId);
          var param = {
              rmiAuthKey: this.rmiAuthKey,
              carTypeId: this.carTypeId
          }
          this.$EventBus.$emit('RMI-'+this.getShowPage()+'.InitData', param);  
      }
    },    
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.contents {
  background-color: #f9f9f9;
  color: black;
  font-size: 12px;
}


</style>
