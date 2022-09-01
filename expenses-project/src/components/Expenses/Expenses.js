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

    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter
                    onFilterYear={filterChangeHandler}
                    enteredYear={enteredYear}
                />
                {filteredExpenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        title={expense.item}
                        amount={expense.amount}
                        date={expense.date}
                    />
                ))}
            </Card>
        </div>
    );
};

export default Expenses;
