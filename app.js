
var itens_name = [];
var itens_qtd = [];
var itens_value = [];

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') main();
});

document.querySelector('#btnAdd').addEventListener('click', () => main());

const main = () => {
    var name = $('#itemName').val();
    var qtd;
    var value;    
    
    if ($('#itemValue').val()) {
        value = $('#itemValue').val();
    } else {
        value = '00,00';
    };

    if ($('#itemQtd').val()) {
        qtd = $('#itemQtd').val();
    } else {
        qtd = '1';
    };

    if(name) {
        save({name:name,qtd:qtd,value:value});
        render({name:name,qtd:qtd,value:value});      
        document.querySelector('#itemName').value = "";
        document.querySelector('#itemQtd').value = "";
        document.querySelector('#itemValue').value = "";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Prencha o nome do produto!',
        });
    };
};

const render = (data) => {
    document.querySelector('#boardList').innerHTML = "";
    itens_name.forEach((element,index) => {
        let nameVerify = truncateString(element);
        document.querySelector('#boardList').innerHTML += `
        <tr>
            <td class="itemList">${nameVerify}</td>
            <td class="itemList">${itens_qtd[index]}</td>
            <td class="itemList">R$ ${itens_value[index]}</td>
            <td class="itemList itemAction">
                <i onclick='removeRow(this.parentNode.parentNode.rowIndex)' class="bi bi-trash-fill"></i>
                <i onclick='editRow(this.parentNode.parentNode.rowIndex)' class="bi bi-pencil-square"></i>
            </td>
        </tr>
        `;  
    });
    countItens(itens_name.length);

    let total = 0;
    itens_value.forEach(element => total += parseInt(element));
    countValue(total);

};

const save = (data) => {
    itens_name.push(data.name);
    itens_qtd.push(data.qtd);
    itens_value.push(data.value);
};

const removeRow = (i) => {
    itens_name.splice(i - 1, 1);
    itens_qtd.splice(i - 1, 1);
    itens_value.splice(i - 1, 1);;
    render();
};

const editRow = (i) => {
    document.querySelector('#itemName').value = itens_name[(i - 1)];
    document.querySelector('#itemName').focus();
    document.querySelector('#itemQtd').value = itens_qtd[(i - 1)];
    document.querySelector('#itemValue').value = itens_value[(i - 1)];

    itens_name.splice(itens_name[(i - 1), 1]);
    itens_qtd.splice(itens_qtd[(i - 1), 1]);
    itens_value.splice(itens_value[(i - 1), 1]);
};
const maxLength = 15;

const truncateString = (str) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    };
    return str;
};

const countItens = (i) => {
    $('#qtdItens').text(`Itens : ${i}`);
};

const countValue = (i) => {
    $('#totalItens').text(`Total : ${i}`);
};