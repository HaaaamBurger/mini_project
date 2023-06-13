const wrapper = document.getElementsByClassName('main_wrapper')[0];

//Створюємо функцію, яка буде отримаувати данні з ендпоінту і відмальовувати сторінку.
const buildUsers = async () => {
    //Обов'язково обгортаємо трай-кетчом, адже фетчовий запит - це потенційна бомба.
    try {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(value => {
                //Аби не робити лишній запит на сервер передамо данні в LocalStorage.
                localStorage.setItem('users', JSON.stringify(value));

                //Відмальовка юзерів.
                value.map(user => {
                    const infoBlock = document.createElement('div');
                    infoBlock.classList.add('infoBlock');

                    const paragraph = document.createElement('p');
                    paragraph.innerHTML = `№${user.id.toString().fontcolor('#9672FF')}: ${user.name}`;

                    const infoButton = document.createElement('button');
                    infoButton.classList.add('infoButton');
                    infoButton.innerText = 'Details';

                    infoButton.addEventListener('click', (e) => {
                        //Запис дати до LocalStorage, щоб в майбутьному відмалювати час відвідання сторінки.
                        let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

                        const historyLogUsers = JSON.parse(localStorage.getItem('historyLogUsers')) || [];

                        if (!historyLogUsers.length) {
                            const newHistoryLog = {userID: user.id, sessionTime: currentTime, lastVisited: 'Never'};
                            historyLogUsers.push(newHistoryLog);
                            localStorage.setItem('historyLogUsers',JSON.stringify(historyLogUsers));
                        } else if (historyLogUsers.length){
                            let logs = [];
                            historyLogUsers.forEach(log => log.userID === user.id ? logs.push(log) : null);
                            console.log(logs);

                            const previousLog = logs[logs.length - 1];
                            if (previousLog) {
                                const newHistoryLog = {userID: user.id, sessionTime: currentTime, lastVisited: previousLog.sessionTime};
                                historyLogUsers.push(newHistoryLog);
                                localStorage.setItem('historyLogUsers',JSON.stringify(historyLogUsers));
                            } else {
                                const newHistoryLog = {userID: user.id, sessionTime: currentTime, lastVisited: 'Never'};
                                historyLogUsers.push(newHistoryLog);
                                localStorage.setItem('historyLogUsers',JSON.stringify(historyLogUsers));
                            }
                        }
                        //Шлях до сторінки з детальною інфою.
                        location.href = `../post_details/post-details.html?id=${user.id}`;
                    })
                    const decorationDiv = document.createElement('div');
                    decorationDiv.classList.add('decorationDiv');

                    infoBlock.append(paragraph, infoButton, decorationDiv);

                    wrapper.appendChild(infoBlock);
                })
            });
    } catch (e) {
        // Відмальовака помилки
        wrapper.innerHTML = '';

        const errorAlert = document.createElement('h2');
        errorAlert.style.cssText = 'color: crimson; font-size: 2.5em';
        errorAlert.innerText = 'Something went wrong!';

        const errorMessage = document.createElement('p');
        errorMessage.innerText = `${e}`;

        wrapper.classList.remove('main_wrapper');
        wrapper.style.marginTop = '200px';

        wrapper.append(errorAlert, errorMessage);
        console.log(e)
    }
}
buildUsers();


const historyUsers = document.querySelector('.historyUsers > ul');
const getInfoUsers = JSON.parse(localStorage.getItem('historyLogUsers')) || [];

getInfoUsers.forEach(session => {
    const li = document.createElement('li');
    li.innerText = `User Id: ${session.userID} - Visited Time: ${session.sessionTime}`;
    historyUsers.appendChild(li);
})

const historyPosts = document.querySelector('.historyPosts > ul');
const getInfoPosts= JSON.parse(localStorage.getItem('historyLogPosts')) || [];

getInfoPosts.forEach(session => {
    const li = document.createElement('li');
    li.innerText = `Post Id: ${session.postID} - Visited Time: ${session.sessionTime}`;
    historyPosts.appendChild(li);
})