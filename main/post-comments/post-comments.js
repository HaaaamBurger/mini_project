//Отримуєм айді поста.
const postId = +new URL(location.href).searchParams.get('id');

//Дістаєм пост з LocalStorage(який був поміщений туди для того, щоб уникнути повторного фетчового запиту).
const postInfo = JSON.parse(localStorage.getItem('post'));

//Відмальування UserId
const userId = document.getElementsByClassName('userId')[0];
userId.innerText = `UserID: ${postInfo.userId}`;

//Кнопка повернення назад.
const postButton = document.getElementsByClassName('postButton')[0];
postButton.onclick = () => {
    location.href = (`../post_details/post-details.html?id=${postInfo.userId}`);
}

//Відмальування основної інфи про пост.
const mainPostInfo = document.getElementsByClassName('mainPostInfo')[0];
for (let item in postInfo) {
    if (item !== 'userId') {
        const p = document.createElement('p');
        p.innerText = `${item}: ${postInfo[item]}`;
        mainPostInfo.appendChild(p);
    }
}
document.body.appendChild(mainPostInfo);

const hrLine = document.createElement('hr');
document.body.appendChild(hrLine);

//Проміжний блок з текстом 'Comments'.
const infoH2 = document.createElement('h2');
infoH2.innerText = 'Comments';
const infoBlock = document.createElement('div')
infoBlock.classList.add('infoBlock');
infoBlock.appendChild(infoH2);
document.body.appendChild(infoBlock)

//Відмальування коментарів поста.
const commentsInfo = document.createElement('div');
commentsInfo.classList.add('commentsInfo');

const getComments = async () => {
    try{
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(post => {
                post.forEach(post => {
                    const commentWrapper = document.createElement('div');
                    commentWrapper.classList.add('commentWrapper');
                    for (let item in post) {
                        const p = document.createElement('p');
                        p.innerText = `${item} - ${post[item]}`;
                        commentWrapper.appendChild(p);
                        commentsInfo.appendChild(commentWrapper);
                    }
                })
            })
        //Відмальування ерори.
    }catch (e) {
       console.log(e);
    }
}
getComments();

document.body.appendChild(commentsInfo);