new Vue({
    el: '#app',
    data:{
        choix: null,
        comChoise: null,
        counter: 3,
        winner: null,
        vieMoi: 3,
        vieCom: 3,
        attente: true,
        logs: [],
        selects: [
            {name: 'pierre', value: 'pierre'},
            {name: 'feuille', value: 'feuille'},
            {name: 'ciseau', value: 'ciseau'},
        ]
    },

    watch:{
        counter: function(newVal){
            if(newVal === 0 ){

                this.selectCom()

                this.whoWin()

                this.update()

                this.counter = 3
                this.attente = true
                
            }
        },

        vieMoi: function(newVal){
            if(newVal === 0){
                this.endgame('Perdu')                
            }
        },

        vieCom: function(newVal){
            if(newVal === 0){
                this.endgame('Gagner')  
            }
        }
    },

    computed:{
        leftLifeOfMe: function(){
            return 3 - this.vieMoi
        }, 

        leftLifeOfCom: function(){
            return 3 - this.vieCom
        }
    },

    methods:{
        startGame: function(){
            this.attente = false
            if(this.choix == null ){
                alert('Veuillez choisir quelque chose')
            }else{
                let counterDown = setInterval(() =>{
                    this.counter --
                    if(this.counter === 0 ){
                        clearInterval(counterDown)
                    }
                }, 1000)
            }

            console.log('commencer')
        },

        selectCom: function(){
            let number = Math.random()
                if(number < 0.33 ){
                    this.comChoise = 'pierre'
                }else if(number > 0.66){
                    this.comChoise = 'feuille'
                }else{
                    this.comChoise = 'ciseau'
                }
        },

        whoWin: function(){
            if(this.choix === this.comChoise ){
                this.winner = 'egaliter'
            }else if(this.choix === 'pierre' && this.comChoise === 'ciseau'){
                this.winner = 'moi'
            }else if(this.choix === 'feuille' && this.comChoise === 'pierre'){
                this.winner = 'moi'
            }else if(this.choix === 'ciseau' && this.comChoise === 'feuille'){
                this.winner = 'moi'
            }else if(this.choix === 'pierre' && this.comChoise === 'feuille'){
                this.winner = 'ordinateur'
            }else if(this.choix === 'feuille' && this.comChoise === 'ciseau'){
                this.winner = 'ordinateur'
            
            }else if(this.choix === 'ciseau' && this.comChoise === 'pierre'){
                this.winner = 'ordinateur'
            }else{
                this.winnner = 'error'
            }

            if(this.winner === 'moi'){
                this.vieCom --
            }else if(this.winner === 'ordinateur'){
                this.vieMoi --
            }
        },

        update: function(){
            let log = {
                message: `Moi: ${this.choix}, Ordinateur ${this.comChoise}`,
                winner: this.winner
            }                
            this.logs.push(log)
        },

        endgame: function(msg){
            setTimeout(() =>{
                confirm(msg)
                this.vieMoi = 3
                this.vieCom = 3
                this.choix = null,
                this.comChoise = null,
                this.logs = []
            }, 500)
        }
    }
    
})





