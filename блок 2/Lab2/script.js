// script.js
const testContainer = document.getElementById('test-container');
const resultContainer = document.getElementById('result-container');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');

let correctAnswers = 0;

// Підключення JSON файлу з питаннями
fetch('questions.json')
  .then(response => response.json())
  .then(data => renderTest(data));

// Функція для відображення тесту
function renderTest(data) {
  data.questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <p>${index + 1}. ${question.question}</p>
      <ul>
        ${question.answers.map(answer => `<li><input type="checkbox" data-correct="${answer.isCorrect}">${answer.answer}</li>`).join('')}
      </ul>
    `;
    testContainer.appendChild(questionElement);
  });
}

// Функція для перевірки відповідей
function checkAnswers() {
  correctAnswers = 0;
  const checkboxes = testContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked && checkbox.dataset.correct === 'true') {
      correctAnswers++;
      checkbox.parentNode.classList.add('correct');
    } else if (checkbox.checked && checkbox.dataset.correct === 'false') {
      checkbox.parentNode.classList.add('incorrect');
    }
  });
  resultContainer.textContent = `Правильних відповідей: ${correctAnswers}`;
}

// Функція для очищення вибраних відповідей і підкреслення
function restartTest() {
  const checkboxes = testContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    checkbox.parentNode.classList.remove('correct', 'incorrect');
  });
  resultContainer.textContent = '';
}

// Перевірка відповідей при кліці на кнопку "Перевірити відповіді"
submitBtn.addEventListener('click', checkAnswers);

// Очищення вибраних відповідей та підкреслення при кліці на кнопку "Пройти тест заново"
restartBtn.addEventListener('click', restartTest);
