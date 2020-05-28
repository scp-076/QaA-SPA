import './style.css';
import {createModal, isValid} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const form = document.querySelector('#form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.querySelector('#modal-btn');

modalBtn.addEventListener('click', openModal)
window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitHandler);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
})

function submitHandler(event) {
    event.preventDefault();
    if (isValid(input.value)) {
        let question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true;
        // async request to server to save question
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
            submitBtn.disabled = false;
        })
    }
}

function openModal() {
    createModal('Authorization', getAuthForm());
    document.querySelector('#auth-form').addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(event) {
    event.preventDefault();
    let btn = event.target.querySelector('button');
    let email = event.target.querySelector('#email-input').value;
    let password = event.target.querySelector('#password-input').value;

    btn.disabled = true;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false);
}

function renderModalAfterAuth(content) {
    if(typeof content === 'string') {
        createModal('Error!', content)
    } else {
        createModal('Question list', Question.listToHTML(content));
    }
}