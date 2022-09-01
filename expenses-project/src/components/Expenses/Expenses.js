import { useState } from 'react';

import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';
import ExpenseItem from './ExpenseItem';
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

    let expensesContent = <p>No expenses found</p>;

    if (filteredExpenses.length > 0) {
        expensesContent = filteredExpenses.map((expense) => (
            <ExpenseItem
                key={expense.id}
                title={expense.item}
                amount={expense.amount}
                date={expense.date}
            />
        ));
    }

    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter
                    onFilterYear={filterChangeHandler}
                    enteredYear={enteredYear}
                />
                {expensesContent}
            </Card>
        </div>
    );
};

export default Expenses;
