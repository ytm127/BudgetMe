////////////////////////////////// data/budget controller /////////////////////////////
////////////////////////////////// data/budget controller /////////////////////////////
////////////////////////////////// data/budget controller /////////////////////////////

var budgetController = (function(){
  var Expense = function (id, desc, value){
    this.id = id;
    this.desc = desc;
    this.value = value;
  };
  var Income = function (id, desc, value){
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var calculateT = function(type) {
    var sum = 0;
    data.lists[type].forEach(function(cur){
      sum += cur.value;
    })
    data.totals[type] = sum;
  };

  var data = {
    lists: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage : -1
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

    deleteItem: function(type, id) {
      var ids = data.lists[type].map(function(current){
        return current.id;
      });
      var index = ids.indexOf(id);

      if(index !== -1){
        data.lists[type].splice(index, 1);
      }
    },

    calculateBudget : function() {
      //calculate new budget
      calculateT('exp');
      calculateT('inc');
      //calculate budget (income - expense) data.budget
      data.budget = data.totals['inc'] - data.totals['exp'];

      //calculate percentage
      if(data.totals.inc > 0){
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        console.log(data.percentage);
      }
      else {
        data.percentage = -1;
      }

    },
    getBudget : function() {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totals: data.totals
      }
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
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetValue: '.budget__value',
    budgetIncVal: '.budget__income--value',
    budgetExpVal: '.budget__expenses--value',
    budgetPercentage: '.budget__expenses--percentage',
    deleteContainer: '.container'
  };
  //expose this to the public
  return {
    getInput : function (){
      return {
        type : document.querySelector(DOM_strings.type).value,
        desc : document.querySelector(DOM_strings.desc).value,
        value : parseFloat(document.querySelector(DOM_strings.value).value)
      };
    },
    addItemUI: function (obj, type) {
      //html string with placeholders
      var html, newhtml, element;
      if(type === 'inc'){
        element = DOM_strings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      else{
        element = DOM_strings.expenseContainer;
        html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }

      //replace html placeholder with new data
      newhtml = html.replace('%id%', obj.id);
      newhtml = newhtml.replace('%description%', obj.desc);
      newhtml = newhtml.replace('%value%', obj.value);

      //insert this new html string into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);


    },

    deleteItemUI: function(selectorID){
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);

    },

    displayBUI: function(obj) {
      document.querySelector(DOM_strings.budgetValue).textContent = obj.budget;
      document.querySelector(DOM_strings.budgetIncVal).textContent = obj.totals.inc;
      document.querySelector(DOM_strings.budgetExpVal).textContent = obj.totals.exp;
      document.querySelector(DOM_strings.budgetPercentage).textContent = obj.percentage;
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
    //add eventlistener for deleting ites
    document.querySelector(DOM.deleteContainer).addEventListener('click', ctrlDeleteItem);
  };


  var updateBudget = function(){
    //calc the budget
    budgetCtrl.calculateBudget();
    //return the budget
    var budget = budgetCtrl.getBudget();
    //display the budget UI
    UICtrl.displayBUI(budget);
  };

  //create a function to start basically everything
  var start = function(){

    //get input Value
    var input = UICtrl.getInput();
    if(input.desc !== "" && !isNaN(input.value) && input.value > 0){
      //add item to budget controller
      var newItem = budgetCtrl.addItem(input.type, input.desc, input.value);
      //add item to UI
      UICtrl.addItemUI(newItem, input.type);
      //update the budget
      updateBudget();
    };
  };

  //delete an item from list
  var ctrlDeleteItem  = function(e) {
    var itemID, splitItemID, type, id;
    //set up event listener using event delegation
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemID);
    if(itemID){
      splitItemID = itemID.split('-');
      console.log(splitItemID);
      type = splitItemID[0];
      id = parseInt(splitItemID[1]);
      // 1. delete item from budget data
      budgetCtrl.deleteItem(type, id);
      // 2. delete the UI
      UICtrl.deleteItemUI(itemID);
      // 3. update and show the new budget
      updateBudget();
    }

  };


  return {
    init : function (){
      console.log('the app has started');
      setUpEventListeners();
    }
  };

})(budgetController, uiController);


//start the game
controller.init();
