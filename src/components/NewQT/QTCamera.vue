<template>
    <transition>
        <div id="create-camera">
            <video id="player" autoplay playsinline></video>
            <canvas id="canvas" width="320px" height="240px"></canvas>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="capture-btn" @click="captureImg">촬영</button>
            <br/>
            <br/>
            <v-btn fab small color="secondary" @click="closeModal">
                <v-icon>close</v-icon>
            </v-btn>
        </div> 
    </transition> 
</template>


<script>

export default {
  name: 'QTList',
  data () {
    return {
    }
  },
  methods: {
      closeModal() {
          this.$emit('updatePic', '');
          this.$emit('closeQTCameraModal', false);
      },
      captureImg() {
        var videoPlayer = document.querySelector('#player');
        var canvasElement = document.querySelector('#canvas');
        var captureButton = document.querySelector('#capture-btn');

        canvasElement.style.display = 'block';
        videoPlayer.style.display = 'none';
        captureButton.style.display = 'none';
        var context = canvasElement.getContext('2d');
        context.drawImage(videoPlayer, 0, 0, canvasElement.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width));
        videoPlayer.srcObject.getVideoTracks().forEach(function(track) {
            track.stop();
        });

        var url64 = canvasElement.toDataURL();
        //console.log("url64 : " + url64);

        this.$emit('updatePic', url64);
        this.$emit('closeQTCameraModal', false);
      }
  },
  mounted : function() {
      this.$nextTick(function () {
          var videoPlayer = document.querySelector('#player');

        if (!('mediaDevices' in navigator)) {
            navigator.mediaDevices = {};
        }

        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented!'));
            }

            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
            }
        }

        if (navigator.userAgent.match("iPad") == null 
            && navigator.userAgent.match("iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS") != null) 
        { 
        //모바일 접속일 경우
        navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 800 }, height: { ideal: 600 }, facingMode: { exact: "environment" } } })
            .then(function(stream) {
                videoPlayer.srcObject = stream;
                videoPlayer.style.display = 'block';
            })
            .catch(function() {
            //imagePickerArea.style.display = 'block';
            });
        } 
        else { 
            navigator.mediaDevices.getUserMedia({ video: true } )
            .then(function(stream) {
                videoPlayer.srcObject = stream;
                videoPlayer.style.display = 'block';
            })
            .catch(function() {
                //imagePickerArea.style.display = 'block';
            });
        }

      })
  },    
  components: {
  }
}
</script>

<style scoped>
#create-camera {
  z-index: 1001;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  top: 0px;
  background: white;
  text-align: center;
}

#create-camera video, #create-camera canvas {
  width: 512px;
  max-width: 90%;
  display: none;
  margin: auto;
}

#create-camera #pick-image {
  display: none;
}

#create-camera #capture-btn {
  margin: 10px auto;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s, transform 1s;
}
.v-enter {
    opacity:0;
    transform: translateY(-20px);
}
.v-leave-to {
    opacity:0;
    transform: translateY(20px);
}
</style>