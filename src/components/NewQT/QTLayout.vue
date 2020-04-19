<template>
  <v-app>
 <!-- <v-app v-scroll-stop="isScroll">-->
    <!-- 1. 차량번호/차대번호 촬영 인식 CARD -->
    <v-card class="mx-auto mb-2 mt-2" width="93%">
      <v-app-bar dark color="brown darken-2" height="40px">
        <v-card-title>1. 차량번호/ 차대번호 촬영 인식</v-card-title>
      </v-app-bar>
      <!--<v-card-subtitle class="pb-0">차량 번호판이나 등록증, 차대번호를 촬영하시면 자동 인식 됩니다.</v-card-subtitle>-->
      <v-card-text class="pb-0">차량 번호판이나 등록증, 차대번호를 촬영하시면 자동 인식 됩니다.</v-card-text>
      <v-img class="grey lighten-3 mr-4 ml-4" min-height="115" v-bind:height="imgSize" v-bind:src="captureImg" ref="picImg" ></v-img>

      <div class="text-right mr-6 mt-n10 mb-4">
        <v-btn icon small color="teal"  @click="changeImageSize">
          <v-icon v-if="imgSize === '115' ">fas fa-expand</v-icon>
          <v-icon v-if="imgSize === '100%' ">fas fa-compress</v-icon>
        </v-btn>
      </div>    

      <div class="text-center mt-2 mb-4">
        <v-btn fab small color="success" @click="showQTCameraModal(true, 'CARNO')">
          <v-icon>fas fa-camera</v-icon>
        </v-btn>
      </div>    
      <div>
        <div class="text-left pl-6 mb-n9"><v-btn  color="#FFECB3" depressed @click="CarInfoClear()">CLEAR</v-btn></div>
        <div class="mb-2" style="margin-left:115px;"><v-btn  color="#FFECB3" depressed @click="ShowDummyCarAlert()">미상차량</v-btn></div>
        <!-- 과거 정비이력 Popup / 차량번호 입력 -->
        <template  @click.stop="showROHistDialog = true" >
          <v-text-field class="pr-6 pl-4 mb-n4" label="차량번호" v-model="CarInfo.CarNo" outlined dense color="success" append-outer-icon="search" @click:append-outer="checkWebPOSHist" v-on:keypress.enter="checkWebPOSHist"></v-text-field>
        </template>
        <v-dialog v-model="showROHistDialog" transition="dialog-bottom-transition">

          <!--<template v-slot:activator="{ on: { click } }">
            <v-text-field class="pr-6 pl-4 mb-n4" label="차량번호" v-model="CarInfo.CarNo" outlined dense color="success" append-outer-icon="search" @click:append-outer="checkWebPOSHist" v-on:keypress.enter="checkWebPOSHist"></v-text-field>
          </template>-->
          <v-card>
            <v-toolbar dark color="primary"> 
              <v-toolbar-title>
                <v-icon medium>fas fa-edit</v-icon>
                과거 정비이력  <span class="roCarNo">{{CarInfo.CarNo}}</span>
              </v-toolbar-title>                 
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <!--<v-btn dark text @click="dialog = false">Save</v-btn>-->
              </v-toolbar-items>
              <v-btn icon dark @click="showROHistDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-container class="mx-n2 pe-0">
                <ROHistory :RoHistoryData="roList"></ROHistory>
              </v-container>
            </v-card-text>    
            <v-card-actions>
              <v-row align="center" justify="end" class="mt-n6 mb-4 mr-4" >
                <v-btn color="#4E342E" dark depressed @click="goOrderList()"> 
                  과거주문내역조회
                </v-btn>
              </v-row>
            </v-card-actions>     
            </v-card>
        </v-dialog>

        <v-text-field label="차대번호" v-model="CarInfo.VinNo" outlined dense color="success"  class="pr-6 pl-4" append-outer-icon="search" @click:append-outer="checkWebPOSHist" v-on:keypress.enter="checkWebPOSHist"></v-text-field>

        <v-row class = "mb-8 mt-n6 ml-1 mr-12">
          <v-col cols="10">
            <v-select
              v-model="brandSelected"
              :items="brandList"
              menu-props="auto"
              hide-details
              append-outer-icon="fas fa-car"
              single-line
              solo
              disabled
            ></v-select>
          </v-col>
          <v-col cols="2">
            <img height='25' v-if="brandSelected === 'AUDI'" style="align-self:center" src="@/assets/BRAND-AUDI.png">
            <img height='40' v-if="brandSelected === 'BENZ'" style="align-self:center" src="@/assets/BRAND-BENZ.png">
            <img height='40' v-if="brandSelected === 'BMW'" style="align-self:center" src="@/assets/BRAND-BMW.png">
            <img height='35' v-if="brandSelected === 'CADILLAC'" style="align-self:center" src="@/assets/BRAND-CADILLAC.png">
            <img height='16' v-if="brandSelected === 'CHRYSLER'" style="align-self:center" src="@/assets/BRAND-CHRYSLER.png">
            <img height='25' v-if="brandSelected === 'CITROEN'" style="align-self:center" src="@/assets/BRAND-CITROEN.png">
            <img width="75" v-if="brandSelected === 'DODGE'" style="align-self:center" src="@/assets/BRAND-DODGE.png">
            <img height='32' v-if="brandSelected === 'FIAT'" style="align-self:center" src="@/assets/BRAND-FIAT.png">
            <img height='25' v-if="brandSelected === 'FORD'" style="align-self:center" src="@/assets/BRAND-FORD.png">
            <img height='25' v-if="brandSelected === 'HONDA'" style="align-self:center" src="@/assets/BRAND-HONDA.png">
            <img height='20' v-if="brandSelected === 'JEEP'" style="align-self:center" src="@/assets/BRAND-JEEP.png">
            <img height='25' v-if="brandSelected === 'LANDROVER'" style="align-self:center" src="@/assets/BRAND-LANDROVER.png">
            <img height='20' v-if="brandSelected === 'JAGUAR'" style="align-self:center" src="@/assets/BRAND-JAGUAR.png">
            <img height='40' v-if="brandSelected === 'LEXUS'" style="align-self:center" src="@/assets/BRAND-LEXUS.png">
            <img height='32' v-if="brandSelected === 'LINCOLN'" style="align-self:center" src="@/assets/BRAND-LINCOLN.png">
            <img height='25' v-if="brandSelected === 'MINI'" style="align-self:center" src="@/assets/BRAND-MINI.png">
            <img height='30' v-if="brandSelected === 'PEUGEOT'" style="align-self:center" src="@/assets/BRAND-PEUGEOT.png">
            <img height='35' v-if="brandSelected === 'PORSCHE'" style="align-self:center" src="@/assets/BRAND-PORSCHE.png">
            <img height='30' v-if="brandSelected === 'TOYOTA'" style="align-self:center" src="@/assets/BRAND-TOYOTA.png">
            <img height='35' v-if="brandSelected === 'VOLVO'" style="align-self:center" src="@/assets/BRAND-VOLVO.png">
            <img height='40' v-if="brandSelected === 'VW'" style="align-self:center" src="@/assets/BRAND-VW.png">
            <img height='40' v-if="brandSelected === 'NISSAN'" style="align-self:center" src="@/assets/BRAND-NISSAN.png">
            <img height='40' v-if="brandSelected === 'MASERATI'" style="align-self:center" src="@/assets/BRAND-MASERATI.png">
            <img height='20' v-if="brandSelected === 'INFINITI'" style="align-self:center" src="@/assets/BRAND-INFINITI.png">
            <img height='25' v-if="brandSelected === 'GM'" style="align-self:center" src="@/assets/BRAND-GM.png">
          </v-col>
        </v-row>

        <!--<v-text-field label="차량종류" outlined dense color="success" class="mt-n5"></v-text-field>-->
        <v-btn outlined small color="red darken-1" class="mt-n6 mb-6 ml-5 " @click="showCarBrandPopup=!showCarBrandPopup">기타차종 선택</v-btn>
        <v-btn outlined small color="red darken-1" class="mt-n6 mb-4 mr-4 float-right" v-if="showVINSearchBtn" @click="checkCarVin">차대번호 조회</v-btn>
        <v-btn outlined small color="red darken-1" class="mt-n6 mb-4 mr-1 float-right" v-if="showROHistBtn" @click="showROHistDialog=!showROHistDialog">정비이력</v-btn>

        <!-- 차대번호 조회 동의 Popup-->
        <v-dialog v-model="showVINSearchAgreePopup">
          <v-card>
            <v-card-title class="headline" >고객 확인 필요</v-card-title>
            <v-card-text>차대번호 조회를 위해선 고객동의를 받으시고 아래 차량 소유주명을 입력하셔야 합니다.</v-card-text>
            <v-card class="ml-4 mr-4" outlined>
              <v-text-field label="고객명" v-model="custName" outlined dense color="success" class="pr-4 pl-4 pt-4 mb-n6"></v-text-field>
              <v-checkbox v-model="chkCustAgree" color="green darken-1" dense label="차대번호를 조회를 위한 고객명 입력을 동의하셨습니다."></v-checkbox>
            </v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="checkIntraVanVin">조회</v-btn>
              <v-btn color="green darken-1" text @click="showVINSearchAgreePopup = false; CarInfo.VinNo = '';">취소</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>    

        <!-- 브랜드 선택 Popup-->
        <v-dialog v-model="showCarBrandPopup">
          <v-card>
            <v-card-title class="pa-0 brandTitle">브랜드 선택</v-card-title>
            <!--<v-card-text></v-card-text>-->
            <v-card class="ml-4 mr-4 mb-1" outlined>
              <v-card-title class="pa-0 brandType"><span>FAVORITE</span></v-card-title>
              <v-card-text class="pa-1">
                <v-chip v-for="(brand, index) in favoriteBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                <img height='18' class="mr-2" v-if="brand === 'AUDI'" src="@/assets/BRAND-AUDI.png">
                <img height='22' class="mr-2" v-if="brand === 'BENZ'" src="@/assets/BRAND-BENZ.png">
                <img height='25' class="mr-2" v-if="brand === 'BMW'" src="@/assets/BRAND-BMW.png">
                <img height='25' class="mr-2" v-if="brand === 'LEXUS'" src="@/assets/BRAND-LEXUS.png">
                <img height='22' class="mr-2" v-if="brand === 'MINI'" src="@/assets/BRAND-MINI.png">
                <img height='22' class="mr-2" v-if="brand === 'VW'" src="@/assets/BRAND-VW.png">
                {{brand}}
                </v-chip>
              </v-card-text>              
            </v-card>
            <v-card class="ml-4 mr-4 mb-1" outlined>
                <v-card-title class="pa-0 brandType"><span>EUROPE</span></v-card-title>
                <v-card-text class="pa-1">
                  <v-chip v-for="(brand, index) in europeBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                    <img height='25' class="mr-2" v-if="brand === 'LANDROVER'" src="@/assets/BRAND-LANDROVER.png">
                    <img height='20' class="mr-2" v-if="brand === 'JAGAUR'" src="@/assets/BRAND-JAGUAR.png">
                    <img height='22' class="mr-2" v-if="brand === 'VOLVO'" src="@/assets/BRAND-VOLVO.png">
                    <img height='25' class="mr-2" v-if="brand === 'PEUGEOT'" src="@/assets/BRAND-PEUGEOT.png">
                    <img height='25' class="mr-2" v-if="brand === 'PORSCHE'" src="@/assets/BRAND-PORSCHE.png">
                    <img height='25' class="mr-2" v-if="brand === 'MASERATI'" src="@/assets/BRAND-MASERATI.png">
                    {{brand}}
                  </v-chip>
                </v-card-text>              
            </v-card>
            <v-card class="ml-4 mr-4 mb-1" outlined>
              <v-card-title class="pa-0 brandType"><span>USA</span></v-card-title>
              <v-card-text class="pa-1">
                <v-chip v-for="(brand, index) in usaBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                  <img height='20' class="mr-2" v-if="brand === 'JEEP'" src="@/assets/BRAND-JEEP.png">
                  <img height='25' class="mr-2" v-if="brand === 'LINCOLN'" src="@/assets/BRAND-LINCOLN.png">
                  <img height='20' class="mr-2" v-if="brand === 'FORD'" src="@/assets/BRAND-FORD.png">
                  <img height='20' class="mr-2" v-if="brand === 'CHRYSLER'" src="@/assets/BRAND-CHRYSLER.png">
                  <img height='20' class="mr-2" v-if="brand === 'GM'" src="@/assets/BRAND-GM.png">
                {{brand}}
                </v-chip>
              </v-card-text>              
            </v-card>
            <v-card class="ml-4 mr-4 mb-1" outlined>
              <v-card-title class="pa-0 brandType"><span>ASIA</span></v-card-title>
              <v-card-text class="pa-1">
                <v-chip v-for="(brand, index) in asiaBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                  <img height='25' class="mr-2" v-if="brand === 'HONDA'" src="@/assets/BRAND-HONDA.png">
                  <img height='22' class="mr-2" v-if="brand === 'TOYOTA'" src="@/assets/BRAND-TOYOTA.png">
                  <img height='25' class="mr-2" v-if="brand === 'NISSAN'" src="@/assets/BRAND-NISSAN.png">
                  <img height='20' class="mr-2" v-if="brand === 'INFINITI'" src="@/assets/BRAND-INFINITI.png">
                {{brand}}
                </v-chip>
              </v-card-text>              
            </v-card> 
            <v-card class="ml-4 mr-4" outlined>
              <v-card-title class="pa-1 brandType"><span>All Brand</span></v-card-title>
              <v-chip v-for="(brand, index) in carBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                <img height='25' class="mr-2" v-if="brand === 'CADILLAC'" src="@/assets/BRAND-CADILLAC.png">
                <img height='25' class="mr-2" v-if="brand === 'CITROEN'" src="@/assets/BRAND-CITROEN.png">
                <img height='18' class="mr-2" v-if="brand === 'DODGE'" src="@/assets/BRAND-DODGE.png">
                <img height='25' class="mr-2" v-if="brand === 'FIAT'" src="@/assets/BRAND-FIAT.png">
                {{brand}}
              </v-chip>
            </v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="showCarBrandPopup = false;">닫기</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>      

      </div>    
    </v-card>

    <!-- 2. 요청 부품 선택 CARD -->
    <v-card class="mx-auto mb-2" width="93%">
      <v-app-bar dark color="brown darken-2" height="40px">
        <v-card-title>2. 요청 부품 선택</v-card-title>
      </v-app-bar>
      <div class="mb-4 mt-4">
        <!-- swiper -->
        <swiper  class="NewQT-itemSelect-wiper" :options="swiperOption">
          <swiper-slide><img v-on:click="showItemCategoryModal('1')" src="@/assets/group1.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('9')" src="@/assets/group9.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('2')" src="@/assets/group2.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('3')" src="@/assets/group3.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('4')" src="@/assets/group4.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('5')" src="@/assets/group5.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('6')" src="@/assets/group6.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('7')" src="@/assets/group7.png"></swiper-slide>
          <swiper-slide><img v-on:click="showItemCategoryModal('8')" src="@/assets/group8.png"></swiper-slide>
          <swiper-slide></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

        <!-- 기타부품 추가 --> 
         <div class="tempItems">
            <v-text-field label="기타부품"  outlined dense color="success" class="tempItem ml-4" v-model="tempItem.ITM_NM"></v-text-field>
            <v-card class="d-flex" flat  tile dense >
              <v-btn tile outlined depressed  @click="subCounter()">-</v-btn>
             <!-- <v-btn fab dark x-small color="#757575" @click="subCounter()">
                <v-icon dark>mdi-minus</v-icon>
              </v-btn>-->
              <div class="qtyInput">
               <input type="number" pattern="\d*" placeholder="number" v-on:keypress.enter="addNewItem(tempItem)" v-model.number="tempItem.ITM_QTY" >
              </div>
             <!-- <v-btn fab x-small dark color="#757575" @click="addCounter()">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>-->
                <v-btn tile outlined depressed @click="addCounter()">+</v-btn>
            </v-card>
            <v-btn class="mx-2 " fab color="success" x-small @click="addNewItem(tempItem)">입력</v-btn>
        </div>   
        <div class="ml-6 mt-n6 mb-10">
          <small color = "success"># 부품명 입력 후 "입력" 버튼을 누르면 추가 됩니다.</small> 
          <!--<v-btn small  color="indigo" outlined @click="addNewItem(tempItem)">기타부품추가</v-btn>-->
        </div>

      <div>
        <v-textarea outlined class="ml-4 mr-4" color="success" label="견적 메모 / 사진 및 추가 요청사항" auto-grow rows="3" value="" v-model="qtReqMemo"></v-textarea>
      </div>
      <div>
        <v-btn outlined small color="teal accent-4" class="mt-n6 mb-4 mr-4 float-right"  @click="showQTCameraModal(true, 'ITEMIMG')">부품 사진 입력</v-btn>
      </div>
    </v-card>  

    <!-- 3. 견적요청 리스트 확인 CARD -->
    <v-card class="mx-auto mb-12" width="93%">
      <v-app-bar dark color="brown darken-2" height="40px">
        <v-card-title>3. 견적요청 리스트 확인</v-card-title>
      </v-app-bar>
      <v-list two-line subheader class="ml-4 mr-4">
        <v-list-item v-for="(qtItem, index) in qtRequest" v-bind:key="index">
          <v-list-item-avatar>
            <img src="@/assets/icon-oilfilter.png" v-if="qtItem.ITM_ICON === 'icon-oilfilter.png' ">
            <img src="@/assets/icon-airfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-airfilter.png' ">
            <img src="@/assets/icon-battery.png" v-else-if="qtItem.ITM_ICON === 'icon-battery.png' ">
            <img src="@/assets/icon-beltdrive.png" v-else-if="qtItem.ITM_ICON === 'icon-beltdrive.png' ">
            <img src="@/assets/icon-brakedisc.png" v-else-if="qtItem.ITM_ICON === 'icon-brakedisc.png' ">
            <img src="@/assets/icon-brakepad.png" v-else-if="qtItem.ITM_ICON === 'icon-brakepad.png' ">
            <img src="@/assets/icon-brakepadsensor.png" v-else-if="qtItem.ITM_ICON === 'icon-brakepadsensor.png' ">
            <img src="@/assets/icon-cabinfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-cabinfilter.png' ">
            <img src="@/assets/icon-cooling.png" v-else-if="qtItem.ITM_ICON === 'icon-cooling.png' ">
            <img src="@/assets/icon-engineoil.png" v-else-if="qtItem.ITM_ICON === 'icon-engineoil.png' ">
            <img src="@/assets/icon-filter.png" v-else-if="qtItem.ITM_ICON === 'icon-filter.png' ">
            <img src="@/assets/icon-fuelfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-fuelfilter.png' ">
            <img src="@/assets/icon-ignition.png" v-else-if="qtItem.ITM_ICON === 'icon-ignition.png' ">
            <img src="@/assets/icon-missionfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-missionfilter.png' ">
            <img src="@/assets/icon-oilfilter.png" v-else-if="qtItem.ITM_ICON === 'icon-oilfilter.png' ">
            <img src="@/assets/icon-sensor.png" v-else-if="qtItem.ITM_ICON === 'icon-sensor.png' ">
            <img src="@/assets/icon-wiper.png" v-else-if="qtItem.ITM_ICON === 'icon-wiper.png' ">
            <img src="@/assets/icon-pic.png" v-else-if="qtItem.ITM_ICON === 'icon-pic.png' ">            
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="qtItem.ITM_NM"></v-list-item-title>
            <v-list-item-subtitle> 
              <v-card
                class="d-flex flex-row-reverse"
                flat
                tile
                dense
                id="reqList"
              >
               <!-- <v-btn text icon small @click="subCounter(index)">
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-btn>-->
                <v-btn tile outlined depressed  @click="addCounter(index)">+</v-btn>
                <div class="qtyInput">
                  <!--<v-text-field  v-model.number="qtItem.ITM_QTY" type="number" ></v-text-field>-->
                  <input type="number" pattern="\d*" placeholder="number" v-model.number="qtItem.ITM_QTY" >                  
                </div>
                <!--<v-btn text small min-width="10px" max-width="15px">
                  {{qtItem.ITM_QTY}}
                </v-btn>
                <v-btn text icon small @click="addCounter(index)">
                  <v-icon>keyboard_arrow_up</v-icon>
                </v-btn>-->
                <v-btn tile outlined depressed   @click="subCounter(index)">-</v-btn>
              </v-card>        

            </v-list-item-subtitle>
          </v-list-item-content>   
          <v-list-item-action>
            <v-btn class="mr-n4" icon @click="removeItem(qtItem)">
              <v-icon class="mr-n4 pl-4" color="grey lighten-1">highlight_off</v-icon>
            </v-btn>
          </v-list-item-action>  
        </v-list-item>
        <v-divider></v-divider>
        <div class="text-center mt-2 mb-4">
          <b-button v-on:click="showQTConfirmModal" block class = "red lighten-3">최종 견적 요청</b-button>
        </div>      
      </v-list>    
    </v-card>    
    <v-divider></v-divider>

    <!-- 부품 카테고리 팝업 -->
    <ItemCategory v-if="showItemCategory" @close="showItemCategory=false">
        <v-toolbar flat dense slot="header"> 
          <v-toolbar-title class="Category-Title" >
            <h4>{{categoryTitle}}</h4>
          </v-toolbar-title>                 
          <v-spacer></v-spacer>
          <v-toolbar-items class="mt-2">
            <span class="Category-Confirm"  @click="showItemCategory=false">
              확인 <i class="fas fa-check"></i>
            </span>
          </v-toolbar-items>
        </v-toolbar>
      <!--<h4 >{{categoryTitle}}</h4>-->
      <span slot="body">  
        <b-form-group>
          <b-form-checkbox
            v-for="item in categoryList"
            v-model="selectedCategory"
            :key="item.ITM_VAL"
            :value="item.ITM_VAL"
            @change="addNewItem(item)"
            size="lg"
          >
            {{ item.ITM_NM }}
          </b-form-checkbox>
        </b-form-group>
      </span>
      <!--  <span slot="footer" @click="showItemCategory=false">
      확인 <i class="fas fa-check"></i>
      </span>-->
    </ItemCategory>

    <!-- 견적 요청 확인 팝업 -->
    <QTConfirm v-if="showQTConfirm" @close="showQTConfirm=false">
      <span slot="header">총 {{dealerCount}}개 대리점에 <br> 견적요청을 보냅니다</span>
      <span slot="list1">
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
                <v-list-item-content class="ml-n5 pt-0 qtConfirm-dealerList">
                  <v-list-item-title>
                    <span>{{dealer.DEALER_NAME}}</span>
                    <span v-if="dealer.TYPE ==='A'"><i class="fas fa-star"></i></span>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!--
        <ul class="qtConfirm-dealerList">
          <li v-for="(dealer, index) in dealerList" v-bind:key="index">
            <span>{{dealer.DEALER_NAME}}</span>
            <span v-if="dealer.TYPE ==='A'"><i class="fas fa-star"></i></span>
          </li>
        </ul>-->
      </span>
      <!--<span slot="reorder"><v-btn color="#4E342E" dark depressed class="btnOrder" @click="checkQtOrder">바로주문</v-btn></span>-->
      <span slot="list2">
        <div class="qtConfirm-itemList" v-for="(item, index) in qtRequest" v-bind:key="index">
          <span class="qtConfirm-itemDel">{{item.ITM_NM}}</span>
          <span class="qtConfirm-itemDel">{{item.ITM_QTY }}개</span>
          <i class="qtConfirm-itemDel fas fa-times-circle"  @click="removeItem(item)"></i>
        </div>
      </span>
      <span slot="footer">
        전송 하시겠습니까?
        <!--
        <router-link v-bind:to="{name:'Chat', params:{chatid:1}}">
          <b-button class="submit-YES" @click="addNewQTRequest()">YES</b-button>
        </router-link >-->
        <b-button class="submit-YES" @click="checkQtData()">YES</b-button>
        <b-button class="submit-NO" @click="showQTConfirm=false">NO</b-button>
      </span>
    </QTConfirm>

    <!-- 카메라 표시 팝업 -->
    <transition>
        <QTCamera 
          v-if="showQTCamera" 
          v-on:closeQTCameraModal="showQTCameraModal(false, '')"
          v-on:updatePic="updatePic"
          :cameraType="imgCaptureType"
          >
        </QTCamera>
    </transition>

    <!-- 알림 메시지 팝업 -->
    <MessageBox v-if="showAlertMsg"  @close="closeMsg(alertMsgPath)">
      <div slot="header"><h5 >알림</h5></div>
      <span slot="body" @click="closeMsg(alertMsgPath)"><pre>{{alertMsg}}</pre>
      </span>
      <div slot="footer" v-if="showAlerMsgBtn">
        <v-btn depressed small color="#967d5f" dark @click="closeMsg(alertMsgPath)"> 확인</v-btn>
      </div>
      <div slot="footer" v-if="showAlerMsgConfirmBtn">
        <v-btn depressed small color="#967d5f" dark @click="CheckReqVinNoQT(true)">확인</v-btn>
        <v-btn depressed small color="blue-grey lighten-2"  @click="CheckReqVinNoQT(false)">취소</v-btn>
      </div>
    </MessageBox>
    <!--바로주문 확인 메시지 팝업-->
    <MessageBox v-if="showAlertOrdMsg"  @close="closeMsg(alertMsgPath)">
      <div slot="header"><h5 >알림</h5></div>
      <span slot="body" @click="closeMsg(alertMsgPath)"><pre>{{alertMsg}}</pre>
      </span>
      <div slot="footer" v-if="showMsgOrdConfirmBtn">
        <v-btn depressed small color="#967d5f" dark @click="returnOrdMsgYesNo(true)">확인</v-btn>
        <v-btn depressed small color="blue-grey lighten-2"  @click="returnOrdMsgYesNo(false)">취소</v-btn>
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

    <MessageBox v-if="showAlertPopup"  @close="closePopup()">
      <div slot="header"><h5 >알림</h5></div>
      <span slot="body" @click="closePopup()"><pre>{{alertMsg}}</pre>
      </span>
      <div slot="footer">
        <v-btn depressed small color="#967d5f" dark @click="SetDummyCar()">확인</v-btn>
        <v-btn depressed small color="blue-grey lighten-2"  @click="closePopup()">취소</v-btn>
      </div>
    </MessageBox>
  </v-app>  
