new Vue({
    el: '#app',
    data: {
        loanAmount: 0,
        downPayment: 0,
        interestRate: 0,
        loanDuration: 0,
        result: '',
        amortizationDetails: []
    },
    methods: {
        calculateInterest() {
            // Calculate loan details
            const principal = this.loanAmount - this.downPayment;
            const monthlyInterestRate = this.interestRate / 100 / 12;
            const numberOfPayments = this.loanDuration;

            // Calculate monthly payment
            const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

            // Generate amortization schedule
            let balance = principal;
            const amortizationDetails = [];
            for (let i = 0; i < numberOfPayments; i++) {
                const interest = balance * monthlyInterestRate;
                const principalPaid = monthlyPayment - interest;
                balance -= principalPaid;
                amortizationDetails.push({
                    payment: monthlyPayment,
                    principal: principalPaid,
                    interest: interest,
                    balance: balance
                });
            }

            // Update result and amortization details
            this.result = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
            this.amortizationDetails = amortizationDetails;
        }
    }
});
