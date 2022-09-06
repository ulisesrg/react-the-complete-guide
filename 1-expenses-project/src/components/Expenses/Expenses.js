import { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

const Expenses = (props) => {
    const [enteredYear, setEnteredYear] = useState('2022');

    const filterChangeHandler = (selectedYear) => {
        setEnteredYear(selectedYear);
    };

    const filteredExpenses = props.items.filter((expense) => {
        const expenseYear = expense.date.getFullYear().toString();
        return enteredYear === expenseYear;
    });

    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter
                    onFilterYear={filterChangeHandler}
                    enteredYear={enteredYear}
                />
                <ExpensesChart expenses={filteredExpenses} />
                <ExpensesList items={filteredExpenses} />
            </Card>
        </div>
    );
};

export default Expenses;
