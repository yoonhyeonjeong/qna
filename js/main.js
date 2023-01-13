// 외부 js 호출(data.js)
document.write('<script src="/data.js"></script>');

const startBtn = document.querySelector(".start-btn");
const input = document.querySelector(".input")
const message = document.querySelector(".input-notice")
const welcome = document.querySelector('.welcome');
const qna = document.querySelector('.qna');
const question  = document.querySelector('.question');
const answer  = document.querySelector('.answer');
const progressBar = document.querySelector('.progress-bar');
let progressGuage = document.querySelector('.progress-guage');

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
    questionBox(qnaList[index]);
})



let index = 0;
let scoreTotal = 0;

function questionBox(object) {
    if(!object){
        question.innerText = '';
        return; // 함수실행 중단
    }

    welcome.style.display = 'none';
    progressBar.style.display = 'block';

    // 첫번째 질문 뿌리기~ 
    question.innerText += object.q
    // 첫번째 프로그레스
    // let percent  = 1 / qnaList.length * 100;
    // progressGuage.style.width = percent + '%';
    // let progressScore = document.querySelector('.progress-score');
    // progressScore.innerText = percent + '%';

    for(let i = 0; i < object.a.length; i++){
        let btn = `<button class="answer-btn" data-score="${object.a[i].score}">${object.a[i].answer}</button>`
        answer.innerHTML += btn
    }

    
    // 버튼 클릭 이벤트
    const answerBtn = document.querySelectorAll('.answer-btn');

    answerBtn.forEach((currentElement, i)=>{
        answerBtn[i].addEventListener('click', ()=>{
            index++; // 클릭할때마다 인덱스 +
            console.log(index);
            scoreTotal += Number(answerBtn[i].dataset.score)
            console.log('점수합산', scoreTotal)

            // progress bar
            let percent  = index / qnaList.length * 100;
            progressGuage.style.width = percent + '%';
            console.log(percent, progressGuage.style.width)
            let progressScore = document.querySelector('.progress-score');
            progressScore.innerText = percent + '%';
            // 클릭할때 질문, 답 초기화
            question.innerText = '';
            answer.innerHTML = '';
            // 다시 호출
            questionBox(qnaList[index]);


            if(index === 10){
                progressScore.style.display = 'none';
                for(let i = 0; i < infoList.length; i++){
                    console.log(scoreTotal);
                    //점수에 따른 결과값 출력
                    if(scoreTotal >= infoList[i].from && scoreTotal <= infoList[i].to){
                        let info = `
                        <p class="test-info">${input.value}님의 점수는..<br> ${scoreTotal}점</p>
                        <div class="test-img">
                            <img src="/img/image-${i}.png" alt="${infoList[i].name}" title="${infoList[i].name}">+
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
