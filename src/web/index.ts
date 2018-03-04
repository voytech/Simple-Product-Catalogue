class HelloWorld {
  private message : String;

  constructor(message : String){
    this.message = message;
  }

  public hello(){
    console.log("Hello "+this.message);
  }
}

let helloWorld = new HelloWorld("My Dear");
helloWorld.hello();
