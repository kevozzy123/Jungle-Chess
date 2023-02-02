"use strict";
const rulesTemplate = document.createElement('template');
rulesTemplate.innerHTML = `
 <article class="rules">
        <style>
            .rules {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 90%;
                background-color: rgb(255, 247, 185);
                padding: 1rem;
                border-radius: 1rem;
                height: 50%;
                overflow: auto;
                transition: all .2s;
                z-index: 99;
                display: none;
            }

            .rules::-webkit-scrollbar {
                display: none;
            }

            .rules li {
                margin: 1rem 0;
            }

            .rules h2 {
                text-align: center;
                font-weight: 800;
            }

            .rules h3 {
                font-weight: 800;
                font-size: 1.25rem;
            }

            .rules strong {
                color: rgb(224, 49, 0);
            }
        </style>
            <h2>Game Rules</h2>
            <ol>
                <li>
                    <h3>[Win condition]</h3><strong>Remove all enemy animals</strong> or <strong>take the enemy
                        lair.</strong>
                    <br> If no piece is eaten for a number of turns(you can configure this setting before the start of
                    each
                    game), draw is called.
                </li>
                <li>
                    <h3>[Eating Rules]</h3>
                    Stronger animals can eat weaker animals. However, <strong>elephant</strong>, who is supposed to be
                    the strongest
                    animal, <strong>can be eaten by rat.</strong>
                </li>
                <li>The order of strength is as follows: <strong>elephant > lion > tiger > cheeta > wolf > dog > cat >
                        rat > elephant</strong> </li>
                <li>You cannot eat your own animals</li>
                <li>
                    <h3>[Movement Rules]</h3>
                    When an animals moves into the enemy trap, it becomes <strong>vaulnerable</strong> and can be eaten
                    by any enemy
                    animal. But animals won't be affected by traps of their own side.
                </li>
                <li>Normally, animals can only move <strong>one grid at a time, horizontally or vertically</strong>,
                    with the exception
                    of rats and lions or tigers. <strong>Rats are the only animals that can move into
                        the river</strong>. While a rat is in
                    river, it's <strong>invuneralble</strong>, but unable to eat elephants on land, nor do they can eat
                    other rats in the water, either. Tigers and
                    lions can <strong>jump
                        across the river</strong> if they are near it.
                </li>
                <li>You cannot move into your own lair</li>
            </ol>
        </article>
`;
customElements.define('rules-modal', class RulesModal extends HTMLElement {
    constructor() {
        super();
        const template = rulesTemplate;
        const content = template.content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(content.cloneNode(true));
    }
});
