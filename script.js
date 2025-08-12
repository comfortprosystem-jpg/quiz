let currentStep = 1;
// Учитываем только шаги с вопросами для прогресса
const totalSteps = 3; 

// Переменные для хранения выбора пользователя
let selectedStyle = '';
let selectedMechanism = '';
let selectedScreen = '';

const styleMap = {
    'black': 'черная',
    'veneer': 'дерево-шпон',
    'marble': 'мраморная',
    'ribbed': 'ребристые фасады'
};

const mechanismMap = {
    'fall_down': 'падение фасада',
    'drawer': 'выдвижение как ящик'
};

const screenMap = {
    'wall_mount': 'экран висит на стене',
    'wall_projection': 'проекция на стену',
    'built_in': 'экран помещен в специальную нишу'
};

// Функция для обновления индикатора прогресса
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    const progress = (currentStep - 1) / totalSteps * 100;
    progressBar.style.width = `${progress}%`;

    if (currentStep > 1 && currentStep <= totalSteps + 1) {
        progressText.textContent = `Шаг ${currentStep - 1} из ${totalSteps}`;
    } else {
        progressText.textContent = '';
    }
}

// Функция для сброса стилей выделения
function resetOptions(stepId) {
    const options = document.getElementById(stepId).querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
}

// Функция для перехода к следующему шагу с плавным скроллом
function nextStep(step) {
    // Обновляем индикатор прогресса только для шагов с вопросами
    if (step > 1) {
        updateProgress();
    }
    
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');

    document.querySelector('.quiz-container').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Шаг 2: Обработка выбора стиля
function selectStyle(style) {
    selectedStyle = style;
    resetOptions('step-2');
    event.currentTarget.classList.add('selected');

    const mechanismOptionsDiv = document.getElementById('mechanism-options');
    mechanismOptionsDiv.innerHTML = ''; 

    if (style === 'black' || style === 'marble') {
        mechanismOptionsDiv.innerHTML = `
            <div class="option" onclick="selectMechanism('fall_down')">
                <img src="images/fall_down.jpg" alt="Падение фасада">
                <p>Падение фасада</p>
            </div>
            <div class="option" onclick="selectMechanism('drawer')">
                <img src="images/drawer_out.jpg" alt="Выдвижение как ящик">
                <p>Выдвижение как ящик</p>
            </div>
        `;
    } else {
        mechanismOptionsDiv.innerHTML = `
            <div class="option" onclick="selectMechanism('fall_down')">
                <img src="images/fall_down.jpg" alt="Падение фасада">
                <p>Падение фасада</p>
            </div>
            <div class="option" onclick="selectMechanism('drawer')">
                <img src="images/drawer_out.jpg" alt="Выдвижение как ящик">
                <p>Выдвижение как ящик</p>
            </div>
        `;
    }
    nextStep(3);
}

// Шаг 3: Обработка выбора механизма
function selectMechanism(mechanism) {
    selectedMechanism = mechanism;
    resetOptions('step-3');
    event.currentTarget.classList.add('selected');
    nextStep(4);
}

// Шаг 4: Обработка выбора экрана
function selectScreen(screen) {
    selectedScreen = screen;
    resetOptions('step-4');
    event.currentTarget.classList.add('selected');
    
    // Персонализация финального экрана
    const finalTitle = document.getElementById('final-title');
    const finalSummary = document.getElementById('final-summary');
    
    finalTitle.textContent = 'Спасибо за участие!';
    finalSummary.textContent = `Ваш идеальный вариант: ${styleMap[selectedStyle]} тумба, с механизмом ${mechanismMap[selectedMechanism]} и размещением экрана "${screenMap[selectedScreen]}".`;

    nextStep(5);
}

// Шаг 5: Отправка данных формы
document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('user-email').value;

    const quizData = {
        style: selectedStyle,
        mechanism: selectedMechanism,
        screen: selectedScreen,
        email: email
    };
    
    console.log('Данные квиза:', quizData);
    alert(`Спасибо, ${email}! Ваш промокод отправлен.`);
});

// Инициализация прогресса при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Скрываем прогресс-бар на первом экране
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.style.display = 'none';
    
    // Обновляем прогресс при переходе на следующий шаг
    document.querySelector('button').addEventListener('click', () => {
        progressContainer.style.display = 'block';
        updateProgress();
    });
});