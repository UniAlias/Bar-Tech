function open(){
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
          /* Toggle between adding and removing the "active" class,
          to highlight the button that controls the panel */
          this.classList.toggle("active");

          /* Toggle between hiding and showing the active panel */
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
          } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
          }
      });
  }
  activeButton.className = "accordion active";
  activePanel.style.maxHeight = activePanel.scrollHeight + "px";
}


// function searchDatabase(){
//   // Declare variables
//   var input, filter, table, tr, td, i;
//   input = document.getElementById("filter_search");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("keyDatabase");
//   tr = table.getElementsByTagName("tr");
//
//   // Loop through all table rows, and hide those who don't match the search query
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     if (td) {
//       if (td.innerHTML.toUpperCase().indexOf(filter) > -1 ) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }

function searchDatabase() {
    var input = document.getElementById("filter_search");
    var filter = input.value.toUpperCase();
    var rows = document.querySelector("#keyDatabase tbody").rows;

    for (var i = 0; i < rows.length; i++) {
        var firstCol = rows[i].cells[0].textContent.toUpperCase();
        var secondCol = rows[i].cells[1].textContent.toUpperCase();
        var thirdCol = rows[i].cells[2].textContent.toUpperCase();
        var forthCol = rows[i].cells[3].textContent.toUpperCase();
        var fifthCol = rows[i].cells[3].textContent.toUpperCase();

        if (firstCol.indexOf(filter) > -1 || secondCol.indexOf(filter) > -1 || thirdCol.indexOf(filter) > -1 || forthCol.indexOf(filter) > -1 || fifthCol.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
