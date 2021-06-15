let json_array = [];



$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3001/getTours",
    success: function (result) {
      json_array = result;
      show_tours();
    },
    error: function (err) {
      console.log("err", err);
    },
  });
});

//
function show_tours() {
  let str;
  for (let i = 0; i < json_array.length; i++) {
    let tourName = json_array[i][0];
    str =
      str +
      '<tr><td> <p id ="trips_heders" </p> Trip name: ' +
      json_array[i][0] +
      ":</td>";
    str =
      str +
      "<td> <button onclick=\"edit('" +
      i +
      '\')" id=""> edit</button>';
    str =
      str +
      "<td> <button onclick=\"delete_tour('" +
      tourName +
      '\')" id=""> delete</button>';
    str =
      str +
      "<td> <button onclick=\"addSite('" +
      i +
      '\')" id=""> Add site</button></tr>';

    str = str + '<td><p id ="heders" </p> Start date: </td>';
    str = str + '<td><p id ="heders" </p> Duration: </td>';
    str = str + '<td><p id ="heders" </p> Price: </td>';
    str = str + '<td><p id ="heders" </p> Guide name: </td>';
    str = str + '<td><p id ="heders" </p> Guide email: </td>';
    str = str + '<td><p id ="heders" </p> Guide phone: </td></tr>';

    str = str + "<td>" + json_array[i][1].start_date + "</td>";
    str = str + "<td>" + json_array[i][1].duration + " days</td>";
    str = str + "<td>" + json_array[i][1].price + "$</td>";
    str = str + "<td>" + json_array[i][1].guide.name + "</td>";
    str = str + "<td>" + json_array[i][1].guide.email + "</td>";
    str = str + "<td>" + json_array[i][1].guide.cellular + "</td></tr>";

    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";

    str = str + '<td><p id ="heders" </p> path name: </td>';
    str = str + "<td>  </td>";
    str = str + '<td><p id ="heders" </p> path location: </td></tr>';

    for (let j = 0; j < json_array[i][1].path.length; j++) {
      let site_name = json_array[i][1].path[j].name;
      str = str + "<td>" + json_array[i][1].path[j].name + "</td>";
      str = str + "<td> => </td>";
      str = str + "<td>" + json_array[i][1].path[j].country + "</td>";
      str =
        str +
        '<td> <button onclick="delete_site(' +
        i +
        "," +
        j +
        ')" id="' +
        json_array[i][1] +
        '">delete site</button></tr>';
    }
    str = str + '<td> <div id="' + i + '" ></div> </td></tr>';

    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
  }

  $("#table").html(str);
}

// delete tour from the json
function delete_tour(id) {
  $.ajax({
    type: "DELETE",
    url: "/deleteTour/" + id,
    contentType: "application/json",
    success: function () {
      alert("You delete tour: " + id);
      json_array.splice(id, 1);
      show_tours();
    },
    error: function (err) {
      console.log("err", err);
    },
  });
}

// delete site from the json
function delete_site(tour_index, trip_index) {
  $.ajax({
    type: "DELETE",
    url:
      "/deleteSite/" +
      json_array[tour_index][0] +
      "/" +
      json_array[tour_index][1].path[trip_index].name,
    contentType: "application/json",
    success: function () {
      alert(
        "You delete tour: " + json_array[tour_index][1].path[trip_index].name
      );
      json_array[tour_index][1].path.splice(trip_index, 1);
      show_tours();
    },
    error: function (err) {
      console.log("err", err);
    },
  });
}

// sent the tour id to the edit html
function edit(tour_index) {
  location.href = "./edit_tour_form.html?tour_index=" + tour_index;
  // location.href = "./edit_tour_form.html"
}

function addSite(tour_id) {
  let str;

  str = str + '<form id="add_site" name="tour_form" method="PUT">';
  str =
    str +
    '<div id="name-group" class="form-group"> <label for="name"> Site Name</label> <input type="text" class="form-control" name="name" id="name" placeholder="Enter site name"required/></div>';
  str =
    str +
    '<div id="name-group" class="form-group"> <label for="country"> Site country</label> <input type="text" class="form-control" name="country" id="country" placeholder="Enter country name"required/></div>';
  str =
    str + "<button onclick=\"andle_add_site('" + tour_id + "')\"> add</button>";
  str = str + "</form>";

  $("#" + tour_id).html(str);
}

function andle_add_site(tour_id) {

  let path = [];

  let site = {
    name: $("#name").val(),
    country: $("#country").val(),
  };
  path = json_array[tour_id][1].path
  path.push(site);
  
  // process the form
  $.ajax({
    type: "PUT", 
    url: "/updateTour/" + json_array[tour_id][0], 
    contentType: "application/json",
    data: JSON.stringify({
      start_date: json_array[tour_id][1].start_date,
      duration: json_array[tour_id][1].duration,
      price: json_array[tour_id][1].price,
      guide: json_array[tour_id][1].guide,
      path: path,
    }),
    processData: false,
    // dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function (data, textStatus, jQxhr) {
      alert(" yoy added site")
      show_tours();
      // $(location).attr('href',"/");
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

//////////////////////        sorts       ///////////////////

function sort_by_name_small_to_big() {
  json_array.sort((a, b) => a[1].id.localeCompare(b[1].id));
  show_tours();
}

function sort_by_name_big_to_small() {
  json_array.sort((a, b) => b[1].id.localeCompare(a[1].id));
  show_tours();
}

function sort_by_duration_small_to_big() {
  json_array.sort(function (a, b) {
    return a[1].duration - b[1].duration;
  });
  show_tours();
}

function sort_by_duration_big_to_small() {
  json_array.sort(function (a, b) {
    return b[1].duration - a[1].duration;
  });
  show_tours();
}

function sort_by_price_small_to_big() {
  json_array.sort(function (a, b) {
    return a[1].price - b[1].price;
  });
  show_tours();
}

function sort_by_price_big_to_small() {
  json_array.sort(function (a, b) {
    return b[1].price - a[1].price;
  });
  show_tours();
}

function sort_by_date_small_to_big() {
  json_array.sort(function (a, b) {
    let arr1 = a[1].start_date.split("-");
    let arr2 = b[1].start_date.split("-");

    let time1 = new Date(arr1[2], arr1[1] - 1, arr1[0]);
    let time2 = new Date(arr2[2], arr2[1] - 1, arr2[0]);

    return time1 - time2;
  });

  show_tours();
}

function sort_by_date_big_to_small() {
  json_array.sort(function (a, b) {
    let arr1 = a[1].start_date.split("-");
    let arr2 = b[1].start_date.split("-");

    let time1 = new Date(arr1[2], arr1[1] - 1, arr1[0]);
    let time2 = new Date(arr2[2], arr2[1] - 1, arr2[0]);

    return time2 - time1;
  });
  show_tours();
}

//////////////////////        end sorts       ///////////////////

