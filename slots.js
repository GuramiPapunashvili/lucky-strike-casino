function spinSlots() {
    const items = ['🍒', '🍋', '🍊', '🍉', '⭐'];
    const slotElements = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
    const resultMessage = document.getElementById('resultMessage');

    slotElements.forEach(slot => {
        slot.classList.add('spinning');
    });

    setTimeout(() => {
        slotElements.forEach(slot => {
            const randomIndex = Math.floor(Math.random() * items.length);
            slot.textContent = items[randomIndex];
            slot.classList.remove('spinning')
        });

        if (slotElements[0].textContent === slotElements[1].textContent && slotElements[1].textContent === slotElements[2].textContent) {
            resultMessage.textContent = 'You won! All slots match: ' + slotElements[0].textContent;
        } else {
            resultMessage.textContent = 'Try again!';
        }
    }, 1000);
}
