// Սահմանում ենք կայքի ֆորմատը
document.body.style.backgroundColor = "#f0f8ff";
document.body.style.color = "#000080";

// Սարքում ենք հեդեր(վերնագիր)
const header = document.createElement('h1');
header.textContent = 'Թվերի հետ աշխատանք';//Անուն է տալիս
header.style.textAlign = 'center';//որոշում է դիրքը
header.style.color = '#000080';//որոշում է գույնն
document.body.appendChild(header);//ավելացնում է դակումենտի body-ի մեջ

// Մուտքագրելու համար տվյալները
const container = document.createElement('div');//div էլեմենտ է սարքում
document.body.appendChild(container);//ավելացնում է դակումենտի body-ի մեջ

// մուտքագրելու համար տվյալները
const inputField = document.createElement('input');
inputField.type = 'text';
inputField.id = 'inputField';
container.appendChild(inputField);

// Ընտրում ենք գործողությունն
const selectAction = document.createElement('select');
const option1 = document.createElement('option');
option1.value = 'average';
option1.textContent = 'Հաշվել միջին թվաբանականը';
selectAction.appendChild(option1);
const option2 = document.createElement('option');
option2.value = 'gcd';
option2.textContent = 'Հաշվել ամենամեծ ընդհանուր բաժանարարը';
selectAction.appendChild(option2);
container.appendChild(selectAction);

// Հաստատելու կոճակն է
const inputButton = document.createElement('button');
inputButton.textContent = 'Մուտքագրեք';
inputButton.onclick = handleInput;
container.appendChild(inputButton);

// Արտածելու պատուհան
const output = document.createElement('div');
output.id = 'output';
container.appendChild(output);

// Կոճակը հաշվարկելու
const executeButton = document.createElement('button');
executeButton.textContent = 'Կատարել';
executeButton.onclick = handleExecute;
container.appendChild(executeButton);

// Ցուցադրում է տեքստում գտնված թվերը
function handleInput() {
    const text = inputField.value;
    const numbers = text.match(/\d+/g)?.map(Number) || []; //const numbers = text.match(/\d+/g)?.map (Number) || [];
                                                           // - օգտագործում է կանոնավոր արտահայտություն ՝ տեքստում բոլոր թվերը որոնելու համար:
                                                           // match (/\d+ / g) գտնում է թվերի բոլոր հաջորդականությունները: ?.map (Number) գտած 
                                                           //տողերը վերածում է թվերի (եթե դրանք գտնվել են): Եթե թվեր չեն գտնվել, դատարկ զանգվածը վերադարձնում է []:
    output.textContent = `Գտնվել են հետևյալ թվերը: ${numbers.join(', ')}`;
    output.setAttribute('data-numbers', JSON.stringify(numbers));
}

// Իրականացնում է կատարել կոճակը
function handleExecute() {
    const numbers = JSON.parse(output.getAttribute('data-numbers') || '[]');  // Ստանում ենք թվերը
    const action = selectAction.value;

    if (numbers.length === 0) {
        output.textContent = 'Թվեր չեն գտնվել։';
        return;
    }

    if (action === 'average') {
        const average = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
        output.textContent = `Միջին թվաբանականը: ${average}`;
    } else if (action === 'gcd') {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const result = numbers.reduce((acc, num) => gcd(acc, num));
        output.textContent = `Ամենամեծ ընդհանուր բաժանարար: ${result}`;
    }
}
