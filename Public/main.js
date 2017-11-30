function addStock() {
    var name = document.getElementById("name");
    var email= document.getElementById("email");
    var cellnumber = document.getElementById("cellnumber");


    var regPlumbler = {
        name: name.value,
        email: email.value,
        cellnumber: cellnumber.value
    }

    $.ajax({
        type: "POST",
        url: "/api/plumbers",
        data: regPlumbler,
        dataType: 'json',
        success: function(oders) {
            showAllStock();
        }

    })
}
