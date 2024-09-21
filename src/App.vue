<template>
    <div class="menu">
      <div class="box">
        <button :disabled="button" @click="checkgame">Check Cards</button>
        <button :disabled="button" @click="testgame">Test Cards</button>
      </div>
      <button :disabled="button" @click="addword">Add Word</button>
      <button :disabled="button" @click="analysis">Analysis</button>
  
      <div v-if="wordadd" class="bar word-input">
        <div v-if="wordadd">
          <h5>Word</h5>
          <input type="text" required v-model="vocab[counter].word" class="input-box">
        </div>
        <div v-if="wordadd">
          <h5>Answer</h5>
          <input type="text" required v-model="vocab[counter].answer" class="input-box">
        </div>
        <button v-if="wordadd" @click="integrateword" class="submit-btn">Complete</button>
      </div>
  
      <Result v-if="owari" :numin1="numin1" :correctcounter="correctcounter" :gamestart2="gamestart2" :uncorrectcards="uncorrectcards" :unccounter="unccounter" :allc="allc" @end="gameowari" />
      <Analysis v-if="showanalysis" :criticals="criticals" :gamecounter="gamecounter" />
      <button v-if="showanalysis" @click="analysis" class="close-btn">Close</button>
  
      <div v-if="!gameon && !showanalysis" class="explanation">
        <h5>You can temporarily add words, meaning if you close or refresh this page, the added words will not be saved. You can add up to 5 words. Good luck, Yura!</h5>
      </div>
  
      <h4 v-if="!gameon && !showanalysis" class="section-title">Word List (Tap the word to delete it)</h4>
      <ul class="word-list">
        <li v-if="!gameon && !showanalysis" v-for="card in cards">
          <div v-if="card.show" @click="hideword(card)" class="cardword">{{ card.word }}</div>
        </li>
      </ul>
  
      <h4 v-if="!gameon && !showanalysis" class="section-title">Hidden Words (Tap to add them back)</h4>
      <ul class="word-list">
        <li v-if="!gameon && !showanalysis" v-for="hiddencard in hiddencards">
          <div v-if="!hiddencard.show" @click="hiddenword(hiddencard)" class="cardword">{{ hiddencard.word }}</div>
        </li>
      </ul>
    </div>
  
    <h4 v-if="gameon && !owari && !gameend" class="cardy">Card {{ cards[kazu].num + 1 }} out of {{ numin1 + 1 }}</h4>
    <h2 v-if="gameon && !owari && !gameend" @click="answer">{{ cards[kazu].word }}</h2>
  
    <div class="answer">
      <h3 v-if="seeanswer && !noanswer">{{ cards[kazu].answer }}</h3>
    </div>
  
    <div class="container">
      <button v-if="gameon && gamestart2 && !owari" @click="backpage" class="nav-btn">Previous Card</button>
      <button v-if="gameon && gamestart2 && !owari" @click="cornextpage" class="nav-btn">Next Card</button>
    </div>
  
    <ol>
      <li v-if="gameon && !owari && !gameend && !gamestart2" v-for="option in options">
        <h3 class="options" @click="ccheck(option)">{{ option }}</h3>
      </li>
    </ol>
  </template>
  

<script>
import Result from './components/Result.vue'
import Analysis from './components/Analysis.vue'

