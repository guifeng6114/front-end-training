// 
class PopUpInfo extends HTMLElement {
    
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('span');
        wrapper.classList.add('wrapper');

        const icon = document.createElement('span');
        icon.classList.add('icon');
        icon.setAttribute('tabindex', 0);

        const info = document.createElement('span');
        info.classList.add('info');

        const text = this.getAttribute('text');
        info.textContent = text;
        const img = document.createElement('img');
        img.src = this.hasAttribute('img')
                    ? this.getAttribute('img')
                    : './images/default.png';
        icon.appendChild(img);

        const style = document.createElement('style');

        shadow.append(style, wrapper);
        wrapper.append(icon, info);
    }

}

// define the elements name and use the class we have defined
customElements.define('popup-info', PopUpInfo);