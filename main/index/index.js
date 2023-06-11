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
                        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

                        const historyLog = JSON.parse(localStorage.getItem('historyLog')) || [];
                        if (!historyLog.length) {
                            historyLog.push({userId: user.id, currentTime, lastTime: currentTime});
                            localStorage.setItem('historyLog', JSON.stringify(historyLog));
                        } else if (historyLog.length) {
                            const newCurrentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
                            const visitedUser = historyLog.find(userObject => userObject.userId === user.id);
                           
                        }

                        location.href = `../post_details/post-details.html?id=${user.id}`;
                    })
                    const decorationDiv = document.createElement('div');
                    decorationDiv.classList.add('decorationDiv');

                    infoBlock.append(paragraph, infoButton, decorationDiv);

                    wrapper.appendChild(infoBlock)

                    document.body.appendChild(wrapper);
                })
            });
    }catch (e) {
        // Відмальовака помилки
        wrapper.innerHTML = '';

        const errorAlert = document.createElement('h2');
        errorAlert.style.cssText = 'color: crimson; font-size: 2.5em';
        errorAlert.innerText = 'Something went wrong!';

        const errorMessage = document.createElement('p');
        errorMessage.innerText = `${e}`;

        wrapper.classList.remove('main_wrapper');
        wrapper.style.marginTop = '200px';

        wrapper.append(errorAlert,errorMessage);
        console.log(e)
    }
}
buildUsers();
