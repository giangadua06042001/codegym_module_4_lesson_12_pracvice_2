function addNewSmartPhone() {
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        url: "http://localhost:8080/smartphones",
        success: console.log('success')

    });
    event.preventDefault();
}

function getSmartphone(smartphone) {
    return `<tr><td >${smartphone.producer}</td><td >${smartphone.model}</td><td >${smartphone.price}</td>` +
        `<td><a class="deleteSmartphone" href="${smartphone.id}">Delete</a></td></tr>`;
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/smartphones",
        success: function (iphoneData) {
            let content = '    <tr>\n' +
                '        <td>Producer</td>\n' +
                '        <td>Model</td>\n' +
                '        <td>Price</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < iphoneData.length; i++) {
                content += getSmartphone(iphoneData[i]);
            }
            document.getElementById('smartphoneList').innerHTML = content;
        }
    });
}

$(document).ready(function () {
    $('.deleteSmartphone').click(function (event) {
        let a = $(this);
        let smartphoneId = a.attr("href");
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/smartphones/${smartphoneId}`,
            success: function (data) {
                a.parent().parent().remove();
            }

        });
        event.preventDefault();
    });
})


