import { useGetUsersQuery } from "../api/usersApi";

function UsersList() {
    // Используем хук, который мы экспортировали из `usersApi.ts`
    const { data: users, error, isLoading } = useGetUsersQuery();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке данных</p>;

    return (
        <div>
            <h2>Список пользователей</h2>
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>
                        <img src={user.avatar} alt={user.name} width="50" />
                        <span>{user.name} - {user.email || "Нет email"}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
