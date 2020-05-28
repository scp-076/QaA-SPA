export class Question {
    static create(question) {
        return fetch('https://q-and-a-js-practice.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question;
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        let questions = getQuestionsFromLocalStorage();
        let html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">No questions yet</div>`;
        let list = document.querySelector('#list');
        list.innerHTML = html;
    }

    static fetch(token) {
        if(!token) {
            return Promise.resolve('<p class="error">You have no auth-token</p>')
        }
        return fetch(`https://q-and-a-js-practice.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error) {
                    return `<p class="error">${response.error}</p>`
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : [];
            })
    }

    static listToHTML(questions) {
        return questions.length
        ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
        : '<p>No questions yet</p>'
    }
}

function addToLocalStorage(question) {
    let all = getQuestionsFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
    return `
            <div class="mui--text-black-54">
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </div>
            <div>${question.text}</a></div>
            <br>
            `
}