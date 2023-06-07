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
                    paragraph.innerText = `${user.id}) ${user.name}`;

                    const infoButton = document.createElement('button');
                    infoButton.classList.add('infoButton');
                    infoButton.innerText = 'Details';

                    infoButton.addEventListener('click', () => {
                        location.href = `../post_details/post-details.html?id=${user.id}`;
                    })
                    const decorationalDiv = document.createElement('div');
                    decorationalDiv.classList.add('decorationInfo');

                    infoBlock.append(paragraph, infoButton, decorationalDiv);

                    wrapper.appendChild(infoBlock)

                    document.body.appendChild(wrapper);

                })
                const hrLine = document.createElement('hr');
                document.body.appendChild(hrLine);
            });
    }catch (e) {
        console.error(e);
    }
}
buildUsers();
