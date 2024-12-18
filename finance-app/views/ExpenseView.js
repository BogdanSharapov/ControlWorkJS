import ExpenseForm from '../components/ExpenseForm.js';
import ExpenseList from '../components/ExpenseList.js';
import ExpenseFilter from '../components/ExpenseFilter.js';
import ExpenseModel from '../models/ExpenseModel.js';

class ExpenseView {
    constructor() {
        this.expenseList = new ExpenseList();
        this.expenseForm = new ExpenseForm(this.updateExpenseList.bind(this));
        this.expenseFilter = new ExpenseFilter(this.updateExpenseList.bind(this));
    }

    init() {
        this.updateExpenseList();
    }

    updateExpenseList(typeFilter = 'all', categoryFilter = 'all') {
        const filteredExpenses = ExpenseModel.getExpenses().filter(expense => {
            const typeMatch = typeFilter === 'all' || expense.type === typeFilter;
            const categoryMatch = categoryFilter === 'all' || expense.category === categoryFilter;
            return typeMatch && categoryMatch;
        });
        
        this.expenseList.render(filteredExpenses);
    }
}

export default ExpenseView;
