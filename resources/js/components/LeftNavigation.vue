<template>
    <div>
        <horizontal-nav></horizontal-nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log("Component mounted.");
    },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro');

* {
    font-family: "Source Sans Pro";
}
.b-nav {
    height: 100vh;
    background: #a53239;
    float: left;
}

.navWidth {
    width: 15%;
}

.menuItem {
    color: white;
}

.navWidth b-nav-item {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
