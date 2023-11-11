public class $CLIENT_CLASS_NAME$ {

    public void operation(){
        $RECEIVER_CLASS_NAME$ receiver = new $RECEIVER_CLASS_NAME$();
        ConcreteCommand command = new ConcreteCommand(receiver, this);
        $INVOKER_CLASS_NAME$ invoker = new $INVOKER_CLASS_NAME$(command);

        invoker.executeCommand();
    }
}
