//Отримуєм айді поста.
const postId = +new URL(location.href).searchParams.get('id');

//Дістаєм пост з LocalStorage(який був поміщений туди для того, щоб уникнути повторного фетчового запиту).
const postInfo = JSON.parse(localStorage.getItem('post'));

//Відмальування UserId
const userId = document.getElementsByClassName('userId')[0];
userId.innerHTML = `UserID: ${postInfo.userId.toString().fontcolor('#9672FF')}`;

//Кнопка повернення назад.
const postButton = document.getElementsByClassName('postButton')[0];
postButton.onclick = () => {
    //Флажок для поверення на початкову сторінку.
    const linkSwitcher = JSON.parse(localStorage.getItem('linkSwitcher'));

    if (linkSwitcher) {
        location.href = '../index/index.html';
        localStorage.removeItem('linkSwitcher');
    } else {
        location.href = (`../post_details/post-details.html?id=${postInfo.userId}`);
    }
}

//Відмальування основної інфи про пост.
const mainPostInfoBox = document.getElementsByClassName('mainPostInfoBox')[0];
const mainPostInfo = document.getElementsByClassName('mainPostInfo')[0];
for (let item in postInfo) {
    if (item !== 'userId') {
        const p = document.createElement('p');
        p.innerHTML = `${item.slice(0,1).toUpperCase().fontcolor('#9672FF') + item.slice(1).fontcolor('#9672FF')}  :  ${postInfo[item]}`;
        mainPostInfo.appendChild(p);
    }
}

document.body.appendChild(mainPostInfoBox);

//Відмальовка дати.

const previousSession = document.querySelector('.sessionInfoBox > h3:nth-child(2)');
const currentSession = document.querySelector('.sessionInfoBox > h3:last-child');
const sessionActions = JSON.parse(localStorage.getItem('historyLogPosts'));
console.log(sessionActions);
const userIdDate = [];
sessionActions.forEach(date => date.postID === postId ? userIdDate.push(date) : null);
previousSession.innerHTML = previousSession.innerText.fontcolor('#9672FF') + ' ' + userIdDate[userIdDate.length - 1].lastVisited;;
currentSession.innerHTML = currentSession.innerText.fontcolor('#9672FF') + ' ' + userIdDate[userIdDate.length - 1].sessionTime;

const hrLine = document.createElement('hr');
document.body.appendChild(hrLine);

//Проміжний блок з текстом 'Comments'.
const infoH2 = document.createElement('h2');
infoH2.innerText = 'Comments⤵';
const infoBlock = document.createElement('div')
infoBlock.classList.add('infoBlock');
infoBlock.appendChild(infoH2);
document.body.appendChild(infoBlock)

//Відмалювання коментарів поста.
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
                        p.innerHTML = `${item.slice(0,1).toUpperCase().fontcolor('#9672FF') + item.slice(1).fontcolor('#9672FF')}  :  ${post[item]}`;
                        commentWrapper.appendChild(p);
                        commentsInfo.appendChild(commentWrapper);
                    }
                })
            })
        //Відмалювання ерори.
    }catch (e) {
        // buttonKeeper.innerHTML = '';
        //
        // const errorAlert = document.createElement('h2');
        // errorAlert.style.cssText = 'color: crimson; font-size: 2.5em';
        // errorAlert.innerText = 'Something went wrong!';
        //
        // const errorMessage = document.createElement('p');
        // errorMessage.innerText = `${e}`;
        //
        // buttonKeeper.classList.remove('main_wrapper');
        // buttonKeeper.style.cssText = 'margin: 100px 0 100px 0';
        //
        // buttonKeeper.append(errorAlert,errorMessage);
    }
}
getComments();

document.body.appendChild(commentsInfo);