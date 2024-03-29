import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

class Auth {
  constructor() {
    this.name = 'auth';
    this.auth = getAuth();
    this.email;
  }
  get getHTML() {
    return `
        <form class="auth" action="POST">
          <div class="container auth__container">
              <h2 class="auth__title">Sign Up</h2>
              <input  class="auth__input" type="email" placeholder="Email">
              <input  class="auth__input" type="password" placeholder="Password">
              <button class="auth__button" type="submit">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.49067 0.650327C3.13569 0.447558 2.73367 0.341611 2.32487 0.343094C1.91606 0.344577 1.51482 0.45344 1.16133 0.658779C0.807831 0.864118 0.514487 1.15873 0.310672 1.5131C0.106857 1.86748 -0.000276476 2.26919 5.35836e-07 2.67799V17.322C-0.000276476 17.7308 0.106857 18.1325 0.310672 18.4869C0.514487 18.8413 0.807831 19.1359 1.16133 19.3412C1.51482 19.5465 1.91606 19.6554 2.32487 19.6569C2.73367 19.6584 3.13569 19.5524 3.49067 19.3497L16.3053 12.0253C16.6622 11.8212 16.9588 11.5263 17.1651 11.1707C17.3714 10.815 17.48 10.4111 17.48 9.99999C17.48 9.58884 17.3714 9.18499 17.1651 8.82932C16.9588 8.47366 16.6622 8.17882 16.3053 7.97466L3.49067 0.650327Z"/>
                  </svg>
              </button>
          </div>
      </form>
    `;
  }
  init() {
    document.body.insertAdjacentHTML('afterbegin', this.getHTML);
    return new Promise((resolve, reject) => {
      document.addEventListener('submit', this.signUp.bind(this, resolve));
    });
  }
  destroy() {
    document.querySelector(`.${this.name}`).remove();
    document.removeEventListener('submit', this.signUp.bind(this));
  }
  signUp(resolve, e) {
    e.preventDefault();
    this.email = e.srcElement[0].value;
    this.password = e.srcElement[1].value;
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.uid = user.uid;
          resolve(e);
        })
        .catch((error) => {
          throw new Error(error.message, error.code);
        });
    this.destroy();
  }
}
export default Auth;