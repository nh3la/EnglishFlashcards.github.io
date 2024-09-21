<template>
    <h4>play 3 or more times to get accurate analysis</h4>
    <h4>test taken {{ gamecounter }} times</h4>
    <h3>missed words</h3>
    <ol>
    <li v-for="critical in criticals">
        <h3>{{ critical.word }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;miss: {{ critical.ccounter }}</h3>
    </li>
</ol>

</template>

<script>
export default {
    props: [ 'criticals', 'gamecounter' ],
}

</script>

<style scoped>
h3 {
    text-align: center;
    font-size: 30px;
}
h4 {
    text-align: center;
    font-size: 24px;
}

</style>