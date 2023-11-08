public class Client {

    private AbstractFactory factory;

    public Client(AbstractFactory factory){
        this.factory = factory;
    }

    public void someOperation(){
        //some logic
        AbstractProductA productA= factory.CreateProductA();
    }
}
