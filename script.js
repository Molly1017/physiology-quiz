const QUESTIONS = [
  {
    question: "心脏每搏输出量（SV）与心率（HR）相乘得到什么？",
    options: { A: "心输出量（CO）", B: "射血分数（EF）", C: "平均动脉压（MAP）", D: "静脉回心血量" },
    answer: "A",
    explanation: "心输出量 CO = 心率 HR × 每搏输出量 SV，表示每分钟心室泵出的血量。"
  },
  {
    question: "在其他条件相近时，动脉血压升高最直接会使压力感受器传入冲动如何变化？",
    options: { A: "减少", B: "增加", C: "完全停止", D: "保持不变" },
    answer: "B",
    explanation: "颈动脉窦和主动脉弓的压力感受器感受血管壁牵张；血压升高时牵张增大，传入冲动增加，帮助反射性降低血压。"
  },
  {
    question: "健康成人安静状态下，最主要的吸气肌是？",
    options: { A: "膈肌", B: "腹直肌", C: "内肋间肌", D: "胸锁乳突肌" },
    answer: "A",
    explanation: "安静吸气时膈肌收缩并下移，使胸腔容积增大、肺内压下降，空气因此进入肺内。"
  },
  {
    question: "氧气从肺泡进入肺毛细血管的主要驱动力是什么？",
    options: { A: "肺泡与血液之间的氧分压差", B: "血液与肺泡之间的二氧化碳分压差", C: "呼吸道内的黏液流动", D: "心室收缩产生的声音" },
    answer: "A",
    explanation: "气体通过呼吸膜进行扩散，氧气由肺泡氧分压较高处向静脉血氧分压较低处移动。"
  },
  {
    question: "心室射血期，哪一组瓣膜正常关闭以防止血液倒流？",
    options: { A: "房室瓣关闭，半月瓣开放", B: "房室瓣开放，半月瓣关闭", C: "所有瓣膜都开放", D: "所有瓣膜都关闭" },
    answer: "A",
    explanation: "心室射血期，二尖瓣和三尖瓣关闭以防血液回流入心房；主动脉瓣和肺动脉瓣开放，血液射入大动脉。"
  }
];

let currentQuestion = 0;
let score = 0;

const questionNumber = document.querySelector("#question-number");
const questionText = document.querySelector("#question-text");
const optionsElement = document.querySelector("#options");
const feedback = document.querySelector("#feedback");
const feedbackResult = document.querySelector("#feedback-result");
const feedbackExplanation = document.querySelector("#feedback-explanation");
const nextButton = document.querySelector("#next-button");
const progressFill = document.querySelector("#progress-fill");
const progressText = document.querySelector("#progress-text");
const quizCard = document.querySelector("#quiz-card");
const resultCard = document.querySelector("#result-card");
const scoreElement = document.querySelector("#score");
const scoreMessage = document.querySelector("#score-message");
const restartButton = document.querySelector("#restart-button");

function renderQuestion() {
  const item = QUESTIONS[currentQuestion];
  questionNumber.textContent = `第 ${currentQuestion + 1} 题`;
  questionText.textContent = item.question;
  progressText.textContent = `第 ${currentQuestion + 1} / ${QUESTIONS.length} 题`;
  progressFill.style.width = `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`;
  optionsElement.innerHTML = "";
  feedback.hidden = true;
  Object.entries(item.options).forEach(([letter, text]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = `${letter}. ${text}`;
    button.addEventListener("click", () => selectAnswer(letter));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(selected) {
  const item = QUESTIONS[currentQuestion];
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent.startsWith(`${item.answer}.`)) button.classList.add("correct");
    if (button.textContent.startsWith(`${selected}.`) && selected !== item.answer) button.classList.add("incorrect");
  });
  const isCorrect = selected === item.answer;
  if (isCorrect) score += 1;
  feedbackResult.textContent = isCorrect ? "回答正确！" : `回答错误。正确答案是 ${item.answer}。`;
  feedbackResult.classList.toggle("wrong", !isCorrect);
  feedbackExplanation.textContent = `解析：${item.explanation}`;
  nextButton.textContent = currentQuestion === QUESTIONS.length - 1 ? "查看总分" : "下一题";
  feedback.hidden = false;
}

function showResult() {
  quizCard.hidden = true;
  resultCard.hidden = false;
  scoreElement.textContent = `${score} / ${QUESTIONS.length}（${score * 20} 分）`;
  scoreMessage.textContent = score === QUESTIONS.length ? "全部答对，掌握得很好！" : "继续复习相关知识，再试一次吧。";
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

nextButton.addEventListener("click", () => {
  if (currentQuestion === QUESTIONS.length - 1) {
    showResult();
  } else {
    currentQuestion += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizCard.hidden = false;
  resultCard.hidden = true;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderQuestion();
