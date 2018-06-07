function encapsulationDriver(scriptToLoad){
    fetch(scriptToLoad).then()
}

const $w = {
   hello: () =>{
     console.log(window);
     console.log(document);
     console.log(this);
   }
};

const wrapper = {
  prefix : '(function(window, document, $w){',
  suffix :'}).call({}, {}, {}, $w)'
};