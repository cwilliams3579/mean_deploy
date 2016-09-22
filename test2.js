function NewPerson(name){
	return {
		name:name,
		sayName: function(){
			console.log(name);
		}
	}
}

var Jay = NewPerson("Jay");
var Sara = NewPerson("Sara")
Jay.sayName();
Sara.sayName();