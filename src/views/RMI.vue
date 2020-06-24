<template>
  <v-app id="inspire">
<!--좌측 Navigation-->      
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item-group
          v-model="selectedMenu"
          color="#ECEFF1"
        >
          <template v-for="(item, index) in menuItems">
            <v-list-item :key="item.text" 
              v-if="!item.divider" 
              link
              @click="clickMenu(item.rmi, item.spec)"
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
            <v-divider
              v-if="menuItems[index].divider"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
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
        style="min-width:900px; max-width:1000px;"
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
            style="max-width: 200px; font-size:10px;"
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
            style="max-width: 300px; font-size:10px;"
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
            style="max-width: 480px; font-size:10px;"
            @change="changeTypeName"
            >
        </v-autocomplete>         
      </v-row>
    </v-app-bar>
<!--들어갈 내용....-->
    <RMIOVERVIEW v-if="checkShowPage('OVERVIEW')" ></RMIOVERVIEW>
    <RMIADJUST v-if="checkShowPage('ADJUST')" ></RMIADJUST>
    <RMIMANUALS v-if="checkShowPage('MANUALS')" ></RMIMANUALS>
    <RMIGRAPHIC v-if="checkShowPage('GRAPHIC')" ></RMIGRAPHIC>
    <RMIMAINTENANCE v-if="checkShowPage('MAINTENANCE')"></RMIMAINTENANCE>
    <RMITIMES v-if="checkShowPage('TIMES')" ></RMITIMES>
    <RMIOENUMBERS v-if="checkShowPage('OENUMBERS')" ></RMIOENUMBERS>
    <RMIVEHICLES v-if="checkShowPage('VEHICLES')" ></RMIVEHICLES>
    <RMICATEGORY v-if="checkShowPage('CATEGORY')" ></RMICATEGORY>
    <RMIDAIGNOSTICVALUES v-if="checkShowPage('DAIGNOSTICVALUES')" ></RMIDAIGNOSTICVALUES>
    <RMIRELAYSFUSES v-if="checkShowPage('RELAYSFUSES')" ></RMIRELAYSFUSES>
    <RMIWIRING v-if="checkShowPage('WIRING')" ></RMIWIRING>
    <RMIWARNING v-if="checkShowPage('WARNING')" ></RMIWARNING>
  </v-app>
</template>

