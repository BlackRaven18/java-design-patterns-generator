public class Client {

    public void operation(){
        Receiver receiver = new Receiver();
        ConcreteCommand command = new ConcreteCommand(receiver, this);
        Invoker invoker = new Invoker(command);

        invoker.executeCommand();
    }
}
