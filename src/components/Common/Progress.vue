<template>
    <div id='progress' class="text-center test">
        <v-progress-circular
        indeterminate
        color="primary"
        :width="5"
        ></v-progress-circular>
    </div>
</template>
<style>
#progress{
    z-index: 9999;
    position:fixed;
    bottom:0;
    left:50%;
    top:50%;
    /*position: absolute;
    top:30%;
    left: 50%;*/
}
</style>