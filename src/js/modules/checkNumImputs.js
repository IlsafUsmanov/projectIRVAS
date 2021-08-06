const checkNumInputs = (selector) => {
    const numImputs = document.querySelectorAll(selector);

    numImputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        })
    })
}

export default checkNumInputs;