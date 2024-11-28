import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Inicializa a autenticação


// Funções para manipulação de erros e validação
export function onChangeEmail(){
    toggleButtonsDisable();
    toggleEmailErrors();
}

export function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

export function signUp() {
    const email = form.email().value;
    const password = form.password().value;

    // Usando a API do Firebase para criar usuário
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert(getErrorMessage(error));
        });
}

function getErrorMessage(error) {
    const errors = {
        "auth/email-already-in-use": "Este email já está em uso.",
        "auth/invalid-email": "O email fornecido é inválido.",
        "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
    };
    return errors[error.code] || "Ocorreu um erro. Tente novamente.";
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    form.signupButton().disabled = !isEmailValid() || !isPasswordValid();
}

function isEmailValid() {
    return validateEmail(form.email().value);
}

function isPasswordValid() {
    return !!form.password().value;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Objeto Form
const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    signupButton: () => document.getElementById("signup-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
};
