class SavingCalculator {
    constructor(initialAmount, interestRate, period){
        this._initialAmount= document.getElementById(initialAmount);
        this._interestRate=document.getElementById(interestRate);
        this._period=document.getElementById(period);
    }

    get initialAmount(){
        return this._initialAmount;
    }

    set initialAmount(value){
        this._initialAmount=value;
    }
    get interestRate(){
        return this.interestRate;
    }
    set interestRate(value){
        this._interestRate=value;
    }
    get period(){
        return this._period;
    }
    set period(value)
    {
        this._period = value;
    }
    calculateInterest(){
        return(this._initialAmount * this._interestRate * this._period)/100;
    }
    calculateYearlyInterest(){
        const yearlyInterest= []
        let totalAmount=this._initialAmount;

        for (let year =1;year<=this._period;year++){
            const interest = (totalAmount * this._interestRate)/100;
            totalAmount += interest;
            yearlyInterest.push({year,interest : interest.toFixed(2),totalAmount})
        }
        return yearlyInterest;
    }
}

const hasilHitung = new SavingCalculator();

function hitungTotal() {
    // ambil nilai inputan dari elemen berdasarkan id
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const period = parseFloat(document.getElementById('period').value);

    // set nilai objek hasilHitung
    hasilHitung.initialAmount = initialAmount;
    hasilHitung.interestRate = interestRate;
    hasilHitung.period = period;

    // ambil hasi hitung method
    const hasil = hasilHitung.calculateInterest();

    // tampil
    document.getElementById('output').innerHTML =  `Saving Amount: $${initialAmount.toFixed(2)}<br>
                                                Annual Interest Rate: ${interestRate.toFixed(2)} % <br>
                                                Deposit Period: $${period.toFixed(2)}<br>
                                                Interest Current Amount: $${hasil.toFixed(2)}<br>
                                            `;
}

class ChartManager {
    constructor(){
        this.chart = null
    }

    createChart(data){
        const ctx = document.getElementById('chart').getContext('2d');
        this.chart = new Chart (ctx, {
            type: 'bar',
            data: {
                labels: data.map(entry=> 'Year${entry.year}'),
                datasets:[{
                    label:'Yearly Interest',
                    data: data.map(entry=>entry.interest),
                    backgroundcoloColor:'rgba(75,192,192,0.2)',
                    borderColor:'rgba(75,192,192,1)',
                    borderWidth:1
            
                }]
            },
            options:{
                scales:{    
                    y:{
                        beginAtZero:true
                    }

                }
            }
        });
        
        
    }
    updateChart(){
        // buat variabel update untuk nampung hasil hitung bunga tahunan
        const updatedData = hasilHitung.calculateYearlyInterest();

        // update label dan dataset
        this.chart.data.labels=updatedData.map(entry=>`Year${entry.year}`);
        this.chart.data.datasets[0].data=updatedData.map(entry=>entry.interest);
    
        this.chart.update()
    }
   
}

// code untuk chart manager
const charts = new ChartManager();
charts.createChart(hasilHitung.calculateYearlyInterest());

function updateChart() {
    charts.updateChart();
}
