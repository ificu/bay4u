<template>
    <transition>
        <div id="create-camera" v-if="!showImageSelectFlag">
            <v-img id="focus" width="70%" max-width="350" src="@/assets/Focus.png" ></v-img>               
            <video id="player" autoplay playsinline></video>
            <!--<canvas id="canvas" width="320px" height="240px"></canvas>-->
            <canvas id="canvas" width="240px" height="320px"></canvas>
            <p class="comment"># 차량번호나 차대번호 촬영 시 표시 선 내에 위치하게 촬영해 주세요.</p>
            <!--<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="capture-btn" @click="captureImg">촬영</button>      -->     
            <v-btn id="capture-btn" color="success" @click="captureImg">촬영</v-btn>
            <br/>
            <br/>
            <v-btn fab small color="secondary" @click="closeModal">
                <v-icon>close</v-icon>
            </v-btn>
            <br/>
            <br/>
            <v-btn class="ma-2" tile outlined color="#B0BEC5" @click="imageSelect">
                <v-icon left>mdi-folder-multiple-image</v-icon> 핸드폰 내 파일선택
            </v-btn>       

        </div> 
        <div id="select-file" v-if="showImageSelectFlag"  class="pa-8">
            <v-card>
                <v-card-title class="headline" >이미지 파일 선택</v-card-title>
                <v-img id="fileImageView"></v-img>
                <v-file-input
                    label="파일을 선택해 주세요"
                    accept="image/*"
                    filled
                    prepend-icon="mdi-image"
                    class="pr-6 pl-6"
                    v-model="selectFiles"
                    v-on:change="selectedFileChage"
                ></v-file-input>
                
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#FF5252"
                    outlined
                    @click="selectedFileSend"
                >
                    입력
                </v-btn>
                <v-btn
                    color="#00BFA5"
                    outlined
                    @click="$emit('closeQTCameraModal', false)"
                >
                    닫기
                </v-btn>          
                </v-card-actions>
            </v-card>
        </div>
    </transition> 
</template>

<script>

export default {
  name: 'QTList',
  data () {
    return {
        showImageSelectFlag:false,
        selectFiles: [],
        itemImage: ''
    }
  },
  methods: {
    closeModal() {
        var videoPlayer = document.querySelector('#player');
        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getTracks().map(function (val) {
                val.stop();
            });
        }

        this.$emit('closeQTCameraModal', false);
    },
    captureImg() {/*
        var videoPlayer = document.querySelector('#player');
        var canvasElement = document.querySelector('#canvas');
        var captureButton = document.querySelector('#capture-btn');
        // width="320px" height="240px"

        canvasElement.style.display = 'block';
        canvasElement.style.width = 640;
        canvasElement.style.height = 480;
        videoPlayer.style.display = 'none';
        captureButton.style.display = 'none';
        var context = canvasElement.getContext('2d');
        context.drawImage(videoPlayer, 0, 0, canvasElement.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width));
        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }

        console.log("Video size : " + videoPlayer.videoWidth + " / " + videoPlayer.videoHeight);
        console.log("Image size : " + canvasElement.width + " / " + canvasElement.height);

        var url64 = canvasElement.toDataURL();

        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getTracks().map(function (val) {
                val.stop();
            });
        }*/

        var videoPlayer = document.querySelector('#player');
        var canvas = document.createElement('canvas');

        var width = videoPlayer.videoWidth;
        var height = videoPlayer.videoHeight;

        canvas.width = width;
        canvas.height = height;

        canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
        var url64 = canvas.toDataURL();

        if(videoPlayer.srcObject != null) {
            videoPlayer.srcObject.getTracks().map(function (val) {
                val.stop();
            });
        }

        this.$emit('updatePic', url64);
        this.$emit('closeQTCameraModal', false);
    },
    imageSelect() {
        this.showImageSelectFlag = !this.showImageSelectFlag;
 
    },
    selectedFileChage() {
        var fileImage = document.querySelector('#fileImageView');

        var reader = new FileReader();
        reader.onload = function(e) {
            fileImage.src = e.target.result;
        }
        reader.readAsDataURL(this.selectFiles);      
    },
    selectedFileSend() {
        this.showImageSelectFlag = false;
        var fileImage = document.querySelector('#fileImageView');

        this.$emit('updatePic', fileImage.src);
        this.$emit('closeQTCameraModal', false);
    }      
  },
  mounted : function() {
      this.$nextTick(function () {
        var videoPlayer = document.querySelector('#player');
        var focus = document.querySelector('#focus');


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


                    focus.style.margin = (videoPlayer.clientHeight)/2 + "px auto -" + (videoPlayer.clientHeight) + "px auto";

                })
                .catch(function(err) {
                    //imagePickerArea.style.display = 'block';
                    //alert("[Mobile] " + err.name + ": " + err.message);

                    console.log("Mobile Error : ", err.message);           
                    
                    navigator.mediaDevices.enumerateDevices()
                        .then(function(devices) {
                            devices.forEach(function(device) {
                                //alert(JSON.stringify(device));
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

                    focus.style.margin = (videoPlayer.clientHeight)/2 + "px auto -" + (videoPlayer.clientHeight) + "px auto";
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
#create-camera, #select-file {
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

#focus {
  margin: auto;
}

.comment {
    color:#9E9D24;
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