let currentStep = 1;
const totalSteps = 3;

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

const colorMap = {
    'black': '#1A1616',
    'veneer': '#A08060',
    'marble': '#E0E0E0',
    'ribbed': '#B0B0B0'
};

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

function resetOptions(stepId) {
    const optionsContainer = document.getElementById(stepId).querySelector('.options-container');
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    optionsContainer.classList.remove('deselected');
}

function selectOption(event, stepId) {
    resetOptions(stepId);
    event.currentTarget.classList.add('selected');
    document.getElementById(stepId).querySelector('.options-container').classList.add('deselected');
}

function nextStep(step) {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const nextStepElement = document.getElementById(`step-${step}`);

    currentStepElement.classList.add('fade-out');

    currentStep = step;
    
    setTimeout(() => {
        currentStepElement.style.display = 'none';
        currentStepElement.classList.remove('fade-out');
        nextStepElement.style.display = 'block';
        nextStepElement.classList.add('active');
        
        if (step > 1) {
            updateProgress();
        }

        document.querySelector('.quiz-container').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

    }, 500);
}


function selectStyle(style) {
    selectedStyle = style;
    selectOption(event, 'step-2');
    document.body.style.backgroundColor = colorMap[style];
    
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

function selectMechanism(mechanism) {
    selectedMechanism = mechanism;
    selectOption(event, 'step-3');
    nextStep(4);
}

function selectScreen(screen) {
    selectedScreen = screen;
    selectOption(event, 'step-4');
    
    const finalTitle = document.getElementById('final-title');
    const finalSummary = document.getElementById('final-summary');
    
    finalTitle.textContent = 'Спасибо за участие!';
    finalSummary.textContent = `Ваш идеальный вариант: ${styleMap[selectedStyle]} тумба, с механизмом ${mechanismMap[selectedMechanism]} и размещением экрана "${screenMap[selectedScreen]}".`;

    nextStep(5);
}

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
    
    const finalAnimation = document.getElementById('final-animation');
    finalAnimation.classList.add('sent');

    alert(`Спасибо, ${email}! Ваш промокод отправлен.`);
});

document.addEventListener('DOMContentLoaded', () => {
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.style.display = 'none';
    
    document.querySelector('button').addEventListener('click', () => {
        progressContainer.style.display = 'block';
        updateProgress();
    });
});
