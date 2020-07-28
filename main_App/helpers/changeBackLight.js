export default function changeLight(name){
    let currentActive = document.querySelector('a.active');
    currentActive.classList.toggle('active');
    currentActive = document.querySelector(`a.${name}`);
    currentActive.classList.toggle('active');
    return true;
}