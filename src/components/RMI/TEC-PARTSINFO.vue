<template>
    <div>
        <div class="parts-info" v-for="(item, index) in ParsInfoData" :key="index">
            <h5 class="info-title" v-if="showTitle(item, index)">{{index}}</h5>
            <div class="assigned-art" v-if="index === 'oenNumbers'">
                <span class="attr-text">{{setArrayJoin(item.array)}}</span>
            </div>
            <div class="assigned-art" v-else-if="index ==='assignedArticle'">
                <span class="attr-name">{{item.articleName}}</span>
                <span class="attr-text">{{item.articleNo}}</span>
            </div>
            <div v-else>
                <ul v-for="(item2, index2) in item.array" :key="index2">                        
                    <li v-if="index === 'articleAttributes'">
                        <div style="display:flex;">
                            <div class="attr-name">{{item2.attrName}}</div>
                            <div class="attr-text">{{item2.attrValue}} {{item2.attrUnit}}</div>                                
                        </div>                            
                    </li>
                    <li v-else-if="index === 'articleDocuments' && item2.docFileTypeName ==='URL'">
                        <div class="attr-text" v-if="item2.docFileTypeName ==='URL'" >
                            <a :href="item2.docUrl" target="_blank">{{item2.docTypeName}}</a>
                        </div>
                        <!--<div class="attr-text" v-else>{{item2.docFileName}}</div>-->
                    </li>
                    <li v-else-if="index === 'articleInfo'">
                        <div style="display:flex;">
                            <!--<div class="attr-name" >{{item2.infoTypeName}}</div>-->
                            <div class="attr-text" v-html="item2.infoText"></div>
                        </div>
                    </li>
                    <li v-else-if="index === 'articleThumbnails'">
                        <div class="attr-text">{{item2.thumbFileName}}</div>
                    </li>
                    <li v-else-if="index === 'eanNumber'">
                        <div class="attr-text">{{item2.eanNumber}}</div>
                    </li>
                    <li v-else-if="index === 'immediateAttributs'">
                        <div style="display:flex;">
                            <div class="attr-name">{{item2.attrName}}</div>
                            <div class="attr-text">{{item2.attrValue}} {{item2.attrUnit}}</div>                             
                        </div> 
                    </li>
                    <li v-else-if="index === 'immediateInfo'">
                        <div class="attr-text">{{item2.infoText}}</div>
                    </li>
                    <li v-else-if="index === 'mainArticle'">
                        <div style="display:flex;">
                            <div class="attr-name">{{item2.articleName}}</div>
                            <div class="attr-text">{{item2.articleNumber}}</div>                             
                        </div> 
                    </li>                        
                    <li v-else-if="index === 'usageNumbers2'">
                        <div class="attr-text">{{item2.usageNumber}}</div>
                    </li>
                    <li v-else-if="index === 'oenNumbers'">
                       <div class="attr-text">{{item2.oeNumber}}</div>
                    </li>
                    <li v-else-if="index === 'replacedNumber'">
                       <div class="attr-text">{{item2.replaceNumber}}</div>
                    </li>
                    <!--<li v-else>                            
                    </li>-->
                </ul>
            </div>
        </div>
    </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    export default {
        name: 'TEC-PARTSINFO',
        data(){
            return{
                partsDetail: [],
                pickArtinfo:''
            }
        },
        props:['ParsInfoData'],
        methods:{
            showTitle(value,text)
            {
                if(value !== ''){
                    if(text === 'articleDocuments'){
                        var urlCount =  value.array.filter(x => x.docFileTypeName ==='URL').length;
                        if(urlCount > 0){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                    else{
                        return true;
                    }
                }
                else{
                    return false;
                }
            },
            setArrayJoin(value)
            {   
                if(value !== undefined){
                    var list = Array.from(new Set(value.map(x=> x.oeNumber))).join(', ');
                    return list;
                }
                else{
                    return '';
                }
            }
        }
    }
</script>

<style scoped>
    .parts-image{
        width: auto; height: auto;
        max-width: 500px;
        max-height: 500px;
        display:block;
        margin-left: auto;
        margin-right: auto;
    }
    .info-title
    {
        padding-top: 5px;
        color: #616161;
    }
    .parts-info ul{
        list-style-type: none;
        margin: 2px;
    }
    .parts-info ul a{
        color:blue;
        text-decoration:underline;
    }
    .parts-info li{
        display: flex;
        border-bottom: #EEEEEE 1px solid;
    }
    .parts-info .attr-name{
        margin-right:20px;
        font-size: 0.9em;
        font-weight:500;
        color: #424242;
    }
    .parts-info .attr-text{
        font-size: 0.85em;
        color: #616161;
    }
    .parts-info .assigned-art{
        margin-left: 25px;
    }
</style>