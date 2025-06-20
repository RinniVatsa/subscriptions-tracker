import React from 'react';
import { useSubscriptions } from '../../ context/SubscriptionContext';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4560'];

const ExpenseChart = () => {
    const { subscriptions } = useSubscriptions();

    const categoryData = subscriptions.reduce((acc, sub) => {
        const category = sub.category || 'Uncategorized';
        if (!acc[category]) acc[category] = 0;
        acc[category] += parseFloat(sub.amount);
        return acc;
    }, {});

    const pieData = Object.entries(categoryData).map(([category, total]) => ({
        name: category,
        value: total,
    }));

    return ( <
        div style = {
            { width: '100%', height: 300 }
        } > {
            pieData.length ? ( <
                ResponsiveContainer >
                <
                PieChart >
                <
                Pie data = { pieData }
                cx = "50%"
                cy = "50%"
                outerRadius = { 100 }
                fill = "#8884d8"
                dataKey = "value"
                label > {
                    pieData.map((_, index) => ( <
                        Cell key = { `cell-${index}` }
                        fill = { COLORS[index % COLORS.length] }
                        />
                    ))
                } <
                /Pie> <
                Tooltip / >
                <
                Legend / >
                <
                /PieChart> < /
                ResponsiveContainer >
            ) : ( <
                p > No data to display. < /p>
            )
        } <
        /div>
    );
};

export default ExpenseChart;