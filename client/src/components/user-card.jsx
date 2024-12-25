import React from 'react';
import './user-card.css';

const UserCard = ({ userData }) => {
    return (
        <div className="user-card">
            <img src={userData.profileImage} alt={`${userData.username}'s profile`} />
            <h2>@{userData.username}</h2>
            <p>Followers: {userData.followers}</p>
            <p>Following: {userData.following}</p>
        </div>
    );
};

export default UserCard;
