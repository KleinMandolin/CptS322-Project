import React, { useEffect, useState } from 'react';
import './AlertPage.css';

const AlertPage: React.FC = () => {
    const [expiringItems, setExpiringItems] = useState<any[]>([]);
//simulated fetch for now
    useEffect(() => {
        const fetchExpiringItems = () => {
            const simulatedData = [
                { id: 1, name: 'Tomatoes', expirationDate: '2024-06-26' },
                { id: 2, name: 'Noodles', expirationDate: '2024-06-27' },
                { id: 3, name: 'Onions', expirationDate: '2024-06-28' },
                { id: 4, name: 'Garlic', expirationDate: '2024-07-01' } // feel free to add more items/change the expiration dates 
            ];
            //filters out expiration dates here the date at the moment is whatever day you're in right now
            const today = new Date();
            const fiveDaysFromNow = new Date(today);
            fiveDaysFromNow.setDate(today.getDate() + 5);

            const filteredData = simulatedData.filter(item => {
                const expirationDate = new Date(item.expirationDate);
                return expirationDate >= today && expirationDate <= fiveDaysFromNow;
            });

            setExpiringItems(filteredData);
        };

        fetchExpiringItems();
    }, []);

    return (
        <div>
            <h1>Items Expiring Soon</h1>
            <ul>
                {expiringItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - Expires on {new Date(item.expirationDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertPage;
