public class Client {

    private $ABSTRACT_FACTORY_CLASSNAME$ factory;

    public Client($ABSTRACT_FACTORY_CLASSNAME$ factory){
        this.factory = factory;
    }

    public void someOperation(){
        //some logic
        AbstractProductA productA= factory.CreateProductA();
    }
}
