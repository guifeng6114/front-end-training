// Autonomous custom elements
class PopUpInfo extends HTMLElement {

    static get observedAttributes() {
        return ['img', 'text'];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        });

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
        img.src = this.hasAttribute('img') ?
            this.getAttribute('img') :
            './images/default.png';
        icon.appendChild(img);

        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                position: relative;
            }
            .info {
                font-size: 0.8rem;
                width: 200px;
                display: inline-block;
                border: 1px solid black;
                padding: 10px;
                background: white;
                border-radius: 10px;
                opacity: 0;
                transition: 0.6s all;
                position: absolute;
                bottom: 0px;
                left: 36px;
                z-index: 3;
            }
            img {
                width: 2rem;
            }
            .icon:hover + .info, .icon:focus + .info {
                opacity: 1;
            }
        `;

        this.shadow.append(style, wrapper);
        wrapper.append(icon, info);
    }

    connectedCallback() {
        console.log('connected!');
    }

    disconnectedCallback() {
        console.log('disconnected!');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`propertyName: ${name}`);
        console.log(`oldValue: ${oldValue}`);
        console.log(`newValue: ${newValue}`);
        if (name === 'img') {
            this.shadow.querySelector('img').src = newValue;
        } else if (name === 'text') {
            this.shadow.querySelector('.info').textContent = newValue;
        }
    }

}

// Customized built-in elements
class ExpandingList extends HTMLUListElement {
    constructor() {
        super();

        window.onload = function () {
            const uls = [...document.querySelectorAll(':root ul')];
            const lis = [...document.querySelectorAll(':root li')];

            uls.slice(1).forEach(ul => {
                ul.style.display = 'none';
            });

            lis.forEach(li => {
                const childText = li.childNodes[0];
                const newSpan = document.createElement('span');

                newSpan.textContent = childText.textContent;
                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            });

            const spans = [...document.querySelectorAll(':root span')];
            spans.forEach(span => {
                if (span.nextElementSibling) {
                    span.style.cursor = 'pointer';
                    span.parentNode.setAttribute('class', 'closed');
                    span.onclick = showul;
                }
            });

            function showul(e) {
        
                const nextul = e.target.nextElementSibling;
        
                if (nextul.style.display == 'block') {
                    nextul.style.display = 'none';
                    nextul.parentNode.setAttribute('class', 'closed');
                } else {
                    nextul.style.display = 'block';
                    nextul.parentNode.setAttribute('class', 'open');
                }
            }

        }
    }
}

// define the elements name and use the class we have defined
customElements.define('popup-info', PopUpInfo);

// use the built-in elements need to point to the extended element
customElements.define('expanding-list', ExpandingList, {
    extends: 'ul'
});