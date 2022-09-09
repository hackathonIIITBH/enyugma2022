$.fn.multiply = function(numCopies) {
    var newElements = this.clone();
    for(var i = 1; i < numCopies; i++)
    {
        newElements = newElements.add(this.clone());
    }
    return newElements;
  };
  
  $('.star').multiply(80).insertAfter('.star');
  
  
  $('.star').each(function() {
    var top = (Math.random() * 100) + '%';
    var left = (Math.random() * 100) + '%';
    
    $(this).css({
      "top": top,
      "left": left
    });
  });