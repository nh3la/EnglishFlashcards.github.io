const app = Vue.createApp({
    data(){
        return{
            gameon: false,
            gameend: false,
            temp: { word: null, answer: null, num: null},
            //temp2: null,
            flippage: false,
            kazu: null,
            seeanswer: false,
            wordadd: false,
            numin: 99,
            counter: 0,
            vocab: [{ word: null, answer: null, num: null},
                { word: null, answer: null, num: null},
                { word: null, answer: null, num: null},
                { word: null, answer: null, num: null},
                { word: null, answer: null, num: null},
            ],
            button: false,
            //order: [null, null, null, null, null, null],
            cards: [
                { word: 'assure', answer: '～保障する', num: 0},
                { word: 'accuse', answer: '～非難する', num: 1},
                { word: 'deprive', answer: 'AからBを奪う', num: 2},
                { word: 'attribute', answer: 'AはBのおかげだと思う', num: 3},
                { word: 'impose', answer: 'AをBに課す、押しつける', num: 4},
                { word: 'imply', answer: '～を意味する', num: 5},
                { word: 'facility', answer: '設備、施設', num: 6},
                { word: 'administration', answer: '経営、運営', num: 7},
                { word: 'distress', answer: '苦しみ、悲嘆、苦難', num: 8},
                { word: 'convention', answer: '習慣、しきたり', num: 9},
                { word: 'accustomed', answer: '慣れた', num: 10},
                { word: 'keen', answer: '熱望して、熱中して', num: 11},
                { word: 'prime', answer: '最も重要な、主要な', num: 12},
                { word: 'genuine', answer: '真の、本物の、心からの', num: 13},
                { word: 'modest', answer: '控えめな、謙虚な、質素な、少しの、わずかな', num: 14},
                { word: 'vain', answer: 'むだな、むなしい', num: 15},
                { word: 'inclined', answer: 'Vしたい気がする、Vする傾向がある', num: 16},
                { word: 'desperate', answer: '必死の、絶望的な', num: 17},
                { word: 'consistent', answer: '矛盾のない、一致した', num: 18},
                { word: 'fond', answer: 'Aが好きだ', num: 19},
                { word: 'trait', answer: '特徴', num: 20},
                { word: 'ritual', answer: '儀式', num: 21},
                { word: 'conservation', answer: '環境保護', num: 22},
                { word: 'emission', answer: '排出', num: 23},
                { word: 'sinαcosβ =', answer: '1/2{sin(α+β)+sin(α-β)}', num: 24},
                { word: 'cosαsinβ =', answer: '1/2{sin(α+β)-sin(α-β)}', num: 25},
                { word: 'cosαcosβ =', answer: '1/2{cos(α+β)+cos(α-β)}', num: 26},
                { word: 'sinαsinβ =', answer: '-1/2{cos(α+β)-cos(α-β)}', num: 27},
                { word: 'sinα+sinβ =', answer: '2sin(α+β/2)cos(α-β/2)', num: 28},
                { word: 'sinα-sinβ =', answer: '2cos(α+β/2)sin(α-β/2)', num: 29},
                { word: 'cosα+cosβ =', answer: '2cos(α+β/2)cos(α-β/2)', num: 30},
                { word: 'cosα-cosβ =', answer: '-2sin(α+β/2)sin(α-β/2)', num: 31},
                { word: 'sin3θ =', answer: '3sinθ-4sin³θ', num: 32},
                { word: 'cos3θ = ', answer: '4cos³-3cosθ', num: 33},
                { word: 'tan3θ = ', answer: '(3tanθ-tan³θ)/(1-3tan²θ)', num: 34},
                { word: 'sin²θ/2 = ', answer: '(1-cosθ)/2', num: 35},
                { word: 'cos²θ/2 = ', answer: '(1+cosθ)/2', num: 36},
                { word: 'tan²θ/2 = ', answer: '(1-cosθ)/(1+cosθ)', num: 37},
                { word: 'pale', answer: '青白い', num: 38},
                { word: 'precious', answer: '貴重な', num: 39},
                { word: 'loyal to', answer: '忠実な', num: 40},
                { word: 'isolated from', answer: '孤立している', num: 41},
                { word: 'generous', answer: '気前のよい', num: 42},
                { word: 'tropical', answer: '熱帯', num: 43},
                { word: 'be reluctant', answer: '～したがらない', num: 44},
                { word: 'vague', answer: '漠然とした', num: 45},
                { word: 'vast', answer: '広大な', num: 46},
                { word: 'numerous', answer: 'たくさんの', num: 47},
                { word: 'rural', answer: '田舎の', num: 48},
                { word: 'widespread', answer: '広まってる', num: 49},
                { word: 'remote', answer: 'へんぴな', num: 50},
                { word: 'urgent', answer: '緊急の', num: 51},
                { word: 'adequate', answer: '十分な', num: 52},
                { word: 'odd', answer: 'おかしな', num: 53},
                { word: 'abstract', answer: '抽象的な', num: 54},
                { word: 'mutual', answer: '相互の', num: 55},
                { word: 'excessive', answer: '過度の', num: 56},
                { word: 'tremendous', answer: 'とてつもない', num: 57},
                { word: 'inevitable', answer: '避けられない', num: 58},
                { word: 'stable', answer: '安定した', num: 59},
                { word: 'indifferent to', answer: '無関心だ', num: 60},
                { word: 'aggressive', answer: '攻撃的な', num: 61},
                { word: 'ultimate', answer: '究極の', num: 62},
                { word: 'profound', answer: '深い', num: 63},
                { word: 'subtle', answer: '微妙な', num: 64},
                { word: 'manual', answer: '手を使う', num: 65},
                { word: 'cruel', answer: '残酷な', num: 66},
                { word: 'rational', answer: '理性的な', num: 67},
                { word: 'initial', answer: '最初', num: 68},
                { word: 'linguistic', answer: '言語', num: 69},
                { word: 'crucial', answer: '重大な', num: 70},
                { word: 'verbal', answer: '言語による', num: 71},
                { word: 'optimistic', answer: '楽観的な', num: 72},
                { word: 'grateful for', answer: '感謝している', num: 73},
                { word: 'lively', answer: '生き生きとした', num: 74},
                { word: 'overwhelming', answer: '圧倒的な', num: 75},
                { word: 'abundant', answer: '豊富な', num: 76},
                { word: 'prominent', answer: '有名な', num: 77},
                { word: 'controversial', answer: '議論を呼ぶ', num: 78},
                { word: 'federal', answer: '連邦', num: 79},
                { word: 'harsh', answer: '厳しい', num: 80},
                { word: 'random', answer: '無作為な', num: 81},
                { word: 'adolescent', answer: '思春期の', num: 82},
                { word: 'up-to-date', answer: '最新の', num: 83},
                { word: 'liberal', answer: '自由主義の', num: 84},
                { word: 'prior to', answer: '前の', num: 85},
                { word: 'moderate', answer: '過度な', num: 86},
                { word: 'elaborate', answer: '手の込んだ', num: 87},
                { word: 'incredible', answer: '信じられない', num: 88},
                { word: 'radical', answer: '根本的な', num: 89},
                { word: 'medieval', answer: '中世の', num: 90},
                { word: 'ecological', answer: '生態', num: 91},
                { word: 'ignorant of', answer: '知らない', num: 92},
                { word: 'cognitive', answer: '認知', num: 93},
                { word: 'virtually', answer: 'ほとんど', num: 94},
                { word: 'somewhat', answer: '多少', num: 95},
                { word: 'merely', answer: '単に', num: 96},
                { word: 'seemingly', answer: '一見', num: 97},
                { word: 'regardless of', answer: '関係なく', num: 98},
                { word: 'thoroughly', answer: '徹底的に', num: 99},
            ]
        }
    },
    methods: {
        startgame(){
            this.button = true
            this.gameon = true
            this.kazu = 0
            this.flippage = false
            this.gameend = false
            this.seeanswer = false
            for(let i = 0; i < this.numin + 1; i++){
            this.cards[i].num = Math.random() * 10000
            //console.log(this.cards[i].num)
            }
            //console.log('lalala')

            for(let i = 0; i < this.numin; i++){
                 
                for(let j = 0; j < this.numin; j++){
                    if (this.cards[j].num > this.cards[j + 1].num) {
                        this.temp = this.cards[j]
                        this.cards[j] = this.cards[j + 1]
                        this.cards[j + 1] = this.temp
                    }

            }
        }

        for(let i = 0; i < this.numin + 1; i++){
            this.cards[i].num = i
        }
        this.kazu = this.cards[0].num
        //console.log(this.kazu)
            
        
        //console.log(this.cards[0].num, this.cards[1].num, this.cards[2].num, this.cards[3].num, this.cards[4].num, this.cards[5].num) 
        //console.log(this.gameon)
        },

        nextpage(){
            this.flippage = true
            //for(let i = 0; i < this.numin + 1; i++) {
                if (this.flippage) {
                    //this.kazu = this.cards[i + 1].num
                    if(this.kazu == this.numin){
                        this.gameend = true
                        this.button = false
                    }
                    else {
                        this.kazu = this.kazu + 1
                    }
                    //console.log(this.kazu)
                   // this.cards[i + 1].num
                   
                    this.flippage = false
                    this.seeanswer = false
                }
            //}
            
        },
        backpage(){
            this.flippage = true
            if(this.kazu == 0){
                this.kazu = 0
            }
            else{
            this.kazu = this.kazu - 1
            }
            //console.log(this.kazu)
            this.flippage = false
            this.seeanswer = false
        },

        answer(){
            this.seeanswer = !this.seeanswer
        },

        addword(){
            this.wordadd = true


        },
        integrateword(){
            this.numin = this.numin + 1
            this.vocab[this.counter].num = this.numin
            this.cards.push(this.vocab[this.counter])
            //console.log(this.cards)
            this.wordadd = false
            this.counter = this.counter + 1
        }
    }
})

app.mount('#app')