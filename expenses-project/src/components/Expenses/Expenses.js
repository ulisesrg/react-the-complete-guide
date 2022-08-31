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

    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter
                    onFilterYear={filterChangeHandler}
                    enteredYear={enteredYear}
                />
                {props.items.map((expense) => (
                    <ExpenseItem
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
