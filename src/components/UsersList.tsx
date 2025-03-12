import React, { useState } from 'react';
import { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } from '../api/usersApi'
import { User } from '../types/user';

const UsersList: React.FC = () => {
    const { data: users = [], isLoading, isError } = useGetUsersQuery();
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation(); // [Добавлено]

    const [newUserName, setNewUserName] = useState(''); // [Добавлено]
    const [editingUserId, setEditingUserId] = useState<string | null>(null); // [Добавлено]
    const [editingUserName, setEditingUserName] = useState(''); // [Добавлено]

    const handleAddUser = async () => {
        if (newUserName.trim()) {
            try {
                await createUser({ name: newUserName }).unwrap();
                setNewUserName('');
            } catch (error) {
                console.error('Ошибка при создании пользователя:', error);
            }
        }
    };

    const handleEditUser = (user: User) => {
        setEditingUserId(user.id); // [Добавлено]
        setEditingUserName(user.name); // [Добавлено]
    };

    const handleUpdateUser = async () => {
        if (editingUserId && editingUserName.trim()) {
            try {
                await updateUser({ id: editingUserId, name: editingUserName }).unwrap(); // [Добавлено]
                setEditingUserId(null); // [Добавлено]
                setEditingUserName(''); // [Добавлено]
            } catch (error) {
                console.error('Ошибка при обновлении пользователя:', error);
            }
        }
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка при загрузке пользователей.</p>;

    return (
        <div>
            <h1>Список пользователей</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {editingUserId === user.id ? ( // [Добавлено]
                            <div>
                                <input
                                    type="text"
                                    value={editingUserName} // [Добавлено]
                                    onChange={(e) => setEditingUserName(e.target.value)} // [Добавлено]
                                />
                                <button onClick={handleUpdateUser}>Сохранить</button> // [Добавлено]
                                <button onClick={() => setEditingUserId(null)}>Отмена</button> // [Добавлено]
                            </div>
                        ) : (
                            <div>
                                <span>{user.name}</span>
                                <button onClick={() => handleEditUser(user)}>Редактировать</button> // [Добавлено]
                                {/* Здесь можно добавить кнопку для удаления пользователя */}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Добавить нового пользователя</h2>
            <input
                type="text"
                placeholder="Имя"
                value={newUserName} // [Добавлено]
                onChange={(e) => setNewUserName(e.target.value)} // [Добавлено]
            />
            <button onClick={handleAddUser}>Добавить</button>
        </div>
    );
};

export default UsersList;
