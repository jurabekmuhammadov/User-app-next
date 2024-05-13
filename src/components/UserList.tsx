"use client"
import { useState, useEffect } from 'react';

const UserList = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3000/api');
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {data.map((item: any) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
