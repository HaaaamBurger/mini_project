const postId = +new URL(location.href).searchParams.get('id');

const postInfo = JSON.parse(localStorage.getItem('post'));

const postButton = document.getElementsByClassName('postButton')[0];
const userId = document.getElementsByClassName('userId')[0];
userId.innerText = `UserID: ${postInfo.userId}`;

postButton.onclick = () => {
    location.href = (`../post_details/post-details.html?id=${postInfo.userId}`);
}

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

const infoH2 = document.createElement('h2');
infoH2.innerText = 'Comments';
const infoBlock = document.createElement('div')
infoBlock.classList.add('infoBlock');
infoBlock.appendChild(infoH2);
document.body.appendChild(infoBlock)

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
    }catch (e) {
       console.log(e);
    }
}
getComments();

document.body.appendChild(commentsInfo);