</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import ItemCategory from '@/components/NewQT/ItemCategory.vue'
import QTConfirm from '@/components/NewQT/QTConfirm.vue'
import QTCamera from '@/components/NewQT/QTCamera.vue'
import ROHistory from '@/components/NewQT/ROHistory.vue'
import MessageBox from '@/components/Common/MessageBox.vue'
import {datePadding, convertStringToDynamo, convertArrayToDynamo, dataURItoBlob, convertArrayToSpecStr} from '@/utils/common.js'
import Constant from '@/Constant';

const axios = require('axios').default;

export default {
  name: 'QTStep',
  data () {
    return {
      e6: 1,
      text: '',
      itmQty: 1,
    //  dealerCount: 0,
      categoryTitle: "",
      categoryList: [],                 // DB에서 조회해 온 견적 요청 부품 군 리스트
      selectedCategory: [],             // 견적 요청 부품 군 중 선택된 리스트
      dealerList: [],                   // 요청할 딜러 리스트를 담는 배열
      qtRequest: [],                    // 견적 요청 리스트를 담는 JSON 배열
      showItemCategory: false,          // 견적 요청 부품 선택 팝업
      showQTConfirm: false,             // 최종 견적 요청 확인 팝업
      showQTCamera: false,              // 카메라 쵤영을 위한 팝업
      captureImg: "",                   // 카메라에서 촬영된 차량번호 or 차대번호 이미지
      captureBlobImg: '',
      swiperOption: {
          slidesPerView: 3,
          spaceBetween: 120,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true
          }
      },
      showROHistDialog: false,          // WebPOS 정비이력 조회 팝업
      showVINSearchAgreePopup: false,   // 국토부 차대번호 조회를 위한 동의 팝업
      qtReqMemo: "",
      showROHistBtn: false,             // 정비이력 조회 버튼 표시 여부
      showVINSearchBtn: false,          // 차대번호 조회 버튼 표시 여부
      chkCustAgree: false,              // 차대번호 조회를 위한 고객 동의 체크 여부
      custName: "",
      showAlertMsg: false,
      showAlertPopup:false,
      showAlerMsgConfirmBtn :false,
      showMsgOrdConfirmBtn: false,
      showAlertOrdMsg:false,
      showAlerMsgBtn: true,
      alertMsg: "",
      alertMsgPath: "",
      alertYesNo: false,
      imgCaptureType: "",
      imgSize: "115",
      tempItem:{                        // 기타부품 추가
        ITM_ICON:" ",
        ITM_QTY:1,
        GRP_ID:" ",
        ITM_NM:" ",
        ITM_VAL:" ",
        GRP_NM:" ",
        SEQ:0
      },
      roList: [],
      sendDocId : '',
      sendDealer : '',
      senddealerNm : '',
      sendqtInfoData :{},
      qtInfoData : {},
      saveQtCount : 0,
      isScroll:false,
      brandSelected: '차종 선택',
      brandList: [
        '', 'BMW', 'BENZ', 'AUDI', 'VW', 'FORD', 'LEXUS', '기타'
      ], 
      favoriteBrand:['BENZ', 'BMW','AUDI','LEXUS','MINI', 'VW'],
      europeBrand:['LANDROVER','VOLVO', 'JAGUAR', 'PORSCHE','PEUGEOT','MASERATI'],
      usaBrand:['LINCOLN','JEEP','CHRYSLER','FORD','GM'],
      asiaBrand:['HONDA','TOYOTA','NISSAN','INFINITI'],  
      carBrand:[ 'CADILLAC', 'CITROEN', 'DODGE', 'FIAT',],
      selectedDealer: [],
      showProcessing: false,
      processMsg: '',
      saveCount: 0,
      reqDealerList: [],
      showCarBrandPopup: false, // 브랜드 팝업
    }
  },
  props:['NewQTData'],
  created: function()
  {
    if(this.UserInfo.BsnID === '')
    this.UserInfo.BsnID = this.$cookies.get('BsnID');

    if(this.UserInfo.Name === '')
    this.UserInfo.Name = this.$cookies.get('UserNM');

    if(this.UserInfo.EntNo === '')
    this.UserInfo.EntNo = this.$cookies.get('EntNo');

  },  
  methods: {
    showQTCameraModal(showFlag, type){
      this.showQTCamera = showFlag;
      this.imgCaptureType = type;
    },
    updatePic(pic){
      
      if(pic.length < 100) {
        alert("촬영된 이미지에 이상이 있습니다.\n다시 촬영해 주세요.");
        return;
      }
      
      if(this.imgCaptureType === "CARNO") {
        this.captureImg = pic;
        this.captureBlobImg = dataURItoBlob(pic);
        pic = pic.replace("data:image/png;base64,", "");
        this.CarInfo.CarNo = "이미지 인식 중...";
        this.CarInfo.VinNo = "이미지 인식 중...";
        this.checkImgVIN(pic);
        this.checkImgCarNo(pic);
      }
      else if(this.imgCaptureType === "ITEMIMG") {
        var seq = this.qtRequest.length + 1;

        var now = new Date();
        var key = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                  + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

        var item = {
          "ITM_ICON": "icon-pic.png",
          "ITM_QTY": 1,
          "GRP_ID":"0",
          "ITM_NM":"사진입력",
          "ITM_VAL": "사진Item-" + seq,
          "SEQ": seq,
          "IMG": key + ".png"
        };
        this.qtRequest.push(item);

        var param = {};

        param.name = key + ".png";
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

          param = dataURItoBlob(pic);

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
          }); 

        })
        .catch((error) => {
          console.log(error);
        }); 
      }
    },
    // Google OCR API를 통해 이미지에서 차대번호 추출
    checkImgVIN(pic){
      var param = {};
      param.requests = [];
      var req = {};
      req.image = {};
      req.image.content = pic;
      req.features = [];
      var reqType = {};
      reqType.type = "TEXT_DETECTION";
      req.features.push(reqType);
      param.requests.push(req);    

      axios({
        method: 'POST',
        url: Constant.GOOGLE_URL,
        headers: Constant.JSON_HEADER,
        data: param
      }).then((result) => {
        console.log("======= Google API result ========");
        console.log(result.data);

        if(this.CarInfo.VinNo === "이미지 인식 중...") this.CarInfo.VinNo = "";

        var textArea;
        var vinNo;
        for (var img of result.data.responses) {
          textArea = img.fullTextAnnotation.pages[0].blocks[0];
          //console.log("Area : ", JSON.stringfy(textArea));
          var regType = /^[A-Za-z0-9+]*$/; // 영문 또는 숫자만 체크
          for (var text of img.textAnnotations) {
            if(regType.test(text.description)) {
              if(text.description.length == 17) {
                // 이 것을 차대번호로 인지
                console.log("VIN-17 : ", JSON.stringify(text));
                this.CarInfo.VinNo = text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
              }
              if(text.description.length == 16 || text.description.length == 18) {
                // 이 것을 차대번호로 인지
                this.alertMsg = "차대번호가 인식되었으나\n한자리 정도 오차가 있습니다.\n정확한 차대번호를 확인해 주세요.";
                this.showAlertMsg = !this.showAlertMsg;
                this.alertMsgPath = "";
                this.showAlerMsgBtn = true;

                console.log("VIN-16/18 : ", JSON.stringify(text));
                this.CarInfo.VinNo = text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
              }
            }
          }

          // 여전히 인식 안된 경우 두개의 문자열을 연결하여 한번 더 체크해 보자. 
          if(this.CarInfo.VinNo === "" || this.CarInfo.VinNo === null) {
            var preCheckedString = "";
            for (var text of img.textAnnotations) {
              if(regType.test(text.description)) {
                if(preCheckedString !== ""){
                  var checkString = preCheckedString + text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
                  if(checkString.length == 17) {
                    console.log("VIN-pre : ", JSON.stringify(text));
                    this.CarInfo.VinNo = checkString;
                  }
                }
                preCheckedString = text.description.replace(/\I/g, "1").replace(/\O/g, "0").replace(/\g/g, "9").toUpperCase();
              }
            }
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // DB에서 차대번호를 조회 이력이 있는지 체크
    checkCarVin(){
      if(this.CarInfo.CarNo === null || this.CarInfo.CarNo === ''){
        if(this.CarInfo.VinNo !== null && this.CarInfo.VinNo !== undefined){
          this.setVinBrand();
        }
        return;
      }

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CAR_VIN";
      param.payload = {};
      param.payload.FilterExpression = "CAR = :carno";
      param.payload.ExpressionAttributeValues = {};
      var key = ":carno";
      param.payload.ExpressionAttributeValues[key] = this.CarInfo.CarNo;

      this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');
      this.CarInfo.VinNo = "";

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        // 차대번호가 있는데 괜히 덮어 씌어지지 않게 처리
        if(this.CarInfo.VinNo === "" || this.CarInfo.VinNo === null) {
          console.log("======= checkCarVin result ========");
          console.log(result.data);
          if(result.data.Count > 0) {
            this.CarInfo.VinNo = result.data.Items[0].VIN;
            this.setVinBrand();
            this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
          }
          else {
            this.CarInfo.VinNo = "";

            // DB에 차량이 없다면 Intravan 통해서 국토부 조회 체크 

            param = {};
            param.carNo = this.CarInfo.CarNo;
            param.entNo = this.UserInfo.EntNo;

            axios({
                method: 'POST',
                url: Constant.INTRA_PKGIF_URL,
                headers: Constant.JSON_HEADER,
                data: param
            })
            .then((result) => {
                console.log("======= checkIntraVanPkg result ========");
                console.log(result.data); 
                if(result.data.success === true) {
                  this.CarInfo.VinNo = result.data.data;
                  this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
                  this.setVinBrand();
                }
                else {
                  // 조회 에러가 났다면 고객명을 입력받아 차대 원부 조회
                  this.showVINSearchAgreePopup = true;
                }
            })
            .catch((error) => {
                console.log(error);
            })

            this.CarInfo.VinNo = "국토부 차대번호 조회 중...";
          }
        }
      });
    },
    // 인트라밴을 통해 차대번호를 체크
    checkIntraVanVin(){
      if(this.chkCustAgree === false || this.custName === "") return;

      var param = {};
      param.carNo = this.CarInfo.CarNo;
      param.custName = this.custName;

      axios({
          method: 'POST',
          url: Constant.INTRAIF_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
          console.log("======= checkIntraVanVin result ========");
          console.log(result.data); 
          if(result.data.success === true) {
            this.CarInfo.VinNo = result.data.data;
            this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
            this.setVinBrand();
          }
          else {
            if(result.data.data.indexOf("소유자 성명") >= 0)
              this.CarInfo.VinNo = "소유자 성명 불일치";
            else if(result.data.data.indexOf("일치하는 차량이 없습니다.") >= 0)
              this.CarInfo.VinNo = "차량번호 미 존재";
            else
              this.CarInfo.VinNo = "국토부 조회 중 오류";
          }
      })
      .catch((error) => {
          console.log(error);
      })

      this.CarInfo.VinNo = "차대 원부 조회 중...";
      this.showVINSearchAgreePopup = false;
    },
    // Aibril Vision API를 통해 이미지에서 차량번호 추출
    checkImgCarNo(pic){
      var param = {};
      param.name = "최범진";
      param.returnResultImage = false;
      param.image = pic;

      axios({
        method: 'POST',
        url: Constant.AIBRIL_URL,
        headers: Constant.AIBRIL_HEADER,
        data: param
      }).then((result) => {
        console.log("======= Aibril API result ========");
        console.log(result.data);

        if(this.CarInfo.CarNo === "이미지 인식 중...") this.CarInfo.CarNo = "";

        for (var img of result.data.results) {
          if(img.carNo.length > 4) {
            console.log("CarNo : ", img.carNo);
            this.CarInfo.CarNo = img.carNo;
            this.checkWebPOSHist();
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // WebPOS에 과거 정비내역이 있는지 체크
    checkWebPOSHist(){
     
      if((this.CarInfo.CarNo === '' || this.CarInfo.CarNo === null || this.CarInfo.CarNo === undefined) &&
          (this.CarInfo.VinNo === '' || this.CarInfo.VinNo === null || this.CarInfo.VinNo === undefined)) 
      return;

      this.showROHistBtn = false;
      if(this.CarInfo.VinNo === '' && this.CarInfo.VinNo === null && this.CarInfo.VinNo === undefined)
      this.CarInfo.VinNo = this.CarInfo.VinNo.toUpperCase();
      
      if(this.UserInfo.UserType === 'SITE' || this.UserInfo.UserType === 'SITEF') { // WebPOS일 경우 정비 이력 조회 이후 차대번호 세팅

        var param = {};
        param.BsnId = this.UserInfo.BsnID;
        param.CarNo = (this.CarInfo.CarNo === null)?'':this.CarInfo.CarNo;
        param.VinNo = this.CarInfo.VinNo;

        this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');

        console.log("======= ROHistory Request result ========");
        console.log(param); 

        var rtnCode = "";
        var rtnCount = 0;
        if(this.CarInfo.VinNo === null || this.CarInfo.VinNo === undefined){
          this.CarInfo.VinNo = "WebPOS 이력 조회 중...";
        }
        axios({
            method: 'POST',
            url: Constant.SCPIF_URL + 'GetROList',
            headers: Constant.JSON_HEADER,
            data: param
        })
        .then((result) => {
            console.log("======= ROHistory Return result ========");
            console.log(result.data); 
            if(result.data.ReturnDataCount > 0) {
              this.showROHistBtn = true;

              if(Array.isArray(result.data.ReturnDataJSON))
              {
                result.data.ReturnDataJSON.sort(function(a, b){
                  return (a.DC_DY_BSN > b.DC_DY_BSN) ? 1 : -1;
                });
              }

              this.roList = JSON.parse(result.data.ReturnDataJSON);
              
              this.CarInfo.VinNo = result.data.ReturnObject;
              this.setVinBrand();
            }
            else if (result.data.ReturnObject !== "" && result.data.ReturnObject !== null) {
              this.CarInfo.VinNo = result.data.ReturnObject;
              this.setVinBrand();
            }
            else {
              // 정비이력 조회는 차량번호 입력 or 인식 후 자동 처리 되므로 차대번호 조회도 자동 처리하자...
              this.checkCarVin();
            }
            this.showVINSearchBtn = true;
        })
        .catch((error) => {
            console.log(error);
            this.CarInfo.VinNo = "";
        })
       // this.CarInfo.VinNo = "WebPOS 이력 조회 중...";
      }
      else { // 일반 카세터면 WebPOS 조회 없이 자체 저장 내역 체크

          var now = new Date();
          var startDate = (now.getFullYear() - 1) + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);        

          var param = {};
          param.carNo = this.CarInfo.CarNo;
          param.idNo = this.UserInfo.BsnID;
          param.sDate = startDate;

          this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');

          console.log("======= ROHistory Request result ========");
          console.log(param); 

          var rtnCode = "";
          var rtnCount = 0;
        
          axios({
              method: 'POST',
              url: Constant.INTRA_HISTIF_URL,
              headers: Constant.JSON_HEADER,
              data: param
          })
          .then((result) => {
              console.log("======= ROHistory Return result ========");
              console.log(result.data); 
              var rtnData = result.data;
              this.CarInfo.VinNo = "";
              if(rtnData.data.result === 'ok') {
                this.showROHistBtn = true;

                if(Array.isArray(rtnData.data.dataset))
                {
                  rtnData.data.dataset.sort(function(a, b){
                    return (a.inDay > b.inDay) ? 1 : -1;
                  });
                }

                var roHisList = [];
                var keyList = [];

                for(var his of rtnData.data.dataset) {
                  if(keyList.indexOf(his.inDay) === -1) {
                    var ro = {};
                    ro.CAR_NO = this.CarInfo.CarNo;
                    ro.DC_DY_BSN = his.inDay;
                    ro.NM_CR_TEC = rtnData.data.carName;
                    ro.RO_NM = '차량 정비';
                    ro.DST_CR = his.lastkm;

                    roHisList.push(ro);
                    keyList.push(his.inDay);
                  }
                }
                this.roList = roHisList;

                this.checkCarVin();
              }
              else {
                // 정비이력 조회는 차량번호 입력 or 인식 후 자동 처리 되므로 차대번호 조회도 자동 처리하자...
                this.checkCarVin();
              }
              
              this.showVINSearchBtn = true;
          })
          .catch((error) => {
              console.log(error);
              this.CarInfo.VinNo = "";
          })
          this.CarInfo.VinNo = "IntraVan 이력 조회 중...";
      }
    },
    showQTConfirmModal() {
      this.dealerList = [];

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CARCENTER_DEALER";
      param.payload = {};
      param.payload.FilterExpression = "CARCENTER = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= dealerList result ========");
        console.log(result.data);
        if(Array.isArray(result.data.Items))
        {
          result.data.Items.sort(function(a, b){
          return (a.TYPE > b.TYPE) ? 1 : -1;
          });
        }

        this.dealerList = result.data.Items;

        let mainDealer = this.dealerList.find(element => element.TYPE === 'A')
        this.selectedDealer = [mainDealer];
      });

      // 기타부품 체크
      if(this.tempItem.ITM_NM.replace(/\s/gi, "") !== "")
      { 
        console.log("기타부품추가추");
        var tmpItemNm = this.tempItem.ITM_NM.replace(/\s{1}/i, "");
        var newItem = {};
        newItem.ITM_ICON = " ";
        newItem.ITM_QTY = this.tempItem.ITM_QTY;
        newItem.GRP_ID = " ";
        newItem.ITM_NM = tmpItemNm;

        newItem.ITM_VAL = tmpItemNm + this.qtRequest.length + 1 ;
        newItem.GRP_NM = " ";
        newItem.SEQ =  this.qtRequest.length + 1;
        this.qtRequest.push(newItem);

        // 기타부품 초기화
        this.tempItem.ITM_QTY = 1;
        this.tempItem.ITM_NM = " ";
        this.tempItem.ITM_VAL = " ";
        this.tempItem.SEQ = 0;
      }
      
      this.showQTConfirm = !this.showQTConfirm;
      // this.isScroll = true;
        
    },
    showItemCategoryModal(id) {
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_ITM_CTGRY";
      param.payload = {};
      param.payload.FilterExpression = "GRP_ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = id;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= categoryList result ========");
        console.log(result.data);

      if(Array.isArray(result.data.Items))
      {
        result.data.Items.sort(function(a, b){
          return (a.SORT > b.SORT) ? 1 : -1;
        });
      }

        this.categoryTitle = result.data.Items[0].GRP_NM;
        this.categoryList = result.data.Items;
      });

      this.showItemCategory = !this.showItemCategory;
    },
    addNewItem(item) {
      if(item.ITM_VAL === " ")
      {
          var tmpItmNm = item.ITM_NM.replace(/\s{1}/i, "");
          var tempItem = {};
          tempItem.ITM_ICON = " ";
          tempItem.ITM_QTY = item.ITM_QTY;
          tempItem.GRP_ID = " ";
          if(item.ITM_NM.replace(/\s/gi, "") === ""){
            return;
          }
          else{
            tempItem.ITM_NM = tmpItmNm;
          }
          
          tempItem.ITM_VAL = tmpItmNm + this.qtRequest.length + 1 ;
          tempItem.GRP_NM = " ";
          tempItem.SEQ =  this.qtRequest.length + 1;
          this.qtRequest.push(tempItem);
          
          // 기타부품 초기화
          item.ITM_QTY = 1;
          item.ITM_NM = " ";
          item.ITM_VAL = " ";
          item.SEQ = 0;
      }
      else{

        if(this.selectedCategory.indexOf(item.ITM_VAL) === -1) { // 새로 추가된 경우
          item.SEQ = this.qtRequest.length + 1;
          this.qtRequest.push(item);
        }
        else { // 체크 해제 한 경우
          this.qtRequest = this.qtRequest.filter(it => it.ITM_VAL != item.ITM_VAL);
        }
      }
        /*console.log(Array.isArray(this.requests));*/
      console.log('qtRequest : ' + JSON.stringify(this.qtRequest));
    },
    removeItem(item) {
      /*console.log('Index : ' + this.selectedCategory.indexOf(item.ITM_NM));*/
      this.qtRequest = this.qtRequest.filter(it => it.ITM_VAL != item.ITM_VAL);
      if(this.selectedCategory.indexOf(item.ITM_NM) >= 0){
        this.$delete(this.selectedCategory , this.selectedCategory.indexOf(item.ITM_NM));
      }
      /*console.log(Array.isArray(this.selectedCategory));
      console.log('selectedCategory : ' + this.selectedCategory);*/
    },
    addNewQTRequest() {
      
      var docId = '';
      var now = new Date();

      console.log('selectedDealer :' ,  this.selectedDealer);

      var index = this.selectedDealer.findIndex(i => i.TYPE === 'A');
      if(index === -1){
        // 선택 된 대리점 중 대표대리점이 없으면 첫번째 대리점을 대표로 설정
        this.selectedDealer[0].TYPE = 'A'
      }
      
      var reqSeq = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      this.processMsg = "견적 요청 중입니다. \n잠시만 기다려주세요.";
      this.showProcessing = true;
      this.saveQtCount = 0;

      this.selectedDealer.forEach( dealer => {
          
        if(dealer.DEALER === 'PARTS')
        {
          //console.log('부품지원센터 저장 !!');
          // 부품지원센터
          var param = {};
          param.BsnId = this.UserInfo.BsnID;
          param.UserId = this.UserInfo.UserID;
          param.CarNo = this.CarInfo.CarNo;
          param.VinNo = this.CarInfo.VinNo;
          
          if(Array.isArray(this.roList) && this.roList.length > 0  ){
            
            param.KTYPNR  = this.roList[0].KTYPNR ;
            param.CD_CR_DTL = this.roList[0].CD_CR_DTL ;
            param.MCODE = this.roList[0].MCODE ;
            
          }
          else{
            
            param.KTYPNR  = '0' ;
            param.CD_CR_DTL = '' ;
            param.MCODE = '' ;
          
          }
            
          param.Memo = this.qtReqMemo;
          if(this.qtRequest !== undefined || this.qtRequest !== null || this.qtRequest.length !== 0 )
          {
              let qtList = JSON.parse(JSON.stringify( this.qtRequest ));
              qtList = convertArrayToSpecStr(qtList);
              console.log('QT List : ' , qtList );
              console.log('this.qtRequest : ' , this.qtRequest );
              param.RequestDataJSON = JSON.stringify(qtList);
          }

          console.log("======= webpos Request result ========");
          console.log(JSON.stringify(param));

          axios({
              method: 'POST',
              url: Constant.SCPIF_URL + 'SaveQTData',
              headers: Constant.JSON_HEADER,
              data: param
          })
          .then((result) => {
            console.log("======= webpos result ========");
            console.log(result.data);

            var rtnCode = result.data.ReturnCode;
            if(rtnCode === 0)
            {
              docId = result.data.ReturnObject;  // 견적ID 
              // 견적저장
              this.saveQTData(docId , dealer.DEALER, dealer.DEALER_NAME , dealer.TYPE, reqSeq);
            }
            else
            {
              this.showProcessing = false;
              this.saveQtCount = 0;
              this.alertMsg = "WebPOS 견적 요청 중 에러가 발생했습니다.\n다시 요청해 주세요. (Code:"+rtnCode+")";
              this.showAlertMsg = !this.showAlertMsg;
              this.showAlerMsgBtn = true;
            }
          })
          .catch((error) => {
            this.showProcessing = false;
            this.saveQtCount = 0;
            this.alertMsg = "WebPOS 견적 요청 중 에러가 발생했습니다.\n다시 요청해 주세요. (Code:99)";
            this.showAlertMsg = !this.showAlertMsg;
            this.showAlerMsgBtn = true;
            console.log(error);
          });
        }
        else{
            //console.log('대리점 저장 !!');
            now = new Date();
            docId = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)  + this.CarInfo.VinNo + 
                    datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2) ;
            // 견적저장
            this.saveQTData(docId , dealer.DEALER,  dealer.DEALER_NAME ,dealer.TYPE, reqSeq);
        }
      });
    },
    saveQTData(docId , dealer , dealerNm, dealerType, reqSeq)
    {
      this.saveQtCount++;
      var now = new Date();
      var imgKey = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                  + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var param = {};
      param.operation = "create";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = docId;
      param.payload.Item.CarNo = convertStringToDynamo(this.CarInfo.CarNo);
      param.payload.Item.CarVin = convertStringToDynamo(this.CarInfo.VinNo);
      param.payload.Item.CarBrand = this.brandSelected;
      param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      param.payload.Item.ReqSite = convertStringToDynamo(this.UserInfo.BsnID);
      param.payload.Item.ReqSiteType = convertStringToDynamo(this.UserInfo.UserType);
      param.payload.Item.ReqName = convertStringToDynamo(this.UserInfo.Name);
      param.payload.Item.ReqSeq = reqSeq;
      param.payload.Item.ResDealer = dealer;
      param.payload.Item.ResDealerNm = dealerNm;
      param.payload.Item.Memo = convertStringToDynamo(this.qtReqMemo);
      param.payload.Item.QTSts = "견적요청";
      param.payload.Item.ReqUserID = this.UserInfo.UserID;
      if(this.captureBlobImg !== '')
        param.payload.Item.IMG = imgKey + ".png";
      else
        param.payload.Item.IMG = "*empty*";
      //param.payload.Item.LineItem = JSON.stringify(this.qtRequest);
      param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.qtRequest));

      this.qtInfoData = param.payload.Item;
      if(dealerType === 'A')
      {
        this.sendDocId =  docId;
        this.sendDealer = dealer;
        this.sendDealerNm = dealerNm;
        this.sendqtInfoData = this.qtInfoData;
      }
      console.log("======= QT Save result ========");
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

        if(dealerType !== 'A')
        {
          this.saveChating(docId , dealer);
        }
      })
      .catch((error) => {
        console.log(error);
        this.showProcessing = false;
        this.saveQtCount = 0;
        this.alertMsg = "견적 저장 중 에러가 발생했습니다.\n다시 요청해 주세요. (Code:"+rtnCode+")";
        this.showAlertMsg = !this.showAlertMsg;
        this.showAlerMsgBtn = true;
      });

      console.log("this.captureBlobImg : ", this.captureBlobImg);

      if(this.captureBlobImg !== '') {

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

          param = this.captureBlobImg;

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
          }); 

        })
        .catch((error) => {
          console.log(error);
        }); 
      }

      if( this.selectedDealer.length === this.saveQtCount ){
        this.showProcessing = false;
        this.goChating();
      }
    },
    goChating()
    {
      // 대표 대리점 채팅 전송
      var now = new Date();
      this.$router.push({name:'Chat', 
                        params:{
                              chatid: this.sendDocId, 
                              carNo: this.CarInfo.CarNo,
                              chatFrom: this.UserInfo.BsnID,
                              chatTo: this.sendDealer,
                              chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2),
                              qtInfo : this.sendqtInfoData,
                              chatDealerNm : this.sendDealerNm
                          }});

    },
    saveChating(docId , dealer)
    {
      var msg = "";
      if( this.CarInfo.CarNo === null ||  this.CarInfo.CarNo === ''){
        msg = "미상차량에 대한 견적이 요청됐습니다.";
      }
      else{
        msg = this.CarInfo.CarNo + " 차량에 대한 견적이 요청됐습니다.";
      }
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      
      var adminYn = localStorage.getItem('AdminYn');
      var adminName = localStorage.getItem('AdminName');

      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : dealer};
      chatMsg.msg  = msg;
      chatMsg.reqTm = chatTime;
      if(adminYn === "Y"){
        chatMsg.SaveName = adminName;
      }
      else{
        chatMsg.SaveName = this.UserInfo.Name;
      }
      this.msgDatas = chatMsg;
        
      var param = {};
      var id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var key = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      param.operation = "create";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = docId;
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo =  dealer;
      param.payload.Item.Message = chatMsg.msg;
      //param.payload.Item.Status = "0";
      param.payload.Item.ReadYn = "0";
      param.payload.Item.ReqTm = chatMsg.reqTm;
      param.payload.Item.IMG = chatMsg.imgId;
      param.payload.Item.ChatType = 'Q';
      param.payload.Item.RefID = ' ';

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
        
        var sendNm = this.UserInfo.Name
        if(adminYn === "Y"){
          sendNm = adminName;
        }

        this.$sendMessage({
          name: this.UserInfo.BsnID,
          msg,
          recv:  dealer,
          chatId: id,
          docId: docId,
          reqTm : chatTime,
          qtInfo : this.qtInfoData,
          chatType : "Q",
          sendId: this.UserInfo.UserID,
          sendName: sendNm,
          sendFlag: "CARCENTER"
        });

        })
      .catch((error) => {
        console.log(error);
      });
    },
    addCounter: function(idx) {
      if(idx === undefined)
      {
          this.tempItem.ITM_QTY++;
      }
      else{
        this.qtRequest[idx].ITM_QTY++;
      }
    },
    subCounter: function(idx) {

      if(idx === undefined)
      {
        this.tempItem.ITM_QTY--;
        if( this.tempItem.ITM_QTY < 0)
        {
          this.tempItem.ITM_QTY = 0;
        }
      }
      else
      {
        this.qtRequest[idx].ITM_QTY--;
        if( this.qtRequest[idx].ITM_QTY < 0)
        {
            this.qtRequest[idx].ITM_QTY = 0;
        }
      }
    },
    checkQtData() {
         
      if(this.selectedDealer.length === 0){
        this.alertMsg = "선택한 견적요청 대리점이 없습니다.\n대리점을 선택 해 주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.showAlerMsgBtn = true;
        return false;
      }

      if(this.UserInfo === null){
        //alert("로그인 정보가 없습니다. \r 다시 로그인 해주세요.");
        this.alertMsg = "로그인 정보가 없습니다.\n다시 로그인 해주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.alertMsgPath = "Login";
        this.showAlerMsgBtn = true;
        return false;
      }

      if(this.UserInfo.BsnID === undefined || this.UserInfo.BsnID === null || this.UserInfo.BsnID.length === 0 ){
        this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.alertMsgPath = "Login";
        this.showAlerMsgBtn = true;
        return false;
      }

      if(this.UserInfo.UserID === undefined || this.UserInfo.UserID === null || this.UserInfo.UserID === 0 ){
        this.alertMsg = "로그인 정보가 없습니다.\n다시 로그인 해주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.alertMsgPath = "Login";
        this.showAlerMsgBtn = true;
        return false;
      }

      if(this.UserInfo.BsnID === undefined || this.UserInfo.BsnID === null || this.UserInfo.BsnID.length === 0 ){
        this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.alertMsgPath = "Login";
        this.showAlerMsgBtn = true;
        return false;
      }
      
      if(this.UserInfo.Name === undefined || this.UserInfo.Name === null || this.UserInfo.Name.length === 0 ){
        this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.alertMsgPath = "Login";
        this.showAlerMsgBtn = true;
        return false;
      }
        /*
        if(this.CarInfo.CarNo === undefined || this.CarInfo.CarNo === null || this.CarInfo.CarNo.length === 0 )
        {
          this.alertMsg = "차량번호가 없습니다."
          this.showAlertMsg = !this.showAlertMsg;
          return false;
        }
        */
      if(this.CarInfo.VinNo === undefined || this.CarInfo.VinNo === null || this.CarInfo.VinNo.length === 0 || this.CarInfo.VinNo === "국토부 차대번호 조회 중...")
      {
        //this.alertMsg = "차대번호가 없습니다.\n차대번호 없이 요청하시겠습니까?"
        this.alertMsg = "차대번호가 없거나 조회 중입니다.\n차대번호를 확인 해 주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.showAlerMsgBtn = true;
        this.showAlerMsgConfirmBtn = false;  
        return false;
      }

      if(this.CarInfo.VinNo === "WebPOS 이력 조회 중..." || this.CarInfo.VinNo === "국토부 차대번호 조회 중..." || this.CarInfo.VinNo === "이미지 인식 중..." || this.CarInfo.VinNo === "IntraVan 이력 조회 중..." || this.CarInfo.VinNo === "차대 원부 조회 중...")
      {
        this.alertMsg = "차대번호 조회 중입니다.\n잠시 후 견적요청 해주세요. ."
        this.showAlertMsg = !this.showAlertMsg;
        this.showAlerMsgBtn = true;
        this.showAlerMsgConfirmBtn = false;  
        return false;
      }

      if(this.CarInfo.CarNo !== undefined && this.CarInfo.CarNo.length > 0 && this.CarInfo.VinNo === "99999999999999999")
      {
        this.alertMsg = "차대번호를 확인 해 주세요."
        this.showAlertMsg = !this.showAlertMsg;
        this.showAlerMsgBtn = true;
        this.showAlerMsgConfirmBtn = false;  
        return false;
      }
      /*
        if(this.qtRequest === undefined || this.qtRequest === null || this.qtRequest.length === 0 )
        {
          this.alertMsg = "견적요청 리스트가 없습니다."
          this.showAlertMsg = !this.showAlertMsg;
          return false;
        }
     */
      if(this.CarInfo.VinNo.length === 17 && this.brandSelected === '차종 선택'){
        let pre = this.CarInfo.VinNo.substring(0,2).toUpperCase();
        let param = {};
        param.operation = "list";
        param.tableName = "BAY4U_BRAND";
        param.payload = {};
        param.payload.FilterExpression = "contains(PRE, :pre)";
        param.payload.ExpressionAttributeValues = {};
        let key = ":pre";
        param.payload.ExpressionAttributeValues[key] = pre;

        console.log("======= vin pre request ========");
        console.log(param);

        axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          console.log("======= vin pre result ========");
          console.log(result.data);

          let vinList = result.data.Items;
          let index  = -1;

          // VinNo 앞 5자리 체크
          let vinNo5 = this.CarInfo.VinNo.substring(0,5).toUpperCase();
          let vinIndex = vinList.findIndex(x => x.PRE === vinNo5);
          
          if(vinIndex === -1){
            // VinNo 앞 5자리 불일치
            // VinNo 앞 4자리 체크
            let vinNo4 = this.CarInfo.VinNo.substring(0,4).toUpperCase();
            vinIndex = vinList.findIndex(x => x.PRE === vinNo4);
            
            if(vinIndex === -1){
              // VinNo 앞 4자리 불일치
              // VinNo 앞 3자리 체크
              let vinNo3 = this.CarInfo.VinNo.substring(0,3).toUpperCase();
              vinIndex = vinList.findIndex(x => x.PRE === vinNo3);
              
              if(vinIndex === -1){
                // VinNo 앞 3자리 불일치
                // VinNo 앞 2자리 체크
                let vinNo2 = this.CarInfo.VinNo.substring(0,2).toUpperCase();
                vinIndex = vinList.findIndex(x => x.PRE === vinNo2);
                console.log('VinNo 앞 2자리:', vinNo2 +'/'+vinIndex);
                if(vinIndex === -1){
                  // VinNo 앞 2자리 불일치
                  this.brandSelected= '기타';
                }
                else{
                  // VinNo 앞 2자리 일치
                  index = this.brandList.indexOf(vinList[vinIndex].BRAND);
                  if(index === -1){ 
                    this.brandList.push(vinList[vinIndex].BRAND);
                  }
                  this.brandSelected = vinList[vinIndex].BRAND;
                }
              }
              else{
                // VinNo 앞 3자리 일치
                index = this.brandList.indexOf(vinList[vinIndex].BRAND);
                if(index === -1){ 
                  this.brandList.push(vinList[vinIndex].BRAND);
                }
                this.brandSelected = vinList[vinIndex].BRAND;
              }
            }
            else{
              // VinNo 앞 4자리 일치
              index = this.brandList.indexOf(vinList[vinIndex].BRAND);
              if(index === -1){ 
                this.brandList.push(vinList[vinIndex].BRAND);
              }
              this.brandSelected = vinList[vinIndex].BRAND;
            }
          }
          else{
            // VinNo 앞 5자리 일치
            index = this.brandList.indexOf(vinList[vinIndex].BRAND);
            if(index === -1){ 
              this.brandList.push(vinList[vinIndex].BRAND);
            }
            this.brandSelected = vinList[vinIndex].BRAND;
          }
          this.addNewQTRequest();
        })
        .catch((error) => {
          console.log(error);
        });
      }
      else{
        this.addNewQTRequest();
      }
    },
    closeMsg(path) {     
      this.showAlertMsg = false;
      if(path.length > 0 && path == 'Login')
      {
          this.$router.push('/');
      }
    },
    CheckReqVinNoQT(value) {
      if(value === true){
        this.CarInfo.VinNo = "99999999999999999";
        this.addNewQTRequest();
        //console.log("VinNo : ", this.CarInfo.VinNo);
      }
      
      this.showAlertMsg = false;
      this.showAlerMsgConfirmBtn = false;
      this.alertYesNo = value;
    },
    ShowDummyCarAlert()
    {
      this.alertMsg = "차량정보 입력 없이 진행하시겠습니까?"
      this.showAlertPopup = true;
      return false;
    },
    SetDummyCar() {
      this.CarInfo.CarNo = "";
      this.CarInfo.VinNo = "99999999999999999";
      this.e6 = 2;
      this.showAlertPopup = false;
    },
    closePopup(){
      this.showAlertPopup = false;
    },
    CarInfoClear() {
      this.CarInfo.CarNo = "";
      this.CarInfo.VinNo = "";
      this.showVINSearchBtn = false;
      this.showROHistBtn = false;
      this.captureImg = "";
      this.brandSelected = '차종 선택';
      this.$cookies.set('CarNo', this.CarInfo.CarNo, '600s');
      this.$cookies.set('VinNo', this.CarInfo.VinNo, '600s');
    },
    changeImageSize() {
      if(this.imgSize === "100%")
        this.imgSize = "115";
      else
      this.imgSize = "100%";
    },
    goOrderList()
    {
      let CarInfoData = {};
      CarInfoData.CarNo = this.CarInfo.CarNo;
      CarInfoData.VinNo = this.CarInfo.VinNo;
      CarInfoData.CarBrand = this.brandSelected;
      CarInfoData.Memo = this.qtReqMemo;
      CarInfoData.captureBlobImg = this.captureBlobImg;
      
      this.$router.push({name:'QTList', 
                params:{
                      DocID: '', 
                      RefID: '',
                      CarInfoData: CarInfoData,
                      Type: 'orderHistory'
                }});
    },
    checkQtOrder(){
      if(this.qtRequest.length === 0){
        this.showAlertMsg = true;
        this.alertMsg = "요청 부품 리스트가 없습니다.\n요청 부품을 선택 해 주세요.";
        return;
      }

      let partsDealer = [];
      partsDealer = this.selectedDealer.filter( x => x.DEALER === 'PARTS');
      console.log('partsDealer:' ,partsDealer.length );
      if(partsDealer.length > 0){
        this.showAlertMsg = true;
        this.alertMsg = "부품지원센터는 바로주문 할 \n수 없습니다.";
        return;
      }

      // 부품지원센터 빼고 선택 대리점 리스트 셋팅
      
      this.reqDealerList = this.selectedDealer.filter( x => x.DEALER !== 'PARTS');

      if(this.reqDealerList.length === 0){
        this.showAlertMsg = true;
        this.alertMsg = "요청 할 대리점을 선택 해 주세요.";
        return;
      }
      
      this.alertMsg = "바로주문 요청하시겠습니까?"
      this.showAlertOrdMsg = !this.showAlertOrdMsg;
      this.showAlerMsgBtn = false;
      this.showMsgOrdConfirmBtn = !this.showMsgOrdConfirmBtn;  
      return false;
    },
    saveQTOrder(){

      let index = this.reqDealerList.findIndex(i => i.TYPE === 'A');
      if(index === -1){
        // 선택 된 대리점 중 대표대리점이 없으면 첫번째 대리점을 대표로 설정
        this.reqDealerList[0].TYPE = 'A'
      }

      let reOrderCarNo = this.CarInfo.CarNo;
      if(reOrderCarNo === '' || reOrderCarNo === undefined || reOrderCarNo === null){
        reOrderCarNo = "*empty*";
      }

      let reOrderVinNo = this.CarInfo.VinNo;
      if(reOrderVinNo === '' || reOrderVinNo === undefined || reOrderVinNo === null){
        reOrderVinNo = "99999999999999999";
      }

      let now = new Date();
      let reqSeq = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                  + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      let docId = '';
      let imgKey = '';

      if(this.showProcessing === false){ 
        this.processMsg = "바로주문 중입니다. \n잠시만 기다려주세요.";
        this.showProcessing = true;
      }
        
      this.reqDealerList.forEach(dealer => {

        this.saveCount++;
        
        now = new Date();
        docId = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)  + reOrderVinNo + 
                      datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2) ;
        imgKey = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                  + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

        // 신규견적 생성
        let param = {};
        param.operation = "create";
        param.tableName = "BAY4U_QT_LIST";
        param.payload = {};
        param.payload.Item = {};
        param.payload.Item.ID = docId;
        param.payload.Item.CarNo = reOrderCarNo;
        param.payload.Item.CarVin = reOrderVinNo;
        param.payload.Item.CarBrand = this.brandSelected;
        param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
        param.payload.Item.ReqSite = this.UserInfo.BsnID;
        param.payload.Item.ReqSiteType = convertStringToDynamo(this.UserInfo.UserType);
        param.payload.Item.ReqName = this.UserInfo.Name;
        param.payload.Item.ReqSeq = reqSeq;
        param.payload.Item.ResDealer = dealer.DEALER;
        param.payload.Item.ResDealerNm = dealer.DEALER_NAME;
        param.payload.Item.Memo = convertStringToDynamo(this.qtReqMemo);
        param.payload.Item.QTSts = "바로주문";
        param.payload.Item.ReqUserID = this.UserInfo.UserID;
        if(this.captureBlobImg !== '')
          param.payload.Item.IMG = imgKey + ".png";
        else
          param.payload.Item.IMG = "*empty*";
        
        param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.qtRequest));

        this.qtInfoData = param.payload.Item;
        if(dealer.TYPE === 'A')
        {
          this.sendDocId =  docId;
          this.sendDealer = dealer.DEALER;
          this.sendDealerNm = dealer.DEALER_NAME;
          this.sendqtInfoData = this.qtInfoData;
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

          // 채팅저장
          this.saveChatOrder(docId , dealer , reOrderCarNo, this.reqDealerList);

          if(this.captureBlobImg !== '') {
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

              param = this.captureBlobImg;

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
    saveChatOrder(docId , dealer , carNo , dealerList)
    {
      let msg =  ((carNo === "*empty*") ? "미상차량" : carNo) + " 차량 부품 바로주문 요청 완료!!";
      let now = new Date();
      let chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      let chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : dealer.DEALER};
      chatMsg.msg  = msg;
      chatMsg.reqTm = chatTime;
        
      let param = {};
      let id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      let key = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      param.operation = "create";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = docId;
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo =  dealer.DEALER;
      param.payload.Item.Message = chatMsg.msg;
      //param.payload.Item.Status = "0";
      param.payload.Item.ReadYn = "0";
      param.payload.Item.ReqTm = chatMsg.reqTm;
      param.payload.Item.ChatType = "O";
      param.payload.Item.RefID = ' ';

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
        
        var sendNm = this.UserInfo.Name
        if(adminYn === "Y"){
          sendNm = adminName;
        }

        this.$sendMessage({
          name: this.UserInfo.BsnID,
          msg,
          recv:   dealer.DEALER,
          chatId: id,
          docId: docId,
          reqTm: chatMsg.reqTm,
          qtInfo: this.qtInfoData,
          chatType: "O",
          refId: ' ',
          sendId: this.UserInfo.UserID,
          sendName: sendNm,
          sendFlag: "CARCENTER"
				});
				
				if( dealerList.length === this.saveCount )
				{
					this.showProcessing = false;
					this.$router.push({name:'Chat', 
            params:{
                  chatid: docId, 
                  carNo:  carNo,
                  chatFrom: this.UserInfo.BsnID,
                  chatTo: dealer.DEALER,
                  chatDate: now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2),
                  qtInfo : this.qtRequest,
                  chatDealerNm : this.sendDealerNm,
                  chatType:'order',
              }});
				}
      })
      .catch((error) => {
				console.log(error);
				this.showProcessing = false;
				this.saveCount = 0;
      });
    },
    returnOrdMsgYesNo(value)
    {
      if(value === true)
      {
        this.saveQTOrder();
      }
      this.showAlertOrdMsg = false;
      this.showMsgOrdConfirmBtn = false;
      this.alertYesNo = value;
    },
    setVinBrand()
    {
      if(this.CarInfo.VinNo === null)return;

      let pre = this.CarInfo.VinNo.substring(0,2).toUpperCase();
      let param = {};
      param.operation = "list";
      param.tableName = "BAY4U_BRAND";
      param.payload = {};
      param.payload.FilterExpression = "contains(PRE, :pre)";
      param.payload.ExpressionAttributeValues = {};
      let key = ":pre";
      param.payload.ExpressionAttributeValues[key] = pre;

      console.log("======= vin pre request ========");
      console.log(param);

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= vin pre result ========");
        console.log(result.data);

        let vinList = result.data.Items;
        let index  = -1;

        // VinNo 앞 5자리 체크
        let vinNo5 = this.CarInfo.VinNo.substring(0,5).toUpperCase();
        let vinIndex = vinList.findIndex(x => x.PRE === vinNo5);
        
        if(vinIndex === -1){
          // VinNo 앞 5자리 불일치
          // VinNo 앞 4자리 체크
          let vinNo4 = this.CarInfo.VinNo.substring(0,4).toUpperCase();
          vinIndex = vinList.findIndex(x => x.PRE === vinNo4);
          
          if(vinIndex === -1){
            // VinNo 앞 4자리 불일치
            // VinNo 앞 3자리 체크
            let vinNo3 = this.CarInfo.VinNo.substring(0,3).toUpperCase();
            vinIndex = vinList.findIndex(x => x.PRE === vinNo3);
            
            if(vinIndex === -1){
              // VinNo 앞 3자리 불일치
              // VinNo 앞 2자리 체크
              let vinNo2 = this.CarInfo.VinNo.substring(0,2).toUpperCase();
              vinIndex = vinList.findIndex(x => x.PRE === vinNo2);
              console.log('VinNo 앞 2자리:', vinNo2 +'/'+vinIndex);
              if(vinIndex === -1){
                // VinNo 앞 2자리 불일치
                this.brandSelected= '기타';
              }
              else{
                // VinNo 앞 2자리 일치
                index = this.brandList.indexOf(vinList[vinIndex].BRAND);
                if(index === -1){ 
                  this.brandList.push(vinList[vinIndex].BRAND);
                }
                this.brandSelected = vinList[vinIndex].BRAND;
              }
            }
            else{
              // VinNo 앞 3자리 일치
              index = this.brandList.indexOf(vinList[vinIndex].BRAND);
              if(index === -1){ 
                this.brandList.push(vinList[vinIndex].BRAND);
              }
              this.brandSelected = vinList[vinIndex].BRAND;
            }
          }
          else{
            // VinNo 앞 4자리 일치
            index = this.brandList.indexOf(vinList[vinIndex].BRAND);
            if(index === -1){ 
              this.brandList.push(vinList[vinIndex].BRAND);
            }
            this.brandSelected = vinList[vinIndex].BRAND;
          }
        }
        else{
          // VinNo 앞 5자리 일치
          index = this.brandList.indexOf(vinList[vinIndex].BRAND);
          if(index === -1){ 
            this.brandList.push(vinList[vinIndex].BRAND);
          }
          this.brandSelected = vinList[vinIndex].BRAND;
        }
      })
      .catch((error) => {
				console.log(error);
      });
    },
    clickBrandSelect(brand) {
      let targetIndex = this.brandList.indexOf(brand);
      if(targetIndex === -1){ 
        this.brandList.push(brand);
      }
      this.brandSelected = brand;
      this.showCarBrandPopup = !this.showCarBrandPopup;
    },
  },
  components: {
    ItemCategory: ItemCategory,
    QTConfirm: QTConfirm,
    QTCamera: QTCamera,
    ROHistory:ROHistory,
    MessageBox: MessageBox,
  },    
    computed:{
      CarInfo: {
          get() { return this.$store.getters.CarInfo },
          set(value) { this.$store.dispatch('UpdateCarInfo',value) }
      },
      UserInfo: {
          get() { return this.$store.getters.UserInfo },
          set(value) { this.$store.dispatch('UpdateUserInfo',value) }
      },
      msgDatas: {
          get() { return this.$store.getters.msgDatas },
          set(value) { this.$store.dispatch('UpdateSetMsgData',value) }
      },

      dealerCount: function() {
        let dealerCount = 0;
        dealerCount = this.selectedDealer.length;
        return dealerCount;
      },
    },
    mounted() {
      datePadding();
      convertStringToDynamo();
      console.log('NewQTData : ', this.NewQTData);

      if(this.NewQTData !== undefined){
        if(this.NewQTData.CarNo !== undefined)
        this.CarInfo.CarNo = this.NewQTData.CarNo;

        if(this.NewQTData.VinNo !== undefined)
        this.CarInfo.VinNo = this.NewQTData.VinNo;

        if(this.NewQTData.CarBrand !== undefined)
        this.brandSelected = this.NewQTData.CarBrand;

        if(this.NewQTData.LineItem !== undefined)
        {
          this.NewQTData.LineItem.forEach(item =>{
               this.addNewItem(item);
          });
        }
      }
      
/*
      var self = this;
       window.addEventListener("scroll", function (e) {
        if(self.showQTConfirm === true)
        {
          isScroll = true;
        }
        else{
          isScroll = false;
        }
      });*/
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.v-enter-active, .v-leave-active {
    transition: opacity 1s, transform 1s;
}
.v-enter {
    opacity:0;
    transform: translateY(20px);
}
.NewQT-submit {
  margin:auto;
  height: 80px;
  display: flex;
}

.NewQT-submit .submit-list {
  margin:auto;
  flex: 50%;
  margin-right: 5px;
  background-color: #fcf4df;
  color: #333;
  font-weight: bold;
  font-size: 1.3rem;
  border-color: #cccccc;
}
.NewQT-submit .submit-OK {
  margin:auto;
  flex: 50%;
  margin-left: 5px;
  background-color: #696565;
  border: none;
  font-size: 1.3rem;
  color: #ececec;
}

.NewQT-title {
  margin:auto;
  width: 90%;
  height: 60px;
  padding-top: 25px;
  font-size: 1.5rem;
  font-weight: bold;
}

.NewQT-desc {
  margin:auto;
  width: 90%;
  font-size: 0.8rem;
  font-style: italic;
  text-align: right;
  color: #aaa;
}

.NewQT-camera {
  margin:auto;
  width: 90%;
  height: 30px;
  display: flex;
}

.NewQT-camera span:first-child {
  flex:90%;
}

.NewQT-camera span input {
  background-color: #ebebeb;
  height: 30px;
  line-height: 30px;
  width: 95%;
  border-style: none;
  font-size: 1rem;
}

.NewQT-camera span:last-child {
  flex:10%;
}

.NewQT-camera span i {
  color: #ff9999;
  font-size: 2rem;
}

.NewQT-carInfo {
  margin:auto;
  width: 90%;
  height: 90px;
}

.NewQT-carInfo span input {
  background-color: #ebebeb;
  height: 40px;
  line-height: 30px;
  width: 95%;
  border-style: none;
  font-size: 1rem;
  margin-bottom: 5px;
  padding: 5px;
}

.NewQT-itemSelect-wiper {
  width: 90%;
}

.NewQT-itemList {
  width: 90%;
  margin: auto;
}

.NewQT-itemList .list-group .list-group-item {
  padding : 2px;
}

.NewQT-itemList .list-group .list-group-item .container {
  padding : 2px;
}

.NewQT-itemList .list-group .list-group-item .container .row .col:first-child {
  flex : 15%;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) {
  flex : 60%;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:first-child {
  height: 30px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:first-child {
  height: 30px;
}
.itemList-title {
  font-weight: bold;
  font-size: 1.1rem;
}
.itemList-brand {
  margin-left: auto;
  font-size: 0.8rem;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group {
  margin-left:auto;
  width: 80px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .btn:first-child {
  height: 30px;
  padding: 3px;
  border-radius: 7px 0px 0px 7px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .btn:last-child {
  height: 30px;
  padding: 3px;
  border-radius: 0px 7px 7px 0px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .form-control {
  height: 30px;
  padding: 3px;
  text-align: center;
  border-color: #6c757d;
  border-left: none;
  border-right: none;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:last-child {
  flex : 15%;
}

.NewQT-QTMemo {
  width: 90%;
  margin: auto;
}

.NewQT-footer {
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

.footer-selected {
  color : #5d4038;
}

.NewQT-footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}
.NewQT-footer a span i {
  font-size: 2.5rem;
}

.Category-Confirm {
  color: #ea4335;
}

.swiper-slide {
  height: 160px;
}
/*
.qtConfirm-dealerList {
  margin-bottom: 0px;
  padding-left: 20px;
}*/
.qtConfirm-dealerList span:nth-child(1){
  font-size: 1.1em;
}
.qtConfirm-dealerList span:nth-child(2){
  color:#FFBB00;
  margin-right: 5px;
  float:right;
  text-align: end;
}
.qtConfirm-itemList {
  width: 98%;
  margin: auto;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #ddd;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 3px 2px;
  display: flex;
}
.qtConfirm-itemDel {
  margin-left: auto;
  text-align: right;
  flex: auto;
  align-self: center;
}

.submit-YES {
  margin:auto;
  flex: 50%;
  margin-right: 5px;
  background-color: #acd3ce;
  color: #333;
  font-weight: bold;
  border-color: #cccccc;
  margin-left: 10px;
}
.submit-NO {
  margin:auto;
  flex: 50%;
  margin-left: 5px;
  background-color: #afabab;
  border: none;
  color: #ececec;
}

.custom-control {
  margin-bottom: 20px;
}

.tempItems{
  display:list-item;
  display: flex;
}

.tempItems .v-card{
  height: 40px;
  width: 90px;
  margin-left:4px;
  border : solid 1px #BDBDBD;
  border-radius: 3px 3px 3px 3px;
}

.tempItems .v-card .v-btn {
    height: 40px;
    width: 19px;
    min-width: 5px;
    margin: 0px 0px;
    border:0px;
    font-size: 1.6em;
    text-align: center;
}
.qtyInput{
  height: 40x;
  width: 50px;
  border-right: solid 1px #BDBDBD;
  border-left: solid 1px #BDBDBD;
  padding-top: 4px;
  text-align: center;
}
.qtyInput input {
  width: 26px;
  height:  30px;
  padding: 0;
  font-size:0.9rem;
  text-align: center;
}

/*
.tempItems .v-card .v-btn .v-icon {
  height: 10px;
  width: 10px;
  min-width: 10px;
  margin: 0px;
}
*/
#reqList  {
  border : solid 1px #BDBDBD;
  border-radius: 3px 3px 3px 3px;
  width: 100px;
  float: right;
  margin-right: 15px;
}
#reqList .v-btn {
  height: 35px;
  width: 20px;
  min-width: 5px;
  margin: 0px 0px;
  border:0px;
  font-size: 1.6em;
  text-align: center;
}
/*
#reqList .v-btn  .v-icon {
  height: 10px;
  width: 10px;
  min-width: 10px;
  margin: 0px;;
}*/
.roCarNo
{
  font-size: 0.9em;
  color: yellow;
  padding-left: 8px;
}
.showProcessing
{
  display: block; 
  text-align:center; 
  font-size: 1.2rem;
}
.btnOrder
{
  position: absolute;
  right:0;
  top:-10px;
}
.brandTitle{
  margin: 0px 0px 5px 20px;
}
.brandType{
  background-color:#5d4038;
  color: #fff;
  justify-self: center;
  font-size: 0.7em;
  height: 20px;
  line-height: 10px;
}
.brandType span{
  padding-left: 10px;
}
</style>