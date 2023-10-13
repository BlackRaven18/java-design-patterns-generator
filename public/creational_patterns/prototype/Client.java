public class Client {

    private Prototype prototype;

    public Client(Prototype prototype){
        this.prototype = prototype;
    }
    public void Operation(){
        //some logic
        Prototype p = prototype.clone();
    }
}
