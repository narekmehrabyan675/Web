document.addEventListener('DOMContentLoaded', function() {
    let questionText = ' Ներածել ամսաթվերից բաղկացած միաչափ  զանգված։ Անջատել ենթազանգված 21-րդ դարի ամսաթվերից և կարգավորել այն ըստ տարիների աճման կարգի։ Արտածել ստացված ենթազանգվածը։';
    document.querySelector('.text').value = questionText;
    document.querySelector('.question-select').value = 'question1';
});

document.querySelector('.question-select').addEventListener('change', function() {
    let selectedQuestion = document.querySelector('.question-select').value;
    let questionText = '';
    if (selectedQuestion === 'question1') {
        questionText = ' Ներածել ամսաթվերից բաղկացած միաչափ  զանգված։ Անջատել ենթազանգված 21-րդ դարի ամսաթվերից և կարգավորել այն ըստ տարիների աճման կարգի։ Արտածել ստացված ենթազանգվածը։';
    } else if (selectedQuestion === 'question2') {
        questionText = 'Ներածել օբյեկտներից բաղկացած զանգված, որտեղ ամեն օբյեկտ պարունակում է մեկ ապրանքի տվյալներ․ անուն(ProductName), ստացման օր (Rec.day), պիտանիության ժամկետ (Exp.date), գին (Price), քանակ (Quantity): Անջատել ենթազանգված «Մածուն» անունով այն ապրանքներից, որոնց պիտանիության ժամկետը դեռ չի լրացել։ Արտածել այդ ապրանքների տվյալները և ընդհանուր գինը։';
    }
    document.querySelector('.text').value = questionText;
});

document.querySelector('.solve').addEventListener('click', function() {
    let inputText = document.querySelector('.info').value;
    let selectedQuestion = document.querySelector('.question-select').value;

    if (selectedQuestion === 'question1') {
        let dates = inputText.split(",").map(date => date.trim());
        let filteredDates = filterAndSortDates(dates);
        document.querySelector('.input1').value = filteredDates;
    } else if (selectedQuestion === 'question2') {
        let products;
        try {
            products = JSON.parse(inputText);
        } catch (e) {
            document.querySelector('.input2').value = "Invalid JSON input";
            return;
        }
        let productDetails = filterProducts(products);
        document.querySelector('.input2').value = productDetails;
    }
});

function filterAndSortDates(dates) {
    const filteredDates = dates.filter(date => {
        const year = new Date(date).getFullYear();
        return year >= 2001 && year <= 2100;
    }).sort((a, b) => new Date(a) - new Date(b));
    return filteredDates.join(", ");
}

function filterProducts(products) {
    const today = new Date();
    const filteredProducts = products.filter(product => 
        product.ProductName === "Մածուն" && new Date(product.ExpDate) > today
    );

    let totalPrice = 0;
    let productDetails = filteredProducts.map(product => {
        totalPrice += product.Price * product.Quantity;
        return `
            Product Name: ${product.ProductName}, 
            Received Day: ${product.RecDay}, 
            Expiry Date: ${product.ExpDate}, 
            Price: ${product.Price}, 
            Quantity: ${product.Quantity}
        `;
    }).join("\n");

    return `${productDetails}\nTotal Price: ${totalPrice}`;
}
