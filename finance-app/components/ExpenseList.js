import ExpenseModel from '../models/ExpenseModel.js';

class ExpenseList {
    render(expenses) {
        const list = document.createElement('ul');
        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.category} - ${expense.type} - ${expense.amount} руб.`;
            listItem.style.color = expense.type === 'expense' ? 'red' : 'green'; // Красный для расходов, зеленый для доходов

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.onclick = () => {
                ExpenseModel.removeExpense(expense.id);
                this.render(ExpenseModel.getExpenses());
            };

            listItem.appendChild(removeButton);
            list.appendChild(listItem);
        });

        document.getElementById('expense-list')?.remove();
        list.id = 'expense-list';
        document.getElementById('app').appendChild(list);
    }
}

export default ExpenseList;
