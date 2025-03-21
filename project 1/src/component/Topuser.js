import React, { useEffect, useState } from 'react';

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/api/users');
            const data = await response.json();
            const userPostCounts = data.reduce((acc, user) => {
                acc[user.id] = (acc[user.id] || 0) + user.posts.length;
                return acc;
            }, {});

            const sortedUsers = Object.entries(userPostCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([id]) => data.find(user => user.id === id));

            setTopUsers(sortedUsers);
        };

        fetchData();
    }, []);

    return (
        <div>
            {topUsers.map(user => (
                <Card key={user.id}>
                    <CardContent>
                        <Typography variant="h5">{user.name}</Typography>
                        <Typography variant="body2">Posts: {user.posts.length}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default TopUsers;