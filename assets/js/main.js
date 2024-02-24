function createCalculator(){
    

    return {
        display: document.querySelector('.box-display .display'),
        displayLastCalc: document.querySelector('.small-display'),

        start() {
            this.btnClick();
            this.pressKey();
            this.hideKeybooard();
            this.display.inputMode = 'none';
            if (!isMobile) this.display.focus();
        },

        performCalculation(){
    
            let calculation = this.display.value.toLowerCase()
            .replace('÷', '/')
            .replace('x', '*');

            try{
                if (/[a-zA-Z]/g.test(calculation)) {
                    alert('Conta inválida');
                    return;
                }

                calculation = eval(calculation);

                if (!calculation) {
                    alert('Conta inválida');
                    return;
                }
                this.displayLastCalc.value = this.display.value.toLowerCase() + '=';
                this.display.value = calculation;
            } catch(e){
                alert('Conta inválida');
                return;
            }
        },

        clearDisplay(){
            this.display.value = '';
            this.displayLastCalc.value = '';
            this.pressKey();
            
            this.display.focus();
        },

        deleteOne(){
            this.display.value = this.display.value.slice(0, -1);
            this.display.focus()
        },

        btnClick(){
            document.addEventListener('click', (e) => {
                const el = e.target;
                
                if (el.classList.contains('btn-num')){
                    this.btnForDisplay(el.innerText);
                }

                if (el.classList.contains('btn-clear')){
                    this.clearDisplay();
                }

                if (el.classList.contains('btn-del')){
                    this.deleteOne();
                }

                if (el.classList.contains('btn-eq')){
                    this.performCalculation();
                }

            });
        },

        pressKey(){
            this.display.addEventListener('keyup', (e) => {
                if (e.keyCode === 13){
                    this.performCalculation();
            
                }
                if (e.key.toLowerCase() === 'c'){
                    this.clearDisplay();
                }

                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    setTimeout(() => {
                        this.display.classList.add("no-cursor");
                    }, 2000);
                }
            });

            this.display.addEventListener('keydown', (e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    this.display.classList.remove("no-cursor");
                }
            });

        },

        btnForDisplay(valor){
            this.display.value += valor;
        },

        hideKeybooard(){
            this.display.addEventListener("touchstart", (e) => {
                e.preventDefault();
            });
        }

    }
}

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const calculator = createCalculator();
calculator.start();