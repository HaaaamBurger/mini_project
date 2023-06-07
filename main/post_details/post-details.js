//Відхоплюєм ідентифікатор.
const postId = +new URL(location.href).searchParams.get('id');

//Дістаєм данні з LocalStorage.
const usersData = JSON.parse(localStorage.getItem('users'));

//Знайдемо потрібного юзера.
const userData = usersData.find(user => user.id === postId);

//Створимо рекурсивну функцію, щоб відмалювати всю інформацію про юзера.

const userExlorer = (user) => {
    const listData = document.getElementsByClassName('listData')[0];


    for (let field in user) {
        const li = document.createElement('li');
        li.innerText = `${field} - ${user[field]}`;
        listData.appendChild(li);

        if (typeof user[field] === 'object') {
            li.innerText = `${field}: `;
            listData.appendChild(li);

            userExlorer(user[field]);
        }
    }
}
userExlorer(userData);