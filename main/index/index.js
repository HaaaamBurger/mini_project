// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
//----------------------------------------------------------------------------------------------------------------------
const wrapper = document.getElementsByClassName('main_wrapper')[0];

const buildUsers = async () => {
    try {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(value => {
                value.map(user => {
                    const infoBlock = document.createElement('div');
                    infoBlock.classList.add('infoBlock');

                    const paragraph = document.createElement('p');
                    paragraph.innerText = `${user.id}) ${user.name}`;

                    const infoButton = document.createElement('button');
                    infoButton.innerText = 'Details';

                    infoButton.addEventListener('click', () => {
                    })

                    infoBlock.append(paragraph, infoButton);

                    document.body.appendChild(infoBlock);
                })
            });
    }catch (e) {
        console.error(e);
    }
}
buildUsers();
