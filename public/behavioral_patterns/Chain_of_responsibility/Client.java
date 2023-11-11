public class $CLIENT_CLASS_NAME$ {

    private ConcreteHandler handler1;
    private ConcreteHandler handler2;

    public $CLIENT_CLASS_NAME$(){
        this.handler1 = new ConcreteHandler();
        this.handler2 = new ConcreteHandler();

        this.handler1.setSuccesor(handler2);
    }

    public void operation(String request){
        handler1.handleRequest(request);
    }
}
