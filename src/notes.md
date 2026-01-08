# Comandi abituali

- git reset head~1
- git push origin -f main 
- npx playwright test src/app/tests/list.test.ts

# Applicazione

const homeUrlImage="https://cdn.icon-icons.com/icons2/1660/PNG/512/3844470-home-house_110332.png";
const ordinationsUrlImage="https://cdn.icon-icons.com/icons2/37/PNG/512/food_4240.png";
const cartUrlImage="https://cdn.icon-icons.com/icons2/2645/PNG/512/cart_icon_160296.png";
const userUrlImage="https://cdn-icons-png.freepik.com/512/6337/6337309.png";
const searchUrlImage="https://cdn.icon-icons.com/icons2/621/PNG/512/magnifier-1_icon-icons.com_56924.png";
const feedUrlImage="https://png.pngtree.com/png-clipart/20230418/original/pngtree-bell-line-icon-png-image_9065349.png";

// TODO  barra di navigazione
// optimize barra in alto
const navtop= document.querySelector("nav.top")
navtop.innerHTML=`
    <div>
        <searchBar>
            <input type="text" placeholder="Ricerca">
            <button>
                <img src="${searchUrlImage}">
            </button>
        </searchBar>
    </div>
`;


// optimize barra in basso
const navbottom= document.querySelector("nav.bottom")
navbottom.innerHTML=`
    <div>
        <button id="home">
            <img src="${homeUrlImage}">
            Home
        </button>
        <button id="ordinations">
            <img src="${ordinationsUrlImage}">
            Ordinazioni
        </button>
        <button id="cart">
            <img src="${cartUrlImage}">
            Carrello
            <div id="pointCart"></div>
        </button>
    </div>
`;

// TODO router
    const switchButton=document.querySelectorAll("nav.bottom>div>*")
    const pointCart=document.querySelector("#pointCart");

    for (let a = 0; a < switchButton.length; a++) {
        switchButton[a].addEventListener('click',function(){
            if (switchButton[a].id==='home') {
                document.body.id='homePage'
            }
            if (switchButton[a].id==='ordinations') {
                document.body.id='ordinationsPage'
            }
            if (switchButton[a].id==='cart') {
                document.body.id='cartPage';
                pointCart.style.display='none';
            }
        })
        
    }