<script>
  import RMIOVERVIEW from '@/components/RMI/RMI-OVERVIEW.vue'
  import RMIADJUST from '@/components/RMI/RMI-ADJUST.vue'
  import RMIMANUALS from '@/components/RMI/RMI-MANUALS.vue'
  import RMIGRAPHIC from '@/components/RMI/RMI-GRAPHIC.vue'
  import RMIMAINTENANCE from '@/components/RMI/RMI-MAINTENANCE.vue'
  import RMITIMES from '@/components/RMI/RMI-TIMES.vue'
  import RMIOENUMBERS from '@/components/RMI/RMI-OENUMBERS.vue'
  import RMIVEHICLES from '@/components/RMI/RMI-VEHICLES.vue'
  import RMICATEGORY from '@/components/RMI/RMI-CATEGORY.vue'
  import RMIDAIGNOSTICVALUES from '@/components/RMI/RMI-DAIGNOSTICVALUES.vue'
  import RMIRELAYSFUSES from '@/components/RMI/RMI-RELAYSFUSES.vue'
  import RMIWIRING from '@/components/RMI/RMI-WIRING.vue'
  import RMIWARNING from '@/components/RMI/RMI-WARNING.vue'

  const axios = require('axios').default;
  const url = "https://rmi-services.tecalliance.net";

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      selectedMenu:0,
      subPageList: ['OVERVIEW', 'ADJUST', 'MANUALS', 'GRAPHIC','MAINTENANCE','TIMES','DAIGNOSTICVALUES','OENUMBERS','VEHICLES', 'CATEGORY', 'RELAYSFUSES','WIRING', 'WARNING'],
      showPageList: [],
      jsonHeader: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'TecRMI {{AuthToken}}' },
      menuItems: [
        { icon: 'mdi-cube-scan', text: 'OverView', rmi: 'OVERVIEW' },
        { divider: true },
        { icon: 'mdi-notebook-multiple', text: '정비 참고 매뉴얼', rmi: 'MANUALS' },
        { icon: 'mdi-oil', text: '오일 교환량 상세', rmi: 'ADJUST', spec: 'OIL' },
        { icon: 'mdi-alert-circle-check-outline', text: '소모품 교환 주기', rmi: 'ADJUST', spec: 'CHANGE' },                
        { divider: true },
        { icon: 'mdi-floor-plan', text: '차량 분해 도면', rmi: 'GRAPHIC' },
        { icon: 'mdi-playlist-play', text: '경정비 점검 항목', rmi: 'MAINTENANCE' },
        { icon: 'mdi-history', text: '표준 공임 시간', rmi: 'TIMES' },
        { divider: true },
        { icon: 'search', text: '부품번호 조회 ( OE / AM )', rmi: 'OENUMBERS' },
        { icon: 'directions_car', text: '부품 적용차량 조회', rmi: 'VEHICLES' },
        { icon: 'mdi-file-tree-outline', text: '부품 카테고리', rmi: 'CATEGORY' },
        { divider: true },
        { icon: 'mdi-laptop-chromebook', text: '차량 진단 데이터', rmi: 'DAIGNOSTICVALUES' },
        { icon: 'mdi-currency-sign', text: 'Fueses & Relay', rmi: 'RELAYSFUSES' },
        { icon: 'mdi-car-brake-abs', text: '경보등 정보', rmi: 'WARNING' },
        { icon: 'mdi-car-shift-pattern', text: '배선 정보', rmi: 'WIRING' },
        { icon: 'mdi-car-info', text: '정비 참고 정보', rmi: 'ADJUST' },        
      ],
      carMakerLists: [],
      carRangeLists: [],
      carTypeLists: [],
      carMakerId: '',
      carRangeId: '',
      carTypeId: '',
      carVin: '',
      carEngine: '',
      rmiAuthKey: '',
    }),
    components: {
      RMIOVERVIEW,
      RMIADJUST,
      RMIMANUALS,
      RMIGRAPHIC,
      RMIMAINTENANCE,
      RMITIMES,
      RMIOENUMBERS,
      RMIVEHICLES,
      RMICATEGORY,
      RMIDAIGNOSTICVALUES,
      RMIRELAYSFUSES,
      RMIWIRING,
      RMIWARNING
    },    
    created () {
      this.$vuetify.theme.dark = true;
      this.$vuetify.theme.themes.dark.primary = '#aaa'
      this.getAuthKey();
      this.setShowPage('OVERVIEW');
      this.selectedMenu = 0;
      this.carVin = this.$route.query.VIN;
      this.carEngine = this.$route.query.ENGINE;

      window.oncontextmenu = function () {
        return false;
      };      
    },
    methods: {
      clickMenu(page, spec) {
        if(this.subPageList.includes(page) === true) {
          this.setShowPage(page);
          this.$nextTick(function(){
            var param = {
              rmiAuthKey: this.rmiAuthKey,
              carTypeId: (this.carTypeId!=='')?JSON.parse(this.carTypeId).TypeId:'',
              carTcdTypeId: (this.carTypeId!=='')?JSON.parse(this.carTypeId).TcdTypeId:'',
              spec: spec
            }          
            console.log('InitData param : ', param);
            this.$EventBus.$emit('RMI-'+page+'.InitData', param);  
        
          });
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

              if(this.carVin !== undefined && this.carVin !== "") {
                param.AddInfoKeyFilter = [{"AddInfoKeyId":-8, "AddInfoKeyFilterValue": this.carVin }];
              }

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

                  /////////////////////////////////////////////////////////////////
                  /*
                  this.carMakerId = 6;
                  this.carRangeId = 8733;
                  this.carTypeId = 90363;

                  this.$nextTick(function(){
                    var param = {
                      rmiAuthKey: this.rmiAuthKey,
                      carTypeId: this.carTypeId
                    }          
                    console.log('InitData param : ', param);
                    this.$EventBus.$emit('RMI-MANUALS.InitData', param);  
                  });*/
                  /////////////////////////////////////////////////////////////////

                  if(result.data.length == 1) {
                      this.carMakerId = result.data[0].MakeId;
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

              if(this.carVin !== undefined && this.carVin !== "") {
                param.AddInfoKeyFilter = [{"AddInfoKeyId":-8, "AddInfoKeyFilterValue": this.carVin }];
              }              

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

              if(this.carVin !== undefined && this.carVin !== "") {
                param.AddInfoKeyFilter = [{"AddInfoKeyId":-8, "AddInfoKeyFilterValue": this.carVin }];
              }                  

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/TypeListTcd",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('TypeList 조회 : ', result);
                  
                  // 조회 조건에 특정 엔진 코드가 있는 경우 해당하는 코드로 필터링 처리
                  if(this.carEngine !== undefined && this.carEngine !== "") {
                    let findKey = this.carEngine;
                    let engineFilter = result.data.reduce(function (pre, value){
                      let findEngine = value.TypeDetails.find(function(detail){                  
                        return (detail.AddInfoKeyId === -4 && detail.AddInfoKeyValue.replace(/ /gi, "") === findKey);
                      });

                      if(findEngine !== undefined) {
                        pre.push(value);
                      }
                      return pre;
                    },[]);

                    if(engineFilter.length === 0)
                      this.carTypeLists = result.data;
                    else 
                      this.carTypeLists = engineFilter;

                  }
                  else
                    this.carTypeLists = result.data;

                  // 차량 상세 정보를 추가로 넣어 줌. (엔진코드, 연식, 마력 등)
                  this.carTypeLists = this.carTypeLists.map(obj=>{
                    var carTypeItem = {};
                    var carTypeId = {"TypeId" : obj.TypeId, "TcdTypeId" : obj.TcdTypeId};
                    carTypeItem.TypeId = JSON.stringify(carTypeId);

                    var beginDate = obj.TypeDetails.filter(x => x.AddInfoKeyId === 3)[0].AddInfoKeyValue;
                    beginDate = beginDate.substring(0,4) +'-'+ beginDate.substring(4);
                    
                    var endDateList = obj.TypeDetails.filter(x => x.AddInfoKeyId === 4);
                    var endDate = '';
                    if(endDateList.length === 1){
                      endDate = endDateList[0].AddInfoKeyValue;
                      endDate = endDate.substring(0,4) +'-'+ endDate.substring(4);
                    }
                    
                    var enginCodeList = obj.TypeDetails.filter(x => x.AddInfoKeyId === -4);
                    var engineCode = '';
                    if (enginCodeList.length > 0) {
                      engineCode = ' ( ';

                      for(let i=0; i<enginCodeList.length; i++) {
                        engineCode = engineCode + enginCodeList[i].AddInfoKeyValue;
                        if(i !== enginCodeList.length-1) engineCode += ', ';
                      }

                      engineCode += ' ) ';
                    }

                    // 미터마력(ps) = 키로와트(kw) * 1.36
                    var kw =  obj.TypeDetails.filter(x => x.AddInfoKeyId === 5)[0].AddInfoKeyValue;
                    var ps = Math.round(kw * 1.36);
                    
                    carTypeItem.TypeName = obj.TypeName +  engineCode  + ' [ ' + beginDate + '~' + endDate + ' ] '+ ps +' hp';
                    
                    return carTypeItem;

                  });                    

                  if(this.carTypeLists.length == 1) {
                      this.carTypeId = this.carTypeLists[0].TypeId;
                      this.changeTypeName();
                  }
              });      
          }       
      },
      changeTypeName() {
          console.log('changeTypeName : ', this.carTypeId);
          var param = {
              rmiAuthKey: this.rmiAuthKey,
              carTypeId: JSON.parse(this.carTypeId).TypeId,
              carTcdTypeId: JSON.parse(this.carTypeId).TcdTypeId
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
