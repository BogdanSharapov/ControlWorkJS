import ExpenseModel from '../models/ExpenseModel.js';

class ExpenseForm {
    constructor(onExpenseAdded) {
        this.onExpenseAdded = onExpenseAdded;
        this.render();
    }

    render() {
        const form = document.createElement('form');
        form.innerHTML = `
            <select id="type" required>
                <option value="">Выберите тип операции</option>
                <option value="income">Доход</option>
                <option value="expense">Расход</option>
            </select>
            <select id="category" required>
                <option value="">Выберите категорию</option>
                <option value="transport">Транспорт</option>
                <option value="food">Еда</option>
                <option value="entertainment">Развлечения</option>
            </select>
            <input type="number" id="amount" placeholder="Сумма" required />
            <button type="submit">Добавить</button>
        `;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const type = form.type.value;
            const category = form.category.value;
            const amount = parseFloat(form.amount.value);

            if (!type || !category || amount <= 0) {
                alert('Пожалуйста, заполните все поля корректно!');
                return;
            }

            const expense = {
                id: Date.now(),
                type,
                category,
                amount,
            };
            ExpenseModel.addExpense(expense);
            this.onExpenseAdded();
            form.reset();
        });

        document.getElementById('app').appendChild(form);
    }
}

export default ExpenseForm;
