
/**class============================================================================== */
if (typeof window === 'undefined') {
  var jsdom = require('jsdom');
  var { JSDOM } = jsdom;
  var { document } = (new JSDOM('')).window;
} // you don't have to worry about this code. this is for testing.

// dancer를 class 키워드를 써서 ES6 방식으로 리팩토링하세요
// 여기에는 Pseudoclassical에서 정의된 Dancer와 이름이 겹치므로, DancerClass라는 이름을 사용합니다.
class DancerClass {
	// your code here
	constructor(top, left , timeBetweenSteps){
		this.$node = this.createDancerElement();
		this.top = top;
		this.left = left;
		this.timeBetweenSteps = timeBetweenSteps;
		this.step();
		this.setPosition();
	}
  createDancerElement(){
    let elDancer = document.createElement('span');
    elDancer.className = 'dancer';
    return elDancer
	}

  step(){
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    setTimeout(this.step, this.timeBetweenSteps);
  }

  setPosition(){
    // Use css top and left properties to position our <span> tag
    Object.assign(this.$node.style, {
      top: `${this.top}px`,
      left: `${this.left}px`
    });
  }
}

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = DancerClass;
}
/* global DancerClass */
if (typeof window === 'undefined') {
  global.DancerClass = require('./DancerClass');
} // you don't have to worry about this code. this is for testing.

// blinkyDancer를 class 키워드를 써서 ES6 방식으로 리팩토링하세요
// 여기에는 Pseudoclassical에서 정의된 BlinkyDancer와 이름이 겹치므로, BlinkyDancerClass라는 이름을 사용합니다.
class BlinkyDancerClass extends DancerClass{
  // your code here
	
  step(){
    // call the old version of step at the beginning of any call to this new version of step
		super.step();
    let style = this.$node.style;
    style.display = style.display === 'none' ? 'inline-block' : 'none';
  }
}

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
	module.exports = BlinkyDancerClass;
}

// const BlinkyDancerClass = require('./BlinkyDancerClass');
/* eslint-disable */
const dancers = [];

function handleClickDancerButton () {
  /* makeBlinkyDancer is the dancer maker functions available in global scope.
  * A new object of the given type will be created and added
  * to the stage.
  */
  // make a dancer with a random position
  
	//
	//document의 크기를 max로 하는 랜덤값을 생성하여 BlinkDancerClass의 인스턴스를 생성한다.
	//마지막 인자는 깜빡이는 정도를 간격을 표현 0~1초 미만의 랜덤 값
	let dancer = new BlinkyDancerClass(
		document.body.clientHeight * Math.random(),
    document.body.clientWidth * Math.random(),
    Math.random() * 1000
  );
  document.body.appendChild(dancer.$node);
}

window.addEventListener('DOMContentLoaded', () => {
  const elAddDancerButton = document.querySelector('.addDancerButton');
  elAddDancerButton.addEventListener('click', handleClickDancerButton);
});

/*functional============================================================================ */
if (typeof window === 'undefined') {
  var jsdom = require('jsdom');
  var { JSDOM } = jsdom;
  var { document } = (new JSDOM('')).window;
} // you don't have to worry about this code. this is for testing.

// Creates and returns a new dancer object that can step
var makeDancer = (top, left, timeBetweenSteps) => {
  const dancer = {};

  const createDancerElement = () => {
    let elDancer = document.createElement('span');
    elDancer.className = 'dancer';
    return elDancer;
  };

  dancer.$node = createDancerElement();

  dancer.step = () => {
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    setTimeout(dancer.step, timeBetweenSteps);
  };

  dancer.setPosition = (top, left) => {
    // Use css top and left properties to position our <span> tag
    Object.assign(dancer.$node.style, {
      top: `${top}px`,
      left: `${left}px`
    });
  };

  dancer.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  dancer.setPosition(top, left);

  return dancer;
};

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = makeDancer;
}
if (typeof window === 'undefined') {
  var makeDancer = require('./dancer');
} // you don't have to worry about this code. this is for testing.

