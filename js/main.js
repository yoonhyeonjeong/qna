// 외부 js 호출(data.js)
document.write('<script src="./data.js"></script>');

const startBtn = document.querySelector(".start-btn");
const input = document.querySelector(".input")
const message = document.querySelector(".input-notice")
const welcome = document.querySelector('.welcome');
const qna = document.querySelector('.qna');
const question  = document.querySelector('.question');
const answer  = document.querySelector('.answer');
const progressBar = document.querySelector('.progress-bar');
let progressGuage = document.querySelector('.progress-guage');
let progressScore = document.querySelector('.progress-score');

let result = document.querySelector('.result');
let desc = document.querySelector('.desc-box')


input.addEventListener('blur', ()=>{
    try {
        if(input.value.length < 1){
            throw  '이름을 입력하고 시작해 주세요.';
        }
    } catch (error) {
        message.innerText = error;
        message.style.color = 'red';
        message.style.paddingTop = '10px';
        input.style.border = '2px solid red';
    }
    
})

// 시작이벤트
startBtn.addEventListener('click', ()=>{
    try {
        if(input.value.length < 1){
            throw  '이름을 입력하고 시작해 주세요.';
        }
        questionBox(qnaList[index]);
    } catch (error) {
        message.innerText = error;
        message.style.color = 'red';
        message.style.paddingTop = '10px';
        input.style.border = '2px solid red';
    }
})

let index = 0;
let scoreTotal = 0;

function questionBox(object) {
    if(!object){
        question.innerText = '';
        return; // 함수실행 중단
    }

    welcome.style.display = 'none';
    qna.style.display = 'block';

    // 첫번째 질문 뿌리기~ 
    question.innerText += object.q

    // 첫번째 프로그레스
    if(index === 0){
        let percent  = 1 / qnaList.length * 100;
        progressGuage.style.width = percent + '%';
        progressScore.style.right = ('-' + progressScore.clientWidth) * 4 + 'px';
        progressScore.innerText = percent + ' %';
        progressBar.classList.add('ani')
        question.classList.add('ani');
        answer.classList.add('ani');
    }

    // 버튼 생성
    for(let i = 0; i < object.a.length; i++){
        let btn = `<button class="answer-btn" data-score="${object.a[i].score}">${object.a[i].answer}</button>`
        answer.innerHTML += btn;
    }

    
    // 버튼 클릭 이벤트
    const answerBtn = document.querySelectorAll('.answer-btn');

    answerBtn.forEach((currentElement, i)=>{
        answerBtn[i].addEventListener('click', ()=>{
            index++; // 클릭할때마다 인덱스 +
            scoreTotal += Number(answerBtn[i].dataset.score)

            // progress bar
            percent  = (index + 1) / qnaList.length * 100;
            progressGuage.style.width = percent + '%';
            progressScore.innerText = percent + ' %';

            // percent 가 50이상일때
            if(percent >= 50){
                progressScore.classList.add('half')
                progressScore.style.right = 0 + 'px';
            }
            // 클릭할때 질문, 답 초기화
            question.innerText = '';
            answer.innerHTML = '';
            // 다시 호출
            questionBox(qnaList[index]);

            //마지막질문
            if(index === qnaList.length){
                // calculating bar
                const calcBox = document.querySelector('.calc-box');
                const calcTxt = document.querySelector('.calc-txt');
                const calcbar = document.querySelector('.calc-bar');
                let calc = document.querySelector(".calc");
                let barWidth = 0;

                setTimeout(() => {
                    calcBox.style.display = 'block'
                    calcbar.classList.add('ani');
                    calcTxt.classList.add('ani');
                 }, 500);

                 setTimeout(() => {
                    calcBox.style.display = 'none'
                    calcbar.classList.remove('ani');
                    calcTxt.classList.remove('ani');
                    calcBox.classList.add('ani02');
                }, 4000);

                const animate = () => {
                    barWidth++;
                    calc.style.width = `${barWidth}%`;
                    calcTxt.innerText = '잠시만 기다려주세요';
                }
                let intervalID = setInterval(() => {
                    if (barWidth === 100) {
                    clearInterval(intervalID);
                    } else {
                    animate();
                    }
                }, 30);

                setTimeout(() => {
                    result.style.display = 'block'
                    result.classList.add('ani');
                }, 4700);

                qna.style.display = 'none';
                progressBar.style.display = 'none';
                progressScore.style.display = 'none';

                for(let i = 0; i < infoList.length; i++){
                    console.log(scoreTotal);
                    //점수에 따른 결과값 출력
                    if(scoreTotal >= infoList[i].from && scoreTotal <= infoList[i].to){
                        let info = `
                        <p class="test-info">${input.value}님의 점수는..<br> ${scoreTotal}점</p>
                        <div class="test-img">
                            <img src="./img/image-${i}.png" alt="${infoList[i].name}" title="${infoList[i].name}">
                        </div>
                        <div class="test-result">
                            <p class="test-name">${infoList[i].name}</p>
                            <p class="test-desc">${infoList[i].desc}</p>
                        </div>
                        `;
                        desc.innerHTML += info
                    }
                }
            }
        })
    })
}

// switch mode
let flag = false;
const head = document.getElementsByTagName('head')[0];
const dark_css = document.createElement('link');
dark_css.rel = 'stylesheet';
dark_css.type = 'text/css';
dark_css.href = 'css/darkmode.css';

const darkMode = () => {
  flag = true;
  head.appendChild(dark_css);
}
const lightMode = () => {
  flag = false;
  if (head.lastChild === dark_css){
      head.removeChild(dark_css);
  }
}
const switchMode = () => flag ? lightMode() : darkMode();

