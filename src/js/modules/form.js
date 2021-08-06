import checkNumInputs from './checkNumImputs';

const form = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone')

    const message = {
        loading: 'Загругазка',
        success: 'Успешно',
        failure: 'Ошибка'
    }

    //Функция, которая отвечает за отправку запроса
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res =  await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    //Очистка инпутов. Вызывается после отправки данных
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            //Создаем блок, в котором показ-ся сообщение(загрузка, успешно, ошибка)
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            //новый конструктор, который вытаскивает данные с нужного инпута
            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            //отправляем на указ.сервер полученные данные
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000)
                })
        })
    })
};

export default form;