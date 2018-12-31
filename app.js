var budgetController = (function(){
  var expenseArr= [];
  var incArr= [];





})();

///////////////////////////////////////////////////////////////////////////////

var uiController = (function(){

  //store dom stuff here
  var DOM_strings = {
    type : '.add__type',
    desc : '.add__description',
    value : '.add__value',
    button : '.add__btn'
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
    getDOM_strings : function (){
      return DOM_strings;
    }
  };
})();



//////////////////////////////////GLOBAL CONTROLLER/////////////////////////////////////////////

var controller = (function(budgetCtrl, UICtrl){

  var DOM = UICtrl.getDOM_strings();
  //create a function to start basically everything
  var start = function(){
    //get input Value
    console.log(uiController.getInput());
    //add item to budget controller
    //add item to UI
    //calculate new budget
    //display new budget
  }




  //add eventlistener (click button)
  document.querySelector(DOM.button).addEventListener('click', function(){
    start();
  });
  //add eventlistener (enter button)
  document.addEventListener('keydown', function(e){
    if(e.key == "Enter")
      start();
  })


})(budgetController, uiController);
