let json_array = []

// get the tour id
let catchId = new URLSearchParams(window.location.search)
let tour_index = catchId.get("tour_index")

$(document).ready(function () {
   

  $.ajax({
    url: "http://localhost:3001/getTours",
    success: function (result) {
      json_array = result
    },
    error: function (err) {
      console.log("err", err);
    },
  });

  let site = 

  // for(let i = 0; i < json_array[tour_index][1].path; i++){
  //   site = site + json_array[tour_index][1].path.name + json_array[tour_index][1].path.country
  //   path.push(site);
  // }

  $("form[name='index.html']").validate({
      // Specify validation rules
      rules: {
        "tourname": {
          required: true,
          minlength: 5
        },
        "duration": {
          required: true,
          digits: true,
          minlength: 1
        },
        "price": {
          required: true,
          digits: true,
          minlength: 2
        },
        "guide_email":{
          "guide_email":true
        },
        "guide_phone": {
          required: true,
          digits: true,
          minlength: 10
        },
      },
      // Specify validation error messages
      messages: {       
        price: "price need to be more then 10",
        guide_phone: "need to be at least 10 digits ",
        duration: "need to be at least 1 digit ",
        tourname: "need to be at least 5 characters",
        guide_email: "email structure is some@domain "
      }
    });

  // process the form
  $('#edit_form').submit(function (event) {
      if(!$("#edit_form").valid()) return;

      console.log("in submit");
      let guide ={
        "name": $("#guide_name").val(),
        "email": $("#guide_email").val(),
        "cellular": $("#guide_phone").val(),
      }

      let path = [];
      path = json_array[tour_index][1].path
    
      // process the form
      $.ajax({
          type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
          url: '/updateTour/' + json_array[tour_index][0], // the url where we want to POST
          contentType: 'application/json',
          data: JSON.stringify({
              // "id": $("#tourname").val(),
              "start_date": $("#date").val(),
              "duration": $("#duration").val(),
              "price": $("#price").val(),
              "guide": guide,
              "path": path,             
          }),
          processData: false,            
         // dataType: 'json', // what type of data do we expect back from the server
          encode: true,
          success: function( data, textStatus, jQxhr ){
              console.log("data" + data);
              $(location).attr('href',"/");
          },
          error: function( jqXhr, textStatus, errorThrown ){
              console.log( errorThrown );
          }
      })
        
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
  });

});
