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
          //this.$emit('updatePic', '');
          var videoPlayer = document.querySelector('#player');
          if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getTracks().map(function (val) {
                val.stop();
            });
          }

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
        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }

        var url64 = canvasElement.toDataURL();
        //console.log("url64 : " + url64);

        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getTracks().map(function (val) {
                val.stop();
            });
        }

        this.$emit('updatePic', url64);
        this.$emit('closeQTCameraModal', false);
      }
  },
  mounted : function() {
      this.$nextTick(function () {
        var videoPlayer = document.querySelector('#player');

        if (!('mediaDevices' in navigator)) {
            alert("mediaDevices create");
            navigator.mediaDevices = {};
        }

        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
                alert("getUserMedia define error ");
                return Promise.reject(new Error('getUserMedia is not implemented!'));
            }

            return new Promise(function(resolve, reject) {
                //if(getUserMedia_nav)
                //    getUserMedia_nav.call(constraints, resolve, reject);
                //else if(getUserMedia_brz)
                //    getUserMedia_brz.call(navigator, constraints, resolve, reject);
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
            }
        }

        //alert("getVideoTracks check");
        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }

        //alert("getTracks check");
        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getTracks().map(function (val) {
                val.stop();
            });
        }        
        /*
        alert("enumerateDevices check");
        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
                devices.forEach(function(device) {
                    alert("device info. : " + JSON.stringify(device) );
                });
            })
            .catch(function(err) {
                    //imagePickerArea.style.display = 'block';
                    alert("[devices] " + err.name + ": " + err.message);
            });*/

        //alert("navigator.userAgen check");
        if (navigator.userAgent.match("iPad|iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS") != null) 
        { 
            //모바일 접속일 경우
            //navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 800 }, height: { ideal: 600 }, facingMode: { exact: "environment" } } })
            //navigator.mediaDevices.getUserMedia({ video: true } )
            navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
                .then(function(stream) {
                    videoPlayer.srcObject = stream;
                    videoPlayer.style.display = 'block';
                })
                .catch(function(err) {
                    //imagePickerArea.style.display = 'block';
                    alert("[Mobile] " + err.name + ": " + err.message);

                    navigator.mediaDevices.enumerateDevices()
                        .then(function(devices) {
                            devices.forEach(function(device) {
                                alert(JSON.stringify(device));
                                //if(device.kind === "videoinput" && device.label.match("camera2 4")){
                                if(device.kind === "videoinput" && device.label.match("facing back")){
                                    var option = {
                                        deviceId : { exact: device.deviceId}
                                    };
                                    navigator.mediaDevices.getUserMedia(option)
                                        .then(function(stream) {
                                            videoPlayer.srcObject = stream;
                                            videoPlayer.style.display = 'block';
                                        })
                                        .catch(function(err) {
                                            alert("[Mobile Retry] " + err.name + ": " + err.message);
                                        });
                                }
                            });
                        });

                });
        } 
        else { 
            navigator.mediaDevices.getUserMedia({ video: true } )
                .then(function(stream) {
                    videoPlayer.srcObject = stream;
                    videoPlayer.style.display = 'block';
                })
                .catch(function(err) {
                    //imagePickerArea.style.display = 'block';
                    alert("[PC] " + err.name + ": " + err.message);
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