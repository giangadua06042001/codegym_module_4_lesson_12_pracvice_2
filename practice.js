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
        `<td><button class="deleteSmartphone" onclick="deleteRecord(${smartphone.id})">Delete</button></td></tr>`;
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

function deleteRecord(id) {
    $.ajax({
        url: `http://localhost:8080/smartphones/${id}` ,
        type: "DELETE",
        success: function(response) {
            alert("Da xoa xong");
        },
       error: function(xhr, status, error) {
            alert("Error deleting record: " + error);
        }
    })
}


