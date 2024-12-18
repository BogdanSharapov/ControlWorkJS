class ExpenseModel {
    constructor() {
        this.expenses = [];
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }

    removeExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
    }

    getExpenses() {
        return this.expenses;
    }
}

export default new ExpenseModel();
