<template>

  <div class="backTOTop"  v-if="isVisible">
    <div class="relative">
        <v-btn color="#90A4AE" dark depressed small fab class="goTop" @click="backToTop">
            <v-icon  dark >fa-chevron-up</v-icon>
        </v-btn>
    </div>
  </div>
    
</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>

export default {
  name: 'BackToTo',
  data(){
    return{
       isVisible: false
    }
  },
  methods:
  {
      initToTopButton: function(scrollTop) {
      
       if (scrollTop > 100) {
        this.isVisible = true;
         
        } else {
         this.isVisible = false;
        }
    },
    backToTop: function() {
     document.scrollingElement.scrollTop = 0; 
    }
  },
  mounted: function() {
    var self = this;     
    window.addEventListener("scroll", function (e) {
        var scrolled = document.scrollingElement.scrollTop;
       // console.log(scrolled);
        self.initToTopButton(scrolled);
    });
  }
}
</script>

<style scope>
.backTOTop{
    position: fixed;
  /*  padding: 10px 10px;*/
    width: 64px;
    bottom:0;
    right: -8px;
    height:18%;
   
  /*  background-color: rgb(1,14,27);
    background-color: rgba(1, 14, 27, .7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
 border: 3px solid #73AD21;
    */
}
.goTop {  
    position: absolute;
    z-index: 4;
}
div.relative {
    position: relative;
    width: 65px;
   /*border: 3px solid purple;*/
}
</style>