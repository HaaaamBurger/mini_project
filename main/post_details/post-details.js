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

//Створення кнопки,при натисканні на яку будудть відмальовуватись пости поточного юзера.
const postButton = document.createElement('button');
postButton.innerText = "Get user's Posts";
postButton.classList.add('postButton');
const hrLine_2 = document.createElement('hr');

document.body.append(postButton, hrLine_2);

//При кліку отримуємо данні з ендпоінту і відмальовуєм.

const getPosts = async() => {
    try{
       await fetch(`https://jsonplaceholder.typicode.com/users/${postId}/posts`)
           .then(response => response.json())
           .then(posts => {
               const postWrapper = document.createElement('div');
               postWrapper.classList.add('postWrapper');

               posts.forEach(post => {
                   const postPocket = document.createElement('div');
                   postPocket.innerText = `${post.title.split(' ')[0].slice(0,1).toUpperCase() + post.title.split(' ')[0].slice(1) + ' ' + post.title.split(' ')[1]}.`;

                  const postButtonInfo = document.createElement('button');
                  postButtonInfo.classList.add('postButtonInfo');
                  postButtonInfo.innerText = 'Comments';

                  postWrapper.append(postPocket,postButtonInfo);

                  //При кліку на кнопку перехід на іншу сторінку з повною інфою про пост і всі коментарі.
                  postButtonInfo.onclick = () => {
                      localStorage.setItem('post', JSON.stringify(post));
                      location.href = `../post-comments/post-comments.html?id=${post.id}`;
                  }
               })

               document.body.appendChild(postWrapper);
           })
           //Відмальування ерори.
    }catch (e){
        // wrapper.innerHTML = '';
        //
        // const errorAlert = document.createElement('h2');
        // errorAlert.style.cssText = 'color: crimson; font-size: 2.5em';
        // errorAlert.innerText = 'Something went wrong!';
        //
        // const errorMessage = document.createElement('p');
        // errorMessage.innerText = `${e}`;
        //
        // wrapper.classList.remove('main_wrapper');
        // wrapper.style.marginTop = '200px';
        //
        // wrapper.append(errorAlert,errorMessage);
    }
}
//Виключення кнопки для того щоб запобігти повторного натискання.
postButton.onclick = () => {
    postButton.setAttribute('disabled','disabled');
    getPosts()
}