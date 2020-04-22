<template>
  <v-app>
    <div class="InfoPage" id="InfoPage">
      <b-card
        header="카센타 정보"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        style="height:113px;"
      >
        <b-card-text class="UserInfo-contents" v-if="showSiteInfo">

          <div class="UserInfo-info">
            <v-row>
              <div class="info-name">{{this.qtInfo.ReqName}}</div>
              <div class="info-tel"><v-icon small class="qt-icon">fas fa-phone-square</v-icon>{{this.siteInfo.TEL}} / <v-icon small class="qt-icon">fas fa-mobile-alt</v-icon>{{this.siteInfo.HP}} / </div>
              <div class="info-addr"><v-icon small class="qt-icon">mdi-domain</v-icon>{{this.siteInfo.ADDR}}</div>
            </v-row>
          </div>
          <v-btn small outlined color="blue accent-1" class="mt-3" @click="showSMSSendFlag=true">
            <v-icon left>far fa-comment-alt</v-icon> <span class="font-weight-medium ml-4">SMS</span>
          </v-btn> 
        </b-card-text>
      </b-card>
      <b-card
        header="차량 정보"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
      >
        <template v-slot:header>
          차량 정보
          <b-button v-if="UserInfo.UserType === 'DEALER'" class="pa-0 btnRoHistory" @click="getRoHistory">정비이력 확인</b-button>
          <b-button class="pa-0 btnRoHistory" @click="saveCarInfo">차량정보 수정</b-button>
          <b-button v-if="showBtnHisOrd" class="pa-0 btnOrdHistory" variant="warning" @click="ShowPopupOrdHistory">과거 주문내역 확인</b-button>
        </template>
        <b-card-text>
          <div class="Car-Info">
            <v-container>
              <v-row  class="mt-n10 mb-n12">
                <v-col cols = "12" md="10">
                  <v-row  class="mb-n10">
                    <v-col cols="12" md="4">
                      <v-text-field label="차량번호" outlined dense color="blue accent-1" :value="(this.qtInfo.CarNo ==='*empty*')?'미상차량' : this.qtInfo.CarNo">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field label="차대번호" outlined dense color="blue accent-1" :value="this.qtInfo.CarVin" :background-color="vinNoBackColor">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mb-n4">
                    <v-col cols="12" md="4">
                      <!--<v-select v-model="qtInfo.CarBrand" :items="carBrand" label="브랜드" :value="this.qtInfo.CarBrand" outlined dense color="success" :menu-props="{ top: true, offsetX: true}"></v-select>-->
                      <!--<b-form-select v-model="qtInfo.CarBrand" :options="carBrand"></b-form-select>-->
                      <b-button id="btnBrandSelect" v-b-toggle.collapse-1 variant="outline-secondary" block @click="brandClicked=!brandClicked">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'AUDI'" src="@/assets/BRAND-AUDI.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'BENZ'" src="@/assets/BRAND-BENZ.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'BMW'" src="@/assets/BRAND-BMW.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'CADILLAC'" src="@/assets/BRAND-CADILLAC.png">
                          <img height='18' class="mr-2" v-if="this.qtInfo.CarBrand === 'CHRYSLER'" src="@/assets/BRAND-CHRYSLER.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'CITROEN'" src="@/assets/BRAND-CITROEN.png">
                          <img height='18' class="mr-2" v-if="this.qtInfo.CarBrand === 'DODGE'" src="@/assets/BRAND-DODGE.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'FIAT'" src="@/assets/BRAND-FIAT.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'FORD'" src="@/assets/BRAND-FORD.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'HONDA'" src="@/assets/BRAND-HONDA.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'JEEP'" src="@/assets/BRAND-JEEP.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'LANDROVER'" src="@/assets/BRAND-LANDROVER.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'JAGUAR'" src="@/assets/BRAND-JAGUAR.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'LEXUS'" src="@/assets/BRAND-LEXUS.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'LINCOLN'" src="@/assets/BRAND-LINCOLN.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'MINI'" src="@/assets/BRAND-MINI.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'PEUGEOT'" src="@/assets/BRAND-PEUGEOT.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'PORSCHE'" src="@/assets/BRAND-PORSCHE.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'TOYOTA'" src="@/assets/BRAND-TOYOTA.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'VOLVO'" src="@/assets/BRAND-VOLVO.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'VW'" src="@/assets/BRAND-VW.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'NISSAN'" src="@/assets/BRAND-NISSAN.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'MASERATI'" src="@/assets/BRAND-MASERATI.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'INFINITI'" src="@/assets/BRAND-INFINITI.png">
                          <img height='20' class="mr-2" v-if="this.qtInfo.CarBrand === 'GM'" src="@/assets/BRAND-GM.png">
                        {{this.qtInfo.CarBrand}}
                        </b-button>

                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field label="차정상세" outlined dense clearable color="blue accent-1" v-model="qtInfo.CarSeries" :value="this.qtInfo.CarSeries">
                      </v-text-field>
                    </v-col>
                  </v-row>   
                  <v-row>   
                    <b-collapse id="collapse-1" class="mt-n6 mb-6 ml-4">
                      <b-card>
                        <!--<v-chip v-for="(brand, index) in carBrand" v-bind:key = "index" class="ma-2" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                          <img height='18' class="mr-2" v-if="brand === 'AUDI'" src="@/assets/BRAND-AUDI.png">
                          <img height='22' class="mr-2" v-if="brand === 'BENZ'" src="@/assets/BRAND-BENZ.png">
                          <img height='25' class="mr-2" v-if="brand === 'BMW'" src="@/assets/BRAND-BMW.png">
                          <img height='25' class="mr-2" v-if="brand === 'CADILLAC'" src="@/assets/BRAND-CADILLAC.png">
                          <img height='20' class="mr-2" v-if="brand === 'CHRYSLER'" src="@/assets/BRAND-CHRYSLER.png">
                          <img height='25' class="mr-2" v-if="brand === 'CITROEN'" src="@/assets/BRAND-CITROEN.png">
                          <img height='18' class="mr-2" v-if="brand === 'DODGE'" src="@/assets/BRAND-DODGE.png">
                          <img height='25' class="mr-2" v-if="brand === 'FIAT'" src="@/assets/BRAND-FIAT.png">
                          <img height='20' class="mr-2" v-if="brand === 'FORD'" src="@/assets/BRAND-FORD.png">
                          <img height='25' class="mr-2" v-if="brand === 'HONDA'" src="@/assets/BRAND-HONDA.png">
                          <img height='20' class="mr-2" v-if="brand === 'JEEP'" src="@/assets/BRAND-JEEP.png">
                          <img height='25' class="mr-2" v-if="brand === 'LANDROVER'" src="@/assets/BRAND-LANDROVER.png">
                          <img height='25' class="mr-2" v-if="brand === 'LEXUS'" src="@/assets/BRAND-LEXUS.png">
                          <img height='25' class="mr-2" v-if="brand === 'LINCOLN'" src="@/assets/BRAND-LINCOLN.png">
                          <img height='22' class="mr-2" v-if="brand === 'MINI'" src="@/assets/BRAND-MINI.png">
                          <img height='25' class="mr-2" v-if="brand === 'PEUGEOT'" src="@/assets/BRAND-PEUGEOT.png">
                          <img height='25' class="mr-2" v-if="brand === 'PORSCHE'" src="@/assets/BRAND-PORSCHE.png">
                          <img height='22' class="mr-2" v-if="brand === 'TOYOTA'" src="@/assets/BRAND-TOYOTA.png">
                          <img height='22' class="mr-2" v-if="brand === 'VOLVO'" src="@/assets/BRAND-VOLVO.png">
                          <img height='22' class="mr-2" v-if="brand === 'VW'" src="@/assets/BRAND-VW.png">

                          {{brand}}

                        </v-chip>-->
                        <div class="brandGroup">
                          <b-card-group columns tag="div">
                            <b-card header="Favorite" header-tag="header" class="mb-2">
                              <b-card-text class="pa-0">
                                <v-chip v-for="(brand, index) in favoriteBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                                <img height='18' class="mr-2" v-if="brand === 'AUDI'" src="@/assets/BRAND-AUDI.png">
                                <img height='22' class="mr-2" v-if="brand === 'BENZ'" src="@/assets/BRAND-BENZ.png">
                                <img height='25' class="mr-2" v-if="brand === 'BMW'" src="@/assets/BRAND-BMW.png">
                                <img height='25' class="mr-2" v-if="brand === 'LEXUS'" src="@/assets/BRAND-LEXUS.png">
                                <img height='22' class="mr-2" v-if="brand === 'MINI'" src="@/assets/BRAND-MINI.png">
                                <img height='22' class="mr-2" v-if="brand === 'VW'" src="@/assets/BRAND-VW.png">
                                {{brand}}
                                </v-chip>
                              </b-card-text>
                            </b-card>
                            <b-card header="Europe" header-tag="header" >
                              <b-card-text class="pa-0">
                                <v-chip v-for="(brand, index) in europeBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                                  <img height='25' class="mr-2" v-if="brand === 'LANDROVER'" src="@/assets/BRAND-LANDROVER.png">
                                  <img height='22' class="mr-2" v-if="brand === 'VOLVO'" src="@/assets/BRAND-VOLVO.png">
                                  <img height='25' class="mr-2" v-if="brand === 'JAGUAR'" src="@/assets/BRAND-JAGUAR.png">
                                  <img height='25' class="mr-2" v-if="brand === 'PEUGEOT'" src="@/assets/BRAND-PEUGEOT.png">
                                  <img height='25' class="mr-2" v-if="brand === 'PORSCHE'" src="@/assets/BRAND-PORSCHE.png">
                                  <img height='25' class="mr-2" v-if="brand === 'CITROEN'" src="@/assets/BRAND-CITROEN.png">
                                  <img height='25' class="mr-2" v-if="brand === 'FIAT'" src="@/assets/BRAND-FIAT.png">
                                  <img height='25' class="mr-2" v-if="brand === 'MASERATI'" src="@/assets/BRAND-MASERATI.png">
                                  {{brand}}
                                </v-chip>
                                </b-card-text>
                            </b-card>
                            <b-card header="USA" header-tag="header" >
                              <b-card-text class="pa-0">
                                <v-chip v-for="(brand, index) in usaBrand" v-bind:key = "index" class="ma-1" color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                                  <img height='20' class="mr-2" v-if="brand === 'JEEP'" src="@/assets/BRAND-JEEP.png">
                                  <img height='25' class="mr-2" v-if="brand === 'LINCOLN'" src="@/assets/BRAND-LINCOLN.png">
                                  <img height='20' class="mr-2" v-if="brand === 'FORD'" src="@/assets/BRAND-FORD.png">
                                  <img height='20' class="mr-2" v-if="brand === 'CHRYSLER'" src="@/assets/BRAND-CHRYSLER.png">
                                  <img height='25' class="mr-2" v-if="brand === 'CADILLAC'" src="@/assets/BRAND-CADILLAC.png">
                                  <img height='18' class="mr-2" v-if="brand === 'DODGE'" src="@/assets/BRAND-DODGE.png">
                                  <img height='25' class="mr-2" v-if="brand === 'GM'" src="@/assets/BRAND-GM.png">
                                {{brand}}
                                </v-chip>
                              </b-card-text>
                            </b-card>
                            <b-card header="Asia" header-tag="header" >
                              <b-card-text class="pa-0">
                                <v-chip v-for="(brand, index) in asiaBrand" v-bind:key = "index" class="ma-1"  color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                                  <img height='25' class="mr-2" v-if="brand === 'HONDA'" src="@/assets/BRAND-HONDA.png">
                                  <img height='22' class="mr-2" v-if="brand === 'TOYOTA'" src="@/assets/BRAND-TOYOTA.png">
                                  <img height='25' class="mr-2" v-if="brand === 'NISSAN'" src="@/assets/BRAND-NISSAN.png">
                                  <img height='22' class="mr-2" v-if="brand === 'INFINITI'" src="@/assets/BRAND-INFINITI.png">
                                {{brand}}
                                </v-chip>
                              </b-card-text>
                            </b-card>
                            <b-card header="AllBrand" header-tag="header" >
                              <b-card-text class="pa-0">
                                <v-chip v-for="(brand, index) in carBrand" v-bind:key = "index" class="ma-1"  color="#3cadc0" outlined link @click="clickBrandSelect(brand)">
                                {{brand}}
                              </v-chip>
                              </b-card-text>
                            </b-card>
                          </b-card-group>
                        </div>
                      </b-card>
                    </b-collapse>     
                  </v-row>                             
                </v-col>

                <v-col cols = "12" md="2">
                  <v-btn v-if="qtInfo.IMG !== '*empty*'" class="mt-8" id="CarInfo-Button" x-large outlined color="blue accent-1" @click="showQTImage(qtInfo.IMG)" >
                    <v-icon left>fas fa-camera</v-icon> <span class="font-weight-medium ml-4">사진<br>확인</span>
                  </v-btn>            
                </v-col>
              </v-row>            
            </v-container>            
            <!--
              <div class="CarInfo-Left">
                <v-row>
                  <v-text-field label="차량번호" outlined dense width = "100px" :value="(this.qtInfo.CarNo==='*empty*')?'미상차량' : this.qtInfo.CarNo">
                  </v-text-field>
                </v-row>
                <v-row>
                  <div><v-icon x-small class="qt-icon">fas fa-angle-right</v-icon>브랜드 </div>     
                  <div class="QT-Content">{{this.series}}</div>
                </v-row>    
              </div>
              <div class="CarInfo-Right">
                <v-row>
                  <div><v-icon x-small class="qt-icon">fas fa-angle-right</v-icon>차대번호 </div>  
                  <b-form-input v-model="this.qtInfo.CarVin"></b-form-input>
                </v-row>
                <v-row>
                  <div><v-icon x-small class="qt-icon">fas fa-angle-right</v-icon>상세차정 </div>     
                  <div class="QT-Content">{{this.series}}</div>
                </v-row>                      
              </div>
              <div class="CarInfo-Button">
                <v-btn class="ma-2" id="CarInfo-Button" outlined fab color="#acd3ce" elevation="5" @click="showQTImage(qtInfo.IMG)">
                  사진<br>확인
                </v-btn>             
              </div>  
            -->           
          </div>   
        </b-card-text>
      </b-card>
      <b-card no-body class="QT-Detail">
        <b-tabs v-model="tabIndex" card active-nav-item-class="font-weight-bold" >
        <b-tab :title="tab1Title" :title-link-class="linkClass(0)" v-if="visibleQTTab">
          <b-card-text> 
            <div class="QTReq-List">
              <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>견적요청 상세    
              <table class="QTReq-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                  <tr>
                    <th class="QTItem-Title mdl-data-table__cell--non-numeric">요청 부품</th>
                    <th class="QTItem-Qty">수량</th>
                    <th class="QTItem-String">첨부파일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item , index) in qtItems" :key="index">
                    <td class="mdl-data-table__cell--non-numeric">{{item.ITM_NM}}</td>
                    <td>{{item.ITM_QTY}}</td>
                    <td>
                      <v-btn outlined small color="#00BFA5" class="float-right" v-if="item.IMG !== undefined" @click="showQTImage(item.IMG)">사진 확인</v-btn>
                    </td>
                  </tr>
                  <!--
                  <tr>
                    <td class="mdl-data-table__cell--non-numeric">오일 필터</td>
                    <td>1</td>
                  </tr>
                  -->
                </tbody>
              </table>
            </div>   
            <div class="QTReq-Memo">
              <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>Memo
              <b-form-textarea
                id="textarea"
                rows="2"
                max-rows="2"
                v-model="this.qtInfo.Memo"
                :class="{ memoArea :(qtInfo.Memo !== undefined && qtInfo.Memo.length > 0) ? true :false}"
              ></b-form-textarea>   
            </div>      
          </b-card-text>
        </b-tab>
        <b-tab :title="tab2Title" :title-link-class="linkClass(1)" v-if="visibleTab && visibleQTTab">
          <b-card-text>
            <div class="QTRes-List">
              <div class="QTRes-Title">
                <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>견적회신 상세
              </div> 
              <div class="QTRes-select" v-if="UserInfo.UserType !== 'DEALER'" >
                <b-form-select v-model="selectedConfirm" :options="confirmList" @change="getConfirmData">
                </b-form-select>
              </div>
              <div class="QT-Info" v-if="UserInfo.UserType === 'DEALER'" >
                <div class="QT-Title"><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>담당자 : </div>
                <div class="QT-Content">{{this.angentNm }}</div>
                <div class="QT-Title"><v-icon x-small  class="qt-icon">fas fa-angle-down</v-icon>견적상태 : </div>
                <div class="QT-ContentSts">{{this.estmStsNm}}</div>  
              </div>            
              <div class="QTRes-Button">
                <b-button-group size="sm">
                  <!--<b-button variant="outline-secondary">엑셀 카피 자동 입력</b-button>-->
                  <b-button variant="outline-secondary" v-on:click="GetQtList" v-if="UserInfo.UserType === 'DEALER'">견적서 자동 입력</b-button>
                  <b-button variant="outline-secondary" @click="selectedDeleteItem" v-if="UserInfo.UserType !== 'DEALER'">선택 삭제</b-button>
                  <b-button id="clipboardBtn" @click="clipboardAdd" style="display:none">Text 붙여넣기 Hidden 버튼</b-button>
                  <b-button id="clipImageBtn" @click="clipImageAdd" style="display:none">Image 붙여넣기 Hidden 버튼</b-button>
                  <!-- <b-button class="QTRes-ButtonAdd" variant="outline-secondary">부품 추가</b-button>-->
                <!--부품추가-->
                 <v-dialog v-model="dialog" width="90%" >
                  <template v-slot:activator="{ on }">
                    <b-button id="btnItmAdd" class="QTRes-ButtonAdd" variant="outline-secondary" v-on="on" v-if="UserInfo.UserType !== 'DEALER'">부품 추가</b-button>
                  </template>
                  <v-card>
                    <v-card-title>
                     <!-- <span class="headline">{{ formTitle }}</span>-->
                    </v-card-title>
                    <v-card-text>
                      <!--<v-container>-->
                        <v-row>
                          <v-col cols="12" sm="6" md="2">
                           <v-text-field v-model="editedItem.itemCode" label="부품번호" @focus="$event.target.select()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" lg="1">
                            <v-combobox v-model="editedItem.itemBrand" :items="afterBrand" label="브랜드" ></v-combobox>    
                             <!--<v-text-field v-model="editedItem.itemBrand" label="브랜드"></v-text-field>-->
                          </v-col>
                          <!--<v-col cols="12" sm="6" lg="1">
                            <v-combobox v-model="editedItem.carBrand" :items="carBrand" label="차종" ></v-combobox>
                          </v-col>-->
                          <v-col cols="12" sm="6" md="2">
                              <v-text-field v-model="editedItem.itemName" label="부품명" @focus="$event.target.select()"></v-text-field>
                          </v-col>
                          <!--<v-col cols="12" sm="6" md="2">
                              <v-text-field v-model="editedItem.afterNo" label="After No" @focus="$event.target.select()"></v-text-field>
                          </v-col>-->
                          <v-col cols="12" sm="6" md="1">
                              <v-text-field :value="editedItem.itemQty" label="수량" 
                              @input="value =>editedItem.itemQty = value"  
                              @change="onCalculatorAMT"
                              @focus="$event.target.select()"
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="1">
                              <v-text-field :value="editedItem.itemPrice " label="단가"
                                @input="value =>editedItem.itemPrice = value" 
                                @change="onCalculatorAMT"
                                @focus="$event.target.select()" 
                                ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="1">
                              <v-text-field :value="editedItem.AMT " label="금액"  
                              @input="value => editedItem.AMT = value"
                              @focus="$event.target.select()"
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="1">
                            <v-combobox v-model="editedItem.delv" :items="delvType" label="배송구분"></v-combobox>
                          </v-col>    
                          <v-col cols="12" md="2">
                              <v-text-field v-model="editedItem.memo" label="비고"  @focus="$event.target.select()"></v-text-field>
                          </v-col>               
                        </v-row>
                       <!-- <v-row>
                          <v-col cols="12" lg="12">
                              <v-text-field v-model="editedItem.memo" label="비고"  @focus="$event.target.select()"></v-text-field>
                          </v-col>
                        </v-row>-->
                     <!-- </v-container>-->
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#00BFA5" outlined  @click="close">취소</v-btn>
                      <v-btn color="#A1887F"  @click="addItem">{{btnEditText}}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                </b-button-group>
              </div>  
            </div>      
            <!-- 
            <table class="QTRes-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th class="QTItem-Title mdl-data-table__cell--non-numeric">브랜드</th>
                  <th class="QTItem-Title mdl-data-table__cell--non-numeric">부 품 명</th>
                  <th class="QTItem-Brand mdl-data-table__cell--non-numeric">부품코드</th>
                  <th class="QTItem-Qty">수량</th>
                  <th class="QTItem-Qty">단가</th>
                  <th class="QTItem-Qty">금액</th>
                  <th class="QTItem-Qty mdl-data-table__cell--non-numeric">배송구분</th>
                </tr>
              </thead>
              <tbody>              
                <tr v-for="(qtItem,i) in detailQTData" :key="i" >
                  <td> </td>
                  <td class="mdl-data-table__cell--non-numeric"><div class="itemNm" v-b-tooltip.hover :title=qtItem.NM_ITM>{{qtItem.NM_ITM}}</div>
                  </td>
                  <td class="mdl-data-table__cell--non-numeric">{{qtItem.CONFIRM_ITM}}</td>
                  <td>{{qtItem.ORDER_QTY | localeNum}}</td>
                  <td>{{qtItem.SAL_PRICE | localeNum}}</td>
                  <td>{{qtItem.AMT | localeNum}}</td>
                  <td class="mdl-data-table__cell--non-numeric">{{qtItem.DELV_DAY}}</td>
                </tr>
              </tbody>
            </table>-->
            <div v-if="UserInfo.UserType === 'DEALER'">
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="detailQTData"
              class="elevation-1"
              fixed-header
              height="calc(100vh - 550px)"
              :items-per-page="itemsPerPage"
              hide-default-footer
              no-data-text=''
              disable-sort
            >   
              <!--header-->
              <template v-slot:header.NM_ITM="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.CONFIRM_ITM="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.ORDER_QTY="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.SAL_PRICE="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.AMT="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.DELV_DAY="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <!-- contents -->
              <template v-slot:item.NM_ITM="{ item }">
               <div class="item-itemName" v-b-tooltip.hover :title=item.NM_ITM  >{{ item.NM_ITM }}</div>
              </template>
              <template v-slot:item.CONFIRM_ITM="{ item }">
               <div class="item-itemcode">{{ item.CONFIRM_ITM }}</div>
              </template>
              <template v-slot:item.ORDER_QTY="{ item }">
               <span class="item-numeric-qty">{{ item.ORDER_QTY | localeNum}}</span>
              </template>
              <template v-slot:item.SAL_PRICE="{ item }">
               <span class="item-numeric">{{ item.SAL_PRICE | localeNum}}</span>
              </template>
              <template v-slot:item.AMT="{ item }">
               <span class="item-numeric">{{ item.AMT | localeNum}}</span>
              </template>
              <template v-slot:item.DELV_DAY="{ item }">
               <div class="item-delv">{{ item.DELV_DAY }}</div>
              </template>
            </v-data-table>
            <div class="QTRes-footer" v-if="showSum">
              <div class="TotalInfo">
                <span class="TotalInfo-Title">합계금액</span>
                <span class="TotalInfo-Text">{{total | localeNum}}</span>
                <span><b-button v-on:click="sendQTconfirmMsg()">{{txtQTConfirm}}</b-button></span>
                <!--<v-btn @click="SendSMS" >SMS전송</v-btn>-->
              </div>
            </div>
            </div>
            <div  v-else>
              <v-data-table
                v-model="selected"
                :headers="headers2"
                :items="detailQTData"
                class="elevation-1 mytable"
                fixed-header
                height="calc(100vh - 550px)"
                :items-per-page="itemsPerPage"
                hide-default-footer
                no-data-text=''
                show-select
                :single-select="singleSelect"
                item-key="itemCode"
                disable-sort
              >      
                <!--header-->
                <template v-slot:header.itemCode="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
                <template v-slot:header.itemBrand="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
              <!-- <template v-slot:header.carBrand="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>-->
                <template v-slot:header.itemName="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
              <!-- <template v-slot:header.afterNo="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>-->
                <template v-slot:header.itemQty="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
                <template v-slot:header.itemPrice="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
                <template v-slot:header.AMT="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
                <template v-slot:header.delv="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
                <template v-slot:header.memo="{ header }">
                  <span class="header-item2">{{ header.text }}</span>
                </template>
                <!-- contents -->
                <template v-slot:item.itemCode="{ item }">
                <span class="item-delv">{{ item.itemCode }}</span>
                </template>
                <template v-slot:item.itemBrand="{ item }">
                <span class="item-delv">{{ item.itemBrand }}</span>
                </template>   
              <!-- <template v-slot:item.carBrand="{ item }">
                <span class="item-delv">{{ item.carBrand }}</span>
                </template> -->
                <template v-slot:item.itemName="{ item }">
                <span class="item-delv">{{ item.itemName }}</span>
                </template> 
                <!--<template v-slot:item.afterNo="{ item }">
                <span class="item-delv">{{ item.afterNo }}</span>
                </template> -->
                <template v-slot:item.itemQty="{ item }">
                <span class="item-numeric-qty">{{ item.itemQty|localeNum}}</span>
                </template>
                <template v-slot:item.itemPrice="{ item }">
                <span class="item-numeric">{{ item.itemPrice|localeNum}}</span>
                </template>
                <template v-slot:item.AMT="{ item }">
                <span class="item-numeric">{{ item.AMT|localeNum}}</span>
                </template>       
                <template v-slot:item.delv="{ item }">
                <span class="item-delv">{{ item.delv }}</span>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)" >
                    edit
                  </v-icon>
                  <v-icon small @click="deleteItem(item)">
                    delete
                  </v-icon>
                </template>
            
              </v-data-table>
              <div class="QTRes-footer">
                  <div class="TotalInfo">
                    <span class="TotalInfo-Title">합계금액</span>
                    <span class="TotalInfo-Text">{{total | localeNum}}</span>
                    <span v-if="showBtnQT"><b-button v-on:click="saveQTConfirm()">{{txtQTConfirm}}</b-button></span>
                    <span v-if="showBtnOrder"><b-button @click="saveConfirmQTOrder">바로주문 회신</b-button></span>
                    <!--<v-btn @click="SendSMS" >SMS전송</v-btn>-->
                  </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="주문 내역" :title-link-class="linkClass(2)"  v-if="(UserInfo.UserType !== 'DEALER' && visibleTab && visibleQTTab) || (qtInfo.ReqSiteType === 'SITEF')">
          <b-card-text>
            <div class="QTRes-List">
              <div class="QTRes-Title">
                <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>주문 상세
              </div>  
            </div>      
            <div>
            <v-data-table
              :headers="headers3"
              :items="orderHistory"
              class="elevation-1 mytable"
              fixed-header
              height="calc(100vh - 520px)"
              :items-per-page="itemsPerPage"
              hide-default-footer
              no-data-text=''
              :single-select="singleSelect"
              item-key="itemCode"
              disable-sort=""
            >      
              <!--header-->
              <template v-slot:header.itemCode="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemBrand="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemName="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
             <template v-slot:header.itemQty="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemPrice="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.AMT="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <!-- contents -->
              <template v-slot:item.itemCode="{ item }">
               <span class="item-delv">{{ item.itemCode }}</span>
              </template>
              <template v-slot:item.itemBrand="{ item }">
               <span class="item-delv">{{ item.itemBrand }}</span>
              </template>   
             <template v-slot:item.itemName="{ item }">
               <span class="item-delv">{{ item.itemName }}</span>
              </template> 
             <template v-slot:item.itemQty="{ item }">
               <span class="item-numeric-qty">{{ item.itemQty|localeNum}}</span>
              </template>
              <template v-slot:item.itemPrice="{ item }">
               <span class="item-numeric">{{ item.itemPrice|localeNum}}</span>
              </template>
              <template v-slot:item.AMT="{ item }">
               <span class="item-numeric">{{ item.AMT|localeNum}}</span>
              </template>       
            <!--  <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" >
                  edit
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  delete
                </v-icon>
              </template>-->
           
            </v-data-table>
            <div class="QTRes-footer">
                <div class="TotalInfo">
                  <span class="TotalInfo-Title">합계금액</span>
                  <span class="TotalInfo-Text">{{total2 | localeNum}}</span>
                  <span><b-button id = "btnOrdConfirm" class="TotalInfo-Button" v-on:click="saveOrderConfirm()">주문확정</b-button></span>
                </div>
            </div>
            </div>
          </b-card-text>
        </b-tab>
        </b-tabs>
      </b-card>   

      <v-dialog v-model="showQTImageFlag" width="500px" max-height="100%">
        <v-card>
          <v-card-title class="headline" >이미지 확인</v-card-title>
          <v-img class="grey lighten-3 mr-4 ml-4"  v-bind:src="itemImage" max-width="800px"></v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
             <v-btn
              color="#A1887F"
              @click="saveImage"
            >
              저장
            </v-btn>      
            <v-btn
              color="#00BFA5"
              outlined
              @click="showQTImageFlag = false; itemImage = '';"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  

      <v-dialog v-model="showSMSSendFlag" width="600px" max-height="100%">
        <v-card>
          <v-card-title class="headline" >SMS 전송</v-card-title>
          <v-card-text>

            <v-row>
              <v-col cols="3">
                <v-subheader>SMS 문구</v-subheader>
              </v-col>

              <v-col cols="9">
                <v-select
                  v-model="selectedSMS"
                  :items="SMSList"
                  item-text="state"
                  item-value="abbr"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
              </v-col>        
              <v-col cols="9">      
                <v-text-field v-if="this.selectedSMS==='직접입력'" v-model="typedSMS"></v-text-field>    
              </v-col>           
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                color="#A1887F"
                @click="sendQTSMS"
              >
                전송
              </v-btn>      
              <v-btn
                color="#00BFA5"
                outlined
                @click="showSMSSendFlag = false;"
              >
                닫기
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>        

      <v-dialog v-model="showBrandInputFlag" width="300px" max-height="100%">
        <v-card>
          <v-card-title class="headline" >브랜드 수기 입력</v-card-title>
          <v-card-text>
            <v-text-field v-model="typedBrand" v-on:keypress.enter="brandInput"></v-text-field>  
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                color="#A1887F"
                @click="brandInput"
              >
                입력
              </v-btn>      
              <v-btn
                color="#00BFA5"
                outlined
                @click="showBrandInputFlag = false;"
              >
                닫기
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>  

    <!--과거정비 이력 조회-->
    <v-dialog v-model="showROHistDialog" width="400px" max-height="100%">
      <v-card>
          <v-toolbar dark color="primary"> 
            <v-toolbar-title>
              <v-icon medium>fas fa-edit</v-icon>
              과거 정비이력  <span class="roCarNo">{{qtInfo.CarNo}}</span>
            </v-toolbar-title>                 
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
            <v-btn icon dark @click="closeRoHistory">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container class="mx-n2 pe-0">
              <ROHistory :RoHistoryData="roList"></ROHistory>
            </v-container>
          </v-card-text>    
          <v-card-actions>

          </v-card-actions>     
          </v-card>
    </v-dialog>
    
    <!--과거 주문이력 조회-->
    <v-dialog v-model="showOrdHistDialog"  width="710px">
      <v-card>
        <v-toolbar dark color="primary"> 
          <v-toolbar-title>
            <v-icon medium>fas fa-edit</v-icon>
            과거 주문이력  <span class="roCarNo">{{qtInfo.CarNo}}</span>
          </v-toolbar-title>                 
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
          <v-btn icon dark @click="closeOrderHistory">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0 ma-n1">
          <v-container class="pa-2" >
            <OrderHistory :OrderData="ordHistroyList" :SERIES="this.qtInfo.CarSeries"  :VINNO="qtInfo.CarVin"></OrderHistory>
          </v-container>
        </v-card-text>    
        <v-card-actions>
        </v-card-actions>     
      </v-card>
    </v-dialog>

    <!-- 프로세싱 메시지 -->
    <MessageBox v-if="showProcessing">
      <div slot="header"><h5 >처리 중...</h5></div>
      <span slot="body" class="showProcessing">
        <pre>{{processMsg}}</pre>
        <v-icon large color="orange darken-2">fas fa-sync-alt fa-spin</v-icon>
      </span>
    </MessageBox> 
    
    <!-- 알림 메시지 팝업 -->
    <MessageBox v-if="showAlertMsg"  @close="showAlertMsg=!showAlertMsg">
      <div slot="header"><h5 >알림</h5></div>
      <span slot="body" @click="showAlertMsg=!showAlertMsg"><pre>{{alertMsg}}</pre>
      </span>
      <div slot="footer">
        <v-btn depressed small color="#967d5f" dark @click="showAlertMsg=!showAlertMsg"> 확인</v-btn>
      </div>
    </MessageBox>
    <!--과거내역 조회 메시지-->
    <MessageBox v-if="showOrdHistory" @close="CloseAlerPopup()">
      <div slot="header"><h5>알림</h5></div>
      <span slot="body" @click="CloseAlerPopup()"><span class="msgBigBody" v-html="alertMsg"></span>
      </span>
      <div slot="footer">
        <v-btn depressed small color="#967d5f" dark @click="ShowPopupOrdHistory()">확인</v-btn>
        <v-btn depressed small color="blue-grey lighten-2"  @click="CloseAlerPopup()">취소</v-btn>
      </div>
    </MessageBox>
    </div> 
  </v-app>
