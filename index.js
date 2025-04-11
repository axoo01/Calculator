const display = document.getElementById('display');
const themeToggle = document.getElementById('theme-toggle');

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        const result = eval(display.value.replace('÷', '/').replace('×', '*'));
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    themeToggle.innerHTML = document.body.classList.contains('dark') ?
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function handleKeyPress(e) {
    const key = e.key;
    if (/[0-9]/.test(key)) appendToDisplay(key);
    else if (key === '.') appendToDisplay('.');
    else if (key === '+') appendToDisplay('+');
    else if (key === '-') appendToDisplay('-');
    else if (key === '*') appendToDisplay('×');
    else if (key === '/') appendToDisplay('÷');
    else if (key === 'Enter' || key === '=') calculate();
    else if (key === 'Escape') clearDisplay();
}

themeToggle.addEventListener('click', toggleTheme);
document.addEventListener('keydown', handleKeyPress);
loadTheme();