var makeBlinkyDancer = (top, left, timeBetweenSteps) => {
  const blinkyDancer = makeDancer(top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  let oldStep = blinkyDancer.step;

  blinkyDancer.step = () => {
    // call the old version of step at the beginning of any call to this new version of step
    oldStep();

    let style = blinkyDancer.$node.style;
    style.display = style.display === 'none' ? 'inline-block' : 'none';
  };

  return blinkyDancer;
};

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = makeBlinkyDancer;
}
/* eslint-disable */
const dancers = [];

function handleClickDancerButton () {
  /* makeBlinkyDancer is the dancer maker functions available in global scope.
  * A new object of the given type will be created and added
  * to the stage.
  */

  // make a dancer with a random position
  let dancer = makeBlinkyDancer(
    document.body.clientHeight * Math.random(),
    document.body.clientWidth * Math.random(),
    Math.random() * 1000
  );
  document.body.appendChild(dancer.$node);
}

window.addEventListener('DOMContentLoaded', () => {
  const elAddDancerButton = document.querySelector('.addDancerButton');
  elAddDancerButton.addEventListener('click', handleClickDancerButton);
});
/**psedoclassical========================================================================= */
if (typeof window === "undefined") {
  var jsdom = require("jsdom");
  var { JSDOM } = jsdom;
  var { document } = new JSDOM("").window;
} // you don't have to worry about this code. this is for testing.
// Dancer를 pseudoclassical한 방식으로 리팩토링하세요
// 참고로, constructor는 대문자로 이름을 시작하는 것이 관례입니다
function Dancer(top,left,timeBetweenSteps) {
	// your code here
	const createDancerElement = () => {
		let elDancer = document.createElement('span');
		elDancer.className = 'dancer';
		return elDancer;
	};
	this.$node =createDancerElement();
	this.timeBetweenSteps = timeBetweenSteps;
	this.step();
	this.setPosition(top,left)
}
Dancer.prototype.step = function(){
	// the basic dancer doesn't do anything interesting at all on each step,
	// it just schedules the next step
	setTimeout( this.step.bind(this), this.timeBetweenSteps);
};
Dancer.prototype.setPosition = function(top, left){
	// Use css top and left properties to position our <span> tag
	Object.assign(this.$node.style, {
		top: `${top}px`,
		left: `${left}px`
	});
};
// you don't have to worry about this code. this is for testing.
if (typeof window === "undefined") {
  module.exports = Dancer;
}
if (typeof window === 'undefined') {
  var Dancer = require('./Dancer');
} // you don't have to worry about this code. this is for testing.

// blinkyDancer를 pseudoclassical한 방식으로 리팩토링하세요
// 참고로, constructor는 대문자로 이름을 시작하는 것이 관례입니다
function BlinkyDancer () {
	// your code here
	Dancer.apply(this, arguments);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
}
BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function(){
	Dancer.prototype.step.apply(this);
	// call the old version of step at the beginning of any call to this new version of step
	let style = this.$node.style;
	style.display = style.display === 'none' ? 'inline-block' : 'none';
};
// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = BlinkyDancer;
}
/* eslint-disable */
const dancers = [];

function handleClickDancerButton () {
  /* makeBlinkyDancer is the dancer maker functions available in global scope.
  * A new object of the given type will be created and added
  * to the stage.
  */

  // make a dancer with a random position
  //
	// TODO:
	let dancer = new BlinkyDancer(
    document.body.clientHeight * Math.random(),
    document.body.clientWidth * Math.random(),
    Math.random() * 1000
  );
  document.body.appendChild(dancer.$node);
}

window.addEventListener('DOMContentLoaded', () => {
  const elAddDancerButton = document.querySelector('.addDancerButton');
  elAddDancerButton.addEventListener('click', handleClickDancerButton);
});
