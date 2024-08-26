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
            numin: 23,
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