export default {
    components: { Result, Analysis },
    data(){
        return{
            gameon: false,
            gameend: false,
            owari: false,
            temp: { word: null, answer: null, num: null, show: null, ccounter: 0 },
            flippage: false,
            kazu: null,
            seeanswer: false,
            wordadd: false,
            numin1: 99,
            counter: 0,
            vocab: [{ word: null, answer: null, num: null, show: true, ccounter: 0 },
                { word: null, answer: null, num: null, show: true, ccounter: 0 },
                { word: null, answer: null, num: null, show: true, ccounter: 0 },
                { word: null, answer: null, num: null, show: true, ccounter: 0 },
                { word: null, answer: null, num: null, show: true, ccounter: 0 },
            ],
            button: false,
            shownum: 0,
            counter1: 0,
            counter2: 0,
            correctcounter: 0,
            unccounter: 0,
            criticalcounter: 0,
            gamecounter: 0,
            coun: 0,
            gamestart2: false,
            showanalysis: false,
            cfound: false,
            clear: false,
            noanswer: false,
            allc: false,
            hiddencards: [],
            temp2: { word: null, answer: null, num: null, show: null, ccounter: 0 },
            temp3: { word: null, answer: null, num: null, show: null, ccounter: 0 },
            criticaltemp: { word: null, answer: null, num: null, show: null, ccounter: 0 },
            temtem: {},
            temtem2: 0,
            uncorrectcards: [],
            criticals: [],
            options: [],
            cards: [
                { word: 'assure', answer: '～保障する', num: 0, show: true, ccounter: 0 },
                { word: 'accuse', answer: '～非難する', num: 1, show: true, ccounter: 0 },
                { word: 'deprive', answer: 'AからBを奪う', num: 2, show: true, ccounter: 0 },
                { word: 'attribute', answer: 'AはBのおかげだと思う', num: 3, show: true, ccounter: 0 },
                { word: 'impose', answer: 'AをBに課す、押しつける', num: 4, show: true, ccounter: 0 },
                { word: 'imply', answer: '～を意味する', num: 5, show: true, ccounter: 0 },
                { word: 'facility', answer: '設備、施設', num: 6, show: true, ccounter: 0 },
                { word: 'administration', answer: '経営、運営', num: 7, show: true, ccounter: 0 },
                { word: 'distress', answer: '苦しみ、悲嘆、苦難', num: 8, show: true, ccounter: 0 },
                { word: 'convention', answer: '習慣、しきたり', num: 9, show: true, ccounter: 0 },
                { word: 'accustomed', answer: '慣れた', num: 10, show: true, ccounter: 0 },
                { word: 'keen', answer: '熱望して、熱中して', num: 11, show: true, ccounter: 0 },
                { word: 'prime', answer: '最も重要な、主要な', num: 12, show: true, ccounter: 0 },
                { word: 'genuine', answer: '真の、本物の、心からの', num: 13, show: true, ccounter: 0 },
                { word: 'modest', answer: '控えめな、謙虚な、質素な、少しの、わずかな', num: 14, show: true, ccounter: 0 },
                { word: 'vain', answer: 'むだな、むなしい', num: 15, show: true, ccounter: 0 },
                { word: 'inclined', answer: 'Vしたい気がする、Vする傾向がある', num: 16, show: true, ccounter: 0 },
                { word: 'desperate', answer: '必死の、絶望的な', num: 17, show: true, ccounter: 0 },
                { word: 'consistent', answer: '矛盾のない、一致した', num: 18, show: true, ccounter: 0 },
                { word: 'fond', answer: 'Aが好きだ', num: 19, show: true, ccounter: 0 },
                { word: 'trait', answer: '特徴', num: 20, show: true, ccounter: 0 },
                { word: 'ritual', answer: '儀式', num: 21, show: true, ccounter: 0 },
                { word: 'conservation', answer: '環境保護', num: 22, show: true, ccounter: 0 },
                { word: 'emission', answer: '排出', num: 23, show: true, ccounter: 0 },
                { word: 'sinαcosβ =', answer: '1/2{sin(α+β)+sin(α-β)}', num: 24, show: true, ccounter: 0 },
                { word: 'cosαsinβ =', answer: '1/2{sin(α+β)-sin(α-β)}', num: 25, show: true, ccounter: 0 },
                { word: 'cosαcosβ =', answer: '1/2{cos(α+β)+cos(α-β)}', num: 26, show: true, ccounter: 0 },
                { word: 'sinαsinβ =', answer: '-1/2{cos(α+β)-cos(α-β)}', num: 27, show: true, ccounter: 0 },
                { word: 'sinα+sinβ =', answer: '2sin(α+β/2)cos(α-β/2)', num: 28, show: true, ccounter: 0 },
                { word: 'sinα-sinβ =', answer: '2cos(α+β/2)sin(α-β/2)', num: 29, show: true, ccounter: 0 },
                { word: 'cosα+cosβ =', answer: '2cos(α+β/2)cos(α-β/2)', num: 30, show: true, ccounter: 0 },
                { word: 'cosα-cosβ =', answer: '-2sin(α+β/2)sin(α-β/2)', num: 31, show: true, ccounter: 0 },
                { word: 'sin3θ =', answer: '3sinθ-4sin³θ', num: 32, show: true, ccounter: 0 },
                { word: 'cos3θ = ', answer: '4cos³-3cosθ', num: 33, show: true, ccounter: 0 },
                { word: 'tan3θ = ', answer: '(3tanθ-tan³θ)/(1-3tan²θ)', num: 34, show: true, ccounter: 0 },
                { word: 'sin²θ/2 = ', answer: '(1-cosθ)/2', num: 35, show: true, ccounter: 0 },
                { word: 'cos²θ/2 = ', answer: '(1+cosθ)/2', num: 36, show: true, ccounter: 0 },
                { word: 'tan²θ/2 = ', answer: '(1-cosθ)/(1+cosθ)', num: 37, show: true, ccounter: 0 },
                { word: 'pale', answer: '青白い', num: 38, show: true, ccounter: 0 },
                { word: 'precious', answer: '貴重な', num: 39, show: true, ccounter: 0 },
                { word: 'loyal to', answer: '忠実な', num: 40, show: true, ccounter: 0 },
                { word: 'isolated from', answer: '孤立している', num: 41, show: true, ccounter: 0 },
                { word: 'generous', answer: '気前のよい', num: 42, show: true, ccounter: 0 },
                { word: 'tropical', answer: '熱帯', num: 43, show: true, ccounter: 0 },
                { word: 'be reluctant', answer: '～したがらない', num: 44, show: true, ccounter: 0 },
                { word: 'vague', answer: '漠然とした', num: 45, show: true, ccounter: 0 },
                { word: 'vast', answer: '広大な', num: 46, show: true, ccounter: 0 },
                { word: 'numerous', answer: 'たくさんの', num: 47, show: true, ccounter: 0 },
                { word: 'rural', answer: '田舎の', num: 48, show: true, ccounter: 0 },
                { word: 'widespread', answer: '広まってる', num: 49, show: true, ccounter: 0 },
                { word: 'remote', answer: 'へんぴな', num: 50, show: true, ccounter: 0 },
                { word: 'urgent', answer: '緊急の', num: 51, show: true, ccounter: 0 },
                { word: 'adequate', answer: '十分な', num: 52, show: true, ccounter: 0 },
                { word: 'odd', answer: 'おかしな', num: 53, show: true, ccounter: 0 },
                { word: 'abstract', answer: '抽象的な', num: 54, show: true, ccounter: 0 },
                { word: 'mutual', answer: '相互の', num: 55, show: true, ccounter: 0 },
                { word: 'excessive', answer: '過度の', num: 56, show: true, ccounter: 0 },
                { word: 'tremendous', answer: 'とてつもない', num: 57, show: true, ccounter: 0 },
                { word: 'inevitable', answer: '避けられない', num: 58, show: true, ccounter: 0 },
                { word: 'stable', answer: '安定した', num: 59, show: true, ccounter: 0 },
                { word: 'indifferent to', answer: '無関心だ', num: 60, show: true, ccounter: 0 },
                { word: 'aggressive', answer: '攻撃的な', num: 61, show: true, ccounter: 0 },
                { word: 'ultimate', answer: '究極の', num: 62, show: true, ccounter: 0 },
                { word: 'profound', answer: '深い', num: 63, show: true, ccounter: 0 },
                { word: 'subtle', answer: '微妙な', num: 64, show: true, ccounter: 0 },
                { word: 'manual', answer: '手を使う', num: 65, show: true, ccounter: 0 },
                { word: 'cruel', answer: '残酷な', num: 66, show: true, ccounter: 0 },
                { word: 'rational', answer: '理性的な', num: 67, show: true, ccounter: 0 },
                { word: 'initial', answer: '最初', num: 68, show: true, ccounter: 0 },
                { word: 'linguistic', answer: '言語', num: 69, show: true, ccounter: 0 },
                { word: 'crucial', answer: '重大な', num: 70, show: true, ccounter: 0 },
                { word: 'verbal', answer: '言語による', num: 71, show: true, ccounter: 0 },
                { word: 'optimistic', answer: '楽観的な', num: 72, show: true, ccounter: 0 },
                { word: 'grateful for', answer: '感謝している', num: 73, show: true, ccounter: 0 },
                { word: 'lively', answer: '生き生きとした', num: 74, show: true, ccounter: 0 },
                { word: 'overwhelming', answer: '圧倒的な', num: 75, show: true, ccounter: 0 },
                { word: 'abundant', answer: '豊富な', num: 76, show: true, ccounter: 0 },
                { word: 'prominent', answer: '有名な', num: 77, show: true, ccounter: 0 },
                { word: 'controversial', answer: '議論を呼ぶ', num: 78, show: true, ccounter: 0 },
                { word: 'federal', answer: '連邦', num: 79, show: true, ccounter: 0 },
                { word: 'harsh', answer: '厳しい', num: 80, show: true, ccounter: 0 },
                { word: 'random', answer: '無作為な', num: 81, show: true, ccounter: 0 },
                { word: 'adolescent', answer: '思春期の', num: 82, show: true, ccounter: 0 },
                { word: 'up-to-date', answer: '最新の', num: 83, show: true, ccounter: 0 },
                { word: 'liberal', answer: '自由主義の', num: 84, show: true, ccounter: 0 },
                { word: 'prior to', answer: '前の', num: 85, show: true, ccounter: 0 },
                { word: 'moderate', answer: '過度な', num: 86, show: true, ccounter: 0 },
                { word: 'elaborate', answer: '手の込んだ', num: 87, show: true, ccounter: 0 },
                { word: 'incredible', answer: '信じられない', num: 88, show: true, ccounter: 0 },
                { word: 'radical', answer: '根本的な', num: 89, show: true, ccounter: 0 },
                { word: 'medieval', answer: '中世の', num: 90, show: true, ccounter: 0 },
                { word: 'ecological', answer: '生態', num: 91, show: true, ccounter: 0 },
                { word: 'ignorant of', answer: '知らない', num: 92, show: true, ccounter: 0 },
                { word: 'cognitive', answer: '認知', num: 93, show: true, ccounter: 0 },
                { word: 'virtually', answer: 'ほとんど', num: 94, show: true, ccounter: 0 },
                { word: 'somewhat', answer: '多少', num: 95, show: true, ccounter: 0 },
                { word: 'merely', answer: '単に', num: 96, show: true, ccounter: 0 },
                { word: 'seemingly', answer: '一見', num: 97, show: true, ccounter: 0 },
                { word: 'regardless of', answer: '関係なく', num: 98, show: true, ccounter: 0 },
                { word: 'thoroughly', answer: '徹底的に', num: 99, show: true, ccounter: 0 },
            ],
            cardanswers: [
                '～保障する', '～非難する', 'AからBを奪う', 'AはBのおかげだと思う', 'AをBに課す、押しつける', '～を意味する', '設備、施設', '経営、運営', '苦しみ、悲嘆、苦難', '習慣、しきたり', '慣れた', '熱望して、熱中して', 
                '最も重要な、主要な', '真の、本物の、心からの','控えめな、謙虚な、質素な、少しの、わずかな', 'むだな、むなしい', 'Vしたい気がする、Vする傾向がある', '必死の、絶望的な', '矛盾のない、一致した', 'Aが好きだ',
                 '特徴', '儀式', '環境保護', '排出', '1/2{sin(α+β)+sin(α-β)}', '1/2{sin(α+β)-sin(α-β)}', '1/2{cos(α+β)+cos(α-β)}', '-1/2{cos(α+β)-cos(α-β)}', '2sin(α+β/2)cos(α-β/2)', '2cos(α+β/2)sin(α-β/2)',
                  '2cos(α+β/2)cos(α-β/2)', '-2sin(α+β/2)sin(α-β/2)', '3sinθ-4sin³θ', '4cos³-3cosθ', '(3tanθ-tan³θ)/(1-3tan²θ)', '(1-cosθ)/2', '(1+cosθ)/2', '(1-cosθ)/(1+cosθ)', '青白い', '貴重な', '忠実な',
                   '孤立している','気前のよい','熱帯','～したがらない','漠然とした','広大な','たくさんの','田舎の','広まってる','へんぴな','緊急の','十分な','おかしな','抽象的な','相互の','過度の','とてつもない','避けられない',
                   '安定した','無関心だ','攻撃的な','究極の','深い','微妙な','手を使う','残酷な','理性的な','最初','言語','重大な','言語による','楽観的な','感謝している','生き生きとした','圧倒的な','豊富な','有名な','議論を呼ぶ',
                   '連邦','厳しい','無作為な','根本的な','中世の','思春期の','徹底的に','関係なく','単に','ほとんど','知らない','ゆららぶ','きょうまかっこいい','ゆらりんこ','sin(180°-θ)','sin(α±β)','おねえさんかわいいね','ゆらいつもありがとう',
                   '導関数の定義','cos(90°-θ)','たこしゃん','多少','一見','関係なく','認知'
            ],
        }
    },

    methods: {
        checkgame(){
            console.log(this.cardanswers[0])
            this.button = true
            this.gameon = true
            this.kazu = 0
            this.flippage = false
            this.gameend = false
            this.owari = false
            this.seeanswer = false
            this.correctcounter = 0
            this.gamestart2 = true
            this.unccounter = 0
            this.showanalysis = false
            for(let i = 0; i < this.numin1 + 1; i++){
            this.cards[i].num = Math.random() * 10000
            }

            for(let i = 0; i < this.numin1; i++){
                 
                for(let j = 0; j < this.numin1; j++){
                    if (this.cards[j].num > this.cards[j + 1].num) {
                        this.temp = this.cards[j]
                        this.cards[j] = this.cards[j + 1]
                        this.cards[j + 1] = this.temp
                    }
                }
        }

        for(let i = 0; i < this.numin1 + 1; i++){
            this.cards[i].num = i
        }
        this.kazu = this.cards[0].num
        },
        testgame(){
            this.button = true
            this.gameon = true
            this.kazu = 0
            this.flippage = false
            this.gameend = false
            this.owari = false
            this.seeanswer = false
            this.correctcounter = 0
            this.unccounter = 0
            this.showanalysis = false
            this.gamecounter = this.gamecounter + 1
            this.clear = false
            this.noanswer = true
            for(let i = 0; i < this.numin1 + 1; i++){
            this.cards[i].num = Math.random() * 10000
            }

            for(let i = 0; i < this.numin1; i++){
                 
                for(let j = 0; j < this.numin1; j++){
                    if (this.cards[j].num > this.cards[j + 1].num) {
                        this.temp = this.cards[j]
                        this.cards[j] = this.cards[j + 1]
                        this.cards[j + 1] = this.temp
                    }
                }
        }

        for(let i = 0; i < this.numin1 + 1; i++){
            this.cards[i].num = i
        }
        this.kazu = this.cards[0].num
        
           do{
            this.coun = 0
            this.options.splice(0, 6)
            for(let i = 0; i < 5; i++){
                this.options[i] = this.cardanswers[Math.round(Math.random() * 100)]
            }
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                if(this.options[i] == this.options[j]){
                    this.coun++
                }
            }
        }
            if(this.coun == 5){
                this.clear = true
            }
        }while(this.clear == false)
        this.clear = false
        this.options[5] = this.cards[this.kazu].answer
        this.temtem2 = Math.round(Math.random() * 100) % 6
        this.temtem = this.options[this.temtem2]
        this.options[this.temtem2] = this.options[5]
        this.options[5] = this.temtem
        },

        cornextpage(){
            do{ 
            this.coun = 0
            this.options.splice(0, 6)
            for(let i = 0; i < 5; i++){
                
                this.options[i] = this.cardanswers[Math.round(Math.random() * 100)]
            }
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                if(this.options[i] == this.options[j]){
                    this.coun++
                }
            }
        }
            if(this.coun == 5){
                this.clear = true
            }
        }while(this.clear == false)
        this.clear = false


        this.flippage = true
                if (this.flippage) {
                    if(this.kazu == this.numin1){
                        this.owari = true
                        if(this.criticals === undefined || this.criticals.length == 0){
                        this.allc = true
                        }
                    }
                    else {
                        this.kazu = this.kazu + 1
                    }
                    this.options[5] = this.cards[this.kazu].answer
                    this.temtem2 = Math.round(Math.random() * 100) % 6
        this.temtem = this.options[this.temtem2]
        this.options[this.temtem2] = this.options[5]
        this.options[5] = this.temtem
                   this.correctcounter++
                   
                    this.flippage = false
                    this.seeanswer = false
                }
        },
        unnextpage(){
            
            do{
            this.coun = 0
            this.options.splice(0, 6) 
            for(let i = 0; i < 5; i++){
                
                this.options[i] = this.cardanswers[Math.round(Math.random() * 100)]
            }
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                if(this.options[i] == this.options[j]){
                    this.coun++
                }
            }
        }
            if(this.coun == 5){
                this.clear = true
            }
        }while(this.clear == false)
        this.clear = false
            this.cfound = false
            this.cards[this.kazu].ccounter = this.cards[this.kazu].ccounter + 1
            if (this.criticals === undefined || this.criticals.length == 0) {
                this.criticals.push(this.cards[this.kazu])
            }
            else{
            for(let i = 0; i < this.criticals.length; i++){
            if(this.cards[this.kazu] == this.criticals[i]){
                this.criticals.ccounter = this.criticals.ccounter + 1
                this.cfound = true
            }
        }
        if(this.cfound == false){
                this.criticals.push(this.cards[this.kazu])
        }
        
        for(let i = 0; i < this.criticals.length - 1; i++) {
           for (let j = 0; j < this.criticals.length - 1; j++) {
                if (this.criticals[j].ccounter < this.criticals[j + 1].ccounter){
                    this.criticaltemp = this.criticals[j + 1]
                    this.criticals[j + 1] = this.criticals[j]
                    this.criticals[j] = this.criticaltemp
                }
            }
        }
    }
            this.uncorrectcards.push(this.cards[this.kazu])
            this.unccounter = this.unccounter + 1;

            this.flippage = true
  
                if (this.flippage) {
                    if(this.kazu == this.numin1){
                        this.owari = true
                    }
                    else {
                        this.kazu = this.kazu + 1
                    }
                   
                    this.flippage = false
                    this.seeanswer = false
                }
                this.options[5] = this.cards[this.kazu].answer
                this.temtem2 = Math.round(Math.random() * 100) % 6
        this.temtem = this.options[this.temtem2]
        this.options[this.temtem2] = this.options[5]
        this.options[5] = this.temtem
            
        },
        backpage(){
            this.flippage = true
            if(this.kazu == 0){
                this.kazu = 0
            }
            else{
            this.kazu = this.kazu - 1
            }

            this.flippage = false
            this.seeanswer = false
        },

        gameowari(){
            this.gameend = true
            this.owari = false
            this.gamestart2 = false
            this.button = false
            this.gameon = false
            this.uncorrectcards.splice(0, this.unccounter)
            this.noanswer = false
            this.allc = false
        },

        answer(){
            this.seeanswer = !this.seeanswer
        },

        addword(){
            this.wordadd = true


        },
        integrateword(){
            this.numin1 = this.numin1 + 1
            this.vocab[this.counter].num = this.numin1
            this.cards.push(this.vocab[this.counter])
            this.wordadd = false
            this.counter = this.counter + 1
        },
        hideword(card){
            card.show = false
            this.temp2 = card
            for(let i = this.temp2.num + 1; i < this.numin1 + 1; i++){
                    this.cards[i].num = this.cards[i].num - 1
                    }
                this.cards.splice(this.temp2.num, 1)
                this.hiddencards.push(this.temp2)
            this.numin1 = this.numin1 - 1
            this.hiddencards[this.counter1].num = this.counter1
                this.counter1 = this.counter1 + 1
        },
        hiddenword(hiddencard){
            hiddencard.show = true
            this.temp3 = hiddencard
            for(let i = this.temp3.num + 1; i < this.counter1; i++){
                this.hiddencards[i].num = this.hiddencards[i].num - 1
                }
            this.hiddencards.splice(this.temp3.num, 1)
            this.cards.push(this.temp3)
            this.numin1 = this.numin1 + 1
            this.counter1 = this.counter1 - 1
            this.cards[this.numin1].num = this.numin1
        },
        //inmemory database
        analysis(){
            this.showanalysis = !this.showanalysis
        },
        ccheck(option){
            if(option == this.options[this.temtem2]){
                this.cornextpage()
            }
            else{
                this.unnextpage()
            }

        }
    }
}
</script>

