
//Creates constructor function that initializes a new name object with its attributes assigned to the values passed into the constructor function//
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
//Creates an address constructor the initializes a new address object//
function Address(street, city, state, type) {
  debugger;
  this.street = street;
  this.city = city;
  this.state = state;
  this.type = type;
}
//adds custom method to the contact object
Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + " " + this.state + " " + this.type;
}
//function that resets the input fields
function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}

//user interface logic
$(document).ready(function() {
  $('select > option').click(function() {
    $('select').removeClass('active');
    $(this).parent().addClass('active');
  });
  //when this button is clicked it adds more input fields
  $("#add-address").click(function(){
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>' + '<div id="select-box">' +
                                 '<select class="form-control" id="address-type">' +
                                   '<option>Main</option>' +
                                   '<option>Secondary</option>' +
                                   '<option>Work</option>' +
                                 '</select>' +
                               '</div>');
  })
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputedLastName);

  $(".new-address").each(function() {
    var inputtedStreet = $(this).find("input.new-street").val();
    var inputtedCity = $(this).find("input.new-city").val();
    var inputtedState = $(this).find("input.new-state").val();
    var inputtedAddressType = $('.active').val();
    var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedAddressType);
    newContact.addresses.push(newAddress);
});

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress()  + "</li>");
      });
    });

    resetFields();
  });
});
