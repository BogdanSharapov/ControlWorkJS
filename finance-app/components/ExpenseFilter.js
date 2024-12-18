import ExpenseModel from '../models/ExpenseModel.js';

class ExpenseFilter {
    constructor(onFilterChange) {
        this.onFilterChange = onFilterChange;
        this.render();
    }

    render() {
        const filterContainer = document.createElement('div');
        filterContainer.innerHTML = `
            <h2>Фильтры</h2>
            <select id="operationType">
                <option value="all">Все операции</option>
                <option value="income">Доходы</option>
                <option value="expense">Расходы</option>
            </select>
            <select id="categoryFilter">
                <option value="all">Все категории</option>
                <option value="transport">Транспорт</option>
                <option value="food">Еда</option>
                <option value="entertainment">Развлечения</option>
            </select>
        `;

        filterContainer.querySelector('#operationType').addEventListener('change', (event) => {
            this.onFilterChange(event.target.value, document.querySelector('#categoryFilter').value);
        });

        filterContainer.querySelector('#categoryFilter').addEventListener('change', (event) => {
            this.onFilterChange(document.querySelector('#operationType').value, event.target.value);
        });

        document.getElementById('app').appendChild(filterContainer);
    }
}

export default ExpenseFilter;
