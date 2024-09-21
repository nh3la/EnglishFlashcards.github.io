<template>
<h3 v-if="gamestart2 == false && gamemoji == false && showsecond == false">You got</h3>
<h2 v-if="gamestart2">End of card. tap continue</h2>
<h3 v-if="gamestart2 == false && gamemoji == false && showsecond == false">{{ correctcounter }} out of {{ numin1 + 1 }} correct</h3>
<h1 v-if="gamestart2 == false && gamemoji == false && showsecond == false">{{ Math.round(correctcounter / (numin1 + 1) * 100) }}%</h1>
<h3 v-if="showsecond">{{ corrcounter }} out of {{ counter }} correct</h3>
<h2 v-if="showsecond">{{ Math.round(corrcounter / (counter) * 100) }}%</h2>

<h2 v-if="gamestart2 == false && gamemoji == false && showsecond == false && allc == false">words missed</h2>
<h2 v-if="allc">Thats my yura !</h2>
<ul>
    <li v-if="gamestart2 == false && gamemoji == false" v-for="uncorrectcard in uncorrectcards">
        <h3>{{ uncorrectcard.word }}: {{ uncorrectcard.answer }}</h3>
    </li>
</ul>
<button v-if="gamestart2 == false && gamemoji == false && showsecond == false" @click="secondtry" :disabled="allc">try test with uncorrect words</button>
<button v-if="showsecond" @click="secondtry">try again</button>
<h2 v-if="gamemoji" @click="secondanswer">{{ uncorrectcards[counter].word }}</h2>
<h2 v-if="showanswer">{{ uncorrectcards[counter].answer }}</h2>
<button v-if="gamemoji" @click="uncornextpage">uncorrect</button>
<button v-if="gamemoji" @click="cornextpage">correct</button>
<button v-if="gamemoji == false" @click="gamefinish">
continue
</button>
</template>

<script>
export default {
    props: [ 'numin1', 'correctcounter', 'gamestart2', 'uncorrectcards', 'unccounter','allc' ],
    data(){
    return {
        gamemoji: false,
        endmoji: false,
        counter: 0,
        showanswer: false,
        corrcounter: 0,
        showsecond: false
    }
},

    methods: {
    gamefinish(){
        this.$emit('end')
        this.showsecond = false
        this.counter = 0
        this.corrcounter = 0
    },
    secondtry(){
        this.gamemoji = true
        this.showsecond = false
        this.counter = 0
        this.corrcounter = 0
    },
    cornextpage(){
        this.counter = this.counter + 1
        this.corrcounter = this.corrcounter + 1

        if(this.showanswer == true){
            this.showanswer = false
        }

        if(this.counter == this.unccounter){
            this.showsecond = true
            this.gamemoji = false
        }
    },

    uncornextpage(){
        this.counter = this.counter + 1

        if(this.showanswer == true){
            this.showanswer = false
        }

        if(this.counter == this.unccounter){
            this.showsecond = true
            this.gamemoji = false
        }
    },
    secondanswer(){
        this.showanswer = !this.showanswer
    }
}
}
</script>

<style scoped>
h1 {
    text-align: center;
    font-size: 50px;
}
h2 {
    text-align: center;
    font-size: 40px;
}

h3 {
    text-align: center;
    font-size: 30px;
}

</style>