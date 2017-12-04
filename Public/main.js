$(function(){
//introduce template for table
  var tableTemplate = document.querySelector(".tableTemplate").innerHTML;
  //Compile that  into a template
  var tableTemplateInst = Handlebars.compile(tableTemplate);
  var displayTableDay = document.getElementById('displayTableDay');
  // var submit = document.getElementById('submit')
function regPlumbler() {
  $.ajax({
      type: "GET",
      url: "/api/plumbers",
      dataType: 'json'
      success: function(oders) {
          displayTableDay.innerHTML = tableTemplateInst({
              plumberList: oders.data
          })

      }
  });
}
regPlumbler();


function addPlumber() {
    var name = document.getElementById("name");
    var email= document.getElementById("email");
    var cellnumber = document.getElementById("cellnumber");


    var newPlumber = {
      slot  slot.value,
      day: day.value,
        name: name.value,
        email: email.value,
        cellnumber: cellnumber.value
    }
    name.value ="";
    email.value ="";
    cellnumber.value = "";

    $.ajax({
        type: "POST",
        url: "/api/plumbers",
        data: regPlumbler,
        dataType: 'json'
        success: function(oders) {
            regPlumbler()
        }

    })
}
}
