import ExpenseView from './views/ExpenseView.js';
import ExpenseModel from './models/ExpenseModel.js';

const app = new ExpenseView();

app.init();

document.getElementById('expense-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Проверка валидности данных
    if (!type || !category || amount <= 0) {
        alert('Пожалуйста, заполните все поля корректно!');
        return;
    }

    // Добавление операции
    const expense = {
        id: Date.now(),
        type,
        category,
        amount,
    };
    
    ExpenseModel.addExpense(expense);
    
    // Обновление общего баланса
    const totalBalanceElement = document.getElementById('total-balance');
    let currentBalance = parseFloat(totalBalanceElement.textContent);
    currentBalance += type === 'income' ? amount : -amount;
    totalBalanceElement.textContent = `${currentBalance} руб`;

    app.updateExpenseList(); // Обновление списка операций
    document.getElementById('expense-form').reset(); // Сброс формы
});