<style>
  /* General Styles */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f6f9;
    color: #333;
  }

  h2, h3, h4, h5 {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  h2 {
    font-size: 48px;
    margin: 20px 0;
    color: #2c3e50;
    text-align: center;
  }

  h3 {
    font-size: 32px;
    color: #34495e;
    text-align: center;
  }

  h4 {
    font-size: 22px;
    margin: 20px 0;
    color: #7f8c8d;
  }

  h5 {
    font-size: 18px;
    color: #95a5a6;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  /* Layout & Containers */
  .menu {
    padding: 20px;
    background-color: #ecf0f1;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 600px;
    text-align: center;
  }

  .box {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }

  .word-input {
    margin-top: 20px;
    text-align: left;
  }

  .container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .word-list {
    margin-top: 10px;
  }

  .explanation {
    background-color: #e74c3c;
    color: white;
    padding: 10px;
    border-radius: 6px;
  }

  /* Buttons */
  button {
    font-size: 18px;
    padding: 10px 20px;
    margin: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }

  button:hover {
    background-color: #2980b9;
  }

  .submit-btn, .close-btn {
    background-color: #27ae60;
  }

  .submit-btn:hover, .close-btn:hover {
    background-color: #2ecc71;
  }

  .nav-btn {
    background-color: #e67e22;
  }

  .nav-btn:hover {
    background-color: #d35400;
  }

  /* Cards & Words */
  .cardword {
    font-size: 22px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
  }

  .cardword:hover {
    background-color: #f0f0f0;
  }

  .cardy {
    font-size: 20px;
    color: #8e44ad;
    text-align: center;
  }

  .options {
    background-color: #1abc9c;
    color: white;
    padding: 10px;
    margin: 5px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .options:hover {
    background-color: #16a085;
  }

  .input-box {
    padding: 10px;
    width: calc(100% - 22px);
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .answer {
    margin: 20px 0;
    text-align: center;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .menu {
      padding: 10px;
    }

    .box {
      flex-direction: column;
    }

    button {
      width: 100%;
    }

    .container button {
      width: 100%;
    }
  }
</style>