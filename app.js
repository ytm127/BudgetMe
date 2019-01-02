////////////////////////////////// data/budget controller /////////////////////////////
////////////////////////////////// data/budget controller /////////////////////////////
////////////////////////////////// data/budget controller /////////////////////////////

var budgetController = (function(){
  var Expense = function (id, desc, value){
    this.id = id;
    this.desc = desc;
    this.value = value;
  }
  var Income = function (id, desc, value){
    this.id = id;
    this.desc = desc;
    this.value = value;
  }

  var data = {
    lists: {
      exp: [],
      inc: []
    },
    totals: {
      expense: 0,
      income: 0
    }
  };

  return {
    addItem : function(type, desc, val) {
      var ID, newItem;
      //set up a unique id for each of the items
      if(data.lists[type].length > 0){
          ID = data.lists[type][data.lists[type].length - 1].id + 1;
      }
      else {
          ID = 0;
      }
      //create a new item based on its type
      if(type == 'exp'){
        newItem = new Expense(ID, desc, val);
      }
      else {
        newItem = new Income(ID, desc, val);
      }
      //push the new item into the appropriate array
      data.lists[type].push(newItem);
      //return the newly added item
      return newItem;
    },

    testing: function (){
      console.log(data);
    }
  }


})();




///////////////////////////////// User interface controller //////////////////////////////////////////////
///////////////////////////////// User interface controller //////////////////////////////////////////////
///////////////////////////////// User interface controller //////////////////////////////////////////////



var uiController = (function(){

  //store dom stuff here
  var DOM_strings = {
    type : '.add__type',
    desc : '.add__description',
    value : '.add__value',
    button : '.add__btn',
    expenseContainer : '.expenses__list',
    incomeContainer : '.income__list'
  };
  //expose this to the public
  return {
    getInput : function (){
      return {
        type : document.querySelector(DOM_strings.type).value,
        desc : document.querySelector(DOM_strings.desc).value,
        value : document.querySelector(DOM_strings.value).value
      };
    },
    addItemUI: function (obj, type) {
      //html string with placeholders
      var html, newhtml, element;
      if(type === 'inc'){
        element = DOM_strings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      else{
        element = DOM_strings.expenseContainer;
        html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }

      //replace html placeholder with new data
      newhtml = html.replace('%id%', obj.id);
      newhtml = newhtml.replace('%description%', obj.desc);
      newhtml = newhtml.replace('%value%', obj.value);

      //insert this new html string into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);


    },
    getDOM_strings : function (){
      return DOM_strings;
    }
  };


})();











//////////////////////////////////GLOBAL CONTROLLER/////////////////////////////////////////////
//////////////////////////////////GLOBAL CONTROLLER/////////////////////////////////////////////
//////////////////////////////////GLOBAL CONTROLLER/////////////////////////////////////////////

var controller = (function(budgetCtrl, UICtrl){

  var DOM = UICtrl.getDOM_strings();

  var setUpEventListeners = function (){
    //add eventlistener (click button)
    document.querySelector(DOM.button).addEventListener('click', function(){
      start();
    });
    //add eventlistener (enter button)
    document.addEventListener('keydown', function(e){
      if(e.key == "Enter")
        start();
    })
  };
  //create a function to start basically everything
  var start = function(){
    //get input Value
    var input = UICtrl.getInput();
    //add item to budget controller
    var newItem = budgetCtrl.addItem(input.type, input.desc, input.value);
    //add item to UI
    UICtrl.addItemUI(newItem, input.type);
    //calculate new budget
    //display new budget
  }

  return {
    init : function (){
      console.log('the app has started');
      setUpEventListeners();
    }
  };

})(budgetController, uiController);


//start the game
controller.init();
