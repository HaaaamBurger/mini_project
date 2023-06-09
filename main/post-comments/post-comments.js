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

