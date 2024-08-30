const app = Vue.createApp({
    data(){
        return{
            gameon: false,
            gameend: false,
            temp: { word: null, answer: null, num: null, show: null},
            //temp2: null,
            flippage: false,
            kazu: null,
            seeanswer: false,
            wordadd: false,
            //numin: 99,
            numin1: 99,
            counter: 0,
            vocab: [{ word: null, answer: null, num: null, show: true},
                { word: null, answer: null, num: null, show: true},
                { word: null, answer: null, num: null, show: true},
                { word: null, answer: null, num: null, show: true},
                { word: null, answer: null, num: null, show: true},
            ],
            button: false,
            shownum: 0,
            //order: [null, null, null, null, null, null],
            counter1: 0,
            counter2: 0,
            //temp1: 0,
            hiddencards: [],
            temp2: { word: null, answer: null, num: null, show: null },
            temp3: { word: null, answer: null, num: null, show: null },
            cards: [
                { word: 'assure', answer: '～保障する', num: 0, show: true},
                { word: 'accuse', answer: '～非難する', num: 1, show: true},
                { word: 'deprive', answer: 'AからBを奪う', num: 2, show: true},
                { word: 'attribute', answer: 'AはBのおかげだと思う', num: 3, show: true},
                { word: 'impose', answer: 'AをBに課す、押しつける', num: 4, show: true},
                { word: 'imply', answer: '～を意味する', num: 5, show: true},
                { word: 'facility', answer: '設備、施設', num: 6, show: true},
                { word: 'administration', answer: '経営、運営', num: 7, show: true},
                { word: 'distress', answer: '苦しみ、悲嘆、苦難', num: 8, show: true},
                { word: 'convention', answer: '習慣、しきたり', num: 9, show: true},
                { word: 'accustomed', answer: '慣れた', num: 10, show: true},
                { word: 'keen', answer: '熱望して、熱中して', num: 11, show: true},
                { word: 'prime', answer: '最も重要な、主要な', num: 12, show: true},
                { word: 'genuine', answer: '真の、本物の、心からの', num: 13, show: true},
                { word: 'modest', answer: '控えめな、謙虚な、質素な、少しの、わずかな', num: 14, show: true},
                { word: 'vain', answer: 'むだな、むなしい', num: 15, show: true},
                { word: 'inclined', answer: 'Vしたい気がする、Vする傾向がある', num: 16, show: true},
                { word: 'desperate', answer: '必死の、絶望的な', num: 17, show: true},
                { word: 'consistent', answer: '矛盾のない、一致した', num: 18, show: true},
                { word: 'fond', answer: 'Aが好きだ', num: 19, show: true},
                { word: 'trait', answer: '特徴', num: 20, show: true},
                { word: 'ritual', answer: '儀式', num: 21, show: true},
                { word: 'conservation', answer: '環境保護', num: 22, show: true},
                { word: 'emission', answer: '排出', num: 23, show: true},
                { word: 'sinαcosβ =', answer: '1/2{sin(α+β)+sin(α-β)}', num: 24, show: true},
                { word: 'cosαsinβ =', answer: '1/2{sin(α+β)-sin(α-β)}', num: 25, show: true},
                { word: 'cosαcosβ =', answer: '1/2{cos(α+β)+cos(α-β)}', num: 26, show: true},
                { word: 'sinαsinβ =', answer: '-1/2{cos(α+β)-cos(α-β)}', num: 27, show: true},
                { word: 'sinα+sinβ =', answer: '2sin(α+β/2)cos(α-β/2)', num: 28, show: true},
                { word: 'sinα-sinβ =', answer: '2cos(α+β/2)sin(α-β/2)', num: 29, show: true},
                { word: 'cosα+cosβ =', answer: '2cos(α+β/2)cos(α-β/2)', num: 30, show: true},
                { word: 'cosα-cosβ =', answer: '-2sin(α+β/2)sin(α-β/2)', num: 31, show: true},
                { word: 'sin3θ =', answer: '3sinθ-4sin³θ', num: 32, show: true},
                { word: 'cos3θ = ', answer: '4cos³-3cosθ', num: 33, show: true},
                { word: 'tan3θ = ', answer: '(3tanθ-tan³θ)/(1-3tan²θ)', num: 34, show: true},
                { word: 'sin²θ/2 = ', answer: '(1-cosθ)/2', num: 35, show: true},
                { word: 'cos²θ/2 = ', answer: '(1+cosθ)/2', num: 36, show: true},
                { word: 'tan²θ/2 = ', answer: '(1-cosθ)/(1+cosθ)', num: 37, show: true},
                { word: 'pale', answer: '青白い', num: 38, show: true},
                { word: 'precious', answer: '貴重な', num: 39, show: true},
                { word: 'loyal to', answer: '忠実な', num: 40, show: true},
                { word: 'isolated from', answer: '孤立している', num: 41, show: true},
                { word: 'generous', answer: '気前のよい', num: 42, show: true},
                { word: 'tropical', answer: '熱帯', num: 43, show: true},
                { word: 'be reluctant', answer: '～したがらない', num: 44, show: true},
                { word: 'vague', answer: '漠然とした', num: 45, show: true},
                { word: 'vast', answer: '広大な', num: 46, show: true},
                { word: 'numerous', answer: 'たくさんの', num: 47, show: true},
                { word: 'rural', answer: '田舎の', num: 48, show: true},
                { word: 'widespread', answer: '広まってる', num: 49, show: true},
                { word: 'remote', answer: 'へんぴな', num: 50, show: true},
                { word: 'urgent', answer: '緊急の', num: 51, show: true},
                { word: 'adequate', answer: '十分な', num: 52, show: true},
                { word: 'odd', answer: 'おかしな', num: 53, show: true},
                { word: 'abstract', answer: '抽象的な', num: 54, show: true},
                { word: 'mutual', answer: '相互の', num: 55, show: true},
                { word: 'excessive', answer: '過度の', num: 56, show: true},
                { word: 'tremendous', answer: 'とてつもない', num: 57, show: true},
                { word: 'inevitable', answer: '避けられない', num: 58, show: true},
                { word: 'stable', answer: '安定した', num: 59, show: true},
                { word: 'indifferent to', answer: '無関心だ', num: 60, show: true},
                { word: 'aggressive', answer: '攻撃的な', num: 61, show: true},
                { word: 'ultimate', answer: '究極の', num: 62, show: true},
                { word: 'profound', answer: '深い', num: 63, show: true},
                { word: 'subtle', answer: '微妙な', num: 64, show: true},
                { word: 'manual', answer: '手を使う', num: 65, show: true},
                { word: 'cruel', answer: '残酷な', num: 66, show: true},
                { word: 'rational', answer: '理性的な', num: 67, show: true},
                { word: 'initial', answer: '最初', num: 68, show: true},
                { word: 'linguistic', answer: '言語', num: 69, show: true},
                { word: 'crucial', answer: '重大な', num: 70, show: true},
                { word: 'verbal', answer: '言語による', num: 71, show: true},
                { word: 'optimistic', answer: '楽観的な', num: 72, show: true},
                { word: 'grateful for', answer: '感謝している', num: 73, show: true},
                { word: 'lively', answer: '生き生きとした', num: 74, show: true},
                { word: 'overwhelming', answer: '圧倒的な', num: 75, show: true},
                { word: 'abundant', answer: '豊富な', num: 76, show: true},
                { word: 'prominent', answer: '有名な', num: 77, show: true},
                { word: 'controversial', answer: '議論を呼ぶ', num: 78, show: true},
                { word: 'federal', answer: '連邦', num: 79, show: true},
                { word: 'harsh', answer: '厳しい', num: 80, show: true},
                { word: 'random', answer: '無作為な', num: 81, show: true},
                { word: 'adolescent', answer: '思春期の', num: 82, show: true},
                { word: 'up-to-date', answer: '最新の', num: 83, show: true},
                { word: 'liberal', answer: '自由主義の', num: 84, show: true},
                { word: 'prior to', answer: '前の', num: 85, show: true},
                { word: 'moderate', answer: '過度な', num: 86, show: true},
                { word: 'elaborate', answer: '手の込んだ', num: 87, show: true},
                { word: 'incredible', answer: '信じられない', num: 88, show: true},
                { word: 'radical', answer: '根本的な', num: 89, show: true},
                { word: 'medieval', answer: '中世の', num: 90, show: true},
                { word: 'ecological', answer: '生態', num: 91, show: true},
                { word: 'ignorant of', answer: '知らない', num: 92, show: true},
                { word: 'cognitive', answer: '認知', num: 93, show: true},
                { word: 'virtually', answer: 'ほとんど', num: 94, show: true},
                { word: 'somewhat', answer: '多少', num: 95, show: true},
                { word: 'merely', answer: '単に', num: 96, show: true},
                { word: 'seemingly', answer: '一見', num: 97, show: true},
                { word: 'regardless of', answer: '関係なく', num: 98, show: true},
                { word: 'thoroughly', answer: '徹底的に', num: 99, show: true},
            ],
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
            for(let i = 0; i < this.numin1 + 1; i++){
            this.cards[i].num = Math.random() * 10000
            //console.log(this.cards[i].num)
            }
            //console.log('lalala')

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
        //console.log(this.kazu)
            
        
        //console.log(this.cards[0].num, this.cards[1].num, this.cards[2].num, this.cards[3].num, this.cards[4].num, this.cards[5].num) 
        //console.log(this.gameon)
        },

        nextpage(){
            this.flippage = true
            //for(let i = 0; i < this.numin + 1; i++) {
                if (this.flippage) {
                    //this.kazu = this.cards[i + 1].num
                    if(this.kazu == this.numin1){
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
            this.numin1 = this.numin1 + 1
            this.vocab[this.counter].num = this.numin1
            this.cards.push(this.vocab[this.counter])
            //console.log(this.cards)
            this.wordadd = false
            this.counter = this.counter + 1
        },
        hideword(card){
            card.show = false
            this.temp2 = card
            for(let i = this.temp2.num + 1; i < this.numin1 + 1; i++){
                    this.cards[i].num = this.cards[i].num - 1
                    }
            //console.log(card.num)
            //if(this.temp2.num == this.numin1) {
                //this.cards.splice(this.numin1, 1)
                //this.hiddencards.push(this.temp2)
            //}
            //else{
                  
                //console.log(this.temp2)
                this.cards.splice(this.temp2.num, 1)
                this.hiddencards.push(this.temp2)
                //console.log(this.temp2.num)
                //console.log(this.cards[this.temp2.num])
               
            //} 
            this.numin1 = this.numin1 - 1
            this.hiddencards[this.counter1].num = this.counter1
            
            //console.log(this.hiddencards[this.counter1])
                this.counter1 = this.counter1 + 1
                //console.log(this.cards[this.temp3])
                //console.log(this.cards[this.temp3 - 1])
                //console.log(this.cards[this.temp3 + 1])
                //console.log(this.cards[this.temp3 + 2])
                //console.log(this.cards[this.temp3 + 3])
                //console.log(this.hiddencards[1])
                //console.log(card.num)
                //console.log(this.cards[card.num])
                //console.log(this.cards[card.num + 1])
                //console.log(this.cards[card.num + 2])
                //console.log(this.cards[card.num + 3])
                //console.log(this.cards[card.num + 4])
        },
        hiddenword(hiddencard){
            hiddencard.show = true
            this.temp3 = hiddencard
            //console.log(this.hiddencards[1])
            for(let i = this.temp3.num + 1; i < this.counter1; i++){
                this.hiddencards[i].num = this.hiddencards[i].num - 1
                }
            this.hiddencards.splice(this.temp3.num, 1)
            this.cards.push(this.temp3)
            //console.log(this.hiddencards[1])
            this.numin1 = this.numin1 + 1
            this.counter1 = this.counter1 - 1
            this.cards[this.numin1].num = this.numin1
            //console.log(this.hiddencards[1])
            //console.log(this.cards[this.numin1])
        }
    }
})

app.mount('#app')