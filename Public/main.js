// $(function(){
//introduce template for table
  var tableTemplate = document.querySelector("#tableTemplate").innerHTML;
  //Compile that  into a template
  var tableTemplateInst = Handlebars.compile(tableTemplate);
  var displayTableDay = document.getElementById('displayTableDays');
  var submit = document.getElementById('submit');
  var submit = document.getElementById('submit');
function regPlumbler() {
  $.ajax({
    url: "/api/plumbers",
      type: "GET",
      dataType: 'json',
      success: function(pumblers) {
          displayTableDay.innerHTML = tableTemplateInst({
              plumberList: pumblers.data
          })

      }
  })
}
regPlumbler();


function addPlumber(){
    var name = document.getElementById("name");
    var email= document.getElementById("email");
    var cellnumber = document.getElementById("cellnumber");
    var slot = document.getElementById("slot");
    var day = document.getElementById("day");


    var newPlumber = {
        name: name.value,
        email: email.value,
        cellnumber: cellnumber.value,
        slot : slot.value,
        day: day.value
    }
    name.value ="";
    email.value ="";
    cellnumber.value = "";
    slot.value = "";
    day.value = "";

    $.ajax({
        type: "POST",
        url: "/api/plumbers",
        data: regPlumbler,
        dataType: 'json',
        success: function(plumbers) {
          regPlumbler()
        }

    })
}

//function for update
$('#displayTableDays').on('click', function(e) {
      var book = e.target.value;
      $.ajax({
          type: "POST",
          url: "/api/plumbers/bookings/" + book,
          dataType: 'json',
          success: function(plumbers) {}

      })

  })
