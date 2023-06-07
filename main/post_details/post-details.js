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
        const p = document.createElement('p');
        p.innerText = `${field.slice(0,1).toUpperCase() + field.slice(1)}  :  ${user[field]}`;
        listData.appendChild(p);

        if (typeof user[field] === 'object') {
            const div = document.createElement('div');
            div.classList.add('decorationalDiv');
            p.innerText = `${field.slice(0,1).toUpperCase() + field.slice(1)}: ⤵`;
            p.style.marginTop = '5px';
            div.appendChild(p);
            listData.appendChild(div);

            userExlorer(user[field]);
        }
    }
}
userExlorer(userData);

//Кнопка повернення на минилу сторінку.

const buttonInfo = document.querySelector('.navInfo button');
buttonInfo.onclick = () => {
    location.href = '../index/index.html';
}

const hrLine = document.createElement('hr');
document.body.appendChild(hrLine);