</template>
<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import {datePadding, convertDynamoToString , convertDynamoToArrayString, convertArrayToDynamo} from '@/utils/common.js'
import Constant from '@/Constant';
import ROHistory from '@/components/NewQT/ROHistory.vue'
import MessageBox from '@/components/Common/MessageBox.vue'
import OrderHistory from '@/components/Dealer/OrderHistory.vue'

const axios = require('axios').default;
export default {
  name: 'InfoPage',
  data () {
    return {
      selectedBrand: null,
      tabIndex: 0,
      headQTData: [],
      detailQTData:[],
      fileQTData:[],
      confirmList:[],
      series:'',
      angentNm:'',
      estmStsNm:'',
      showSum:false,
      showSiteInfo:false,
      qtInfo:[],
      qtItems:[],
      siteInfo:[],
      showQTImageFlag:false,
      itemImage:'',
      selected: [],
      singleSelect:false,
      dialog: false,
     // carinfoHeight:'height:130px;',
    //  btnEditText:'추가',
      headers: [
          {
            text: '브랜드',
            align: 'center',
            sortable: false,
          },
          { text: '부품명', value: 'NM_ITM',},
          { text: '부품코드', value: 'CONFIRM_ITM' },
          { text: '수량', value: 'ORDER_QTY' ,align: 'end', },
          { text: '단가', value: 'SAL_PRICE' },
          { text: '금액', value: 'AMT' },
          { text: '배송구분', value: 'DELV_DAY' },
        ],
      headers2: [
          { text: '부품번호', value: 'itemCode', align:'center', },
          { text: '브랜드', value: 'itemBrand', align:'center',},
          { text: '부품명',  value: 'itemName', align:'center',},
         // { text: '애프터번호', value: 'afterNo', align:'center',},
          { text: '수량', value: 'itemQty', align:'end'},
          { text: '단가', value: 'itemPrice',align:'end' },
          { text: '금액', value: 'AMT',align:'end'},
          { text: '배송구분', value: 'delv' },
          { text: '비고', value: 'memo', sortable: false,},
          { text: '', value: 'action', sortable: false, width:'80px', },
        ],
      headers3: [
          { text: '부품번호', value: 'itemCode', align:'center', },
          { text: '브랜드', value: 'itemBrand', align:'center',},
          { text: '부품명',  value: 'itemName', align:'center',},
          { text: '수량',  value: 'itemQty', align:'end'},
          { text: '단가', value: 'itemPrice',align:'end' },
          { text: '금액', value: 'AMT',align:'end'},
        ],
      editedIndex: -1,
      editedItem: {
        seq:0,
        itemCode: '',
        itemBrand: '',
        carBrand: '',
        itemName: '',
        afterNo: '',
        itemQty: 0,
        itemPrice:0,
        AMT:0,
        delv:'퀵',
        memo:'',
      },
      defaultItem: {
        seq:0,
        itemCode: '',
        itemBrand: '',
        carBrand: '',
        itemName: '',
        afterNo: '',
        itemQty:0,
        itemPrice:0,
        AMT:0,
        delv:'퀵',
        memo:'',
      },
      itemsPerPage: -1,
      //carBrand:['차종 선택', 'BMW', 'BENZ', 'AUDI', 'VW', 'FORD', 'LEXUS', '기타'],
      //carBrand:['차종 선택', 'AUDI', 'BENZ', 'BMW', 'CADILLAC', 'CHRYSLER', 'CITROEN', 'DODGE', 'FIAT', 'FORD', 'HONDA', 'JEEP', 'LANDROVER', 'LEXUS', 'LINCOLN', 'MINI', 'PEUGEOT', 'PORSCHE', 'TOYOTA', 'VOLVO', 'VW', '기타'],
      carBrand:['기타'],
      favoriteBrand:['BENZ', 'BMW','AUDI','LEXUS','MINI', 'VW'],
      europeBrand:['LANDROVER','VOLVO', 'JAGUAR', 'PORSCHE','PEUGEOT', 'FIAT', 'CITROEN','MASERATI'],
      usaBrand:['LINCOLN','JEEP','CHRYSLER','FORD','CADILLAC', 'DODGE', 'GM'],
      asiaBrand:['HONDA','TOYOTA','NISSAN','INFINITI'],  
      afterBrand:['MANN','FRAM','MEYLE','BOSCH','TRW'],
      SMSList:['모바일 견적 회신 메시지를 확인해 주세요.', '도면 회신했습니다. 모바일서 확인해 주세요.', '직접입력'],
      delvType:['택배','퀵'],
      testData: {},      
      txtQTConfirm: '견적 확정 회신', 
      orderHistory:[],
      orderID:'',
      brandSelected: '차종 선택',
      brandClicked: false,
      selectedConfirm:'',
      selectedSMS:'모바일 견적 회신 메시지를 확인해 주세요.',
      typedSMS:'',
      typedBrand:'',
      showSMSSendFlag: false,
      showBrandInputFlag: false,
      tab1Title: '견적 요청',
      tab2Title: '견적 회신',
      visibleTab : false,
      visibleQTTab : true,
      showBtnQT: true,
      showBtnOrder: false,
      roList: [],
      showROHistDialog: false,          // WebPOS 정비이력 조회 팝업
      showProcessing: false,
      processMsg: '',
      vinNoBackColor: '',
      showAlertMsg: false,
      alertMsg: "",
      showOrdHistory:false,
      showBtnHisOrd:false,
      ordHistroyList:[],
      showOrdHistDialog: false, 
    }
  },
	components: {
    ROHistory,
    MessageBox,
    OrderHistory
	},
  methods: {
    onCalculatorAMT(){
     this.editedItem.AMT = this.editedItem.itemPrice * this.editedItem.itemQty;
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['text-info']
      } else {
        return ['text-secondary']
      }
    },
    GetQtList(){
      // 초기화
      this.headQTData = [];
      this.detailQTData = [];
      this.fileQTData = [];

      var param = {};
      param.BsnId = this.qtInfo.ReqSite;
      param.CarNo = this.qtInfo.CarNo;
      param.VinNo =  this.qtInfo.CarVin;
      param.RequestDataJSON = this.qtInfo.ID;

      console.log("======= QT LIST Request result ========");
      console.log(param); 

      var rtnCode = "";

      axios({
          method: 'POST',
          url: Constant.SCPIF_URL + 'GetQTData',
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
          console.log("======= QT LIST Return result ========");     
          console.log(result.data); 
         
          this.rtnCode = result.data.ReturnCode;

          if(this.rtnCode === 0)
          {
            var rtnQTData = JSON.parse(result.data.ReturnDataJSON);
            this.headQTData = rtnQTData['ESTM_HED'];
            
            if(this.headQTData.length > 0)
            {
              console.log('Agentname :' , this.headQTData[0].AGENT_NM);
              console.log('webpos 상태 :', this.headQTData[0].ESTM_STS);

              this.series = this.headQTData[0].SERIES;
              this.angentNm = this.headQTData[0].AGENT_NM;
              this.estmStsNm = this.headQTData[0].ESTM_STS_NM;

              if(this.headQTData[0].SERIES !== null){
                this.qtInfo.CarSeries = this.headQTData[0].SERIES;
              }

              if(this.headQTData[0].ESTM_STS !== '1' && rtnQTData['ESTM_DTL'].length > 0)
              {
                //console.log('ESTM_DTL :' , JSON.stringify(rtnQTData['ESTM_DTL'])); 
                
                this.detailQTData = rtnQTData['ESTM_DTL'];
                this.fileQTData = rtnQTData['ESTM_FILE'];
                this.showSum = true; 

                var viewMode = localStorage.getItem('LoginMode');
                if(viewMode !== 'VIEW'){
                  this.sendWebposQtMsg();

                // 견적완료 상태이면 메시지 전송
                /*if(headQTData[0].ESTM_STS === '2' && this.qtInfo.QTSts === "견적요청"){
                  console.log('headQTData[0].ESTM_STS : ',headQTData[0].ESTM_STS);
                  console.log(' this.qtInfo.QTSts : ', this.qtInfo.QTSts);
                  this.sendQTconfirmMsg();
                  this.tabIndex = 1;
                }*/
                }

                if(this.qtInfo.QTSts === "견적회신"){
                  this.tabIndex = 1;
                }
                else if(this.qtInfo.QTSts === "주문요청"){
                  this.GetOrderHistory();
                }
                else if(this.qtInfo.QTSts === "주문확정"){
                  this.tabIndex = 2;
                }

              }
              /* var qtKeys = Object.keys(rtnQTData );*/
              /*console.log("ESTM_HED : " + this.headQTData );
              console.log("ESTM_DTL : " + this.detailQTData );*/
            }
          }
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    sendWebposQtMsg(){

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";   
      param.payload.ExpressionAttributeValues[key] =  this.headQTData[0].ESTM_ID;

      //console.log("======= QT state Request result ========");
      //console.log(param); 
      
      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {

        console.log("======= QT state result ========");
        console.log(result.data); 
        let qtSts = result.data.Items[0].QTSts;
        if((this.headQTData[0].ESTM_STS === '2' || this.headQTData[0].ESTM_STS === '4' ) && qtSts === "견적요청"){
          this.sendQTconfirmMsg();
          this.tabIndex = 1;
        }
      })
      .catch((error) => {
          console.log(error);
      }) 
    },
    SetQtInfo(){
      console.log('UserType : ' , this.UserInfo );
      console.log("QT Info 설정" + JSON.stringify(this.qtInfo));  
      
      this.tabIndex = 0;
      this.vinNoBackColor = "";
      
      if( this.qtInfo.LineItem !== undefined)
      { 
        if(this.qtInfo.LineItem.length > 0)
        {  
          this.qtInfo.CarVin = convertDynamoToString(this.qtInfo.CarVin);
          this.qtInfo.Memo = convertDynamoToString(this.qtInfo.Memo); 
          this.qtItems = JSON.parse(convertDynamoToArrayString(this.qtInfo.LineItem));
        }
        else{
          this.qtInfo.CarVin = "";
          this.qtInfo.Memo = "";
          this.qtItems = [];
        }

        var btnAdd =  document.querySelector('#btnItmAdd');
        if(btnAdd !== undefined && btnAdd !== null)
          btnAdd.removeAttribute("disabled", "true");
      }

      if(this.qtInfo.CarBrand === undefined) this.qtInfo.CarBrand = "차종 선택";

      // webpos견적 Data 초기화
      this.series = '';
      this.angentNm = '';
      this.estmStsNm = '';
      this.showSum = false;
      this.detailQTData = [];
    },
    GetSiteInfo(){
      this.showSiteInfo = false;
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_SITE";
      param.payload = {};
      param.payload.FilterExpression = "CODE = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ReqSite;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Site result ========");
        console.log(result.data);
        this.siteInfo = result.data.Items[0];
        this.showSiteInfo = true;
      });
    },
    sendQTconfirmMsg()
    {
      var viewMode = localStorage.getItem('LoginMode');
      if(viewMode === 'VIEW')return;
      console.log('viewMode : ' , viewMode);
      if(this.detailQTData.length === 0) return;

      if(this.qtInfo.CarVin === '99999999999999999' || this.qtInfo.CarVin === ''){
        var param = {};
        param.CarNo = this.qtInfo.CarNo;
        
        console.log("=======  VinNo result ========");
        console.log(param); 

        var rtnCode = "";
        var rtnCount = 0;

        axios({
            method: 'POST',
            url: Constant.SCPIF_URL + 'GetROList',
            headers: Constant.JSON_HEADER,
            data: param
        })
        .then((result) => {
          console.log("======= Return VinNo result ========");
          console.log(result.data); 

          if(result.data.ReturnDataCount > 0) {
            let vinList = JSON.parse(result.data.ReturnDataJSON);
            this.qtInfo.CarVin = vinList[0].SSN_CAR;
            this.updateQt();
          }
          else{
           this.updateQt();
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
      else{
        this.updateQt();
      }
    },
    updateQt(){
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var checkMsg = false;
      var msg = '';

      for(var msg of this.msgDatas) {
        if(msg.msgData.msg.indexOf('차량에 대한 견적이 완료') > 0) 
          checkMsg = true;
      }

      if(checkMsg === false)
        msg = ((this.qtInfo.CarNo==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 완료됐습니다.";
      else
        msg = ((this.qtInfo.CarNo==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 수정 후 재전송 되었습니다.";      
      
      if(this.headQTData[0].AGENT_MEMO !== null && this.headQTData[0].AGENT_MEMO.length > 0){
        msg = msg + "<br><span style='color:red'>( " + this.headQTData[0].AGENT_MEMO + " ) </span>" ;
      }

      
      if(this.fileQTData.length > 0){
        msg = msg + "<br>#첨부파일 " + this.fileQTData.length  + "개 있습니다.<br>WEBPOS에서 확인 해 주세요." ;
      }

      var qtMsg = {};
      qtMsg.from = {'name' : this.UserInfo.BsnID};
      qtMsg.msg  = msg;
      qtMsg.reqTm = chatTime;
      qtMsg.ChatType = "R";
      //this.$EventBus.$emit('send-QTConfirm' , qtMsg);

      // 견적상태 Update
      var agentNm = this.angentNm;
      if(agentNm === null){
        agentNm = this.UserInfo.Name;
      }
      console.log('update agentNmae : ' , agentNm);

      var param = {};
      param.operation = "update";
        param.tableName = "BAY4U_QT_LIST";
        param.payload = {};
        param.payload.Key = {};
        param.payload.Key.ID = this.qtInfo.ID;
        if(this.qtInfo.CarSeries === undefined || this.qtInfo.CarSeries === '') {
          param.payload.UpdateExpression = "Set CarBrand = :b, QTSts = :c, CarVin = :d, AgentName = :e, ResUserID = :f";
          param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand,
                ":c" : "견적회신",
                ":d" : this.qtInfo.CarVin,
                ":e" : agentNm,
                ":f" : this.UserInfo.UserID
          };
        }
        else {
          param.payload.UpdateExpression = "Set CarBrand = :b, CarSeries = :s, QTSts = :c, CarVin = :d, AgentName = :e, ResUserID = :f" ;
          param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand,
                ":s" : this.qtInfo.CarSeries,
                ":c" : "견적회신",
                ":d" : this.qtInfo.CarVin,
                ":e" : agentNm,
                ":f" : this.UserInfo.UserID
          };
        }
                
        console.log("======= QT Update Request ========");
        console.log(JSON.stringify(param));

        axios({
            method: 'POST',
            url: Constant.LAMBDA_URL,
            headers: Constant.JSON_HEADER,
            data: param
        })
        .then((result) => {
          console.log("======= QT Update result ========");
          console.log(result.data);

          let updateData = {};
          updateData.ID = this.qtInfo.ID;
          updateData.Msg = '견적회신';
          updateData.AgentName = agentNm;
          if(this.qtInfo.AgentName !== agentNm){
            updateData.UpdateRead = 'Y';
          }
          updateData.ChatType = "R";
          updateData.SendFlag = "DEALER";
          this.$EventBus.$emit('update-Sts' , updateData);

          qtMsg.qtInfo = this.qtInfo;
          this.$EventBus.$emit('send-QTConfirm' , qtMsg);

          qtMsg.docId = this.qtInfo.ID;
          this.$EventBus.$emit('UserListPage.TopMoveChat', qtMsg); 

        })
        .catch((error) => {
          console.log(error);
        });
    },
    showQTImage(img) { 
      console.log("QTInfo : ", this.qtInfo);
      console.log("Image : ", img);
      this.showQTImageFlag = true;
      this.itemImage = Constant.IMG_URL + img;

      var http = new XMLHttpRequest();
      http.open('HEAD', Constant.IMG_URL + img, false);
      http.send(); 
      console.log("Image Check : ", http.status);
    },
    saveImage() {
      console.log("Info : ", this.qtInfo);
      var link   = document.createElement('a');
      link.href = this.itemImage;
      link.target = '_self';
      if(this.qtInfo.CarVin !== '' )
        link.download = this.qtInfo.CarVin + '.png';
      else
        link.download = this.qtInfo.ID + '.png';
      link.click();
    },
    SendSMS()
    {
      var param = {};
      param.TranPhone = "010-0000-0000";
      param.TranCallback = "1600-9691";
      param.TranMsg =  "모바일 견적요청이 완료되었습니다.";  

      console.log("======= SendSMS Request result ========");
      console.log(param); 

      axios({
          method: 'POST',
          //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/SendSMS',
          url:'https://bay4u.co.kr/scpif/SendSMS',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          data: param
      })
      .then((result) => {
          console.log("======= SendSMS Return result ========");     
          console.log(result.data); 
          console.log(result.data.ReturnMessage)
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    sendQTSMS() {
      var param = {};
      param.system = "BAY4U";
      param.telNo = this.siteInfo.HP;
      param.callbackNo = "1600-9691";

      if(this.selectedSMS === "직접입력")
        param.msg = this.typedSMS;
      else
        param.msg = this.selectedSMS;   

      console.log("======= sendQTSMS Request result ========");
      console.log(param); 
      console.log(this.siteInfo);

      axios({
          method: 'POST',
          url: Constant.SCPIF_URL + 'SendSMS',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          data: param
      })
      .then((result) => {
          console.log("======= sendQTSMS Return result ========");     
          console.log(result.data); 
          console.log(result.data.ReturnMessage)

          var now = new Date();
          var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

          var qtMsg = {};
          qtMsg.from = {'name' : this.UserInfo.BsnID};
          qtMsg.msg  = "SMS 전송 하였습니다. 확인 부탁합니다.";
          qtMsg.reqTm = chatTime;
          qtMsg.ChatType = "R";
          
          this.$EventBus.$emit('send-QTConfirm' , qtMsg);

      })
      .catch((error) => {
          console.log(error);
      })   
    },
    editItem (item) {
      this.editedIndex = this.detailQTData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;    
    },
    deleteItem (item) {
      const index = this.detailQTData.indexOf(item);
      confirm('삭제하시겠습니까?') && this.detailQTData.splice(index, 1);
    },
    selectedDeleteItem () {
    
      if(this.selected.length > 0 )
      {
          this.selected.forEach(item =>{
             const index = this.detailQTData.indexOf(item);
             this.detailQTData.splice(index, 1);
          });
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    addItem () {
      this.editedItem.seq = this.detailQTData.length + 1;
      if (this.editedIndex > -1) {
        Object.assign(this.detailQTData[this.editedIndex], this.editedItem)
      } 
      else {
        this.detailQTData.push(this.editedItem)
      }
      this.close()
    },
    saveQTConfirm(){
      
      if(this.detailQTData.length === 0) return;

      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var checkMsg = false;
      var msg = '';

      for(var msg of this.msgDatas) {
        if(msg.msgData.msg.indexOf('차량에 대한 견적이 완료') > 0)
          checkMsg = true;
      }

      if(checkMsg === false)
        msg = ((this.qtInfo.CarNo ==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 완료됐습니다.";
      else
        msg = ((this.qtInfo.CarNo ==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 수정 후 재전송 되었습니다.";

      var id =  this.UserInfo.BsnID + this.qtInfo.ReqSite + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)
      + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);;
      var qtMsg = {};
      qtMsg.from = {'name' : this.UserInfo.BsnID};
      qtMsg.msg  = msg;
      qtMsg.reqTm = chatTime;
      qtMsg.ChatType = "R";
      qtMsg.RefID = id;
      
      //this.$EventBus.$emit('send-QTConfirm' , qtMsg);

      var param = {};

                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                        + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      param.operation = "create";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.qtInfo.ID;  //docId
      param.payload.Item.CarNo = this.qtInfo.CarNo;
      param.payload.Item.ResDealer = this.UserInfo.BsnID;
      param.payload.Item.ReqSite = this.qtInfo.ReqSite;
      param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.detailQTData));
      param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      param.payload.Item.ReqTm = ReqTm;
      param.payload.Item.ResDealerNm = this.UserInfo.Name;
      param.payload.Item.ResUserID = this.UserInfo.UserID;
              
      console.log("======= QT Return Save Request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= QT Return Save result ========");
        console.log(result.data);
        this.txtQTConfirm = "견적 재회신";

        //console.log("======= Check QT ========");
        //console.log(JSON.stringify(this.qtInfo));

        param.operation = "update";
        param.tableName = "BAY4U_QT_LIST";
        param.payload = {};
        param.payload.Key = {};
        param.payload.Key.ID = this.qtInfo.ID;
        if(this.qtInfo.CarSeries === undefined || this.qtInfo.CarSeries === '') {
          param.payload.UpdateExpression = "Set CarBrand = :b, QTSts = :c, AgentName = :d, ResUserID = :e";
          param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand,
                ":c" : "견적회신",
                ":d" : this.UserInfo.Name,
                ":e" : this.UserInfo.UserID
          };
        }
        else {
          param.payload.UpdateExpression = "Set CarBrand = :b, CarSeries = :s, QTSts = :c, AgentName = :d, ResUserID = :e";
          param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand,
                ":s" : this.qtInfo.CarSeries,
                ":c" : "견적회신",
                ":d" : this.UserInfo.Name,
                ":e" : this.UserInfo.UserID
          };
        }
                
        console.log("======= QT Update Request ========");
        console.log(JSON.stringify(param));

        axios({
            method: 'POST',
            url: Constant.LAMBDA_URL,
            headers: Constant.JSON_HEADER,
            data: param
        })
        .then((result) => {
          console.log("======= QT Update result ========");
          console.log(result.data);
          
          let updateData = {};
          updateData.ID = this.qtInfo.ID;
          updateData.Msg = '견적회신';
          updateData.AgentName = this.UserInfo.Name;
          if(this.qtInfo.AgentName !== this.UserInfo.Name){
            updateData.UpdateRead = 'Y';
          }
          updateData.ChatType = "R";
          updateData.SendFlag = "DEALER";
          this.$EventBus.$emit('update-Sts' , updateData);

          qtMsg.qtInfo = this.qtInfo;
          qtMsg.SaveName = this.UserInfo.Name;
          qtMsg.SaveID = this.UserInfo.UserID;
          
          this.$EventBus.$emit('send-QTConfirm' , qtMsg);

          qtMsg.docId = this.qtInfo.ID;
          this.$EventBus.$emit('UserListPage.TopMoveChat', qtMsg);  
        })
        .catch((error) => {
          console.log(error);
        });

      })
      .catch((error) => {
        console.log(error);
      });
    },
    // 주문확정 저장
    saveOrderConfirm()
    {
 
      if(this.orderHistory.length === 0 ) return;

      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var msg = ((this.qtInfo.CarNo==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량 부품 주문 확정 완료!!";

      var qtMsg = {};
      qtMsg.from = {'name' : this.UserInfo.BsnID};
      qtMsg.msg  = msg;
      qtMsg.reqTm = chatTime;
      qtMsg.ChatType = "E";
      qtMsg.RefID = this.orderID;
      qtMsg.SaveName = this.UserInfo.Name;
      qtMsg.SaveID = this.UserInfo.UserID;
      
      var param = {};
      param.operation = "update";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.Key = {};
      param.payload.Key.ID =  this.qtInfo.ID;
      param.payload.UpdateExpression = "Set QTSts = :c, AgentName = :d, ResUserID = :e" ;
      param.payload.ExpressionAttributeValues = {
          ":c" : "주문확정",
          ":d" : this.UserInfo.Name,
          ":e" : this.UserInfo.UserID
      };

      console.log("======= QT Update Request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= QT Update result ========");
        console.log(result.data);

        var btnOrder =  document.querySelector('#btnOrdConfirm');
        btnOrder.setAttribute("disabled", "true");

        let updateData = {};
        updateData.ID = this.qtInfo.ID;
        updateData.Msg = '주문확정';
        updateData.AgentName = this.UserInfo.Name;
        if(this.qtInfo.AgentName !== this.UserInfo.Name){
          updateData.UpdateRead = 'Y';
        }
        updateData.ChatType = "E";
        updateData.SendFlag = "DEALER";
        this.$EventBus.$emit('update-Sts' , updateData);

        qtMsg.qtInfo = this.qtInfo;
        this.$EventBus.$emit('send-QTConfirm' , qtMsg);

        qtMsg.docId = this.qtInfo.ID;
        this.$EventBus.$emit('UserListPage.TopMoveChat', qtMsg); 

      })
      .catch((error) => {
        console.log(error);
      });
    },
    getQTConfirm(){
      this.detailQTData = [];
      this.confirmList = [];
      this.orderHistory = [];

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ID;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= QT Confirm result========");
        console.log( result.data);

        if(result.data.Items.length > 0){
          this.txtQTConfirm = "견적 재회신";

          if(Array.isArray(result.data.Items))
          {
            result.data.Items.sort(function(a, b){
              return (a.ReqTm > b.ReqTm) ? 1 : -1;
            });
          }

          this.confirmList = result.data.Items.map( obj => { 
            var rObj = {};
            rObj.value = obj.ID;
            rObj.text = this.setRequestTime(obj.ReqTm);
            rObj.data = obj;
            return rObj;
          });

          this.selectedConfirm = this.confirmList[0].value;
          //console.log('this.confirmList : ' , this.confirmList);
          //this.detailQTData = JSON.parse(convertDynamoToArrayString(result.data.Items[result.data.Items.length -1].LineItem));
          this.detailQTData = JSON.parse(convertDynamoToArrayString(this.confirmList[0].data.LineItem));
          this.GetOrderHistory();
        }
        else{
          this.txtQTConfirm = "견적확정 회신";
        }
         
      });
    },
    getConfirmData()
    {
       let index = this.confirmList.findIndex(x => x.value === this.selectedConfirm);
       this.detailQTData = JSON.parse(convertDynamoToArrayString(this.confirmList[index].data.LineItem));
    },
    clipImageAdd() { 
      var clipImage = document.getElementById('clipImageBtn').value;
      this.$EventBus.$emit('paste-Image' , clipImage);      
    },
    clipboardAdd() {
      console.log("======= clipboardAdd ========");
      var clipText = document.getElementById('clipboardBtn').value;

      var copyData = clipText.split(/\r\n|\r|\n/);
      console.log('copyData : ', copyData);

      if(copyData[0].indexOf('차종	부품명	애프터번호') > -1) { // 해당 문구가 있다면 대신 화면에서 카피한 케이스
        var idx = -1;
        var itemIdx = 1;
        var newItem = {};
        this.detailQTData = [];

        for(var item of copyData ){
          if(item === '삭제 '){
            idx = 0;
          }

          if(idx >= 0) {

            if(idx === 1) {
              var itemElem = item.split('	');
              newItem.itemCode = itemElem[0];
              newItem.itemBrand = itemElem[1];
            }
            if(idx === 2) {
              newItem.carBrand = item;
              if(this.carBrand.includes(item))
                this.qtInfo.CarBrand = item;
            }
            if(idx === 3) {
              newItem.itemName = item;
            }
            if(idx === 4) {
              if(isNaN(item) === false && item.length <= 2) {idx++;} // 애프터 품번 자리에 2자리 이하의 숫자가 들어갔다면 애프터는 비워지고 숫자가 들어온 케이스 임.
              else newItem.memo = "애프터품번 : " + item;
            }
            if(idx === 5) {
              newItem.itemQty = item.replace(',','');
            }
            if(idx === 6) {
              newItem.itemPrice = item.replace(',','');
            }
            if(idx === 7) {
              newItem.AMT = item.replace(',','');
            }

            if(item === '[수정]'){
              newItem.seq = itemIdx++;
              this.detailQTData.push(newItem);
              console.log('detailQTData : ', this.detailQTData);
              newItem = {};
            }

            idx++;
          }
        }
      }
      else if(copyData[0].indexOf('품목명[규격]	센터가(VAT별도)') > -1) { // 해당 문구가 있다면 JAX 화면에서 카피한 케이스
        var idx = 0;

        for (var i = 1; i < copyData.length; i++) {
          var val = copyData[i].split('	');

          if(val.length > 1) {
            var newItem = {};
            newItem.seq = idx++;
            newItem.itemCode = val[0];
            var nameParse = [];
            
            for(var substr1 of val[1].split('[')){
              for(var substr2 of substr1.split(']')){
                if(substr2 !== '')
                  nameParse.push(substr2);
              }
            }
            if(nameParse.length > 1) {
              newItem.itemName = val[1];
              newItem.itemBrand = nameParse[nameParse.length-1];
              //var checkStr = "[" + newItem.itemBrand + "]";
              //newItem.itemName = val[1].replace("/" + checkStr + "/g", "");
            }
            else {
              newItem.itemName = val[1];
            }
            newItem.itemQty = val[3].replace(',','');
            newItem.itemPrice = parseInt(parseInt(val[4].replace(',','')) *  1.1);
            newItem.AMT = val[7].replace(',','');
            newItem.memo = '센터가 : ' + val[2];
    
            this.detailQTData.push(newItem);       
          }   
        }      
      }
      /*
      else {  // 아니면 엑셀에서 카피한 케이스
        var idx = 0;

        for(var item of copyData ){
          var newItem = {};
          newItem.seq = idx++;
          var val = item.split('	');
          newItem.itemCode = val[0];
          newItem.itemBrand =  val[1];
          newItem.carBrand =  val[2];
          newItem.itemName =  val[3];
          newItem.afterNo =  val[4];
          newItem.itemQty =  val[5].replace(',','');
          newItem.itemPrice =  val[6].replace(',','');
          newItem.AMT =  val[7].replace(',','');
          newItem.memo =  val[8];
  
          this.detailQTData.push(newItem);
        }
      }*/
    },
    GetOrderHistory()
    {
      this.orderHistory = [];
      this.orderID = '';
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_ORDER_LIST";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ID;
     
      console.log("======= 주문내역 조회 Request result ========");
      console.log(param); 

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        if(result.data.Items.length > 0 && result.data.Items[0].LineItem.length > 0 ){
          console.log("=======주문내역 조회 result ========");
          console.log( result.data.Items[0].LineItem);
          this.tabIndex = 2;
          this.orderID = result.data.Items[0].ID;
          this.orderHistory  = JSON.parse(convertDynamoToArrayString(result.data.Items[0].LineItem));
        }
        else{
           this.tabIndex = 1 ;
        }
      });  
      
    },
    clickBrandSelect(brand) {
      console.log("clickBrandSelect : ", brand);
      if(brand !== '기타') {
        this.qtInfo.CarBrand = brand;
        document.getElementById('btnBrandSelect').click();
        this.brandClicked = false;
        console.log("clickBrandSelect : ", this.qtInfo.CarBrand);
      }
      else {
        this.typedBrand = '';
        this.showBrandInputFlag = true;
      }
    },
    brandInput() {
      this.showBrandInputFlag = false;
      this.qtInfo.CarBrand = this.typedBrand.toUpperCase();
      document.getElementById('btnBrandSelect').click();
      this.brandClicked = false;      
    }, 
    setRequestTime(value)
    { 
      if(value !== undefined){
        var year = value.substring(0, 4);
        var month = value.substring(4, 6);
        var date = value.substring(6, 8);
        var hour = value.substring(8, 10);
        var minute = value.substring(10, 12);
        return year +'-'+ month + '-' + date + ' '+ hour + ':' + minute;
      }
      else{
        return value;
      }
    },
    // 바로주문 저장
    saveConfirmQTOrder()
    {
      if(this.detailQTData.length === 0) return;

      let now = new Date();
      let chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var id =  this.UserInfo.BsnID + this.qtInfo.ReqSite + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)
      + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);;
 
      let ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                        + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      let param = {};
      
      param.operation = "create";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.qtInfo.ID;  
      param.payload.Item.CarNo = this.qtInfo.CarNo;
      param.payload.Item.ResDealer = this.UserInfo.BsnID;
      param.payload.Item.ReqSite = this.qtInfo.ReqSite;
      param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.detailQTData));
      param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      param.payload.Item.ReqTm = ReqTm;
      param.payload.Item.ResDealerNm = this.UserInfo.Name;
      param.payload.Item.ResUserID = this.UserInfo.UserID;
              
      console.log("======= QT Return Save request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= QT Return Save result ========");
        console.log(result.data);

        // 주문내역 저장
        now = new Date();
        let ordId = this.qtInfo.ReqSite + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
        
        ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
          
        param.operation = "create";
        param.tableName = "BAY4U_ORDER_LIST";
        param.payload = {};
        param.payload.Item = {};
        param.payload.Item.ID = ordId;
        param.payload.Item.DocID = this.qtInfo.ID;    //docId
        param.payload.Item.CarNo = this.qtInfo.CarNo;
        param.payload.Item.ReqSite =  this.qtInfo.ReqSite;
        param.payload.Item.ReqSiteNm = this.qtInfo.ReqName;
        param.payload.Item.ResDealer = this.UserInfo.BsnID;
        param.payload.Item.ResDealerNm = this.UserInfo.Name;
        param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.detailQTData));
        param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
        param.payload.Item.ReqTm = ReqTm;
        param.payload.Item.ResUserID = this.UserInfo.UserID;
            
        console.log("======= Order Request ========");
        console.log(JSON.stringify(param));

        axios({
            method: 'POST',
            url: Constant.LAMBDA_URL,
            headers: Constant.JSON_HEADER,
            data: param
        })
        .then((result) => {
          console.log("======= Order result ========");
          console.log(result.data);
          
          // 상태변경 / 채팅 전송
          param.operation = "update";
          param.tableName = "BAY4U_QT_LIST";
          param.payload = {};
          param.payload.Key = {};
          param.payload.Key.ID = this.qtInfo.ID;

          if(this.qtInfo.CarSeries === undefined || this.qtInfo.CarSeries === '') {
            param.payload.UpdateExpression = "Set CarBrand = :b, QTSts = :c, AgentName = :d, ResUserID = :e" ;
            param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand,
                ":c" : "주문확정",
                ":d" : this.UserInfo.Name,
                ":e" : this.UserInfo.UserID
            };
          }
          else {
            param.payload.UpdateExpression = "Set CarBrand = :b, CarSeries = :s, QTSts = :c, AgentName = :d, ResUserID = :e" ;
            param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand,
                ":s" : this.qtInfo.CarSeries,
                ":c" : "주문확정",
                ":d" : this.UserInfo.Name,
                ":e" : this.UserInfo.UserID
            };
          }
                  
          console.log("======= QT Update Request ========");
          console.log(JSON.stringify(param));

          axios({
              method: 'POST',
              url: Constant.LAMBDA_URL,
              headers: Constant.JSON_HEADER,
              data: param
          })
          .then((result) => {
            console.log("======= QT Update result ========");
            console.log(result.data);

            now = new Date();
            let chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

            let msg =  ((this.qtInfo.CarNo === "*empty*") ? "미상차량" : this.qtInfo.CarNo) + " 차량 부품 바로주문 확정 완료!!";

            let qtMsg = {};
            qtMsg.from = {'name' : this.UserInfo.BsnID};
            qtMsg.msg  = msg;
            qtMsg.reqTm = chatTime;
            qtMsg.ChatType = "E";
            qtMsg.RefID = ordId;
            qtMsg.SaveName = this.UserInfo.Name;
            qtMsg.SaveID = this.UserInfo.UserID;

            let updateData = {};
            updateData.ID = this.qtInfo.ID;
            updateData.Msg = '주문확정';
            updateData.AgentName = this.UserInfo.Name;
            if(this.qtInfo.AgentName !== this.UserInfo.Name){
              updateData.UpdateRead = 'Y';
            }
            updateData.ChatType = "E";
            updateData.SendFlag = "DEALER";
            
            this.$EventBus.$emit('update-Sts' , updateData);

            qtMsg.qtInfo = this.qtInfo;
            this.$EventBus.$emit('send-QTConfirm' , qtMsg);

            this.tabIndex = 2;
            this.tab1Title = '견적 요청';
            this.tab2Title = '견적 회신';
            this.showBtnQT = true;
            this.showBtnOrder = false;
            this.GetOrderHistory();
          })
          .catch((error) => {
            console.log(error);
          });

        })
        .catch((error) => {
          console.log(error);
          this.showProcessing = false;
          this.saveCount = 0;
        });

      })
      .catch((error) => {
        console.log(error);
      });
    }, 
    getRoHistory()
    {
      if(this.qtInfo.ReqSite === undefined || this.qtInfo.CarNo === undefined) return;
      this.roList = [];

      var param = {};
      param.BsnId = this.qtInfo.ReqSite;
      param.CarNo = (this.qtInfo.CarNo === null)?'':this.qtInfo.CarNo;
      param.VinNo = (this.qtInfo.CarVin === '99999999999999999') ? '' : this.qtInfo.CarVin;

      console.log("======= ROHistory Request result ========");
      console.log(param); 

      this.processMsg = "과거 정비이력 조회 중입니다. \n잠시만 기다려주세요.";
      this.showProcessing = true;

      var rtnCode = "";
      var rtnCount = 0;

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

          if(Array.isArray(result.data.ReturnDataJSON))
          {
            result.data.ReturnDataJSON.sort(function(a, b){
              return (a.DC_DY_BSN > b.DC_DY_BSN) ? 1 : -1;
            });
          }
          this.roList = JSON.parse(result.data.ReturnDataJSON);
          // 차대번호가 다르면 Webpos 차대번호로 변경
          if(this.qtInfo.CarVin !== this.roList[0].VIN_NO && this.roList[0].VIN_NO !== ''){
            this.qtInfo.CarVin = this.roList[0].VIN_NO;
            this.vinNoBackColor = "yellow lighten-4";
          }
          this.showROHistDialog = true;
          this.$EventBus.$emit('ROHistory.SetROInfo',this.roList);
        }
        else{
          alert('과거 정비이력이 없습니다.');
        }

        this.showProcessing = false;
        this.processMsg = "";
      })
      .catch((error) => {
        this.showProcessing = false;
        this.processMsg = "";
        console.log(error);
      })
    },
    closeRoHistory()
    {
      this.roList = [];
      this.showROHistDialog = false;
    },
    saveCarInfo()
    {
      var param = {};
      param.operation = "update";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.Key = {};
      param.payload.Key.ID = this.qtInfo.ID;
      param.payload.UpdateExpression = "Set CarBrand = :b, CarNo = :c, CarVin = :d , CarSeries = :e ";
      param.payload.ExpressionAttributeValues = {
        ":b" : this.qtInfo.CarBrand,
        ":c" : this.qtInfo.CarNo,
        ":d" : this.qtInfo.CarVin,
        ":e" : this.qtInfo.CarSeries
      };

      console.log("======= Car Info Update Request ========");
      console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Car Info Update result ========");
        console.log(result.data);
        this.alertMsg = "차량정보가 수정되었습니다.";
        this.showAlertMsg = !this.showAlertMsg;
        this.vinNoBackColor = '';
      })
      .catch((error) => {
        console.log(error);
      });
    },
    GetCarNoOrdHistory(item){
      this.ordHistroyList = [];
      var now = new Date();
      var beforeDate = new Date();
      var startDate , endDate;0
      beforeDate.setFullYear(beforeDate.getFullYear() - 3);
      startDate =  beforeDate.toISOString().substr(0, 10);
      endDate = now.toISOString().substr(0, 10);

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_ORDER_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ResDealer = :id and CarNo = :carno and ReqDt between :startDt and :endDt";
      param.payload.ExpressionAttributeValues = {};
      param.payload.ExpressionAttributeValues[":id"] = this.UserInfo.BsnID;
      param.payload.ExpressionAttributeValues[":carno"] = item.CarNo;
      param.payload.ExpressionAttributeValues[":startDt"] = startDate;
      param.payload.ExpressionAttributeValues[":endDt"] = endDate;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {

        if(Array.isArray(result.data.Items)) {
          result.data.Items.sort(function(a, b){
            return (a.ReqTm < b.ReqTm) ? 1 : -1;
          });
        }

        this.ordHistroyList = result.data.Items; 
        if(this.ordHistroyList.length > 0 ){
          if(item.SaveFlag !== undefined && item.SaveFlag === "ACCEPT"){
            this.alertMsg = "해당 차량의 과거 견적/주문 내역이 있습니다.<br>과거 내역을 조회하시겠습니까?";
            this.showOrdHistory = true;  
          }
          if(item.QTSts === "견적접수" || item.QTSts === "견적회신" || item.QTSts === "주문확정" || item.QTSts === 주문접0수){
            this.showBtnHisOrd = true;
          }
          else{
            this.showBtnHisOrd = false;
          }
        }
        else{
          this.showBtnHisOrd = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    CloseAlerPopup(){
      this.showOrdHistory = false;
    },
    ShowPopupOrdHistory(){
      this.showOrdHistory = false;

      var orderInfoData = {};
      orderInfoData.OrderData = this.ordHistroyList;
      orderInfoData.SERIES = this.qtInfo.CarSeries;
      orderInfoData.VINNO = this.qtInfo.CarVin;
      
      this.showOrdHistDialog = true;
      this.$EventBus.$emit('OrderHistory.SetOrderInfo',orderInfoData);
      
    },
    closeOrderHistory()
    {
      this.showOrdHistDialog = false;
    },
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
        set(value) { this.$store.dispatch('UpdateMsgData',value) }
    },        
    total: function() {
      let sum = 0;
      this.detailQTData.forEach(function(item) {
        sum += (parseFloat(item.AMT));
      });
      return sum;
    },
    total2: function()
    {
      let sum = 0;
      this.orderHistory.forEach(function(item) {
        sum += (parseFloat(item.AMT));
      });
      return sum;
    },
    btnEditText () {
      return this.editedIndex === -1 ? '추가' : '수정'
    },
  },

  created: function(){

    this.$EventBus.$on('click-qtInfo', qtItem => {   
      
      console.log('click Item:' , qtItem);
        this.qtInfo = qtItem;
        this.SetQtInfo();
        this.GetSiteInfo();

        if(qtItem.Flag !== undefined && qtItem.Flag === "ORDER"){
          this.visibleQTTab = false;
        }
        else{
          this.visibleQTTab = true;
        }
        
        if(this.qtInfo !== undefined && this.qtInfo.QTSts === '바로주문' || this.qtInfo.QTSts === '주문접수'){
          this.tab1Title = '바로 주문 요청';
          this.tab2Title = '바로 주문 회신';
          this.showBtnQT = false;
          this.showBtnOrder = true;
        }
        else{
          this.tab1Title = '견적 요청';
          this.tab2Title = '견적 회신';
          this.showBtnQT = true;
          this.showBtnOrder = false;
        }
        
        if(this.UserInfo.UserType !== 'DEALER'){
          
          if(qtItem.QTSts === "견적요청"){
            this.visibleTab = false;
          }
          else{
            this.visibleTab = true;
          }
          // 일반대리점 일떼
          this.getQTConfirm();
        }
        
        // 부품지원센터 일때
        if(this.UserInfo.UserType === 'DEALER')
        {
          if(this.qtInfo !== undefined && this.qtInfo.QTSts === '주문요청'){
            this.GetOrderHistory();
          }
          else{
            this.GetQtList();
          }

          this.visibleTab = true;
        }
        else{
          this.GetCarNoOrdHistory(qtItem)
        }
        
        if(this.brandClicked === true){
          document.getElementById('btnBrandSelect').click();
          this.brandClicked = false;
        }

        let btnOrder =  document.querySelector('#btnOrdConfirm');
        if(btnOrder !== undefined && btnOrder !== null)
        {
          if(this.qtInfo !== undefined && this.qtInfo.QTSts === '주문확정'){
            btnOrder.setAttribute("disabled", "true");
          }
          else{
            btnOrder.removeAttribute("disabled");
          }
        }
    });

    this.$EventBus.$on('init-qtInfo', chatItem => {   
        this.qtInfo = [];
        this.SetQtInfo();
        this.siteInfo = [];
        this.qtItems = [];
        this.confirmList = [];
        this.detailQTData = [];
        this.orderHistory = [];
        this.showSiteInfo = false;
        if(this.brandClicked === true){
          document.getElementById('btnBrandSelect').click();
          this.brandClicked = false;
        }
    });

    this.$EventBus.$on('get-orderList', paramItem => {   
      // 상태가 주문요청으로 변경되었을때 주문내역 조회 
      this.GetOrderHistory();
    });

    this.$EventBus.$on('click-showImage', img => {   
        this.itemImage = img;
        this.showQTImageFlag = true;
    });    

    //document.getElementById('InfoPage').addEventListener('paste', handlePaste, true);
    //console.log('event..........', );

    document.addEventListener('paste', function (event) {
      var clipText = event.clipboardData.getData('Text');
      var clipItem = event.clipboardData.items;

      if(clipText.length > 0) {
        console.log('clipText : ', clipText);
        document.getElementById('clipboardBtn').value = clipText;
        document.getElementById('clipboardBtn').click();
      }
      else {
        for (var i = 0; i < clipItem.length; i++) {
          console.log('clipItem : ', clipItem[i]);

          if (clipItem[i].type.indexOf("image") == -1) continue;

          var blob = clipItem[i].getAsFile();
          console.log('blob : ', blob);

          var reader = new FileReader();
          reader.onload = function(event){
            document.getElementById('clipImageBtn').value = event.target.result;
            document.getElementById('clipImageBtn').click();            
          }; 
          var source = reader.readAsDataURL(blob);
        }
      }
      
    });
  },
  mounted: function()
  {
    if(this.qtInfo.length === 0)
    {
      var btnAdd =  document.querySelector('#btnItmAdd');
      if(btnAdd !== null)
      {
        btnAdd.setAttribute("disabled", "true");
      }
    }
  },
  beforeDestroy(){
    this.$EventBus.$off('click-qtInfo');
    this.$EventBus.$off('init-qtInfo')
    this.$EventBus.$off('get-orderList')
    this.$EventBus.$off('click-showImage')
  },
  watch: {
      dialog (val) {
        val || this.close()
      },
  },
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
.card {
  margin-top: 10px;
  margin-right: 10px;
}
.card-body {
  padding: 10px;
}
.v-application{
  width: 100%;
  height: 100%;
}
.InfoPage {
 height: 90%;
}

.UserInfo-contents {
  display: flex;
}

.UserInfo-img {
  flex: 25%;
  margin:auto;
  width: 90%;
  text-align: center;
}

.UserInfo-info {
  flex: 75%;
  padding: 10px;
}

.UserInfo-info .info-name {
  font-weight: bold;
  font-size: 1.8rem;
  color: #455a63;
  text-align: center; 
  padding-left: 10px;
  padding-right: 30px;
}
.UserInfo-info .info-tel {
  margin-top: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #5d4038;
}
.UserInfo-info .info-addr {
  margin-top: 5px;
  font-size: 0.9rem;
}

.QT-Info {
  display:flex;
  flex-direction: row;
  margin-left: 50px;
}
.QT-Title {
  font-weight: bold;
  color: #5d4038;
  margin-right: 10px;
  margin-bottom: 5px;
  width: 72px;
}
.QT-Content {
  flex: auto;
  font-size: 0.8rem;
  margin-right: 50px;
}
.QT-ContentSts{
  flex: auto;
  font-size: 1rem;
  color:#008080;
  font-weight: bold;
}
.QTReq-List {
  font-weight: bold;
  color: #5d4038;
  height: calc(100vh - 560px);
}
.QTReq-Table {
  width: 100%;
  display: block;
  overflow-y: scroll;
  height: 400px;
  height: calc(100vh - 580px);
}
.QTReq-Memo {
  font-weight: bold;
  color: #5d4038;
  margin-top: 10px;
}

.QTRes-List {
  display: flex;
}
.QTRes-List .QTRes-Title {
  font-weight: bold;
  color: #5d4038;
  text-align: left;
  flex: 20%;
}
.QTRes-select
{
  width: 220px;
}
.QTRes-List .QTRes-Button {
  text-align: right;
  flex: 30%;
  margin-bottom: 10px;
}
.QTRes-ButtonAdd {
  font-weight: bold;
  color: #ff9999;
}
.QTRes-ButtonAdd:hover {
  color: #fff;
}
.QTRes-Table {
  width: 100%;
} 
.QTRes-Table th, tr {
  font-size: 0.8rem;
} 

.QTItem-Brand{
  font-weight: bold;
  color: #967d5f;
}
.QTItem-Title{
  width: 70%;
  font-weight: bold;
  color: #967d5f;
}
.QTItem-Qty{
  width: 15%;
  font-weight: bold;
  color: #967d5f;
}
.QTItem-String{
  width: 5%;
  font-weight: bold;
  color: #967d5f;
  text-align: center;
}

.QT-Detail {
  height: calc(100vh - 385px);
}

.QTRes-footer{
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
    display: flex;
  justify-content: flex-end;
}
.QTRes-footer .TotalInfo{
  margin-right: -1px;
}
.QTRes-footer .TotalInfo-Title{
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    color: #5d4038;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.QTRes-footer .TotalInfo-Text{
     -webkit-box-align: center;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1.1rem;
    font-weight: 400;
    color: #E50914;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.QTRes-footer .TotalInfo-Button{
  width: 100px;
}
.qt-icon{
  color:#5d4038;  
  margin-right: 0.2rem;
}
.card .itemNm{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 145px;
}
.header-item
{
  font-size: 0.9rem;
  font-weight: bold;
  color: #967d5f;
  width: 100px;
}
/*
.mytable {
 
     border: #ff9999 solid 2px;
}*/

.header-item2
{
  font-size: 0.8rem;
  font-weight: bold;
  color: #967d5f;
  padding: 0;
 
}
.item-itemName
{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  font-size: 0.8rem;
}
.item-delv
{
  width: 55px;
  font-size: 0.8rem;
}
.item-itemcode
{
   font-size: 0.8rem;
   font-weight: bold;
   width: 120px;

}
.item-numeric  {
  width: 55px;
  font-size: 0.8rem;
  text-align: right;
  float:right;
}
.item-numeric-qty  {
  width: 35px;
  font-size: 0.8rem;
  text-align: right;
  float:right;
}
td.text-center{
  font-size: 1.2em;
  padding:0;
}
.memoArea{
  background-color: lightyellow;
  font-weight: bold;
  color: #E50914;
}
.btnRoHistory{
  float: right;
  width: 110px;
  height: 30px;
  margin-right: 6px;
}
.btnOrdHistory{
  float: right;
  width: 135px;
  height: 30px;
  margin-right: 6px;
  font-weight: bold;
  color: #3E2723;
}
.showProcessing
{
  text-align:center; 
  font-size: 1.1rem;
}
.brandGroup{
  height: 400px;
  overflow:auto;
  overflow-x:hidden;
}
</style>
