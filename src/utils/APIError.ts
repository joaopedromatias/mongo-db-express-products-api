class Test {
    othername: string
    
    constructor(othername) { 
        this.othername = othername
    }

}

// function generator
const newTest = new Test('oie');
console.log(newTest.othername);